<script>
  import { QrCode } from '@nomideusz/svelte-qr';
  import { personalData } from '../../data/personal.js';

  const websiteUrl = `https://${personalData.website}`;
</script>

<QrCode
  data={websiteUrl}
  size={125}
  foreground="#536aa8"
  background="#ffffff3f"
  padding={3}
  label={`QR code for ${personalData.firstName} ${personalData.lastName}'s CV`}
/>
