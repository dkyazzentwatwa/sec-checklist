# iOS Safari WebGPU Guide

This guide documents how to run WebLLM AI models on iOS Safari with WebGPU support.

## iOS Safari Constraints

iOS Safari has strict constraints that desktop browsers don't face:

- **1.5GB WebContent memory limit** (system-level, cannot be changed)
- **WebGPU only on iOS 18+ / Safari 18+**
- **GPU buffer size limits** vary by device (iPhone 15 Pro vs iPhone 16 Pro)
- **No SharedArrayBuffer** without proper COOP/COEP headers

## Key Techniques

### 1. iOS-Only Model Tier

Create separate tiny models for iOS (< 400MB, 2-4 bit quantized):

```typescript
// src/features/ai/services/webllm/engine.ts
export const AVAILABLE_MODELS = {
  // iOS-ONLY MODELS (< 400MB)
  'SmolLM2-135M-Instruct-q0f16-MLC': {
    name: 'SmolLM2 135M (q0)',
    size: '~360MB',
    iosOnly: true,
    maxBufferSizeMB: 400,
    minRAM: 1,
    quantization: 'q0f16', // 2-bit weights
  },

  // DESKTOP/ANDROID MODELS (1-3GB)
  'Llama-3.2-3B-Instruct-q4f16_1-MLC': {
    name: 'Llama 3.2 3B (q4)',
    size: '~2.3GB',
    iosOnly: false,
    maxBufferSizeMB: 2300,
    minRAM: 4,
  }
}
```

### 2. iOS Version Detection

Check iOS version from User Agent string:

```typescript
// src/features/ai/services/webllm/workerEngine.ts
private getIOSSafariVersion(): number | null {
  const ua = navigator.userAgent

  // Check iOS version (e.g., "iPhone OS 18_0", "CPU iPhone OS 18_1_1")
  const iosMatch = ua.match(/(?:iPhone |CPU (?:iPhone )?)?OS (\d+)[_\d]*/)
  if (iosMatch) {
    return parseInt(iosMatch[1], 10)
  }

  // Fallback: Safari version (e.g., "Version/18.0")
  const safariMatch = ua.match(/Version\/(\d+)/)
  if (safariMatch) {
    return parseInt(safariMatch[1], 10)
  }

  return null
}
```

**Version gating:**

```typescript
if (platform === 'ios' && iosVersion !== null && iosVersion < 18) {
  return {
    supported: false,
    error: `WebGPU requires iOS 18+. Your device (iOS ${iosVersion}) doesn't support it yet.`
  }
}
```

### 3. iPad Detection (Critical!)

iPadOS reports as "MacIntel" since iOS 13. Must check touch points:

```typescript
private isIOS(): boolean {
  const ua = navigator.userAgent
  const isIOSUA = /iPad|iPhone|iPod/.test(ua)

  // iPadOS pretends to be macOS - check maxTouchPoints
  const isIPadOS = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1

  return isIOSUA || isIPadOS
}
```

### 4. Dynamic GPU Buffer Detection

Query the actual GPU limits from the adapter:

```typescript
private async detectDeviceCapabilities(): Promise<DeviceCapabilities> {
  const nav = navigator as Navigator & { gpu?: GPU }
  let maxBufferSize: number | null = null

  if (nav.gpu) {
    const adapter = await nav.gpu.requestAdapter()
    if (adapter) {
      const limits = adapter.limits
      maxBufferSize = limits.maxBufferSize || limits.maxStorageBufferBindingSize
      console.log('GPU buffer limit:', maxBufferSize / 1024 / 1024, 'MB')
    }
  }

  return { maxBufferSize, /* ... */ }
}
```

**Validate before loading:**

```typescript
private validateModelForDevice(modelId: ModelId): { valid: boolean; error?: string } {
  const modelInfo = AVAILABLE_MODELS[modelId]
  const { platform, maxBufferSize } = this.deviceCapabilities

  if (platform === 'ios') {
    // Reject desktop models on iOS
    if (!modelInfo.iosOnly) {
      return {
        valid: false,
        error: `${modelInfo.name} is too large for iOS. Please select SmolLM2 135M.`
      }
    }

    // Check buffer size
    if (maxBufferSize && modelInfo.maxBufferSizeMB) {
      const bufferNeeded = modelInfo.maxBufferSizeMB * 1024 * 1024
      if (bufferNeeded > maxBufferSize) {
        return {
          valid: false,
          error: `Model requires ${modelInfo.maxBufferSizeMB}MB buffer, device only has ${(maxBufferSize / 1024 / 1024).toFixed(0)}MB.`
        }
      }
    }
  }

  return { valid: true }
}
```

### 5. Cache API for Model Persistence

WebLLM uses the Cache API (not IndexedDB) for model files:

```typescript
// src/features/ai/components/ModelDownloader.tsx
const loadCachedModels = async () => {
  const cacheNames = await caches.keys()
  const found = new Set<ModelId>()

  for (const cacheName of cacheNames) {
    // WebLLM caches have these prefixes
    if (!cacheName.includes('webllm') &&
        !cacheName.includes('mlc') &&
        !cacheName.includes('tvmjs')) {
      continue
    }

    const cache = await caches.open(cacheName)
    const keys = await cache.keys()

    // Match cache URLs to model IDs
    const modelId = identifyModel(cacheName, keys.map(k => k.url))
    if (modelId) found.add(modelId)
  }

  setCachedModels(found)
}
```

### 6. Web Worker Isolation

Run the model in a Web Worker to keep the main thread responsive:

```typescript
// src/features/ai/workers/ai.worker.ts
import * as webllm from '@mlc-ai/web-llm'

let engine: webllm.MLCEngineInterface | null = null

self.onmessage = async (event) => {
  switch (event.data.type) {
    case 'load-model':
      engine = await webllm.CreateMLCEngine(event.data.modelId, {
        initProgressCallback: (report) => {
          self.postMessage({ type: 'load-progress', progress: report })
        }
      })
      break

    case 'generate':
      const response = await engine.chat.completions.create({
        messages: event.data.messages,
        stream: false
      })
      self.postMessage({ type: 'generate-complete', response })
      break
  }
}
```

### 7. Aggressive Error Handling

Detect and handle iOS-specific errors:

```typescript
// src/features/ai/hooks/useWebLLM.ts
catch (error) {
  let errorMessage = 'Failed to load AI model'

  if (error.message.includes('too large for iOS')) {
    errorMessage = error.message + ' iOS devices have strict memory limits (1.5GB WebContent limit).'
  } else if (error.message.includes('Device was lost') || error.message.includes('device lost')) {
    errorMessage = 'GPU ran out of memory. The model exceeded your device limits. Please try a smaller model or restart the app.'
  } else if (error.message.includes('buffer') || error.message.includes('Buffer')) {
    errorMessage = 'Model size exceeds device GPU buffer limits. Try a smaller model (SmolLM2 135M for iOS).'
  }

  setModelError(errorMessage)
}
```

## Common iOS Safari Problems & Solutions

| Problem | Solution |
|---------|----------|
| Model downloads but crashes on load | Model too large - use < 400MB models (SmolLM2 135M) |
| WebGPU not available | Require iOS 18+ / Safari 18+ |
| Works on simulator, fails on device | Real devices have stricter GPU limits - test on real hardware |
| Cache not persisting | Check Cache API quota, not IndexedDB |
| App freezes during inference | Use Web Worker, not main thread |
| iPad not detected as iOS | Check `maxTouchPoints > 1` for iPadOS |
| CSP blocks Hugging Face | Allow `https://huggingface.co` in `connect-src` or use COOP/COEP |

## Model Size Guidelines

### iOS Devices (iPhone/iPad)
- **Minimum**: SmolLM2 135M (360MB, 2-bit) ✅ Works on all iOS 18+ devices
- **Recommended**: SmolLM2 360M (376MB, 4-bit) ✅ Better quality, still safe
- **Advanced**: TinyLlama 1.1B (697MB, 4-bit) ⚠️ May fail on older devices
- **Maximum**: Qwen 2.5 0.5B (945MB, 4-bit) ⚠️ Only newest devices

### Desktop/Android
- **Small**: Qwen 2.5 1.5B (1GB, 4-bit)
- **Medium**: Gemma 2 2B (1.9GB, 4-bit)
- **Large**: Llama 3.2 3B (2.3GB, 4-bit) ⭐ Recommended

## Testing Checklist

Before deploying iOS Safari support:

- [ ] Test on **real iOS device** (not just simulator)
- [ ] Test on both **iPhone and iPad**
- [ ] Verify **iOS version detection** in console
- [ ] Confirm **GPU buffer limits** are logged
- [ ] Test **model download** completes without crash
- [ ] Test **model inference** produces results
- [ ] Verify **cache persistence** after refresh
- [ ] Check **error messages** are helpful
- [ ] Test with **low memory warning** (background apps)
- [ ] Verify **Web Worker** doesn't freeze UI

## Debugging iOS Issues

### Enable Safari Web Inspector

1. **On iOS device**: Settings → Safari → Advanced → Web Inspector (enable)
2. **On Mac**: Safari → Develop → [Your iPhone] → [Your Site]
3. Look for `[WorkerEngine]` logs in console

### Key Logs to Check

```
[WorkerEngine] User Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X)...
[WorkerEngine] Is iOS device: true
[WorkerEngine] Detected iOS version from OS string: 18
[WorkerEngine] GPU limits: { maxBufferSize: "450MB", ... }
[WorkerEngine] ✅ iOS 18+ detected: iPhone 16 Pro
[WorkerEngine] ✅ Model SmolLM2-135M-Instruct validated for iOS
```

### Common Error Messages

**"WebGPU requires iOS 18+"**
- User needs to update iOS
- Check `getIOSSafariVersion()` is detecting correctly

**"Model too large for iOS"**
- User selected desktop model on iOS
- Check `iosOnly` flag in model definition
- Verify UI is filtering models correctly

**"Model requires XMB buffer, device only has YMB"**
- Device has lower GPU limits than expected
- Try smaller model (SmolLM2 135M)
- May be older device or under memory pressure

**"GPU ran out of memory"**
- Model loaded but inference failed
- iOS killed the WebContent process (1.5GB limit)
- Need smaller model

## File Reference

Key files for iOS Safari support:

```
src/features/ai/
├── services/webllm/
│   ├── engine.ts              # Model definitions with iOS flags
│   └── workerEngine.ts        # Device detection & validation
├── components/
│   └── ModelDownloader.tsx    # Cache detection & platform UI
├── hooks/
│   └── useWebLLM.ts          # Error handling
└── workers/
    └── ai.worker.ts          # Web Worker isolation
```

## Resources

- [WebGPU Browser Support](https://caniuse.com/webgpu) - iOS 18+ Safari only
- [WebLLM Documentation](https://webllm.mlc.ai/) - Official MLC WebLLM docs
- [iOS Safari Limits](https://webkit.org/blog/8943/on-iphone-and-ipad-webgpu/) - WebKit blog
- [Cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache) - Model storage

## Performance Expectations

### SmolLM2 135M on iPhone 16 Pro
- **Download**: ~30-60 seconds (360MB)
- **Load**: ~5-10 seconds
- **Inference**: 2-3 tokens/second
- **Memory**: ~500MB WebContent usage

### TinyLlama 1.1B on iPhone 15 Pro
- **Download**: ~2-3 minutes (697MB)
- **Load**: ~10-15 seconds
- **Inference**: 1-2 tokens/second
- **Memory**: ~900MB WebContent usage

### Desktop Llama 3.2 3B on Chrome
- **Download**: ~5-7 minutes (2.3GB)
- **Load**: ~15-20 seconds
- **Inference**: 3-7 tokens/second
- **Memory**: ~3GB GPU usage

---

**Last Updated**: January 2026
**iOS Minimum**: iOS 18.0 / Safari 18.0
**Recommended Model**: SmolLM2 135M (360MB, 2-bit)
