export const translations = {
  es: {
    meta: {
      title: 'Kaxa — El control de tu dinero, en tu bolsillo',
      description:
        'Kaxa es la app de finanzas personales para Honduras. Registra gastos e ingresos, organiza tus bolsillos y controla presupuestos, deudas y metas.',
    },
    nav: {
      howItWorks: 'Cómo funciona',
      features: 'Funciones',
      pricing: 'Precios',
      support: 'Soporte',
      download: 'Únete',
    },
    hero: {
      eyebrow: 'Próximamente en Google Play',
      title: 'Tu dinero merece orden.',
      titleHighlight: 'Kaxa lo resuelve.',
      subtitle:
        'La app de finanzas personales hecha en Honduras. Registra gastos, presupuestos, deudas y metas — en tu moneda, sin complicaciones.',
      cta: 'Avisarme cuando esté lista',
      ctaWaitlist: true,
      badge: 'Hecha en Honduras 🇭🇳',
      launchDate: 'Disponible en julio 2026',
      socialProof: 'personas ya se registraron',
      mockup: {
        alt: 'Captura de pantalla de la app Kaxa mostrando el balance total y la actividad reciente',
      },
    },
    howItWorks: {
      title: 'Cómo funciona',
      subtitle: 'Tres pasos para tomar control de tu dinero.',
      steps: [
        {
          number: '1',
          title: 'Registra',
          description: 'Anota tus gastos e ingresos en segundos, en tu moneda.',
        },
        {
          number: '2',
          title: 'Organiza en bolsillos',
          description:
            'Separa tu dinero en bolsillos como Efectivo, Tigo Money o tu cuenta de banco.',
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
      subtitle: 'Funciones pensadas para tu día a día, sin complicaciones.',
      items: [
        {
          title: 'Tu dinero, organizado al instante',
          description: 'Registra gastos e ingresos en segundos. Separa tu dinero en bolsillos — efectivo, banco, billetera digital — y ve tu balance real de un vistazo.',
          screenshot: '/screenshots/home.png',
          bullets: ['Balance por bolsillo en tiempo real', 'Registro en 2 toques', 'Categorías con emojis personalizables'],
        },
        {
          title: 'Presupuestos que te avisan antes de pasarte',
          description: 'Define cuánto querés gastar por categoría. Kaxa te alerta al 80% y te avisa cuando te pasás. Nada de sorpresas a fin de mes.',
          screenshot: '/screenshots/presupuestos.png',
          bullets: ['Límite mensual por categoría', 'Alertas al 80% y 100%', 'Barras de progreso visuales'],
        },
        {
          title: 'Metas de ahorro con nombre y fecha',
          description: 'Vacaciones, emergencias, un capricho. Creá metas, aportá cuando puedas y celebrá cada avance con confetti real.',
          screenshot: '/screenshots/metas.png',
          bullets: ['Progreso visual con porcentaje', 'Aportes parciales sin límite', 'Notificaciones de hitos'],
        },
        {
          title: 'Deudas y cuotas bajo control',
          description: 'Préstamos, tarjetas, cuotas de teléfono. Registra pagos, ve tu saldo pendiente y nunca olvides una fecha de pago.',
          screenshot: '/screenshots/deudas.png',
          bullets: ['7 tipos de deuda con íconos', 'Recordatorios automáticos', 'Progreso hasta liquidar'],
        },
        {
          title: 'Entiende tus números de un vistazo',
          description: 'Gráficas por categoría, ingresos vs gastos, y un puntaje de salud financiera que te dice cómo vas.',
          screenshot: '/screenshots/resumen.png',
          bullets: ['Dona de gastos por categoría', 'Tendencias semanales', 'Puntaje de salud financiera'],
        },
      ],
    },
    pricing: {
      title: 'Planes simples, sin sorpresas',
      subtitle:
        'Elige el plan que mejor se acomode a ti. Cancela cuando quieras desde la tienda de aplicaciones.',
      note: 'El pago se procesa de forma segura dentro de la app, a través de Google Play o App Store.',
      featuresList: [
        'Bolsillos ilimitados',
        'Presupuestos y metas de ahorro',
        'Seguimiento de deudas',
        'Resumen y reportes financieros',
      ],
      plans: [
        {
          id: 'weekly',
          name: 'Semanal',
          price: '$1.99',
          period: '/ semana',
          highlight: 'Prueba gratis 3 días',
          cta: 'Probar gratis',
          featured: false,
        },
        {
          id: 'monthly',
          name: 'Mensual',
          price: '$4.99',
          period: '/ mes',
          highlight: '',
          cta: 'Empezar',
          featured: false,
        },
        {
          id: 'yearly',
          name: 'Anual',
          price: '$24.99',
          period: '/ año',
          highlight: 'Mejor valor',
          cta: 'Empezar',
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
            'Registro de gastos e ingresos, presupuestos por categoría con alertas, metas de ahorro, control de deudas y cuotas, pagos recurrentes automáticos, resumen con gráficas, y bloqueo biométrico. Todo en una sola app.',
        },
        {
          question: '¿En qué se diferencia de una hoja de Excel?',
          answer:
            'Excel no te avisa cuando te pasás del presupuesto, no te recuerda cuotas pendientes, y no te muestra gráficas al instante. Kaxa hace todo eso en 2 toques, sin fórmulas ni tablas.',
        },
        {
          question: '¿Mis datos están seguros?',
          answer:
            'Tus datos financieros se guardan en tu dispositivo. No tenemos servidores que almacenen tu información. Además, podés activar bloqueo con huella dactilar para que nadie más acceda a la app.',
        },
        {
          question: '¿Necesito conexión a internet?',
          answer:
            'No. Kaxa funciona completamente sin internet. Solo necesitás conexión para la compra inicial de la suscripción.',
        },
        {
          question: '¿En qué monedas funciona?',
          answer:
            'Kaxa soporta 8 monedas: lempiras (HNL), dólares (USD), quetzales (GTQ), pesos mexicanos (MXN), pesos colombianos (COP), reales (BRL), pesos argentinos (ARS) y euros (EUR).',
        },
        {
          question: '¿Puedo probarla gratis?',
          answer:
            'Sí. El plan semanal incluye 3 días de prueba gratis. Si no te convence, cancelás antes de que termine el trial y no se cobra nada. Sin compromisos.',
        },
        {
          question: '¿Cómo cancelo mi suscripción?',
          answer:
            'Desde Google Play → Suscripciones → Kaxa → Cancelar. Sin penalidades, sin llamadas, sin formularios. Conservás el acceso hasta que termine tu periodo pagado.',
        },
        {
          question: '¿Quién hizo Kaxa?',
          answer:
            'Kaxa es diseñada y desarrollada en Honduras. Es un proyecto independiente creado para resolver un problema real: que la gente sepa en qué se va su dinero, sin complicaciones.',
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
      title: 'Sé de los primeros en probar Kaxa',
      subtitle: 'Dejá tu correo y te avisamos antes que nadie.',
      button: 'Avisarme cuando esté lista',
      ctaWaitlist: true,
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
      downloadTitle: 'Próximamente',
      copyright: '© 2026 Kaxa. Todos los derechos reservados.',
    },
  },
  en: {
    meta: {
      title: 'Kaxa — Take control of your money, in your pocket',
      description:
        'Kaxa is the personal finance app for Honduras. Track expenses and income, organize your money into pockets, and manage budgets, debts, and goals.',
    },
    nav: {
      howItWorks: 'How it works',
      features: 'Features',
      pricing: 'Pricing',
      support: 'Support',
      download: 'Join the list',
    },
    hero: {
      eyebrow: 'Coming soon to Google Play',
      title: 'Your money deserves order.',
      titleHighlight: 'Kaxa delivers.',
      subtitle:
        'The personal finance app made in Honduras. Track expenses, budgets, debts, and goals — in your currency, no hassle.',
      cta: 'Notify me when it\'s ready',
      ctaWaitlist: true,
      badge: 'Made in Honduras 🇭🇳',
      launchDate: 'Available July 2026',
      socialProof: 'people already signed up',
      mockup: {
        alt: 'Screenshot of the Kaxa app showing the total balance and recent activity',
      },
    },
    howItWorks: {
      title: 'How it works',
      subtitle: 'Three steps to take control of your money.',
      steps: [
        {
          number: '1',
          title: 'Track',
          description: 'Log your expenses and income in seconds, in your currency.',
        },
        {
          number: '2',
          title: 'Organize into pockets',
          description:
            'Split your money into pockets like Cash, Tigo Money, or your bank account.',
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
      subtitle: 'Features built for your everyday life, without the hassle.',
      items: [
        {
          title: 'Your money, organized instantly',
          description: 'Track expenses and income in seconds. Split your money into pockets — cash, bank, digital wallet — and see your real balance at a glance.',
          screenshot: '/screenshots/home.png',
          bullets: ['Real-time balance per pocket', 'Register in 2 taps', 'Custom emoji categories'],
        },
        {
          title: 'Budgets that warn you before you overspend',
          description: 'Set how much you want to spend per category. Kaxa alerts you at 80% and lets you know when you go over. No end-of-month surprises.',
          screenshot: '/screenshots/presupuestos.png',
          bullets: ['Monthly limit per category', 'Alerts at 80% and 100%', 'Visual progress bars'],
        },
        {
          title: 'Savings goals with a name and a date',
          description: 'Vacations, emergencies, a treat. Create goals, contribute when you can, and celebrate every milestone with real confetti.',
          screenshot: '/screenshots/metas.png',
          bullets: ['Visual progress with percentage', 'Unlimited partial contributions', 'Milestone notifications'],
        },
        {
          title: 'Debts and bills under control',
          description: 'Loans, credit cards, phone plans. Log payments, see your remaining balance, and never miss a payment date.',
          screenshot: '/screenshots/deudas.png',
          bullets: ['7 debt types with icons', 'Automatic reminders', 'Progress until paid off'],
        },
        {
          title: 'Understand your numbers at a glance',
          description: 'Charts by category, income vs expenses, and a financial health score that tells you how you are doing.',
          screenshot: '/screenshots/resumen.png',
          bullets: ['Spending donut by category', 'Weekly trends', 'Financial health score'],
        },
      ],
    },
    pricing: {
      title: 'Simple plans, no surprises',
      subtitle: 'Choose the plan that fits you best. Cancel anytime from the app store.',
      note: 'Payment is processed securely inside the app, through Google Play or the App Store.',
      featuresList: [
        'Unlimited pockets',
        'Budgets and savings goals',
        'Debt tracking',
        'Financial summary and reports',
      ],
      plans: [
        {
          id: 'weekly',
          name: 'Weekly',
          price: '$1.99',
          period: '/ week',
          highlight: '3-day free trial',
          cta: 'Try for free',
          featured: false,
        },
        {
          id: 'monthly',
          name: 'Monthly',
          price: '$4.99',
          period: '/ month',
          highlight: '',
          cta: 'Get started',
          featured: false,
        },
        {
          id: 'yearly',
          name: 'Yearly',
          price: '$24.99',
          period: '/ year',
          highlight: 'Best value',
          cta: 'Get started',
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
            'Expense and income tracking, category budgets with alerts, savings goals, debt and installment management, automatic recurring payments, charts and summaries, and biometric lock. All in one app.',
        },
        {
          question: 'How is it different from a spreadsheet?',
          answer:
            'Excel won\'t alert you when you overspend, won\'t remind you about due payments, and won\'t show you charts instantly. Kaxa does all of that in 2 taps — no formulas, no tables.',
        },
        {
          question: 'Is my data safe?',
          answer:
            'Your financial data stays on your device. We don\'t have servers storing your information. You can also enable fingerprint lock so no one else can access the app.',
        },
        {
          question: 'Do I need an internet connection?',
          answer:
            'No. Kaxa works completely offline. You only need a connection for the initial subscription purchase.',
        },
        {
          question: 'What currencies does it support?',
          answer:
            'Kaxa supports 8 currencies: Honduran lempiras (HNL), US dollars (USD), Guatemalan quetzales (GTQ), Mexican pesos (MXN), Colombian pesos (COP), Brazilian reais (BRL), Argentine pesos (ARS), and euros (EUR).',
        },
        {
          question: 'Can I try it for free?',
          answer:
            'Yes. The weekly plan includes a 3-day free trial. If you\'re not convinced, cancel before the trial ends and you won\'t be charged. No strings attached.',
        },
        {
          question: 'How do I cancel my subscription?',
          answer:
            'Go to Google Play → Subscriptions → Kaxa → Cancel. No penalties, no calls, no forms. You keep access until the end of your paid period.',
        },
        {
          question: 'Who made Kaxa?',
          answer:
            'Kaxa is designed and developed in Honduras. It\'s an independent project built to solve a real problem: helping people understand where their money goes, without the hassle.',
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
      title: 'Be one of the first to try Kaxa',
      subtitle: 'Leave your email and we\'ll notify you before anyone else.',
      button: 'Notify me when it\'s ready',
      ctaWaitlist: true,
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
      downloadTitle: 'Coming soon',
      copyright: '© 2026 Kaxa. All rights reserved.',
    },
  },
} as const;

export type Translations = typeof translations.es;
