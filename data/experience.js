import { localized } from './i18n.js';

const experienceRecords = [
  {
    title: 'Full-Stack Software Developer & DevOps',
    entity: 'Alma IT Systems SL',
    location: 'Barcelona, ES',
    periods: [
      { startDate: '2020-12-21', endDate: 'Present' },
    ],
    mainTasks: [
      'Development of a zero-footprint **Digital Pathology Viewer** compatible with **DICOMweb** and **FHIR**, developed in **JS/TS/React** for [CIMD](https://www.tauli.cat/es/udiat/cimd)/[IDI](https://idi.gencat.cat/). Public contract: [24SER0869](https://contractaciopublica.cat/portal-api/descarrega-document/300404382/5B53B246142DAC56C6450CAEA32A896A). ([+info](https://www.infoconcurso.com/2024/1830893-servicios-tic-proyectos-patologia-digital-24ser0869))',
      'Development of the **Alma CLINIC** DICOMweb **Radiology Viewer** (ReactJS).',
      'Development of the **Alma HEALTH** Healthcare platform: Backend **PHP Symfony/Doctrine ORM/Redis/API GraphQL**, Frontend **ReactJS/Material UI**, **OpenID** configuration and integration with **Keycloak** IdP and **DCM4CHEE** PACS.',
      'Software deployment with **Jenkins** in the **AWS** *cloud* environment (**EC2**, **Fargate**, **ECR**, **RDS**, **Beanstalk**) and *on-premise* with **Docker/Podman** on **Linux** distributions in hospital environments: [Aragon Salud](https://www.aragon.es/gobierno/salud), [Sergas](https://www.sergas.gal/), [Hospital Italiano](https://www.hospitalitaliano.org.ar), [Hospital de Granollers](https://alma-health.fphag.org/), [Clínica Olivé Gumà](https://www.clinicaoliveguma.es/), [Hospital Clínic](https://www.clinicbarcelona.org/), [Althaia](https://www.althaia.cat/)...',
      'Development and deployment of an **orchestration** service connected via **REST API** + **DIMSE** to the AI systems [Rayscape](https://rayscape.ai/) and [Cardiolyse](https://cardiolyse.com/) for the [ICS](https://ics.gencat.cat/) Rural Areas pilot project, integrated into the **Alma HEALTH** platform.',
      'Application maintenance and incident resolution in both *cloud* and *on-premise* environments.'
    ],
  },
  {
    title: 'Technical Support Manager / Backend Developer',
    entity: 'NordPay Financial',
    location: 'Barcelona, ES',
    periods: [
      { startDate: '2016-10-03', endDate: '2020-11-30' },
    ],
    mainTasks: [
      'Provide **support to merchants** integrating **e-commerce** with the company payment gateway, including the development of scripts and plugins, and accessing to the client\'s back-office.',
      'Development of backend applications for the in-house accounting department internal back-office.',
    ],
  },
  {
    title: 'Web Developer',
    entity: 'Freelance',
    location: 'Barcelona, ES',
    periods: [
      { startDate: '2015-05-02', endDate: '2016-09-30' },
    ],
    mainTasks: [
      'Assisted in the development of client websites using HTML, CSS, and JavaScript.',
    ],
  },
  {
    title: 'Public works engineering. Draftsman. Automation Technician.',
    entity: 'Ingenieros Consultores Barenton',
    location: 'Barcelona, ES',
    periods: [
      { startDate: '2014-01-08', endDate: '2014-08-03' },
      { startDate: '2015-01-03', endDate: '2015-02-28' },
    ],
    mainTasks: [
      'Assisted in the development of client websites using HTML, CSS, and JavaScript.',
    ],
  },
  {
    title: 'Flight Dispatcher (Aeroport de Barcelona).',
    entity: 'Swissport Spain S.L.',
    location: 'El Prat de Llobregat, ES',
    periods: [
      { startDate: '2013-07-10', endDate: '2013-11-03' },
    ],
    mainTasks: [
      'Assisted in the development of client websites using HTML, CSS, and JavaScript.',
    ],
  },
  {
    title: 'Handling Operator (Aeroport de Barcelona).',
    entity: 'Airport Ground Assistance',
    location: 'El Prat de Llobregat, ES',
    periods: [
      { startDate: '2013-05-02', endDate: '2013-06-30' },
    ],
    mainTasks: [
      'Assisted in the development of client websites using HTML, CSS, and JavaScript.',
    ],
  },
  {
    title: 'Motor Control & Servos Development Technician.',
    entity: 'Omron Europe B.V.',
    location: 'Barcelona, ES',
    periods: [
      { startDate: '2011-10-15', endDate: '2012-04-15' },
    ],
    mainTasks: [
      'Assisted in the development of client websites using HTML, CSS, and JavaScript.',
    ],
  },
];

const experienceTaskTranslations = {
  0: {
    0: {
      es: 'Proyecto de **Visor de Anatomía Patológica** zero-footprint compatible con **DICOMweb** y **FHIR**, desarrollado en **JS/TS/React** para [CIMD](https://www.tauli.cat/es/udiat/cimd)/[IDI](https://idi.gencat.cat/). Contrato público: [24SER0869](https://contractaciopublica.cat/portal-api/descarrega-document/300404382/5B53B246142DAC56C6450CAEA32A896A). ([+info](https://www.infoconcurso.com/2024/1830893-servicios-tic-proyectos-patologia-digital-24ser0869))',
      ca: 'Projecte de **Visor d\'Anatomia Patològica** zero-footprint compatible amb **DICOMweb** i **FHIR**, desenvolupat en **JS/TS/React** per a [CIMD](https://www.tauli.cat/es/udiat/cimd)/[IDI](https://idi.gencat.cat/). Contracte públic: [24SER0869](https://contractaciopublica.cat/portal-api/descarrega-document/300404382/5B53B246142DAC56C6450CAEA32A896A). ([+info](https://www.infoconcurso.com/2024/1830893-servicios-tic-proyectos-patologia-digital-24ser0869))',
    },
    1: {
      es: 'Desarrollo del **Visor Radiológico** DICOMweb **Alma CLINIC** (ReactJS).',
      ca: 'Desenvolupament del **Visor Radiològic** DICOMweb **Alma CLINIC** (ReactJS).',
    },
    2: {
      es: 'Desarrollo de la plataforma Healthcare **Alma HEALTH**: Backend **PHP Symfony/Doctrine ORM/Redis/API GraphQL**, Frontend **ReactJS/Material UI**, configuración e integración **OpenID** con IdP **Keycloak** y PACS **DCM4CHEE**.',
      ca: 'Desenvolupament de la plataforma Healthcare **Alma HEALTH**: Backend **PHP Symfony/Doctrine ORM/Redis/API GraphQL**, Frontend **ReactJS/Material UI**, configuració i integració **OpenID** amb IdP **Keycloak** i PACS **DCM4CHEE**.',
    },
    3: {
      es: 'Despliegue del software con **Jenkins** en entorno *cloud* **AWS** (**EC2**, **Fargate**, **ECR**, **RDS**, **Beanstalk**) y *on-premise* con **Docker/Podman** sobre distribuciones **Linux** en entorno hospitalario: [Aragon Salud](https://www.aragon.es/gobierno/salud), [Sergas](https://www.sergas.gal/), [Hospital Italiano](https://www.hospitalitaliano.org.ar), [Hospital de Granollers](https://alma-health.fphag.org/), [Clínica Olivé Gumà](https://www.clinicaoliveguma.es/), [Hospital Clínic](https://www.clinicbarcelona.org/), [Althaia](https://www.althaia.cat/)...',
      ca: 'Desplegament del programari amb **Jenkins** en entorn *cloud* **AWS** (**EC2**, **Fargate**, **ECR**, **RDS**, **Beanstalk**) i *on-premise* amb **Docker/Podman** sobre distribucions **Linux** en entorn hospitalari: [Aragon Salud](https://www.aragon.es/gobierno/salud), [Sergas](https://www.sergas.gal/), [Hospital Italiano](https://www.hospitalitaliano.org.ar), [Hospital de Granollers](https://alma-health.fphag.org/), [Clínica Olivé Gumà](https://www.clinicaoliveguma.es/), [Hospital Clínic](https://www.clinicbarcelona.org/), [Althaia](https://www.althaia.cat/)...',
    },
    4: {
      es: 'Desarrollo y despliegue de un servicio de **orquestación** con conexión mediante **REST API** + **DIMSE** con las IA [Rayscape](https://rayscape.ai/) y [Cardiolyse](https://cardiolyse.com/) para el proyecto piloto de Zonas Rurales [ICS](https://ics.gencat.cat/), integrado en la plataforma **Alma HEALTH**.',
      ca: 'Desenvolupament i desplegament d\'un servei d\'**orquestració** amb connexió mitjançant **REST API** + **DIMSE** amb les IA [Rayscape](https://rayscape.ai/) i [Cardiolyse](https://cardiolyse.com/) per al projecte pilot de Zones Rurals [ICS](https://ics.gencat.cat/), integrat a la plataforma **Alma HEALTH**.',
    },
    5: {
      es: 'Mantenimiento y resolución de incidencias de las aplicaciones tanto en entorno *cloud* como *on-premise*.',
      ca: 'Manteniment i resolució d\'incidències de les aplicacions tant en entorn *cloud* com *on-premise*.',
    },
  },
  1: {
    0: {
      es: 'Proporcionar **soporte a comercios** que integran **e-commerce** con la pasarela de pagos de la empresa, incluyendo el desarrollo de scripts y plugins y el acceso al back-office del cliente.',
      ca: 'Donar **suport als comerços** que integren **e-commerce** amb la passarel·la de pagaments de l’empresa, incloent-hi el desenvolupament de scripts i plugins i l’accés al back-office del client.',
    },
    1: {
      es: 'Desarrollo de aplicaciones backend para el back-office interno del departamento contable.',
      ca: 'Desenvolupament d’aplicacions backend per al back-office intern del departament comptable.',
    },
  },
  2: {
    0: {
      es: 'Colaboración en el desarrollo de sitios web para clientes utilizando HTML, CSS y JavaScript.',
      ca: 'Col·laboració en el desenvolupament de llocs web per a clients utilitzant HTML, CSS i JavaScript.',
    },
  },
  3: {
    0: {
      es: 'Colaboración en el desarrollo de sitios web para clientes utilizando HTML, CSS y JavaScript.',
      ca: 'Col·laboració en el desenvolupament de llocs web per a clients utilitzant HTML, CSS i JavaScript.',
    },
  },
  4: {
    0: {
      es: 'Colaboración en el desarrollo de sitios web para clientes utilizando HTML, CSS y JavaScript.',
      ca: 'Col·laboració en el desenvolupament de llocs web per a clients utilitzant HTML, CSS i JavaScript.',
    },
  },
  5: {
    0: {
      es: 'Colaboración en el desarrollo de sitios web para clientes utilizando HTML, CSS y JavaScript.',
      ca: 'Col·laboració en el desenvolupament de llocs web per a clients utilitzant HTML, CSS i JavaScript.',
    },
  },
  6: {
    0: {
      es: 'Colaboración en el desarrollo de sitios web para clientes utilizando HTML, CSS y JavaScript.',
      ca: 'Col·laboració en el desenvolupament de llocs web per a clients utilitzant HTML, CSS i JavaScript.',
    },
  },
};

export const experienceData = experienceRecords.map((record, recordIndex) => ({
  ...record,
  title: localized(`experience.${recordIndex}.title`, { en: record.title }),
  entity: localized(`experience.${recordIndex}.entity`, { en: record.entity }),
  location: localized(`experience.${recordIndex}.location`, { en: record.location }),
  mainTasks: record.mainTasks.map((task, taskIndex) =>
    localized(`experience.${recordIndex}.task.${taskIndex}`, {
      en: task,
      ...(experienceTaskTranslations[recordIndex]?.[taskIndex] ?? {}),
    }),
  ),
}));
