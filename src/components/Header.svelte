<script>
  import { personalData } from '../../data/personal.js';
  import { commonLabels } from '../../data/common.js';
  import { _ } from 'svelte-i18n';
  import QRcode from './QRcode.svelte'
  import Modal from './Modal.svelte';

  let qrDialogOpen = false;

  function openQrModal(event) {
    event.preventDefault();
    qrDialogOpen = true;
  }
</script>

<div class="header">
  <div>
      <p>{personalData.firstName}<br />{personalData.lastName}</p>
  </div>
  <div class="qr-code">
    {#if personalData.website}
      <a class="qr-screen-link" href={`https://${personalData.website}`} target="_blank" rel="noopener noreferrer" onclick={openQrModal}>
        <QRcode/>
      </a>
      <a class="qr-print-link" href={`https://${personalData.website}`} target="_blank" rel="noopener noreferrer">
        <QRcode/>
      </a>
    {:else}
      <QRcode/>
    {/if}
  </div>
</div>

<Modal bind:open={qrDialogOpen}>
  <div class="qr-modal-code">
    <QRcode />
  </div>
  <p>
    {$_(commonLabels.scanQrCode)} <b>{$_(commonLabels.qrCode)}</b> {$_(commonLabels.orClick)}
    <b><a href={`https://${personalData.website}`} target="_blank" rel="noopener noreferrer">{$_(commonLabels.link)}</a></b>
    {$_(commonLabels.openNewWindow)}.
  </p>
</Modal>

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

  .header .qr-code {
    --qr-background: #ffffff3f;
    padding: 10px 10px 0;
  }

  .qr-print-link {
    display: none;
  }

  .qr-code :global(svg rect) {
    fill: var(--qr-background);
  }

  :global(.modal-content) p {
    font-size: 1rem;
    font-weight: 350;
    text-align: center;
  }

  .qr-modal-code {
    --qr-modal-size: 300px;
    margin: 0 auto;
    height: var(--qr-modal-size);
    width: var(--qr-modal-size);
  }

  .qr-modal-code :global(svg) {
    margin: 0 auto;
    height: var(--qr-modal-size);
    width: var(--qr-modal-size);
  }

  @media screen and (max-width: 600px) {
    .header {
      background-image: linear-gradient(115deg, #485e88 0%, #485e88 35%, #6e7fa1 47.5%,#ffffff 80%);
    }

    .header > div:first-child {
      width: 100%;
    }

    .header .qr-code {
      --qr-background: #ffffff0a;
      padding: 6px 4px 2px;
      opacity: .05;
      transition: opacity 350ms ease-in-out;
    }

    .header:hover .qr-code {
      opacity: .85;
    }
  }

  @media print {
    .qr-screen-link {
      display: none;
    }

    .qr-print-link {
      display: inline-block;
    }
  }
</style>
