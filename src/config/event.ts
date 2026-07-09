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
  faqs: { pregunta: string; respuesta: string }[];
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
  urlRegistro: 'https://somosnomadas.vercel.app/',

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
      titulo: 'Dinámicas colaborativas',
      descripcion:
        'Actividades diseñadas para romper el hielo, conocer talento y descubrir con quién hacer match.',
      color: 'tecnologia',
    },
    {
      titulo: 'Ponencias inspiradoras',
      descripcion:
        'Historias y aprendizajes de quienes ya están construyendo proyectos con impacto real.',
      color: 'marketing',
    },
    {
      titulo: 'Networking estratégico',
      descripcion:
        'Conecta con emprendedores, estudiantes y profesionales que comparten tus ganas de innovar.',
      color: 'operaciones',
    },
    {
      titulo: 'Innovación abierta',
      descripcion:
        'Espacios para crear soluciones a desafíos reales y convertir ideas en oportunidades.',
      color: 'finanzas',
    },
  ],

  agenda: [
    {
      dia: 'Jueves 04 de septiembre',
      horario: '3:00 p. m. – 6:00 p. m.',
      hitos: [
        { hora: '3:00 p. m.', titulo: 'Registro y bienvenida', descripcion: 'Acreditación de participantes y apertura del evento.' },
        { hora: '3:30 p. m.', titulo: 'Ponencia inaugural', descripcion: 'Por definir.' },
        { hora: '4:30 p. m.', titulo: 'Dinámicas colaborativas', descripcion: 'Actividades para conocer talento y formar conexiones.' },
        { hora: '5:30 p. m.', titulo: 'Networking y cierre del día', descripcion: 'Espacio libre para conectar con otros participantes.' },
      ],
    },
    {
      dia: 'Viernes 05 de septiembre',
      horario: '8:00 a. m. – 7:00 p. m.',
      hitos: [
        { hora: '8:00 a. m.', titulo: 'Acreditación', descripcion: 'Ingreso y bienvenida al segundo día.' },
        { hora: '9:00 a. m.', titulo: 'Ponencias inspiradoras', descripcion: 'Por definir.' },
        { hora: '11:00 a. m.', titulo: 'Formación de equipos', descripcion: 'Haz match y arma tu equipo multidisciplinario.' },
        { hora: '2:00 p. m.', titulo: 'Innovación abierta', descripcion: 'Desarrollo de soluciones a desafíos reales.' },
        { hora: '5:00 p. m.', titulo: 'Presentación de proyectos', descripcion: 'Cada equipo presenta su propuesta.' },
        { hora: '6:30 p. m.', titulo: 'Premiación y cierre', descripcion: 'Reconocimiento a los mejores equipos.' },
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
        'El jueves 04 de septiembre de 3:00 p. m. a 6:00 p. m. y el viernes 05 de septiembre de 8:00 a. m. a 7:00 p. m., en el Auditorio del 5.º piso del Colegio de Ingenieros del Perú (Av. María Izaga N.º 680, Chiclayo).',
    },
    {
      pregunta: '¿Qué debo llevar?',
      respuesta:
        'Tu documento de identidad para la acreditación y, si tienes, una laptop para trabajar con tu equipo el segundo día. Lo más importante: actitud colaborativa y ganas de construir.',
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
