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
      download: 'Descargar',
    },
    hero: {
      eyebrow: 'App de finanzas · Honduras',
      title: 'El control de tu dinero, en tu bolsillo.',
      subtitle:
        'Registra tus gastos e ingresos, organiza tus bolsillos y entiende a dónde va tu dinero, en lempiras.',
      cta: 'Descargar en Google Play',
      badge: 'Disponible en Google Play',
      mockup: {
        greeting: 'Buenos días',
        status: 'Sin gastos hoy',
        balanceLabel: 'BALANCE TOTAL',
        balanceAmount: 'L 12,450.00',
        period: 'Este mes',
        chips: ['Presupuestos', 'Deudas', 'Resumen'],
        activityTitle: 'Actividad reciente',
        items: [
          { name: 'Supermercado', date: 'Hoy', amount: '-L 450', type: 'expense' as const },
          { name: 'Salario', date: 'Ayer', amount: '+L 8,000', type: 'income' as const },
        ],
      },
    },
    howItWorks: {
      title: 'Cómo funciona',
      subtitle: 'Tres pasos para tomar control de tu dinero.',
      steps: [
        {
          number: '1',
          title: 'Registra',
          description: 'Anota tus gastos e ingresos en segundos, en lempiras.',
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
          title: 'Bolsillos',
          description:
            'Divide tu dinero en bolsillos (efectivo, billeteras digitales, cuentas bancarias) y mira cuánto tienes en cada uno.',
        },
        {
          title: 'Presupuestos',
          description:
            'Define cuánto quieres gastar por categoría y recibe el control en tiempo real.',
        },
        {
          title: 'Deudas',
          description:
            'Lleva el registro de lo que debes y lo que te deben, con fechas y montos claros.',
        },
        {
          title: 'Metas de ahorro',
          description: 'Crea metas, define un monto objetivo y mira tu progreso.',
        },
        {
          title: 'Resumen y reportes',
          description: 'Visualiza tus ingresos y gastos por categoría y por periodo.',
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
          question: '¿Mis datos están seguros?',
          answer:
            'Sí. Tu información financiera se almacena de forma segura y nunca la compartimos ni vendemos a terceros. Puedes leer más en nuestra Política de Privacidad.',
        },
        {
          question: '¿Necesito conexión a internet para usar Kaxa?',
          answer:
            'Puedes registrar tus movimientos sin conexión. Kaxa sincroniza tu información cuando vuelves a tener internet.',
        },
        {
          question: '¿En qué moneda funciona Kaxa?',
          answer: 'Kaxa está diseñada para Honduras y trabaja en lempiras (HNL).',
        },
        {
          question: '¿Cómo cancelo mi suscripción?',
          answer:
            'Puedes cancelar en cualquier momento desde la configuración de tu cuenta de Google Play o App Store, sin penalidades.',
        },
        {
          question: '¿Hay una versión gratuita?',
          answer:
            'Kaxa no tiene versión gratuita, pero el plan semanal incluye 3 días de prueba gratis para que la pruebes sin compromiso.',
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
      title: 'Empieza a controlar tu dinero hoy',
      subtitle: 'Descarga Kaxa y organiza tus finanzas en minutos.',
      button: 'Descargar en Google Play',
    },
    footer: {
      tagline: 'El control de tu dinero, en tu bolsillo.',
      legalTitle: 'Legal',
      privacy: 'Privacidad',
      terms: 'Términos',
      supportTitle: 'Soporte',
      supportLink: 'Centro de ayuda',
      contactEmail: 'hola@kaxa.lat',
      downloadTitle: 'Descarga',
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
      download: 'Download',
    },
    hero: {
      eyebrow: 'Personal finance app · Honduras',
      title: 'Take control of your money, in your pocket.',
      subtitle:
        'Track your expenses and income, organize your money into pockets, and understand where your money goes, in lempiras.',
      cta: 'Get it on Google Play',
      badge: 'Available on Google Play',
      mockup: {
        greeting: 'Good morning',
        status: 'No expenses today',
        balanceLabel: 'TOTAL BALANCE',
        balanceAmount: 'L 12,450.00',
        period: 'This month',
        chips: ['Budgets', 'Debts', 'Summary'],
        activityTitle: 'Recent activity',
        items: [
          { name: 'Groceries', date: 'Today', amount: '-L 450', type: 'expense' as const },
          { name: 'Salary', date: 'Yesterday', amount: '+L 8,000', type: 'income' as const },
        ],
      },
    },
    howItWorks: {
      title: 'How it works',
      subtitle: 'Three steps to take control of your money.',
      steps: [
        {
          number: '1',
          title: 'Track',
          description: 'Log your expenses and income in seconds, in lempiras.',
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
          title: 'Pockets',
          description:
            'Split your money into pockets (cash, digital wallets, bank accounts) and see how much you have in each one.',
        },
        {
          title: 'Budgets',
          description:
            'Set how much you want to spend per category and stay in control in real time.',
        },
        {
          title: 'Debts',
          description:
            'Keep track of what you owe and what you are owed, with clear dates and amounts.',
        },
        {
          title: 'Savings goals',
          description: 'Create goals, set a target amount, and watch your progress.',
        },
        {
          title: 'Summary & reports',
          description: 'View your income and expenses by category and time period.',
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
          question: 'Is my data safe?',
          answer:
            'Yes. Your financial information is stored securely and we never share or sell it to third parties. Read more in our Privacy Policy.',
        },
        {
          question: 'Do I need an internet connection to use Kaxa?',
          answer:
            'You can log transactions offline. Kaxa syncs your information once you are back online.',
        },
        {
          question: 'What currency does Kaxa use?',
          answer: 'Kaxa is designed for Honduras and works in lempiras (HNL).',
        },
        {
          question: 'How do I cancel my subscription?',
          answer:
            'You can cancel anytime from your Google Play or App Store account settings, with no penalties.',
        },
        {
          question: 'Is there a free version?',
          answer:
            'Kaxa does not have a free version, but the weekly plan includes a 3-day free trial so you can try it risk-free.',
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
      title: 'Start taking control of your money today',
      subtitle: 'Download Kaxa and organize your finances in minutes.',
      button: 'Get it on Google Play',
    },
    footer: {
      tagline: 'Take control of your money, in your pocket.',
      legalTitle: 'Legal',
      privacy: 'Privacy',
      terms: 'Terms',
      supportTitle: 'Support',
      supportLink: 'Help center',
      contactEmail: 'hola@kaxa.lat',
      downloadTitle: 'Download',
      copyright: '© 2026 Kaxa. All rights reserved.',
    },
  },
} as const;

export type Translations = typeof translations.es;
