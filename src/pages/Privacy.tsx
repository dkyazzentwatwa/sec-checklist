import { Lock } from 'lucide-react'

export function Privacy() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Lock className="h-8 w-8" />
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground">
          Your privacy is fundamental to our mission.
        </p>

        <h2>What We DON'T Collect</h2>
        <ul>
          <li>No user accounts or registration</li>
          <li>No analytics or tracking</li>
          <li>No server-side user data storage</li>
          <li>No third-party scripts or cookies</li>
          <li>No IP address logging</li>
          <li>No usage data collection</li>
        </ul>

        <h2>What Stays On Your Device</h2>
        <p>
          All your data is stored locally in your browser using IndexedDB:
        </p>
        <ul>
          <li>Checklist progress and notes</li>
          <li>Saved resources and bookmarks</li>
          <li>Emergency contacts you add</li>
          <li>AI conversation history</li>
          <li>Language preferences</li>
        </ul>

        <h2>AI Privacy</h2>
        <p>
          Our AI features run entirely in your browser using WebLLM and Transformers.js.
          AI models are downloaded to your device and run locally. Your conversations
          with the AI assistant never leave your device.
        </p>

        <h2>Data Control</h2>
        <p>
          You have complete control over your data:
        </p>
        <ul>
          <li>Export your data at any time</li>
          <li>Clear all data with one click</li>
          <li>No data remains after uninstalling</li>
        </ul>

        <h2>Network Requests</h2>
        <p>
          Rights Shield makes network requests only for:
        </p>
        <ul>
          <li>Initial app load</li>
          <li>Content updates (when online)</li>
          <li>Downloading AI models (optional, user-initiated)</li>
        </ul>

        <h2>Open Source</h2>
        <p>
          Rights Shield is open source (AGPLv3). You can audit the code to verify
          our privacy claims.
        </p>

        <h2>Questions?</h2>
        <p>
          This is a community project. For questions or concerns, please open an issue
          on our GitHub repository.
        </p>

        <p className="text-sm text-muted-foreground italic">
          Last updated: January 2026
        </p>
      </div>
    </div>
  )
}
