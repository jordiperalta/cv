import { localized } from './i18n.js';

export const skillsData = {
  frontend: [
    'HTML5',
    'CSS3',
    'JavaScript',
    'TypeScript',
    'ReactJS',
    'Tailwind CSS',
    'Material UI',
    'Bootstrap',
  ],
  backend: [
    'PHP',
    'Symfony',
    'Doctrine',
  ],
  databases: [
    'MySQL/MariaDB',
    'Redis',
  ],
  devops: [
    'Docker',
    'Linux',
    'Bash Scripting',
    'Nginx',
    'AWS',
    'Terraform',
    'Jenkins',
  ],
  apisAndStandards: [
    'REST API',
    'GraphQL',
    'DICOMweb',
    'DIMSE',
  ],
  security: [
    'Keycloak',
    'JWT',
    'OpenID Connect',
    'RBAC',
  ],
  tools: [
    'Git',
    'Sourcetree',
    'Bitbucket',
    'JIRA',
  ],
  methodologies: [
    'Kanban',
    'Scrum',
  ],
};

export const skillCategoryDescriptions = {
  frontend: localized('skills.categories.frontend', {
    en: 'Frontend development',
    es: 'Desarrollo frontend',
    ca: 'Desenvolupament frontend',
  }),
  backend: localized('skills.categories.backend', {
    en: 'Backend development',
    es: 'Desarrollo backend',
    ca: 'Desenvolupament backend',
  }),
  databases: localized('skills.categories.databases', {
    en: 'Database technologies',
    es: 'Tecnologías de bases de datos',
    ca: 'Tecnologies de bases de dades',
  }),
  devops: localized('skills.categories.devops', {
    en: 'DevOps and infrastructure',
    es: 'DevOps e infraestructura',
    ca: 'DevOps i infraestructura',
  }),
  apisAndStandards: localized('skills.categories.apisAndStandards', {
    en: 'APIs and standards',
    es: 'API y estándares',
    ca: 'API i estàndards',
  }),
  security: localized('skills.categories.security', {
    en: 'Security and identity',
    es: 'Seguridad e identidad',
    ca: 'Seguretat i identitat',
  }),
  tools: localized('skills.categories.tools', {
    en: 'Development tools',
    es: 'Herramientas de desarrollo',
    ca: 'Eines de desenvolupament',
  }),
  methodologies: localized('skills.categories.methodologies', {
    en: 'Methodologies and practices',
    es: 'Metodologías y prácticas',
    ca: 'Metodologies i pràctiques',
  }),
};
