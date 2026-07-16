export const translations = {
  es: {
    meta: {
      title: 'Kaxa — App de Control de Gastos y Presupuesto Personal',
      description:
        'Controla gastos, presupuestos, deudas y metas de ahorro desde tu bolsillo. Con IA integrada. Sin anuncios. Gratis en Google Play.',
    },
    nav: {
      howItWorks: 'Cómo funciona',
      features: 'Funciones',
      pricing: 'Precios',
      support: 'Soporte',
      download: 'Descargar',
    },
    hero: {
      eyebrow: 'Ya disponible en Google Play',
      title: 'Sabe a dónde va tu dinero.',
      titleHighlight: 'Por fin.',
      subtitle:
        'Registra con voz, texto o manual — Kaxa categoriza, alerta y te muestra el panorama completo.',
      cta: 'Descargar gratis',
      ctaWaitlist: false,
      badge: '',
      launchDate: '',
      socialProof: '',
      mockup: {
        alt: 'Captura de pantalla de la app Kaxa mostrando el balance total y la actividad reciente',
      },
    },
    howItWorks: {
      title: 'Listo en 3 pasos',
      subtitle: 'Simple desde el primer día — sin curva de aprendizaje.',
      steps: [
        {
          number: '1',
          title: 'Registra',
          description: 'Anota gastos e ingresos en segundos. Con texto, voz o manual — tú eliges.',
        },
        {
          number: '2',
          title: 'Organiza en bolsillos',
          description:
            'Separa tu dinero en bolsillos — efectivo, cuenta bancaria o billetera digital — y ve tu balance real.',
        },
        {
          number: '3',
          title: 'Entiende tus finanzas',
          description:
            'Mira presupuestos, deudas y metas en un solo lugar, sin hojas de cálculo.',
        },
      ],
    },
    features: {
      title: 'Todo lo que necesitas para ordenar tu dinero',
      subtitle: 'Registro con voz, bolsillos inteligentes, alertas antes de pasarte. Sin hojas de cálculo.',
      items: [
        {
          title: 'Sabe exactamente dónde está tu dinero',
          description: 'Divide tu dinero en bolsillos: efectivo, banco, tarjeta y billetera digital. Ves tu balance real en cada uno — no un número global que no dice nada.',
          screenshot: '/screenshots/home.png',
          bullets: ['Efectivo, banco, tarjeta y billetera digital', 'Balance real por bolsillo en tiempo real', 'Transferencias entre bolsillos en 2 toques'],
        },
        {
          title: 'Registra en voz, no en formularios',
          description: 'Di "gasté 50 en el super" y Kaxa detecta el monto, la categoría y lo registra sola. Sin menús, sin campos, sin fricción — en segundos.',
          screenshot: '/screenshots/home.png',
          bullets: ['Lenguaje natural, sin comandos exactos', 'Detecta monto, categoría y bolsillo', 'Funciona igual con texto o manual'],
        },
        {
          title: 'Actúas antes de pasarte, no después',
          description: 'Define un límite por categoría y Kaxa te avisa al 80% — cuando todavía podés ajustar. No al 100% cuando ya es demasiado tarde.',
          screenshot: '/screenshots/presupuestos.png',
          bullets: ['Alerta al 80% cuando aún podés actuar', 'Límite mensual por categoría', 'Barras de progreso en tiempo real'],
        },
        {
          title: 'Metas con nombre, fecha y progreso real',
          description: 'Viaje, fondo de emergencia, un capricho. Dale nombre y fecha, aportá cuando puedas, y ve el progreso avanzar con cada peso que agregás.',
          screenshot: '/screenshots/metas.png',
          bullets: ['Progreso visual con porcentaje exacto', 'Aportes parciales sin límite', 'Notificación cuando llegás a la meta'],
        },
        {
          title: 'Cuotas y préstamos, sin olvidar ninguno',
          description: 'Teléfono en 12 cuotas, préstamo de un amigo, tarjeta de crédito. Registrá cada deuda, ve cuánto queda, y nunca llegués tarde a un pago.',
          screenshot: '/screenshots/deudas.png',
          bullets: ['Préstamos, tarjetas, cuotas y más', 'Fecha de pago con recordatorio', 'Saldo pendiente en tiempo real'],
        },
      ],
    },
    pricing: {
      title: 'Planes simples, sin sorpresas',
      subtitle:
        'Elige el plan que mejor se acomode a ti. Cancela cuando quieras desde la tienda de aplicaciones.',
      note: 'El pago se procesa de forma segura dentro de la app, a través de Google Play.',
      includesList: [
        'Bolsillos ilimitados',
        'Presupuestos con alertas',
        'Metas de ahorro',
        'Control de deudas y cuotas',
        'Pagos recurrentes',
        'Resumen con gráficas',
        'Puntaje de salud financiera',
        'Bloqueo biométrico',
        'Sin anuncios',
      ],
      plans: [
        {
          id: 'weekly',
          name: 'Semanal',
          price: '$1.99',
          period: '/ semana',
          highlight: 'Prueba gratis 3 días',
          anchor: '🍬 Menos que un dulce al día',
          detail: 'Probá sin compromiso',
          featured: false,
        },
        {
          id: 'monthly',
          name: 'Mensual',
          price: '$4.99',
          period: '/ mes',
          highlight: '',
          anchor: '☕ Lo que cuesta un café',
          detail: 'Sin contrato, cancelá cuando quieras',
          featured: false,
        },
        {
          id: 'yearly',
          name: 'Anual',
          price: '$24.99',
          period: '/ año',
          highlight: 'Mejor valor',
          anchor: '🎧 Menos que Spotify — todo el año',
          detail: '$2.08/mes — el más popular',
          featured: true,
        },
      ],
    },
    faq: {
      title: 'Preguntas frecuentes',
      items: [
        {
          question: '¿Qué incluye Kaxa?',
          answer:
            'Registro de gastos e ingresos, bolsillos para organizar tu dinero, presupuestos por categoría con alertas automáticas, metas de ahorro, control de deudas y cuotas, pagos recurrentes, resumen con gráficas y puntaje de salud financiera. Todo en una sola app, sin anuncios.',
        },
        {
          question: '¿Cómo funciona la IA?',
          answer:
            'Hablale a Kaxa: decí "gasté 50 en el supermercado" y ella detecta el monto, lo categoriza y lo registra sola. No hay menús que navegar ni campos que llenar. La inteligencia artificial entiende lenguaje natural para que anotar un gasto sea tan rápido como mandar un audio.',
        },
        {
          question: '¿Qué son los bolsillos?',
          answer:
            'Los bolsillos son la forma en que Kaxa organiza tu dinero real. Creas uno por efectivo, otro por tu cuenta bancaria, otro por tu billetera digital — los que necesites. Cada bolsillo tiene su propio balance y todos suman a tu total. Así sabes exactamente dónde está cada peso, no solo cuánto tienes.',
        },
        {
          question: '¿En qué se diferencia de Excel u otras apps?',
          answer:
            'Excel no te avisa cuando te pasás del presupuesto, no te recuerda una cuota pendiente y no tiene IA. Otras apps te piden conectar tu banco o crear una cuenta antes de hacer nada. Kaxa abre y funciona desde el primer segundo, sin login, sin sincronización bancaria, sin fricción.',
        },
        {
          question: '¿Mis datos están seguros?',
          answer:
            'Tus datos financieros se guardan únicamente en tu dispositivo. No hay servidores que los almacenen, no hay cuentas que hackear, no hay nada que vender. Solo tú tienes acceso. Y si quieres una capa extra, activas el bloqueo biométrico con huella o reconocimiento facial.',
        },
        {
          question: '¿Necesito conexión a internet?',
          answer:
            'No. Kaxa funciona completamente sin internet. Registrás, consultás y analizás tus finanzas en cualquier lugar, sin datos móviles. Solo necesitás conexión para procesar la compra de la suscripción.',
        },
        {
          question: '¿En qué monedas funciona?',
          answer:
            'Kaxa soporta 8 monedas: dólares (USD), euros (EUR), pesos mexicanos (MXN), pesos colombianos (COP), reales brasileños (BRL), pesos argentinos (ARS), quetzales (GTQ) y lempiras (HNL). Elegís la tuya al configurar la app.',
        },
        {
          question: '¿Puedo probarla gratis?',
          answer:
            'Sí. El plan semanal incluye 3 días de prueba completamente gratis. Si no te convence, cancelas antes de que termine y no se cobra absolutamente nada. Sin tarjeta guardada de forma forzosa, sin compromisos.',
        },
        {
          question: '¿Cómo cancelo mi suscripción?',
          answer:
            'Desde Google Play → Suscripciones → Kaxa → Cancelar. Sin llamadas, sin formularios, sin penalidades. Conservás el acceso completo hasta que termine tu periodo pagado.',
        },
      ],
    },
    support: {
      title: 'Soporte',
      subtitle:
        '¿Tienes dudas sobre Kaxa? Aquí respondemos las preguntas más comunes. Si no encuentras lo que buscas, escríbenos.',
      contactTitle: '¿Necesitas más ayuda?',
      contactText: 'Escríbenos y te responderemos lo antes posible.',
      contactButton: 'Enviar correo',
    },
    cta: {
      title: 'Empieza gratis hoy. Tus finanzas claras en minutos.',
      subtitle: 'Disponible en Google Play. Sin tarjeta de crédito.',
      button: 'Descargar en Google Play',
      ctaWaitlist: false,
    },
    waitlistUI: {
      successTitle: '🎉 ¡Estás en la lista!',
      successShare: 'Compartí con un amigo — ambos obtienen acceso anticipado.',
      shareBtn: 'Compartir',
      shareCopied: '✓ Link copiado',
      comingSoon: 'Google Play — pronto',
    },
    footer: {
      tagline: 'El control de tu dinero, en tu bolsillo.',
      legalTitle: 'Legal',
      privacy: 'Privacidad',
      terms: 'Términos',
      supportTitle: 'Soporte',
      supportLink: 'Centro de ayuda',
      contactEmail: 'soporte@kaxa.lat',
      downloadTitle: 'Disponible en',
      copyright: '© 2026 Kaxa. Todos los derechos reservados.',
    },
  },
  en: {
    meta: {
      title: 'Kaxa — Personal Finance App: Track Expenses & Budgets',
      description:
        'Track expenses, manage budgets, debts, and savings goals — all in one app. Built-in AI. No ads. Free on Google Play.',
    },
    nav: {
      howItWorks: 'How it works',
      features: 'Features',
      pricing: 'Pricing',
      support: 'Support',
      download: 'Download',
    },
    hero: {
      eyebrow: 'Now available on Google Play',
      title: 'Know where your money goes.',
      titleHighlight: 'Finally.',
      subtitle:
        'Log with voice, text, or manually — Kaxa categorizes, alerts, and gives you the full picture.',
      cta: 'Download free',
      ctaWaitlist: false,
      badge: '',
      launchDate: '',
      socialProof: '',
      mockup: {
        alt: 'Screenshot of the Kaxa app showing the total balance and recent activity',
      },
    },
    howItWorks: {
      title: 'Up and running in 3 steps',
      subtitle: 'Simple from day one — no learning curve.',
      steps: [
        {
          number: '1',
          title: 'Track',
          description: 'Log expenses and income in seconds. Text, voice, or manual — your choice.',
        },
        {
          number: '2',
          title: 'Organize into pockets',
          description:
            'Split your money into pockets — cash, bank account, or digital wallet — and see your real balance.',
        },
        {
          number: '3',
          title: 'Understand your finances',
          description:
            'See budgets, debts, and goals in one place, no spreadsheets needed.',
        },
      ],
    },
    features: {
      title: 'Everything you need to organize your money',
      subtitle: 'Voice logging, smart pockets, alerts before you overspend. No spreadsheets.',
      items: [
        {
          title: 'Know exactly where your money is',
          description: 'Split your money into pockets: cash, bank, card, and digital wallet. See your real balance in each one — not a single number that tells you nothing.',
          screenshot: '/screenshots/home.png',
          bullets: ['Cash, bank, card, and digital wallet', 'Real-time balance per pocket', 'Transfer between pockets in 2 taps'],
        },
        {
          title: 'Log with your voice, not a form',
          description: 'Say "spent $50 at the grocery store" and Kaxa detects the amount, category, and logs it on its own. No menus, no fields, no friction — done in seconds.',
          screenshot: '/screenshots/home.png',
          bullets: ['Natural language, no exact commands', 'Detects amount, category, and pocket', 'Works the same with text or manual entry'],
        },
        {
          title: 'Act before you overspend, not after',
          description: 'Set a monthly limit per category and Kaxa alerts you at 80% — when you can still adjust. Not at 100% when it\'s already too late.',
          screenshot: '/screenshots/presupuestos.png',
          bullets: ['Alert at 80% when you can still act', 'Monthly limit per category', 'Real-time progress bars'],
        },
        {
          title: 'Goals with a name, a date, and real progress',
          description: 'Trip, emergency fund, a treat. Give it a name and a date, contribute when you can, and watch the progress grow with every dollar you add.',
          screenshot: '/screenshots/metas.png',
          bullets: ['Visual progress with exact percentage', 'Unlimited partial contributions', 'Notification when you reach your goal'],
        },
        {
          title: 'Installments and loans, not one forgotten',
          description: 'Phone in 12 installments, a friend\'s loan, credit card. Log each debt, see what\'s left, and never miss a payment date.',
          screenshot: '/screenshots/deudas.png',
          bullets: ['Loans, cards, installments, and more', 'Payment date with reminder', 'Remaining balance in real time'],
        },
      ],
    },
    pricing: {
      title: 'Simple plans, no surprises',
      subtitle: 'Choose the plan that fits you best. Cancel anytime from the app store.',
      note: 'Payment is processed securely inside the app, through Google Play.',
      includesList: [
        'Unlimited pockets',
        'Budgets with alerts',
        'Savings goals',
        'Debt and installment tracking',
        'Recurring payments',
        'Charts and summaries',
        'Financial health score',
        'Biometric lock',
        'No ads',
      ],
      plans: [
        {
          id: 'weekly',
          name: 'Weekly',
          price: '$1.99',
          period: '/ week',
          highlight: '3-day free trial',
          anchor: '🍬 Less than a candy a day',
          detail: 'Try risk-free',
          featured: false,
        },
        {
          id: 'monthly',
          name: 'Monthly',
          price: '$4.99',
          period: '/ month',
          highlight: '',
          anchor: '☕ The price of a coffee',
          detail: 'No contract, cancel anytime',
          featured: false,
        },
        {
          id: 'yearly',
          name: 'Yearly',
          price: '$24.99',
          period: '/ year',
          highlight: 'Best value',
          anchor: '🎧 Less than Spotify — all year',
          detail: '$2.08/mo — most popular',
          featured: true,
        },
      ],
    },
    faq: {
      title: 'Frequently asked questions',
      items: [
        {
          question: 'What does Kaxa include?',
          answer:
            'Expense and income tracking, pockets to organize your money, category budgets with automatic alerts, savings goals, debt and installment management, recurring payments, charts and summaries, and a financial health score. All in one app, no ads.',
        },
        {
          question: 'How does the AI work?',
          answer:
            'Just talk to Kaxa: say "spent 50 at the supermarket" and she detects the amount, categorizes it, and logs it on her own. No menus to navigate, no fields to fill in. The built-in AI understands natural language so recording an expense is as fast as sending a voice note.',
        },
        {
          question: 'What are pockets?',
          answer:
            'Pockets are how Kaxa organizes your real money. You create one for cash, one for your bank account, one for your digital wallet — as many as you need. Each pocket has its own balance and they all add up to your total. That way you know exactly where every dollar is, not just how much you have.',
        },
        {
          question: 'How is it different from Excel or other apps?',
          answer:
            'Excel won\'t alert you when you overspend, won\'t remind you of a due payment, and has no AI. Other apps ask you to connect your bank or create an account before you can do anything. Kaxa opens and works from the first second — no login, no bank sync, no friction.',
        },
        {
          question: 'Is my data safe?',
          answer:
            'Your financial data is stored only on your device. No servers holding it, no accounts to get hacked, nothing to sell. Only you have access. And if you want an extra layer of protection, turn on biometric lock with fingerprint or face recognition.',
        },
        {
          question: 'Do I need an internet connection?',
          answer:
            'No. Kaxa works completely offline. You can log, review, and analyze your finances anywhere, without mobile data. You only need a connection to process the subscription purchase.',
        },
        {
          question: 'What currencies does it support?',
          answer:
            'Kaxa supports 8 currencies: US dollars (USD), euros (EUR), Mexican pesos (MXN), Colombian pesos (COP), Brazilian reais (BRL), Argentine pesos (ARS), Guatemalan quetzales (GTQ), and Honduran lempiras (HNL). You choose yours when setting up the app.',
        },
        {
          question: 'Can I try it for free?',
          answer:
            'Yes. The weekly plan includes a 3-day free trial. If you\'re not convinced, cancel before it ends and you won\'t be charged a thing. No forced commitment, no strings attached.',
        },
        {
          question: 'How do I cancel my subscription?',
          answer:
            'Go to Google Play → Subscriptions → Kaxa → Cancel. No calls, no forms, no penalties. You keep full access until the end of your paid period.',
        },
      ],
    },
    support: {
      title: 'Support',
      subtitle:
        "Have questions about Kaxa? Here are answers to the most common ones. If you can't find what you're looking for, write to us.",
      contactTitle: 'Need more help?',
      contactText: "Send us a message and we'll get back to you as soon as possible.",
      contactButton: 'Send email',
    },
    cta: {
      title: 'Start free today. Clear finances in minutes.',
      subtitle: 'Available on Google Play. No credit card required.',
      button: 'Download on Google Play',
      ctaWaitlist: false,
    },
    waitlistUI: {
      successTitle: '🎉 You\'re on the list!',
      successShare: 'Share with a friend — both get early access.',
      shareBtn: 'Share',
      shareCopied: '✓ Link copied',
      comingSoon: 'Google Play — coming soon',
    },
    footer: {
      tagline: 'Take control of your money, in your pocket.',
      legalTitle: 'Legal',
      privacy: 'Privacy',
      terms: 'Terms',
      supportTitle: 'Support',
      supportLink: 'Help center',
      contactEmail: 'soporte@kaxa.lat',
      downloadTitle: 'Available on',
      copyright: '© 2026 Kaxa. All rights reserved.',
    },
  },
} as const;

export type Translations = typeof translations.es;
