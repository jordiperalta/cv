<script>
  import qrCodeUrl from '../../assets/qr-jordiperalta-cv.svg';
  import { personalData } from '../../data/personal.js';
</script>

<img
    alt={`QR code for ${personalData.firstName} ${personalData.lastName}'s CV`}
    src={qrCodeUrl}
/>