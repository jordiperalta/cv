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

<style>
  .header {
    flex: 0 0 12.5%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: #ffffff;
    background-image: linear-gradient(125deg, #485e88 0%, #485e88 7.5%, #6e7fa1 20%,#ffffff 45%);
  }

  .header p {
    margin: 0;
    padding: .5rem .75rem;
    line-height: 1.125;
    font-size: 3.25rem;
    font-weight: 300;
  }

  .qr-code {
    --qr-background: #ffffff3f;
  }

  .qr-code :global(svg rect) {
    fill: var(--qr-background);
  }

  @media screen and (max-width: 600px) {
    .header {
      background-image: linear-gradient(115deg, #485e88 0%, #485e88 35%, #6e7fa1 47.5%,#ffffff 80%);
    }

    .header > div:first-child {
      width: 100%;
    }

    .header .qr-code {
      --qr-background: #ffffff0f;
      padding: 4px;
      opacity: .125;
      transition: opacity 350ms ease-in-out;
    }

    .header:hover .qr-code {
      opacity: 1;
    }
  }
</style>
