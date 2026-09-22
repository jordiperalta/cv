import { localized } from './i18n.js';

export const aboutMe = {
    title: localized('about.title', {
        en: "Full-Stack Software Developer",
        es: "Full-Stack Software Developer",
        ca: "Full-Stack Software Developer",
    }),
    subtitle: localized('about.subtitle', {
        en: "TypeScript / React · PHP / Symfony · DevOps / Docker / AWS",
        es: "TypeScript / React · PHP / Symfony · DevOps / Docker / AWS",
        ca: "TypeScript / React · PHP / Symfony · DevOps / Docker / AWS",
    }),
    summary: [
        localized('about.summary.0', {
            en: "Full-stack web developer with a strong focus on **JavaScript/TypeScript, React** on the frontend, **PHP/Symfony** on the backend, managing tools such as **Docker, Nginx, Jenkins** for DevOps and deployment.",
            es: "Desarrollador web full-stack especializado en **JavaScript/TypeScript y React** en frontend, **PHP/Symfony** en backend, y herramientas como **Docker, Nginx y Jenkins** para DevOps y despliegues.",
            ca: "Desenvolupador web full-stack especialitzat en **JavaScript/TypeScript i React** al frontend, **PHP/Symfony** al backend, i eines com **Docker, Nginx i Jenkins** per a DevOps i desplegaments.",
        }),
        localized('about.summary.1', {
            en: "I have experience across the full software lifecycle, from development and version control to **cloud deployment, customer installations, maintenance and technical troubleshooting**.",
            es: "Tengo experiencia en todo el ciclo de vida del software, desde el desarrollo y el control de versiones hasta el **despliegue en la nube, las instalaciones de clientes, el mantenimiento y la resolución técnica de incidencias**.",
            ca: "Tinc experiència en tot el cicle de vida del programari, des del desenvolupament i el control de versions fins al **desplegament al núvol, les instal·lacions de clients, el manteniment i la resolució tècnica d'incidències**.",
        }),
        localized('about.summary.2', {
            en: "I currently work in the **medical imaging and healthcare software** sector, developing applications and deploying them both in **customer environments** (over Linux Ubuntu/RHEL/CentOS) and **cloud infrastructures** using **AWS**.",
            es: "Actualmente trabajo en el sector del **software de imagen médica y sanitario**, desarrollando aplicaciones y desplegándolas tanto en **entornos de clientes** (sobre Linux Ubuntu/RHEL/CentOS) como en **infraestructuras cloud** mediante **AWS**.",
            ca: "Actualment treballo en el sector del **programari d'imatge mèdica i sanitari**, desenvolupant aplicacions i desplegant-les tant en **entorns de clients** (sobre Linux Ubuntu/RHEL/CentOS) com en **infraestructures cloud** mitjançant **AWS**.",
        }),
    ],
}

