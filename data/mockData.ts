import { User, UserRole, Question, QuestionDifficulty, LearningModule, QuizResult } from '../types';

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Juan Pérez',
    email: 'aspirante@sena.co',
    role: UserRole.ASPIRANT,
    targetRole: 'Técnico',
    progress: 40,
    avatarUrl: 'https://picsum.photos/200'
  },
  {
    id: 'u2',
    name: 'Admin Equipo',
    email: 'admin@equipo.co',
    role: UserRole.ADMIN,
    progress: 100,
    avatarUrl: 'https://picsum.photos/201'
  }
];

export const MOCK_QUESTIONS: Question[] = [
  {
    id: 'q1',
    text: 'Un ciudadano se acerca a su puesto de trabajo muy alterado reclamando por un trámite demorado. ¿Usted qué hace?',
    options: [
      'Le pide que se calme o llame a seguridad.',
      'Lo ignora hasta que baje el tono de voz.',
      'Escucha activamente, mantiene la calma y busca una solución.',
      'Le indica que debe poner una queja por escrito.'
    ],
    correctAnswer: 2,
    explanation: 'La escucha activa y el autocontrol son competencias clave en la atención al ciudadano (Servicio al Cliente).',
    category: 'Competencias Comportamentales',
    difficulty: QuestionDifficulty.MEDIUM
  },
  {
    id: 'q2',
    text: '¿Cuál es la función principal de la tecla "Tab" en un procesador de texto?',
    options: [
      'Borrar el carácter anterior.',
      'Insertar una sangría o mover el cursor a la siguiente parada.',
      'Guardar el documento automáticamente.',
      'Cerrar la aplicación.'
    ],
    correctAnswer: 1,
    explanation: 'La tecla Tabulación (Tab) se utiliza para organizar texto mediante sangrías o navegar entre campos.',
    category: 'Ofimática',
    difficulty: QuestionDifficulty.EASY
  },
  {
    id: 'q3',
    text: 'En un equipo de trabajo, dos compañeros tienen un conflicto personal que afecta el rendimiento. Como líder, usted:',
    options: [
      'Los despide a ambos para dar ejemplo.',
      'Propicia un espacio de diálogo para mediar y llegar a acuerdos.',
      'Los separa de área para que no se hablen.',
      'Ignora la situación, es problema de ellos.'
    ],
    correctAnswer: 1,
    explanation: 'El liderazgo implica mediación y resolución de conflictos para mantener el clima laboral.',
    category: 'Liderazgo',
    difficulty: QuestionDifficulty.HARD
  },
  {
    id: 'q4',
    text: 'Complete la serie: 2, 4, 8, 16, ...',
    options: ['20', '24', '30', '32'],
    correctAnswer: 3,
    explanation: 'La serie duplica el número anterior (x2). 16 x 2 = 32.',
    category: 'Razonamiento Lógico',
    difficulty: QuestionDifficulty.EASY
  },
  {
    id: 'q5',
    text: 'La Misión del SENA se relaciona principalmente con:',
    options: [
      'Recaudar impuestos para la educación.',
      'Invertir en el desarrollo social y técnico de los trabajadores colombianos.',
      'Regular las leyes laborales del país.',
      'Ofrecer educación primaria a niños.'
    ],
    correctAnswer: 1,
    explanation: 'El SENA invierte en el desarrollo social y técnico de los trabajadores colombianos, ofreciendo y ejecutando la formación profesional integral.',
    category: 'Institucional',
    difficulty: QuestionDifficulty.MEDIUM
  }
];

export const MOCK_MODULES: LearningModule[] = [
  {
    id: 'm1',
    title: 'Cultura Institucional SENA',
    description: 'Conoce la misión, visión, símbolos y valores de la entidad.',
    content: `
      <h3>Identidad SENA</h3>
      <p>El Servicio Nacional de Aprendizaje (SENA) se encarga de cumplir la función que le corresponde al Estado de invertir en el desarrollo social y técnico de los trabajadores colombianos.</p>
      <p><strong>Misión:</strong> Ofrecer y ejecutar la formación profesional integral.</p>
      <p><strong>Visión:</strong> Ser una entidad de clase mundial en formación profesional integral.</p>
    `,
    isLocked: false,
    isCompleted: true,
    category: 'Institucional',
    duration: '15 min'
  },
  {
    id: 'm2',
    title: 'Atención al Ciudadano',
    description: 'Protocolos de servicio, manejo de PQRS y empatía.',
    content: `
      <h3>El Triángulo del Servicio</h3>
      <p>El servicio es un conjunto de estrategias que una empresa diseña para satisfacer, mejor que sus competidores, las necesidades y expectativas de sus clientes externos.</p>
      <ul>
        <li>Estrategia de servicio</li>
        <li>Sistemas</li>
        <li>Gente (Talento Humano)</li>
      </ul>
    `,
    isLocked: false,
    isCompleted: false,
    category: 'Servicio',
    duration: '20 min'
  },
  {
    id: 'm3',
    title: 'Herramientas TIC Básicas',
    description: 'Word, Excel, Correo electrónico y seguridad digital.',
    content: 'Contenido sobre herramientas ofimáticas...',
    isLocked: true,
    isCompleted: false,
    category: 'Ofimática',
    duration: '30 min'
  }
];

export const MOCK_RESULTS: QuizResult[] = [
  { id: 'r1', date: '2023-10-20T10:00:00Z', score: 60, totalQuestions: 10, passed: false, type: 'Simulacro' },
  { id: 'r2', date: '2023-10-22T14:30:00Z', score: 75, totalQuestions: 10, passed: true, type: 'Quiz Rápido' },
  { id: 'r3', date: '2023-10-25T09:15:00Z', score: 90, totalQuestions: 20, passed: true, type: 'Simulacro' },
];