<script>
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { commonLabels } from '../../data/common.js';
  import Modal from './Modal.svelte';

  let open = false;
  let destination = '';
  let opensInNewTab = false;

  function handleLinkClick(event) {
    if (event.defaultPrevented || event.button !== 0) return;
    if (!(event.target instanceof Element)) return;

    const link = event.target.closest('a[href]');
    if (!link || link.closest('.contact, .contact-list, .header, dialog')) return;

    let url;
    try {
      url = new URL(link.href, window.location.href);
    } catch {
      return;
    }

    if (!['http:', 'https:'].includes(url.protocol) || url.origin === window.location.origin) return;

    event.preventDefault();
    destination = url.href;
    opensInNewTab = link.target === '_blank';
    open = true;
  }

  onMount(() => {
    document.addEventListener('click', handleLinkClick, true);
    return () => document.removeEventListener('click', handleLinkClick, true);
  });
</script>

<Modal bind:open title={$_(commonLabels.externalLinkTitle)}>
  <div class="external-link-warning">
    <p>{$_(commonLabels.externalLinkMessage)}</p>
    <a href={destination} target={opensInNewTab ? '_blank' : undefined} rel="noopener noreferrer">{destination}</a>
  </div>
</Modal>

<style>
  .external-link-warning p {
    margin: 0 0 .75rem;
    line-height: 1.45;
  }

  .external-link-warning a {
    color: #435b86;
    overflow-wrap: anywhere;
  }

  @media print {
    :global(dialog) { display: none !important; }
  }
</style>
