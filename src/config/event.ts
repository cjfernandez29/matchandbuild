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
  agenda: {
    dia: string;
    horario: string;
    hitos: { hora: string; titulo: string; descripcion?: string }[];
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
  fechaInicio: '2026-09-04T15:00:00-05:00',
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
        { hora: '8:00 a. m.', titulo: 'Bienvenida de participantes', descripcion: 'Inicio del evento y recepción de participantes.' },
        { hora: '8:30 a. m.', titulo: 'Palabras de los organizadores', descripcion: 'Mensaje de bienvenida para iniciar el Challenge.' },
        { hora: '9:00 a. m.', titulo: 'Networking', descripcion: 'Conecta con otros participantes y genera nuevas alianzas.' },
        { hora: '9:45 a. m.', titulo: 'Dinámica: Escoge al CEO', descripcion: 'Define al líder que representará al equipo.' },
        { hora: '10:15 a. m.', titulo: 'Formación de equipos', descripcion: 'Los CEOs convocan participantes para formar equipos.' },
        { hora: '12:30 p. m.', titulo: 'Almuerzo', descripcion: '' },
        { hora: '2:00 p. m.', titulo: 'Desarrollo de proyectos', descripcion: 'Construcción de soluciones con apoyo de mentores.' },
        { hora: '4:30 p. m.', titulo: 'Coffee break', descripcion: '' },
        { hora: '5:00 p. m.', titulo: 'Presentación de proyectos', descripcion: 'Cada equipo presenta su propuesta al jurado.' },
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
