export type RoleColor = 'tecnologia' | 'marketing' | 'operaciones' | 'finanzas';

export interface EventConfig {
  nombre: string;
  lema: string;
  fechaInicio: string;
  urlRegistro: string;
  lugar: {
    nombre: string;
    direccion: string;
    mapsEmbedUrl: string;
    comoLlegarUrl: string;
  };
  hero: {
    kicker: string;
    titulo: string;
    subtitulo: string;
    indicacion: string;
  };
  queViviras: { titulo: string; descripcion: string; color: RoleColor }[];
  retos: {
    kicker: string;
    titulo: string;
    subtitulo: string;
    lista: {
      numero: string;
      emoji: string;
      titulo: string;
      mision: string;
      problema: string;
      resultado: string;
      validacion: string;
      color: RoleColor;
    }[];
    preguntas: {
      pregunta: string;
      intro: string;
      items: { titulo?: string; texto: string; emoji?: string }[];
    }[];
    notaPrototipo: string;
  };
  agenda: {
    dia: string;
    horario: string;
    hitos: { hora: string; titulo: string; descripcion?: string; tipo?: 'reto' | 'pausa' }[];
  }[];
  premios: { puesto: string; titulo: string; descripcion: string }[];
  faqs: { pregunta: string; respuesta: string | string[] }[];
  organizadores: { nombre: string; logo: string }[];
  redes: { nombre: 'instagram' | 'facebook' | 'tiktok'; url: string; habilitado: boolean }[];
  hashtags: string[];
  ctaFinal: { texto: string; boton: string };
  juego: {
    hudLabel: string;
    ceoBubbleIdle: string;
    candidatoBubbleIdle: string;
    candidatoBubbleGo: string;
    ceoReaccion: string;
    ceoReaccionesAleatorias: string[];
    roles: Record<
      RoleColor,
      { etiqueta: string; titulo: string; ariaLabel: string; bubbleLlegada: string }
    >;
    construyendo: string;
    win: string;
    tarjetaFinal: { texto: string; botonRegistro: string; botonReset: string };
  };
}

export const EVENT: EventConfig = {
  nombre: 'Match & Build Challenge',
  lema: 'Conecta. Lidera. Construye el futuro.',
  fechaInicio: '2026-11-06T15:00:00-05:00',
  urlRegistro: 'https://somosnomadas.vercel.app/onboarding',

  lugar: {
    nombre: 'Auditorio – 5.º piso, Colegio de Ingenieros del Perú',
    direccion: 'Av. María Izaga N.º 680, Chiclayo',
    mapsEmbedUrl:
      'https://www.google.com/maps?q=Colegio+de+Ingenieros+del+Per%C3%BA,+Av.+Mar%C3%ADa+Izaga+680,+Chiclayo,+Per%C3%BA&output=embed',
    comoLlegarUrl:
      'https://www.google.com/maps/dir/?api=1&destination=Colegio+de+Ingenieros+del+Per%C3%BA,+Av.+Mar%C3%ADa+Izaga+680,+Chiclayo,+Per%C3%BA',
  },

  hero: {
    kicker: 'CONECTA · LIDERA · CONSTRUYE EL FUTURO',
    titulo: 'MATCH & BUILD CHALLENGE',
    subtitulo:
      'El punto de encuentro para formar equipos, compartir ideas y dar vida a grandes proyectos.',
    indicacion: '👇 Haz click en los personajes y forma tu equipo',
  },

  queViviras: [
    {
      titulo: '🤝 Match entre talento',
      descripcion:
        'Conecta con emprendedores, estudiantes y profesionales para formar equipos con habilidades complementarias.',
      color: 'tecnologia',
    },
    {
      titulo: '🎯 Retos de innovación',
      descripcion:
        'Desarrolla soluciones a desafíos reales junto a tu equipo mediante trabajo colaborativo.',
      color: 'marketing',
    },
    {
      titulo: '💬 Mentoría y aprendizaje',
      descripcion:
        'Recibe acompañamiento de mentores y participa en espacios de aprendizaje e inspiración.',
      color: 'operaciones',
    },
    {
      titulo: '🚀 Presentación y premiación',
      descripcion:
        'Presenta tu proyecto ante el jurado y compite por los premios para los mejores equipos.',
      color: 'finanzas',
    },
  ],

  retos: {
    kicker: 'CITE Sipán · Sector artesanal',
    titulo: 'Los retos',
    subtitulo:
      'Tu equipo elegirá uno de estos desafíos reales y creará una solución que ayude a las artesanas de la región.',
    lista: [
      {
        numero: 'Reto 01',
        emoji: '💰',
        titulo: 'Artesanía con valor: del costo al precio justo',
        mision:
          '¿Cómo podríamos facilitar a las artesanas el cálculo de costos y la definición de precios de venta de sus productos de manera sencilla y práctica?',
        problema:
          'A las artesanas les cuesta saber cuánto gastan en elaborar sus productos y qué precio poner para obtener ganancias.',
        resultado:
          'Una herramienta o solución con la que una artesana pueda calcular el costo y estimar el precio de venta de al menos uno de sus productos.',
        validacion:
          'Pruébala con al menos una artesana: comprueba que entiende cómo usarla y anota sus comentarios.',
        color: 'finanzas',
      },
      {
        numero: 'Reto 02',
        emoji: '📣',
        titulo: 'Artesanía visible: innovar para conectar con clientes',
        mision:
          '¿Cómo podríamos ayudar a las artesanas a mejorar la presentación y promoción de sus productos para atraer nuevos clientes?',
        problema:
          'A las artesanas les cuesta promocionar sus productos, conocer qué prefieren sus clientes y aprovechar nuevas oportunidades de venta.',
        resultado:
          'Una solución que mejore la presentación, promoción o visibilidad de un producto artesanal específico.',
        validacion:
          'Muéstrala a posibles clientes o artesanas, escucha sus opiniones y aplica al menos una mejora a partir de lo que te digan.',
        color: 'marketing',
      },
    ],
    preguntas: [
      {
        pregunta: '¿Qué deberán lograr los equipos?',
        intro: 'Al finalizar el Challenge, cada equipo deberá presentar:',
        items: [
          { titulo: 'Prototipo demostrable', texto: 'una solución física o digital que responda al reto elegido.' },
          { titulo: 'Validación', texto: 'evidencia de pruebas o retroalimentación de usuarios reales.' },
          { titulo: 'Mejoras', texto: 'principales aprendizajes y ajustes realizados.' },
          { titulo: 'Pitch final', texto: 'presentación de la problemática, solución y resultados obtenidos.' },
        ],
      },
      {
        pregunta: '¿Cómo se evaluarán los proyectos?',
        intro: 'Los proyectos serán evaluados considerando cuatro criterios:',
        items: [
          { emoji: '💡', texto: 'Innovación de la solución.' },
          { emoji: '⚙️', texto: 'Viabilidad de implementación.' },
          { emoji: '❤️', texto: 'Impacto potencial en las artesanas.' },
          { emoji: '🧪', texto: 'Calidad del prototipo y evidencia de validación.' },
        ],
      },
    ],
    notaPrototipo:
      'No necesitas saber programar: un prototipo es una primera versión que se puede mostrar y probar. Puede ser una hoja de cálculo, una plantilla, un catálogo, una maqueta o una presentación.',
  },

  agenda: [
    {
      dia: 'Viernes 06 de noviembre',
      horario: '3:00 p. m. – 6:00 p. m.',
      hitos: [
        { hora: '3:00 p. m.', titulo: 'Bienvenida e inicio del evento', descripcion: 'Presentación del Match & Build Challenge y organizaciones participantes.' },
        { hora: '3:20 p. m.', titulo: 'Presentación de los retos', descripcion: 'Conoce los desafíos que serán trabajados durante el Challenge.' },
        { hora: '3:45 p. m.', titulo: 'Presentación de mentores', descripcion: 'Conoce a los mentores que acompañarán a los equipos.' },
        { hora: '4:15 p. m.', titulo: 'Explicación de la dinámica del Challenge', descripcion: 'Presentación de la metodología y actividades del día siguiente.' },
        { hora: '4:45 p. m.', titulo: 'Conversatorio', descripcion: 'Espacio de aprendizaje, diálogo e intercambio de experiencias.' },
        { hora: '5:20 p. m.', titulo: 'Ideas y sugerencias del público', descripcion: 'Aportes y recomendaciones de los participantes.' },
        { hora: '5:40 p. m.', titulo: 'Presentación de premios y cierre', descripcion: 'Anuncio de premios y cierre de la primera jornada.' },
      ],
    },
    {
      dia: 'Sábado 07 de noviembre',
      horario: '8:00 a. m. – 7:00 p. m.',
      hitos: [
        { hora: '8:00 a. m.', titulo: 'Bienvenida de participantes', descripcion: 'Recepción de participantes e inicio del evento.' },
        { hora: '8:30 a. m.', titulo: 'Palabras de los organizadores', descripcion: 'Mensaje de bienvenida e introducción al Challenge.' },
        { hora: '9:00 a. m.', titulo: 'Networking', descripcion: 'Conecta con otros participantes y genera nuevas alianzas.' },
        { hora: '9:45 a. m.', titulo: 'Dinámica: Escoge al CEO', descripcion: 'Selección del líder que representará al equipo.' },
        { hora: '10:15 a. m.', titulo: 'Formación de equipos', descripcion: 'Los CEOs convocan participantes para conformar sus equipos.' },
        { hora: '10:45 a. m.', titulo: 'Comprensión del reto', descripcion: 'Identifica la problemática y conoce las necesidades del usuario.', tipo: 'reto' },
        { hora: '11:30 a. m.', titulo: 'Ideación y selección', descripcion: 'Propón ideas y elige la solución más viable.', tipo: 'reto' },
        { hora: '12:15 p. m.', titulo: 'Preparación para el desarrollo', descripcion: 'Organiza las ideas y define cómo construir la solución.', tipo: 'reto' },
        { hora: '12:30 p. m.', titulo: 'Almuerzo', descripcion: 'Espacio para compartir y recargar energías.', tipo: 'pausa' },
        { hora: '2:00 p. m.', titulo: 'Construcción del prototipo', descripcion: 'Desarrolla una primera versión demostrable de tu solución.', tipo: 'reto' },
        { hora: '4:00 p. m.', titulo: 'Validación con usuarios', descripcion: 'Prueba tu prototipo y recoge comentarios de usuarios reales.', tipo: 'reto' },
        { hora: '4:30 p. m.', titulo: 'Coffee break', descripcion: 'Pausa para compartir y recargar energías.', tipo: 'pausa' },
        { hora: '5:00 p. m.', titulo: 'Mejoras y preparación del pitch', descripcion: 'Incorpora mejoras y prepara la presentación de tu proyecto.', tipo: 'reto' },
        { hora: '5:30 p. m.', titulo: 'Presentación de proyectos', descripcion: 'Cada equipo presenta su solución y prototipo ante el jurado.' },
        { hora: '6:30 p. m.', titulo: 'Premiación y clausura', descripcion: 'Reconocimiento a los mejores equipos y cierre del evento.' },
      ],
    },
  ],

  premios: [
    { puesto: '1.er puesto', titulo: 'Sorpresa 🎁', descripcion: 'Muy pronto revelaremos el premio mayor.' },
    { puesto: '2.º puesto', titulo: 'Sorpresa 🎁', descripcion: 'Algo especial espera al segundo lugar.' },
    { puesto: '3.er puesto', titulo: 'Sorpresa 🎁', descripcion: 'El tercer lugar también se lleva lo suyo.' },
  ],

  faqs: [
    {
      pregunta: '¿El evento es gratuito?',
      respuesta:
        'Sí, la participación es totalmente gratuita. Solo necesitas registrarte con el botón "Regístrate" para asegurar tu lugar.',
    },
    {
      pregunta: '¿Quiénes pueden participar?',
      respuesta:
        'Emprendedores, estudiantes, profesionales y cualquier persona con ganas de innovar. No necesitas experiencia previa: el evento está pensado para conectar perfiles diversos.',
    },
    {
      pregunta: '¿Necesito llegar con una idea o un equipo armado?',
      respuesta:
        'No. Puedes llegar solo con tus ganas de aportar: el evento está diseñado justamente para que hagas match con otras personas y formes equipo ahí mismo. Si ya tienes una idea, ¡mejor todavía!',
    },
    {
      pregunta: '¿Cuándo y dónde se realiza?',
      respuesta:
        'El viernes 06 de noviembre de 3:00 p. m. a 6:00 p. m. y el sábado 07 de noviembre de 8:00 a. m. a 7:00 p. m., en el Auditorio del 5.º piso del Colegio de Ingenieros del Perú (Av. María Izaga N.º 680, Chiclayo).',
    },
    {
      pregunta: '¿Qué debo llevar?',
      respuesta: [
        'Documento Nacional de Identidad (DNI) u otro documento de identificación.',
        'Laptop (recomendable) y su cargador para trabajar con tu equipo.',
        'Celular con batería suficiente y acceso a WhatsApp para la coordinación del equipo.',
        'Material para tomar apuntes (opcional).',
        'Muchas ganas de colaborar, aprender, conectar con otros emprendedores y construir soluciones con impacto.',
      ],
    },
  ],

  organizadores: [
    { nombre: 'Incuba USS', logo: '/logos/logo_incuba.png' },
    { nombre: 'Incubadora de Empresas UNPRG', logo: '/logos/logo_incubaUNPRG.png' },
    { nombre: 'Plataforma Nómadas', logo: '/logos/logo_nomadas.png' },
    { nombre: 'CIP – Lambayeque', logo: '/logos/logo_colegioIngenieros.png' },
  ],

  redes: [
    { nombre: 'instagram', url: '', habilitado: false },
    { nombre: 'facebook', url: '', habilitado: false },
    { nombre: 'tiktok', url: '', habilitado: false },
  ],

  hashtags: [
    '#MatchAndBuildChallenge',
    '#IncubaUSS',
    '#IncubaUNPRG',
    '#Nómadas',
    '#CIPLambayeque',
    '#Innovación',
    '#Networking',
    '#Emprendimiento',
    '#TrabajoEnEquipo',
    '#Chiclayo',
    '#ConstruyeElFuturo',
  ],

  ctaFinal: {
    texto: '¡Trae tus ideas, encuentra tu equipo y construyamos el futuro juntos!',
    boton: 'Regístrate ahora',
  },

  juego: {
    hudLabel: 'EQUIPO',
    ceoBubbleIdle: 'Quiero formar mi equipo 🚀',
    candidatoBubbleIdle: '¡Elígeme!',
    candidatoBubbleGo: '¡Vamos! ⚡',
    ceoReaccion: '¡Excelente, {titulo} a bordo!',
    ceoReaccionesAleatorias: [
      '¡Únete al equipo!',
      '¡Súmate al reto!',
      '¡Buscamos a los mejores!',
      '¡Queremos tu talento!',
      '¡Se parte de nuestro equipo!',
    ],
    roles: {
      tecnologia: {
        etiqueta: 'Tecnología',
        titulo: 'CTO',
        ariaLabel: 'Reclutar a Tecnología',
        bubbleLlegada: 'Yo construiré la tecnología 💻',
      },
      marketing: {
        etiqueta: 'Marketing',
        titulo: 'CMO',
        ariaLabel: 'Reclutar a Marketing',
        bubbleLlegada: 'Yo crearé tu contenido 📣',
      },
      operaciones: {
        etiqueta: 'Operaciones',
        titulo: 'COO',
        ariaLabel: 'Reclutar a Operaciones',
        bubbleLlegada: 'Yo apoyaré en los procesos ⚙️',
      },
      finanzas: {
        etiqueta: 'Finanzas',
        titulo: 'CFO',
        ariaLabel: 'Reclutar a Finanzas',
        bubbleLlegada: 'Yo manejaré las finanzas del equipo 📊',
      },
    },
    construyendo: 'Construyendo la próxima gran empresa…',
    win: '¡WIN!',
    tarjetaFinal: {
      texto: 'Así se siente hacer match. Vívelo en persona.',
      botonRegistro: 'Regístrate gratis',
      botonReset: 'Jugar de nuevo',
    },
  },
};
