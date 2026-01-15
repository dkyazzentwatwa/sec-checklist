# Rights Shield - Implementation Roadmap

**Status**: Phases 1-6 Complete | Phase 7 In Progress
**Last Updated**: 2026-01-13

## ✅ Completed Phases

### Phase 1: Foundation (COMPLETE)
- ✅ Vite + React + TypeScript setup
- ✅ PWA configuration with service worker
- ✅ IndexedDB (Dexie) schema
- ✅ React Router setup
- ✅ Tailwind CSS + shadcn/ui
- ✅ i18next (English/Spanish)
- ✅ App shell (header, nav, footer)
- ✅ Offline detection

### Phase 2: Digital Security Module (COMPLETE)
- ✅ 8 security checklists implemented
- ✅ Progress tracking + print support

### Phase 3: Immigration Rights Module (COMPLETE)
- ✅ Rights scenarios, red card, hotlines
- ✅ Emergency plan + scenario UI

### Phase 4: AI Infrastructure (COMPLETE)
- ✅ WebLLM v0.2.80 integration
- ✅ Web Worker for AI isolation (ai.worker.ts)
- ✅ Model downloader UI with progress
- ✅ Chat interface with streaming
- ✅ System prompts for 4 assistant types
- ✅ Zustand store for AI state
- ✅ React hooks (useWebLLM)
- ✅ Model management (view/delete cached models)
- ✅ Markdown rendering in chat
- ✅ Copy functionality on messages

### Phase 5: Advanced AI Features (COMPLETE)
- ✅ Document generator UI
- ✅ Semantic search with Transformers.js

### Phase 6: Activism & AI Defense Modules (COMPLETE)
- ✅ Protest rights guide + organizing toolkit
- ✅ AI threat overview + countermeasures + updates

---

## ✅ Phase 2: Digital Security Module (COMPLETE)

**Status**: 8/8 checklists complete

### ✅ Existing Checklists
Located in `src/features/security/data/checklists/`:
- `essentials.json` - Core security practices (12 items)
- `protest.json` - Protest-specific digital prep
- `signal.json` - Signal messenger security guide
- `travel.json` - Travel & flight protocols
- `secondary-phone.json` - Secondary/burner phone setup
- `spyware.json` - Spyware and stalkerware detection
- `emergency.json` - Emergency digital safety planning
- `organizer.json` - Organizer security toolkit

### ✅ Checklist Specs (Implemented)

#### 1. Secondary Phone Setup (`secondary-phone.json`)
```json
{
  "id": "secondary-phone",
  "category": "secondary-phone",
  "version": "1.0.0",
  "lastUpdated": "2026-01-13",
  "content": {
    "title": {
      "en": "Secondary/Burner Phone Setup",
      "es": "Configuración de Teléfono Secundario"
    },
    "description": {
      "en": "How to set up and use a secondary phone for high-risk activities.",
      "es": "Cómo configurar y usar un teléfono secundario para actividades de alto riesgo."
    },
    "items": [
      {
        "id": "phone-selection",
        "title": {
          "en": "Choose the right phone",
          "es": "Elige el teléfono correcto"
        },
        "description": {
          "en": "Get a basic smartphone (used Android or cheap prepaid iPhone). Avoid flagship models.",
          "es": "Obtén un smartphone básico (Android usado o iPhone prepago económico). Evita modelos de gama alta."
        },
        "priority": "essential",
        "steps": [
          {"en": "Buy phone with cash (no credit card trail)", "es": "Compra el teléfono con efectivo (sin rastro de tarjeta)"},
          {"en": "Consider used phones from resellers", "es": "Considera teléfonos usados de revendedores"},
          {"en": "Avoid using your regular phone retailer", "es": "Evita usar tu tienda de teléfonos habitual"}
        ]
      },
      {
        "id": "sim-card",
        "title": {
          "en": "Get prepaid SIM anonymously",
          "es": "Obtén una SIM prepaga de forma anónima"
        },
        "description": {
          "en": "Use a prepaid SIM card purchased with cash. In some countries, SIM registration is required by law.",
          "es": "Usa una tarjeta SIM prepaga comprada con efectivo. En algunos países, el registro de SIM es requerido por ley."
        },
        "priority": "essential",
        "steps": [
          {"en": "Buy prepaid SIM with cash from convenience store", "es": "Compra SIM prepaga con efectivo en tienda de conveniencia"},
          {"en": "Check if your country requires ID for SIM registration", "es": "Verifica si tu país requiere identificación para registro de SIM"},
          {"en": "Consider using public WiFi instead of cellular if anonymity is critical", "es": "Considera usar WiFi público en lugar de celular si el anonimato es crítico"}
        ]
      },
      {
        "id": "setup-clean",
        "title": {
          "en": "Set up phone clean",
          "es": "Configura el teléfono limpio"
        },
        "description": {
          "en": "Don't use your regular accounts. Create new email/accounts if needed.",
          "es": "No uses tus cuentas regulares. Crea nuevos correos/cuentas si es necesario."
        },
        "priority": "essential",
        "steps": [
          {"en": "Factory reset the phone first", "es": "Restablece el teléfono a valores de fábrica primero"},
          {"en": "Create new email account (not linked to you)", "es": "Crea una nueva cuenta de correo (no vinculada a ti)"},
          {"en": "Don't sign into Google/Apple with your real account", "es": "No inicies sesión en Google/Apple con tu cuenta real"},
          {"en": "Install only essential apps", "es": "Instala solo apps esenciales"}
        ]
      },
      {
        "id": "separation",
        "title": {
          "en": "Keep phones separated",
          "es": "Mantén los teléfonos separados"
        },
        "description": {
          "en": "Never carry both phones together. They can be linked by location correlation.",
          "es": "Nunca lleves ambos teléfonos juntos. Pueden vincularse por correlación de ubicación."
        },
        "priority": "essential",
        "steps": [
          {"en": "Don't turn on secondary phone at home or work", "es": "No enciendas el teléfono secundario en casa o trabajo"},
          {"en": "Turn off primary phone before turning on secondary", "es": "Apaga el teléfono principal antes de encender el secundario"},
          {"en": "Never connect both to same WiFi network", "es": "Nunca conectes ambos a la misma red WiFi"}
        ]
      },
      {
        "id": "usage",
        "title": {
          "en": "Use it correctly",
          "es": "Úsalo correctamente"
        },
        "description": {
          "en": "Only use secondary phone for specific high-risk activities. The more you use it, the more data points for correlation.",
          "es": "Usa el teléfono secundario solo para actividades específicas de alto riesgo. Cuanto más lo uses, más puntos de datos para correlación."
        },
        "priority": "recommended",
        "steps": [
          {"en": "Only communicate with other secondary/burner numbers", "es": "Comunícate solo con otros números secundarios/desechables"},
          {"en": "Disable all location services", "es": "Desactiva todos los servicios de ubicación"},
          {"en": "Use Signal or encrypted messaging only", "es": "Usa solo Signal o mensajería cifrada"}
        ]
      },
      {
        "id": "disposal",
        "title": {
          "en": "Dispose of properly",
          "es": "Desecha adecuadamente"
        },
        "description": {
          "en": "When you're done, destroy SIM and factory reset phone before disposal.",
          "es": "Cuando termines, destruye la SIM y restablece el teléfono antes de desecharlo."
        },
        "priority": "recommended",
        "steps": [
          {"en": "Factory reset the phone", "es": "Restablece el teléfono a valores de fábrica"},
          {"en": "Cut up and destroy SIM card", "es": "Corta y destruye la tarjeta SIM"},
          {"en": "Dispose of phone and SIM separately", "es": "Desecha el teléfono y la SIM por separado"}
        ]
      }
    ]
  }
}
```

#### 2. Spyware Detection (`spyware.json`)
```json
{
  "id": "spyware",
  "category": "spyware",
  "version": "1.0.0",
  "lastUpdated": "2026-01-13",
  "content": {
    "title": {
      "en": "Spyware & Stalkerware Detection",
      "es": "Detección de Spyware y Stalkerware"
    },
    "description": {
      "en": "How to spot, respond to, and recover from potential spyware on your devices.",
      "es": "Cómo identificar, responder y recuperarte de posible spyware en tus dispositivos."
    },
    "items": [
      {
        "id": "warning-signs",
        "title": {
          "en": "Watch for warning signs",
          "es": "Busca señales de advertencia"
        },
        "description": {
          "en": "Spyware often shows up as unusual battery drain, overheating, data usage, or settings changes.",
          "es": "El spyware suele aparecer como consumo inusual de batería, sobrecalentamiento, uso de datos o cambios de configuración."
        },
        "priority": "essential",
        "effort": "low",
        "impact": "high",
        "steps": [
          {"en": "Review battery and data usage for unfamiliar apps", "es": "Revisa el uso de batería y datos de apps desconocidas"},
          {"en": "Notice unexpected restarts, lag, or overheating", "es": "Nota reinicios inesperados, lentitud o sobrecalentamiento"},
          {"en": "Check for new admin or accessibility permissions", "es": "Revisa nuevos permisos de administrador o accesibilidad"}
        ],
        "tags": ["spyware", "detection", "device-health"]
      },
      {
        "id": "audit-apps",
        "title": {
          "en": "Audit installed apps",
          "es": "Audita las apps instaladas"
        },
        "description": {
          "en": "Stalkerware often hides as generic or system-looking apps. Review everything installed.",
          "es": "El stalkerware suele ocultarse como apps genéricas o del sistema. Revisa todo lo instalado."
        },
        "priority": "essential",
        "effort": "medium",
        "impact": "high",
        "steps": [
          {"en": "Sort apps by install date and review each entry", "es": "Ordena las apps por fecha de instalación y revisa cada entrada"},
          {"en": "Remove apps you did not install or do not recognize", "es": "Elimina apps que no instalaste o no reconoces"},
          {"en": "Search the app name online if you are unsure", "es": "Busca el nombre de la app en línea si tienes dudas"}
        ],
        "tags": ["spyware", "apps", "audit"]
      },
      {
        "id": "permissions-review",
        "title": {
          "en": "Review sensitive permissions",
          "es": "Revisa permisos sensibles"
        },
        "description": {
          "en": "Limit access to location, microphone, camera, notifications, and device admin settings.",
          "es": "Limita el acceso a ubicación, micrófono, cámara, notificaciones y ajustes de administrador."
        },
        "priority": "essential",
        "effort": "medium",
        "impact": "high",
        "steps": [
          {"en": "Check privacy settings for location, mic, and camera access", "es": "Revisa la privacidad de acceso a ubicación, micrófono y cámara"},
          {"en": "Revoke Accessibility, Device Admin, or VPN access for untrusted apps", "es": "Revoca acceso de Accesibilidad, Administrador del dispositivo o VPN para apps no confiables"},
          {"en": "Disable installs from unknown sources", "es": "Desactiva instalaciones desde fuentes desconocidas"}
        ],
        "tags": ["permissions", "privacy", "hardening"]
      },
      {
        "id": "updates-scans",
        "title": {
          "en": "Update and scan your device",
          "es": "Actualiza y escanea tu dispositivo"
        },
        "description": {
          "en": "Security updates fix known vulnerabilities and help remove common spyware.",
          "es": "Las actualizaciones de seguridad corrigen vulnerabilidades conocidas y ayudan a eliminar spyware común."
        },
        "priority": "recommended",
        "effort": "low",
        "impact": "medium",
        "steps": [
          {"en": "Install the latest OS security updates", "es": "Instala las últimas actualizaciones de seguridad del sistema"},
          {"en": "Update all apps from official app stores", "es": "Actualiza todas las apps desde tiendas oficiales"},
          {"en": "Run Google Play Protect or a trusted security scan", "es": "Ejecuta Google Play Protect o un escaneo de seguridad confiable"}
        ],
        "tags": ["updates", "maintenance", "security"]
      },
      {
        "id": "reset-response",
        "title": {
          "en": "Respond to suspected compromise",
          "es": "Responde ante sospecha de compromiso"
        },
        "description": {
          "en": "If you suspect spyware, focus on safety first and reset from a clean state.",
          "es": "Si sospechas de spyware, prioriza la seguridad y restablece desde un estado limpio."
        },
        "priority": "essential",
        "effort": "high",
        "impact": "high",
        "steps": [
          {"en": "Change critical passwords from a trusted device", "es": "Cambia contraseñas críticas desde un dispositivo confiable"},
          {"en": "Back up only essential files (photos, contacts)", "es": "Respalda solo archivos esenciales (fotos, contactos)"},
          {"en": "Factory reset and reinstall apps from official sources", "es": "Restablece de fábrica e instala apps desde fuentes oficiales"},
          {"en": "Consider a new SIM or phone if targeting continues", "es": "Considera una nueva SIM o teléfono si el acoso continúa"}
        ],
        "tags": ["recovery", "reset", "response"]
      },
      {
        "id": "support-resources",
        "title": {
          "en": "Get specialized support",
          "es": "Obtén apoyo especializado"
        },
        "description": {
          "en": "Tech safety organizations can help assess risk and plan next steps.",
          "es": "Organizaciones de seguridad tecnológica pueden ayudar a evaluar riesgos y planificar próximos pasos."
        },
        "priority": "recommended",
        "effort": "low",
        "impact": "medium",
        "steps": [
          {"en": "Contact the Coalition Against Stalkerware or local tech safety groups", "es": "Contacta a la Coalición Contra el Stalkerware o grupos locales de seguridad tecnológica"},
          {"en": "Document suspicious behavior and timeline", "es": "Documenta comportamientos sospechosos y cronología"},
          {"en": "Ask a trusted person to help review your device", "es": "Pide ayuda a una persona de confianza para revisar tu dispositivo"}
        ],
        "resources": [
          {
            "url": "https://stopstalkerware.org/resources/",
            "title": {"en": "Coalition Against Stalkerware", "es": "Coalición Contra el Stalkerware"}
          },
          {
            "url": "https://ssd.eff.org/",
            "title": {"en": "EFF Surveillance Self-Defense", "es": "EFF Autodefensa ante la Vigilancia"}
          }
        ],
        "tags": ["support", "resources", "safety"]
      }
    ]
  }
}
```

#### 3. Emergency Planning (`emergency.json`)
```json
{
  "id": "emergency",
  "category": "emergency",
  "version": "1.0.0",
  "lastUpdated": "2026-01-13",
  "content": {
    "title": {
      "en": "Emergency Digital Safety Plan",
      "es": "Plan de Seguridad Digital de Emergencia"
    },
    "description": {
      "en": "Prepare your contacts, devices, and communications before a crisis.",
      "es": "Prepara tus contactos, dispositivos y comunicaciones antes de una crisis."
    },
    "items": [
      {
        "id": "emergency-contacts",
        "title": {
          "en": "Create an emergency contact list",
          "es": "Crea una lista de contactos de emergencia"
        },
        "description": {
          "en": "Keep phone numbers for lawyers, hotlines, and trusted people in multiple formats.",
          "es": "Guarda números de abogados, líneas de ayuda y personas de confianza en varios formatos."
        },
        "priority": "essential",
        "effort": "low",
        "impact": "high",
        "steps": [
          {"en": "Write down key numbers on paper", "es": "Anota números clave en papel"},
          {"en": "Save contacts in a secure offline note", "es": "Guarda contactos en una nota segura sin conexión"},
          {"en": "Share the list with a trusted person", "es": "Comparte la lista con una persona de confianza"}
        ],
        "tags": ["contacts", "preparedness", "safety"]
      },
      {
        "id": "device-lockdown",
        "title": {
          "en": "Set up device lockdown tools",
          "es": "Configura herramientas de bloqueo"
        },
        "description": {
          "en": "Prepare remote wipe, strong passcodes, and account recovery before you need them.",
          "es": "Prepara borrado remoto, códigos fuertes y recuperación de cuentas antes de necesitarlos."
        },
        "priority": "essential",
        "effort": "medium",
        "impact": "high",
        "steps": [
          {"en": "Enable Find My (Apple) or Find My Device (Google)", "es": "Activa Buscar (Apple) o Encontrar mi dispositivo (Google)"},
          {"en": "Use a strong passcode and disable biometrics for high-risk moments", "es": "Usa un código fuerte y desactiva biometría en momentos de alto riesgo"},
          {"en": "Store account recovery codes in a secure location", "es": "Guarda códigos de recuperación en un lugar seguro"}
        ],
        "tags": ["lockdown", "remote-wipe", "accounts"]
      },
      {
        "id": "legal-prep",
        "title": {
          "en": "Prepare legal support",
          "es": "Prepara apoyo legal"
        },
        "description": {
          "en": "Know your rights, carry key information, and plan what to say if contacted by authorities.",
          "es": "Conoce tus derechos, lleva información clave y planifica qué decir si te contactan autoridades."
        },
        "priority": "essential",
        "effort": "low",
        "impact": "high",
        "steps": [
          {"en": "Memorize your lawyer or legal hotline number", "es": "Memoriza el número de tu abogado o línea legal"},
          {"en": "Carry a Know Your Rights card", "es": "Lleva una tarjeta de Conoce Tus Derechos"},
          {"en": "Agree on what to say and what not to say", "es": "Acuerda qué decir y qué no decir"}
        ],
        "resources": [
          {
            "url": "https://www.aclu.org/know-your-rights",
            "title": {"en": "ACLU Know Your Rights", "es": "ACLU Conoce Tus Derechos"}
          }
        ],
        "tags": ["legal", "rights", "preparedness"]
      },
      {
        "id": "check-in-plan",
        "title": {
          "en": "Set a check-in and alert plan",
          "es": "Define un plan de reporte y alerta"
        },
        "description": {
          "en": "Agree on check-in times and escalation steps if someone goes missing or is detained.",
          "es": "Acuerda horarios de reporte y pasos de escalamiento si alguien desaparece o es detenido."
        },
        "priority": "recommended",
        "effort": "medium",
        "impact": "medium",
        "steps": [
          {"en": "Set a check-in time before and after activities", "es": "Define un horario de reporte antes y después de actividades"},
          {"en": "Create a code word for emergencies", "es": "Crea una palabra clave para emergencias"},
          {"en": "Decide who contacts legal support if needed", "es": "Decide quién contacta apoyo legal si es necesario"}
        ],
        "tags": ["check-in", "alerts", "community"]
      },
      {
        "id": "backup-communications",
        "title": {
          "en": "Plan backup communications",
          "es": "Planifica comunicaciones de respaldo"
        },
        "description": {
          "en": "Have alternate ways to communicate and stay powered if networks go down.",
          "es": "Ten formas alternas de comunicarte y mantener energía si fallan las redes."
        },
        "priority": "recommended",
        "effort": "medium",
        "impact": "medium",
        "steps": [
          {"en": "Install a trusted encrypted messenger (Signal)", "es": "Instala un mensajero cifrado confiable (Signal)"},
          {"en": "Carry a power bank and charging cables", "es": "Lleva una batería externa y cables"},
          {"en": "Save offline maps and key addresses", "es": "Guarda mapas sin conexión y direcciones clave"}
        ],
        "tags": ["communications", "backup", "power"]
      }
    ]
  }
}
```

#### 4. Organizer Resources (`organizer.json`)
```json
{
  "id": "organizer",
  "category": "organizer",
  "version": "1.0.0",
  "lastUpdated": "2026-01-13",
  "content": {
    "title": {
      "en": "Organizer Security Toolkit",
      "es": "Kit de Seguridad para Organizadores"
    },
    "description": {
      "en": "Secure communication and coordination practices for organizers and groups.",
      "es": "Prácticas de comunicación y coordinación seguras para organizadores y grupos."
    },
    "items": [
      {
        "id": "secure-group-chats",
        "title": {
          "en": "Use secure group messaging",
          "es": "Usa mensajería grupal segura"
        },
        "description": {
          "en": "Use end-to-end encrypted group chats and set clear group norms.",
          "es": "Usa chats grupales con cifrado de extremo a extremo y define normas claras."
        },
        "priority": "essential",
        "effort": "low",
        "impact": "high",
        "steps": [
          {"en": "Use Signal groups for sensitive coordination", "es": "Usa grupos de Signal para coordinación sensible"},
          {"en": "Enable disappearing messages for high-risk topics", "es": "Activa mensajes que desaparecen para temas de alto riesgo"},
          {"en": "Limit who can add new members", "es": "Limita quién puede añadir nuevos miembros"}
        ],
        "resources": [
          {
            "url": "https://signal.org/",
            "title": {"en": "Signal Private Messenger", "es": "Signal Mensajero Privado"}
          }
        ],
        "tags": ["messaging", "organizing", "signal"]
      },
      {
        "id": "membership-controls",
        "title": {
          "en": "Control membership and access",
          "es": "Controla membresía y acceso"
        },
        "description": {
          "en": "Verify new members and limit sensitive information to need-to-know groups.",
          "es": "Verifica nuevos miembros y limita información sensible a grupos con necesidad de saber."
        },
        "priority": "essential",
        "effort": "medium",
        "impact": "high",
        "steps": [
          {"en": "Use trusted referrals or in-person verification", "es": "Usa referencias confiables o verificación en persona"},
          {"en": "Assign admin roles intentionally and rotate invite links", "es": "Asigna roles de admin con intención y rota enlaces de invitación"},
          {"en": "Remove inactive members after actions", "es": "Elimina miembros inactivos después de acciones"}
        ],
        "tags": ["access", "roles", "opsec"]
      },
      {
        "id": "shared-docs",
        "title": {
          "en": "Share documents securely",
          "es": "Comparte documentos de forma segura"
        },
        "description": {
          "en": "Use privacy-first tools for shared notes, rosters, and plans.",
          "es": "Usa herramientas centradas en privacidad para notas, listas y planes compartidos."
        },
        "priority": "recommended",
        "effort": "medium",
        "impact": "medium",
        "steps": [
          {"en": "Use CryptPad or OnionShare for sensitive files", "es": "Usa CryptPad u OnionShare para archivos sensibles"},
          {"en": "Protect links with passwords and expiration dates", "es": "Protege enlaces con contraseñas y fechas de expiración"},
          {"en": "Avoid storing full rosters in public cloud drives", "es": "Evita guardar listas completas en nubes públicas"}
        ],
        "resources": [
          {
            "url": "https://cryptpad.fr/",
            "title": {"en": "CryptPad Encrypted Collaboration", "es": "CryptPad Colaboración Cifrada"}
          },
          {
            "url": "https://onionshare.org/",
            "title": {"en": "OnionShare", "es": "OnionShare"}
          }
        ],
        "tags": ["documents", "sharing", "privacy"]
      },
      {
        "id": "need-to-know",
        "title": {
          "en": "Coordinate on a need-to-know basis",
          "es": "Coordina con necesidad de saber"
        },
        "description": {
          "en": "Share action details only with people who need them and separate channels by sensitivity.",
          "es": "Comparte detalles de acciones solo con quienes los necesitan y separa canales por sensibilidad."
        },
        "priority": "recommended",
        "effort": "low",
        "impact": "high",
        "steps": [
          {"en": "Keep logistics and public messaging in separate channels", "es": "Separa logística y mensajes públicos en canales distintos"},
          {"en": "Use code names or neutral language for sensitive plans", "es": "Usa nombres clave o lenguaje neutro para planes sensibles"},
          {"en": "Avoid sharing full plans in large group chats", "es": "Evita compartir planes completos en chats grandes"}
        ],
        "tags": ["coordination", "opsec", "privacy"]
      },
      {
        "id": "protect-member-data",
        "title": {
          "en": "Protect member information",
          "es": "Protege la información de integrantes"
        },
        "description": {
          "en": "Collect the minimum data needed and store it safely with consent.",
          "es": "Recolecta la mínima información necesaria y guárdala de forma segura con consentimiento."
        },
        "priority": "essential",
        "effort": "medium",
        "impact": "high",
        "steps": [
          {"en": "Only collect contact info you actually need", "es": "Solo recolecta información de contacto necesaria"},
          {"en": "Store sensitive lists in encrypted storage with limited access", "es": "Guarda listas sensibles en almacenamiento cifrado con acceso limitado"},
          {"en": "Delete data when it is no longer needed", "es": "Elimina datos cuando ya no sean necesarios"}
        ],
        "tags": ["data", "privacy", "consent"]
      }
    ]
  }
}
```

---

## ✅ Phase 3: Immigration Rights Module (COMPLETE)

**Status**: Completed - scenarios, rights cards, hotlines, and UI components implemented.
**Location**: `src/features/immigration/`

### File Structure (Implemented)
```
src/features/immigration/
├── data/
│   ├── scenarios.json          # All 4 scenarios with rights info
│   ├── rights-cards.json       # Red card templates
│   └── hotlines.json           # Emergency numbers by region
├── components/
│   ├── ScenarioSelector.tsx    # Interactive scenario chooser
│   ├── ScenarioDetail.tsx      # Show rights for specific scenario
│   ├── RedCardGenerator.tsx    # Generate printable red card
│   ├── HotlinesList.tsx        # Emergency contacts
│   └── EmergencyPlan.tsx       # Preparedness planner
└── index.ts
```

### 1. Scenarios Data (`scenarios.json`)

Research sources:
- National Immigrant Justice Center (NIJC)
- Immigrant Legal Resource Center (ILRC)
- Immigrant Defense Project (IDP)
- ACLU Know Your Rights guides

```json
{
  "scenarios": {
    "home": {
      "id": "home",
      "title": {
        "en": "ICE at Your Home",
        "es": "ICE en Tu Casa"
      },
      "description": {
        "en": "What to do when immigration agents come to your door",
        "es": "Qué hacer cuando agentes de inmigración vienen a tu puerta"
      },
      "coreRights": [
        {
          "right": {
            "en": "You do not have to open the door",
            "es": "No tienes que abrir la puerta"
          },
          "explanation": {
            "en": "Unless agents have a warrant signed by a judge, you are not required to open your door or let them in.",
            "es": "A menos que los agentes tengan una orden firmada por un juez, no estás obligado a abrir la puerta o dejarlos entrar."
          }
        },
        {
          "right": {
            "en": "Ask to see the warrant under the door",
            "es": "Pide ver la orden por debajo de la puerta"
          },
          "explanation": {
            "en": "If they claim to have a warrant, ask them to slide it under the door. Check that it's signed by a judge (not ICE) and has the correct address.",
            "es": "Si dicen tener una orden, pide que la deslicen por debajo de la puerta. Verifica que esté firmada por un juez (no ICE) y tenga la dirección correcta."
          }
        },
        {
          "right": {
            "en": "You have the right to remain silent",
            "es": "Tienes derecho a permanecer en silencio"
          },
          "explanation": {
            "en": "You do not have to answer questions about where you were born, your immigration status, or anything else. Say 'I am exercising my right to remain silent.'",
            "es": "No tienes que responder preguntas sobre dónde naciste, tu estatus migratorio, o cualquier otra cosa. Di 'Estoy ejerciendo mi derecho a permanecer en silencio.'"
          }
        },
        {
          "right": {
            "en": "You have the right to a lawyer",
            "es": "Tienes derecho a un abogado"
          },
          "explanation": {
            "en": "Say 'I want to speak to a lawyer.' Do not sign anything without talking to a lawyer first.",
            "es": "Di 'Quiero hablar con un abogado.' No firmes nada sin hablar primero con un abogado."
          }
        }
      ],
      "steps": [
        {
          "step": {
            "en": "Stay calm and do not run",
            "es": "Mantén la calma y no corras"
          }
        },
        {
          "step": {
            "en": "Ask who they are and why they are there",
            "es": "Pregunta quiénes son y por qué están ahí"
          }
        },
        {
          "step": {
            "en": "If they say they have a warrant, ask them to slide it under the door",
            "es": "Si dicen tener una orden, pídeles que la deslicen por debajo de la puerta"
          }
        },
        {
          "step": {
            "en": "Check the warrant carefully - it must be signed by a judge and have correct address",
            "es": "Revisa la orden cuidadosamente - debe estar firmada por un juez y tener la dirección correcta"
          }
        },
        {
          "step": {
            "en": "If there's no valid warrant, you do not have to open the door",
            "es": "Si no hay una orden válida, no tienes que abrir la puerta"
          }
        },
        {
          "step": {
            "en": "Say 'I do not consent to you entering my home'",
            "es": "Di 'No consiento que entren a mi casa'"
          }
        },
        {
          "step": {
            "en": "Do not lie or show fake documents - remain silent instead",
            "es": "No mientas ni muestres documentos falsos - permanece en silencio"
          }
        },
        {
          "step": {
            "en": "Call your lawyer or emergency hotline immediately",
            "es": "Llama a tu abogado o línea de emergencia inmediatamente"
          }
        }
      ],
      "warrantTypes": {
        "administrative": {
          "en": "Administrative ICE Warrant (Form I-200 or I-205) - NOT valid to enter home without consent",
          "es": "Orden Administrativa de ICE (Formulario I-200 o I-205) - NO válida para entrar sin consentimiento"
        },
        "judicial": {
          "en": "Judicial Warrant - Signed by judge, specific address - ONLY type that allows entry",
          "es": "Orden Judicial - Firmada por juez, dirección específica - ÚNICO tipo que permite entrada"
        }
      },
      "warnings": [
        {
          "en": "Never lie or show fake documents",
          "es": "Nunca mientas ni muestres documentos falsos"
        },
        {
          "en": "Do not run or resist physically",
          "es": "No corras ni resistas físicamente"
        },
        {
          "en": "Anything you say can be used against you",
          "es": "Cualquier cosa que digas puede usarse en tu contra"
        }
      ]
    },
    "workplace": {
      "id": "workplace",
      "title": {
        "en": "Workplace Raid",
        "es": "Redada en el Lugar de Trabajo"
      },
      "description": {
        "en": "Your rights if ICE comes to your workplace",
        "es": "Tus derechos si ICE viene a tu lugar de trabajo"
      },
      "coreRights": [
        {
          "right": {
            "en": "Ask if you are free to leave",
            "es": "Pregunta si eres libre de irte"
          },
          "explanation": {
            "en": "Say 'Am I free to leave?' If they say yes, calmly walk away.",
            "es": "Di '¿Soy libre de irme?' Si dicen que sí, aléjate con calma."
          }
        },
        {
          "right": {
            "en": "You do not have to answer questions",
            "es": "No tienes que responder preguntas"
          },
          "explanation": {
            "en": "You have the right to remain silent. Do not discuss your immigration status or where you were born.",
            "es": "Tienes derecho a permanecer en silencio. No discutas tu estatus migratorio o dónde naciste."
          }
        },
        {
          "right": {
            "en": "You do not have to show documents",
            "es": "No tienes que mostrar documentos"
          },
          "explanation": {
            "en": "You are not required to show ID or immigration papers. Never show fake documents.",
            "es": "No estás obligado a mostrar identificación o papeles de inmigración. Nunca muestres documentos falsos."
          }
        },
        {
          "right": {
            "en": "You have the right to a lawyer",
            "es": "Tienes derecho a un abogado"
          },
          "explanation": {
            "en": "Say 'I want to speak to a lawyer' and give them your lawyer's number if you have one.",
            "es": "Di 'Quiero hablar con un abogado' y dales el número de tu abogado si tienes uno."
          }
        }
      ],
      "steps": [
        {
          "step": {
            "en": "Stay calm and do not run",
            "es": "Mantén la calma y no corras"
          }
        },
        {
          "step": {
            "en": "Ask 'Am I free to leave?'",
            "es": "Pregunta '¿Soy libre de irme?'"
          }
        },
        {
          "step": {
            "en": "If yes, leave calmly without answering questions",
            "es": "Si sí, vete con calma sin responder preguntas"
          }
        },
        {
          "step": {
            "en": "If no, say 'I am exercising my right to remain silent'",
            "es": "Si no, di 'Estoy ejerciendo mi derecho a permanecer en silencio'"
          }
        },
        {
          "step": {
            "en": "Do not sign anything",
            "es": "No firmes nada"
          }
        },
        {
          "step": {
            "en": "Try to remember agent names and badge numbers",
            "es": "Intenta recordar nombres de agentes y números de placa"
          }
        },
        {
          "step": {
            "en": "Contact lawyer or hotline as soon as possible",
            "es": "Contacta a abogado o línea de ayuda lo antes posible"
          }
        }
      ]
    },
    "public": {
      "id": "public",
      "title": {
        "en": "Public or Traffic Stop",
        "es": "Detención Pública o de Tráfico"
      },
      "coreRights": [
        {
          "right": {
            "en": "You have the right to remain silent",
            "es": "Tienes derecho a permanecer en silencio"
          }
        },
        {
          "right": {
            "en": "Ask if you are free to leave",
            "es": "Pregunta si eres libre de irte"
          }
        },
        {
          "right": {
            "en": "In most states, you do not have to show ID unless driving",
            "es": "En la mayoría de estados, no tienes que mostrar identificación a menos que estés conduciendo"
          }
        }
      ]
    },
    "courthouse": {
      "id": "courthouse",
      "title": {
        "en": "Courthouse Encounter",
        "es": "Encuentro en la Corte"
      },
      "description": {
        "en": "ICE may wait outside courthouses. Know your options.",
        "es": "ICE puede esperar afuera de las cortes. Conoce tus opciones."
      },
      "coreRights": [
        {
          "right": {
            "en": "You still have the right to remain silent",
            "es": "Aún tienes derecho a permanecer en silencio"
          }
        },
        {
          "right": {
            "en": "Ask for your lawyer",
            "es": "Pide tu abogado"
          }
        }
      ],
      "tips": [
        {
          "en": "Bring only necessary items (no documents)",
          "es": "Lleva solo artículos necesarios (sin documentos)"
        },
        {
          "en": "Have emergency plan and contacts ready",
          "es": "Ten plan de emergencia y contactos listos"
        },
        {
          "en": "Consider virtual court appearances if available",
          "es": "Considera comparecencias virtuales si están disponibles"
        }
      ]
    }
  }
}
```

### 2. Red Card Generator Component

```typescript
// src/features/immigration/components/RedCardGenerator.tsx

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Download, Printer } from 'lucide-react'

const RED_CARD_TEMPLATE = {
  en: `I DO NOT WISH TO SPEAK WITH YOU, ANSWER YOUR QUESTIONS, OR SIGN OR HAND YOU ANY DOCUMENTS BASED ON MY 5TH AMENDMENT RIGHTS UNDER THE UNITED STATES CONSTITUTION.

I DO NOT GIVE YOU PERMISSION TO ENTER MY HOME BASED ON MY 4TH AMENDMENT RIGHTS UNDER THE UNITED STATES CONSTITUTION UNLESS YOU HAVE A WARRANT TO ENTER, SIGNED BY A JUDGE OR MAGISTRATE WITH MY NAME ON IT THAT YOU SLIDE UNDER THE DOOR.

I AM EXERCISING MY RIGHT TO REMAIN SILENT AND I WISH TO SPEAK TO A LAWYER BEFORE ANSWERING ANY QUESTIONS.`,
  es: `NO DESEO HABLAR CON USTED, RESPONDER SUS PREGUNTAS, NI FIRMAR O ENTREGARLE NINGÚN DOCUMENTO BASÁNDOME EN MIS DERECHOS DE LA 5TA ENMIENDA BAJO LA CONSTITUCIÓN DE LOS ESTADOS UNIDOS.

NO LE DOY PERMISO PARA ENTRAR A MI CASA BASÁNDOME EN MIS DERECHOS DE LA 4TA ENMIENDA BAJO LA CONSTITUCIÓN DE LOS ESTADOS UNIDOS A MENOS QUE TENGA UNA ORDEN PARA ENTRAR, FIRMADA POR UN JUEZ O MAGISTRADO CON MI NOMBRE EN ELLA QUE DESLICE POR DEBAJO DE LA PUERTA.

ESTOY EJERCIENDO MI DERECHO A PERMANECER EN SILENCIO Y DESEO HABLAR CON UN ABOGADO ANTES DE RESPONDER CUALQUIER PREGUNTA.`
}

export function RedCardGenerator() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'es' ? 'es' : 'en'
  const [customText, setCustomText] = useState('')

  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=600,height=800')
    if (!printWindow) return

    const content = customText || RED_CARD_TEMPLATE[lang]

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Know Your Rights Card</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20mm;
            max-width: 85mm;
            margin: 0 auto;
          }
          .card {
            border: 2px solid #000;
            padding: 10mm;
            background: white;
          }
          .card p {
            font-size: 11pt;
            line-height: 1.4;
            margin: 8pt 0;
          }
          .header {
            text-align: center;
            font-weight: bold;
            font-size: 14pt;
            margin-bottom: 10pt;
            color: #dc2626;
          }
          @media print {
            body { padding: 0; }
            @page { margin: 10mm; }
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">KNOW YOUR RIGHTS / CONOZCA SUS DERECHOS</div>
          <p>${content.replace(/\n/g, '</p><p>')}</p>
        </div>
        <script>
          window.print();
          window.onafterprint = () => window.close();
        </script>
      </body>
      </html>
    `)
    printWindow.document.close()
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold mb-2">
          {lang === 'es' ? 'Tarjeta Roja - Conozca Sus Derechos' : 'Red Card - Know Your Rights'}
        </h3>
        <p className="text-sm text-muted-foreground">
          {lang === 'es'
            ? 'Imprime esta tarjeta y llévala contigo. Muéstrala (no la entregues) si eres contactado por ICE.'
            : 'Print this card and carry it with you. Show it (don\'t hand it over) if contacted by ICE.'}
        </p>
      </div>

      <div className="border border-border rounded-lg p-4 bg-white">
        <div className="text-center font-bold text-red-600 mb-4">
          KNOW YOUR RIGHTS / CONOZCA SUS DERECHOS
        </div>
        <div className="whitespace-pre-wrap text-sm">
          {customText || RED_CARD_TEMPLATE[lang]}
        </div>
      </div>

      <div className="space-y-3">
        <label className="block">
          <span className="text-sm font-medium">
            {lang === 'es' ? 'Personalizar (opcional)' : 'Customize (optional)'}
          </span>
          <textarea
            className="w-full mt-1 p-3 border border-border rounded-lg"
            rows={8}
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder={lang === 'es' ? 'Editar texto de la tarjeta...' : 'Edit card text...'}
          />
        </label>

        <div className="flex gap-3">
          <button
            onClick={handlePrint}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Printer className="h-5 w-5" />
            {lang === 'es' ? 'Imprimir' : 'Print'}
          </button>
        </div>
      </div>
    </div>
  )
}
```

### 3. Emergency Hotlines (`hotlines.json`)

```json
{
  "hotlines": {
    "national": [
      {
        "name": {
          "en": "Immigrant Defense Project",
          "es": "Proyecto de Defensa de Inmigrantes"
        },
        "phone": "1-844-363-1423",
        "hours": {
          "en": "24/7",
          "es": "24/7"
        },
        "languages": ["en", "es"],
        "description": {
          "en": "National immigration defense hotline",
          "es": "Línea nacional de defensa de inmigración"
        }
      }
    ],
    "regions": {
      "california": [
        {
          "name": "CHIRLA",
          "phone": "(888) 624-4752",
          "altPhone": "(213) 201-8773",
          "hours": {"en": "Business hours", "es": "Horario laboral"}
        }
      ],
      "newyork": [
        {
          "name": "The Legal Aid Society",
          "phone": "(844) 955-3425",
          "hours": {"en": "24/7", "es": "24/7"}
        }
      ]
    }
  }
}
```

### 4. Immigration Index Page

Updated `src/pages/Immigration/Index.tsx` to use the new components and data.

---

## ✅ Phase 5: Advanced AI Features (COMPLETE)

### 1. Document Generator (IMPLEMENTED)

**File**: `src/features/ai/components/DocumentGenerator.tsx`

Features:
- Generate emergency preparedness plans
- Generate customized Know Your Rights cards
- Generate contact lists
- Generate safety plan templates
- Export via print/copy

Integration:
- Uses WebLLM with 'document' assistant type
- Print/copy actions included
- Template system for common documents

### 2. Semantic Search with Transformers.js (IMPLEMENTED)

**Files**:
- `src/features/ai/services/transformers/embeddings.ts`
- `src/features/ai/services/transformers/search.ts`
- `src/components/GlobalSearch.tsx`

Features:
- Loads embedding model: `Xenova/all-MiniLM-L6-v2` (~25MB)
- Generates embeddings for checklists, scenarios, activism, AI defense
- Stores embeddings in IndexedDB
- Global search UI with semantic ranking

Example:
```typescript
// src/features/ai/services/transformers/embeddings.ts
import { pipeline } from '@xenova/transformers'

let embedder: any = null

export async function loadEmbeddingModel() {
  if (!embedder) {
    embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2')
  }
  return embedder
}

export async function generateEmbedding(text: string): Promise<number[]> {
  const model = await loadEmbeddingModel()
  const output = await model(text, { pooling: 'mean', normalize: true })
  return Array.from(output.data)
}

export function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0)
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0))
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0))
  return dotProduct / (magnitudeA * magnitudeB)
}
```

### 3. Smart Adaptive Checklists (FUTURE)

Use AI to recommend checklist items based on user's threat model:
- Ask user questions about their situation
- Prioritize relevant security measures
- Provide personalized recommendations
- Track progress intelligently

---

## ✅ Phase 6: Activism & AI Defense Modules (COMPLETE)

### Activism Module

**Location**: `src/features/activism/`

Implemented:
- `data/protest-rights.json` with protest rights + legal observer guidance
- `data/organizing.json` with organizing toolkit sections
- Components: `ProtestRightsGuide`, `OrganizingToolkit`, `ActionPlanner`, `LegalObserver`

### AI Defense Module

**Location**: `src/features/ai-defense/`

Implemented:
- `data/ai-threats.json` for surveillance threats
- `data/countermeasures.json` for defense techniques
- `data/threat-updates.json` for curated updates
- `data/data-broker-opt-out.json` for opt-out guidance
- Components: `ThreatOverview`, `CountermeasuresGuide`, `ThreatUpdates`, `DataBrokerOptOut`

---

## 🚧 Phase 7: Polish & Optimization (TODO)

### Performance Optimization
- [ ] Run Lighthouse audit (target >90 all categories)
- [x] Optimize bundle size (lazy load routes)
- [ ] Image optimization (WebP, lazy loading)
- [ ] Font subsetting (only characters used)
- [ ] Service worker caching strategy review

### Accessibility (WCAG 2.1 AA)
- [ ] Screen reader testing (NVDA, JAWS, VoiceOver)
- [ ] Keyboard navigation audit
- [ ] Color contrast check (4.5:1 minimum)
- [x] Focus indicators on all interactive elements
- [ ] ARIA labels where needed
- [x] Skip navigation links

### Cross-Browser Testing
- [ ] Chrome (desktop + Android)
- [ ] Firefox (desktop + Android)
- [ ] Safari (desktop + iOS)
- [ ] Edge (desktop)

### Multi-Language Expansion
- [ ] French translation (strings scaffolded)
- [ ] Arabic translation (RTL support scaffolded)
- [ ] Chinese (Simplified) translation (strings scaffolded)
- [ ] Vietnamese translation (strings scaffolded)
- [ ] Professional translation review (not machine translation)

### Documentation
- [ ] Comprehensive README with screenshots
- [x] Architecture documentation
- [x] Contribution guidelines
- [x] Code of conduct
- [x] Issue templates
- [x] Pull request template

### Legal Review
- [ ] Immigration attorney review of all immigration content
- [ ] Verify all legal citations
- [ ] Update disclaimers
- [ ] Privacy policy review

---

## Quick Start Commands

```bash
# Development
npm run dev

# Build
npm run build

# Preview production build
npm run preview

# Type check
npm run type-check

# Lint
npm run lint

# Format
npm run format
```

---

## Key Architecture Files

- `vite.config.ts` - Build config, PWA setup
- `src/core/db/schema.ts` - IndexedDB schema
- `src/core/pwa/service-worker.ts` - Offline logic
- `src/core/router/routes.tsx` - App routes
- `src/features/ai/services/webllm/engine.ts` - AI engine
- `src/features/ai/workers/ai.worker.ts` - AI Web Worker

---

## Testing Checklist

- Automated lint/tests: `npm run lint`, `npm run test` (CI: `.github/workflows/ci.yml`)

### Offline Functionality Test
1. Install PWA
2. Disconnect internet
3. Navigate all sections
4. Complete a checklist
5. Verify data persists
6. Test AI features offline (after model downloaded)

### AI Features Test
1. Download AI model (~2GB)
2. Chat with different assistants
3. Generate a document
4. Search content semantically
5. Verify all happens offline

### Security & Privacy Test
1. Check no network requests after initial load
2. Verify no analytics scripts
3. Test "Clear all data" button
4. Check local storage contents

---

## Resources & References

### WebLLM & AI
- https://webllm.mlc.ai/docs/
- https://github.com/mlc-ai/web-llm
- https://huggingface.co/docs/transformers.js/

### Immigration Rights Research
- NILC: https://www.nilc.org/
- ILRC: https://www.ilrc.org/
- Immigrant Defense Project: https://www.immigrantdefenseproject.org/
- ACLU Know Your Rights: https://www.aclu.org/know-your-rights/

### Digital Security
- EFF Surveillance Self-Defense: https://ssd.eff.org/
- activistchecklist.org (reference only - write original content)
- WITNESS Media Lab: https://lab.witness.org/

### AI Surveillance
- EFF Face Recognition: https://www.eff.org/issues/face-recognition
- ACLU: https://www.aclu.org/issues/privacy-technology/surveillance-technologies
- Algorithmic Justice League: https://www.ajl.org/

---

## Next Steps Priority

1. **Polish & Optimization**
   - Performance, accessibility, documentation

2. **Smart Adaptive Checklists**
   - AI-driven checklist recommendations

---

## Legal & Ethical Notes

### Immigration Content
- **Disclaimer**: "This is educational information, not legal advice. For specific immigration questions, consult an immigration attorney."
- **Accuracy**: All rights information must be verified with immigration lawyers
- **Updates**: Immigration policy changes frequently - plan for regular content updates
- **Citations**: Reference specific constitutional amendments, laws, and court cases

### Security Advice
- **Harm Reduction**: "Start where you are" - no shaming for current practices
- **Realistic**: Acknowledge perfect security is impossible
- **Threat Modeling**: Help users identify realistic threats, not paranoia
- **Trade-offs**: Be honest about convenience vs. security

### AI Limitations
- **Disclaimers**: AI provides general information, not legal/medical advice
- **Accuracy**: AI can hallucinate - critical information should cite sources
- **Privacy**: Emphasize local processing, no data sent to servers

---

## File Templates

### Checklist JSON Template
```json
{
  "id": "unique-id",
  "category": "essentials|advanced|protest|travel",
  "version": "1.0.0",
  "lastUpdated": "YYYY-MM-DD",
  "content": {
    "title": {"en": "", "es": ""},
    "description": {"en": "", "es": ""},
    "items": [
      {
        "id": "item-id",
        "title": {"en": "", "es": ""},
        "description": {"en": "", "es": ""},
        "priority": "essential|recommended|advanced",
        "effort": "low|medium|high",
        "impact": "low|medium|high",
        "steps": [
          {"en": "", "es": ""}
        ],
        "resources": [
          {
            "url": "",
            "title": {"en": "", "es": ""}
          }
        ],
        "tags": ["tag1", "tag2"]
      }
    ]
  }
}
```

---

**Last Updated**: 2026-01-13
**Current Phase**: Polish & Optimization (Phase 7)
**Status**: Performance, accessibility, documentation pending
