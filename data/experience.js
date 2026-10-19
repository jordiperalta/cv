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
      'Provide **support to merchants** integrating **e-commerce** with the company payment gateway, including the development of scripts and plugins in TypeScript/JavaScript, and accessing to the client\'s back-office.',
      'Development of backend applications (PHP5.6 and PHP7.4) for the in-house accounting department internal back-office.',
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
      'Public works electrical installation engineering projects; on-site assembly and installation of electrical panels, PLC and SCADA programming, and budgeting for public works projects (TCQ software).',
      'Experience working on projects for clients such as [Aeroports de Catalunya](https://aeroports.gencat.cat) (La Seu d’Urgell Airport), [ATLL Concessionària de la Generalitat S.A.](https://www.atl.cat), and the [Meteorological Service of Catalonia](https://www.meteo.cat).',
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
      'Ramp Coordinator at Barcelona Airport. Responsibilities include coordinating catering, maintenance, cleaning, refueling, boarding, and passenger assistance (PRM) services.',
      'Provided flight crews with weather information, flight plans, and load sheets. Supervised baggage and cargo loading. Assisted with aircraft pushback.',
      'Experience handling more than 20 airlines, including Air Berlin, American Airlines, Brussels Airlines, Czech Airlines, TAP Portugal, Norwegian Air Shuttle, Orenair, Pegasus Airlines, SAS Scandinavian Airlines, Swiss International Airlines, Transavia, Transaero, and others.',
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
      'Handling operator at Barcelona Airport: check-in, boarding, sales, airside coordination, and operations console.',
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
      'Application development for G5 servo control and Trajexia motion control.',
      'E-learning course design for MX-2 frequency controllers.',
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
      es: 'Proporcionar **soporte a comercios** que integran **e-commerce** con la pasarela de pagos de la empresa, incluyendo el desarrollo de scripts y plugins en TypeScript/JavaScript y el acceso al back-office del cliente.',
      ca: 'Donar **suport als comerços** que integren **e-commerce** amb la passarel·la de pagaments de l’empresa, incloent-hi el desenvolupament de scripts i plugins amb TypeScript/JavaScript i l’accés al back-office del client.',
    },
    1: {
      es: 'Desarrollo de aplicaciones backend (PHP 5.6 y PHP 7.4) para el back-office interno del departamento de contabilidad.',
      ca: 'Desenvolupament d’aplicacions backend (PHP 5.6 i PHP 7.4) per al back-office intern del departament de comptabilitat.',
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
      es: 'Proyectos de ingeniería de instalaciones eléctricas en obra pública, montaje e instalación en campo de cuadros eléctricos, programación de PLC y SCADA, y elaboración de presupuestos de proyectos de obra pública (software TCQ).',
      ca: 'Projectes d’enginyeria d’instal·lacions elèctriques en obra pública, muntatge i instal·lació sobre el terreny de quadres elèctrics, programació de PLC i SCADA, i pressupostos de projectes d’obra pública (programari TCQ).',
    },
    1: {
      es: 'Experiencia en proyectos para clientes como [Aeroports de Catalunya](https://aeroports.gencat.cat) (Aeropuerto de La Seu d’Urgell), [ATLL Concessionària de la Generalitat S.A.](https://www.atl.cat) y el [Servicio Meteorológico de Cataluña](https://www.meteo.cat).',
      ca: 'Experiència en projectes per a clients com [Aeroports de Catalunya](https://aeroports.gencat.cat) (Aeroport de la Seu d’Urgell), [ATLL Concessionària de la Generalitat S.A.](https://www.atl.cat) i el [Servei Meteorològic de Catalunya](https://www.meteo.cat).',
    },
  },
  4: {
    0: {
      es: 'Coordinador de rampa en el aeropuerto de Barcelona. Entre las responsabilidades se incluyen coordinar los servicios de catering, mantenimiento, limpieza, repostaje, embarque y asistencia a pasajeros con movilidad reducida (PMR).',
      ca: 'Coordinador de rampa a l’aeroport de Barcelona. Les responsabilitats inclouen coordinar els serveis de càtering, manteniment, neteja, proveïment de combustible, embarcament i assistència a passatgers amb mobilitat reduïda (PMR).',
    },
    1: {
      es: 'Suministro a la tripulación de información meteorológica, planes de vuelo y hojas de carga. Supervisión de la carga de equipaje y mercancías. Puesta en marcha de aeronaves (push-back).',
      ca: 'Subministrament a la tripulació d’informació meteorològica, plans de vol i fulls de càrrega. Supervisió de la càrrega d’equipatge i mercaderies. Posada en marxa d’aeronaus (push-back).',
    },
    2: {
      es: 'Experiencia en la atención en escala de más de 20 compañías, como Air Berlin, American Airlines, Brussels Airlines, Czech Airlines, TAP Portugal, Norwegian Air Shuttle, Orenair, Pegasus Airlines, SAS Scandinavian Airlines, Swiss International Air Lines, Transavia, Transaero, entre otras.',
      ca: 'Experiència en l’atenció en escala de més de 20 companyies, com Air Berlin, American Airlines, Brussels Airlines, Czech Airlines, TAP Portugal, Norwegian Air Shuttle, Orenair, Pegasus Airlines, SAS Scandinavian Airlines, Swiss International Air Lines, Transavia, Transaero, entre d’altres.',
    },
  },
  5: {
    0: {
      es: 'Operario de handling en el aeropuerto de Barcelona: facturación, embarque, ventas, coordinación en pista y consola de operaciones.',
      ca: 'Operari de handling a l’aeroport de Barcelona: facturació, embarcament, vendes, coordinació en pista i consola d’operacions.',
    },
  },
  6: {
    0: {
      es: 'Desarrollo de aplicaciones para el control de servos G5 y el control de movimiento Trajexia.',
      ca: 'Desenvolupament d’aplicacions per al control de servos G5 i el control de moviment Trajexia.',
    },
    1: {
      es: 'Diseño de cursos de formación en línea para variadores de frecuencia MX-2.',
      ca: 'Disseny de cursos de formació en línia per als variadors de freqüència MX-2.',
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
