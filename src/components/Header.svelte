<script>
  import { personalData } from '../../data/personal.js';
  import QRcode from './QRcode.svelte'
</script>

<div class="header">
  <div>
      <p>{personalData.firstName}<br />{personalData.lastName}</p>
  </div>
  <div class="qr-code">
    {#if personalData.website}
      <a href={`https://${personalData.website}`} target="_blank" rel="noopener noreferrer">
        <QRcode/>
      </a>
    {:else}
      <QRcode/>
    {/if}
  </div>
</div>