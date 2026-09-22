import { localized } from './i18n.js';

export const commonLabels = {
  language: localized('common.language', { en: 'Language', es: 'Idioma', ca: 'Llengua' }),
  experience: localized('common.experience', { en: 'Experience', es: 'Experiencia', ca: 'Experiència' }),
  educationCourses: localized('common.educationCourses', { en: 'Education & Courses', es: 'Formación y cursos', ca: 'Formació i cursos' }),
  contactInfo: localized('common.contactInfo', { en: 'Contact Info', es: 'Info. contacto', ca: 'Info. contacte' }),
  saveAsPdf: localized('common.saveAsPdf', { en: 'Save as PDF', es: 'Guardar como PDF', ca: 'Desar com a PDF' }),
  present: localized('common.present', { en: 'Present', es: 'Actualidad', ca: 'Actualitat' }),
  closeDialog: localized('common.closeDialog', { en: 'Close dialog', es: 'Cerrar diálogo', ca: 'Tancar el diàleg' }),
  copyCommand: localized('common.copyCommand', { en: 'Copy command', es: 'Copiar comando', ca: 'Copiar ordre' }),
  commandCopied: localized('common.commandCopied', { en: 'Command copied', es: 'Comando copiado', ca: 'Ordre copiada' }),
  containerImage: localized('common.containerImage', { en: 'Container Image', es: 'Imagen de contenedor', ca: 'Imatge de contenidor' }),
  scanQrCode: localized('common.scanQrCode', { en: 'Scan the', es: 'Escanea el', ca: 'Escaneja el' }),
  qrCode: localized('common.qrCode', { en: 'QR Code', es: 'código QR', ca: 'codi QR' }),
  orClick: localized('common.orClick', { en: 'or click on this', es: 'o haz clic en este', ca: 'o fes clic en aquest' }),
  link: localized('common.link', { en: 'link', es: 'enlace', ca: 'enllaç' }),
  openNewWindow: localized('common.openNewWindow', { en: 'to open in a new window', es: 'para abrirlo en una ventana nueva', ca: 'per obrir-lo en una finestra nova' }),
  professionalTimeline: localized('common.professionalTimeline', { en: 'Professional experience timeline', es: 'Línea temporal de experiencia profesional', ca: 'Línia temporal d’experiència professional' }),
  educationTimeline: localized('common.educationTimeline', { en: 'Education timeline', es: 'Línea temporal de educación', ca: 'Línia temporal d’educació' }),
  pixelatedProfile: localized('common.pixelatedProfile', { en: 'Pixelated profile', es: 'Perfil pixelado', ca: 'Perfil pixelat' }),
  imagePixelationResolution: localized('common.imagePixelationResolution', { en: 'Image pixelation resolution', es: 'Resolución de pixelado de imagen', ca: 'Resolució de pixelació de la imatge' }),
};

export const contactModalContent = localized('common.contactModalContent', {
  en: `This CV-Portfolio is available as a container image ([Docker](https://www.docker.com/)/[Podman](https://podman.io/)).
You can explore the repository in [{docker}](https://{docker}).
If you like to, you can also run the published image locally following the instructions below.

---

Run the image and map its HTTP port to port 8173 on your machine:

\`\`\`sh
docker run --rm -p 8173:80 {docker}
\`\`\`

Open [http://localhost:8173](http://localhost:8173) in a browser.

Press \`Ctrl+C\` to stop the container.`,
  es: `Este CV-Portfolio está disponible como imagen de contenedor ([Docker](https://www.docker.com/)/[Podman](https://podman.io/)).
Puedes explorar el repositorio en [{docker}](https://{docker}).
Si quieres, también puedes ejecutar la imagen publicada localmente siguiendo las instrucciones siguientes.

---

Ejecuta la imagen y asigna su puerto HTTP al puerto 8173 de tu máquina:

\`\`\`sh
docker run --rm -p 8173:80 {docker}
\`\`\`

Abre [http://localhost:8173](http://localhost:8173) en un navegador.

Pulsa \`Ctrl+C\` para detener el contenedor.`,
  ca: `Aquest CV-Portfolio està disponible com a imatge de contenidor ([Docker](https://www.docker.com/)/[Podman](https://podman.io/)).
Pots explorar el repositori a [{docker}](https://{docker}).
Si vols, també pots executar la imatge publicada localment seguint les instruccions següents.

---

Executa la imatge i assigna el seu port HTTP al port 8173 de la teva màquina:

\`\`\`sh
docker run --rm -p 8173:80 {docker}
\`\`\`

Obre [http://localhost:8173](http://localhost:8173) en un navegador.

Prem \`Ctrl+C\` per aturar el contenidor.`,
});
