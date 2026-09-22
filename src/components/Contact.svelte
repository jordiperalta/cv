<script>
  import { onMount } from 'svelte';
  import { personalData } from '../../data/personal.js';
  import { commonLabels, contactModalContent } from '../../data/common.js';
  import { _ } from 'svelte-i18n';
  import Modal from './Modal.svelte';
  import DOMPurify from 'dompurify';
  import { marked } from 'marked';
  import { addSlashBreaks } from '../utils/markdown.js';
  import { get } from 'svelte/store';

  let quayDialogOpen = false;
  let modalMarkdown;
  const markdownRenderer = new marked.Renderer();
  const renderLink = markdownRenderer.link.bind(markdownRenderer);
  const renderCode = markdownRenderer.code.bind(markdownRenderer);
  const renderText = markdownRenderer.text.bind(markdownRenderer);

  markdownRenderer.text = (token) => addSlashBreaks(renderText(token));

  markdownRenderer.link = (token) => renderLink(token).replace(
    '<a ',
    '<a target="_blank" rel="noopener noreferrer" '
  );

  markdownRenderer.code = (token) => `
    <div class="modal-code-block">
      <button class="copy-code-button" type="button" aria-label={$_(commonLabels.copyCommand)} title={$_(commonLabels.copyCommand)}>
        <i class="fa-regular fa-copy" aria-hidden="true"></i>
      </button>
      ${renderCode(token)}
    </div>`;

  const renderMarkdown = (content) => DOMPurify.sanitize(
    marked.parse(content, { renderer: markdownRenderer }),
    { ADD_ATTR: ['target', 'rel'] }
  );

  $: modalContent = $_(contactModalContent, {
    values: { docker: personalData.docker },
  });

  async function copyCode(event) {
    const target = event.target;

    if (!(target instanceof Element)) return;

    const button = target.closest('.copy-code-button');
    const code = button?.parentElement?.querySelector('pre')?.textContent;

    if (!button || !code) return;

    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
    }

    button.classList.add('copied');
    button.setAttribute('aria-label', get(_)(commonLabels.commandCopied));
    button.title = get(_)(commonLabels.commandCopied);

    setTimeout(() => {
      button.classList.remove('copied');
      button.setAttribute('aria-label', get(_)(commonLabels.copyCommand));
      button.title = get(_)(commonLabels.copyCommand);
    }, 1500);
  }

  onMount(() => {
    modalMarkdown.addEventListener('click', copyCode);
    return () => modalMarkdown.removeEventListener('click', copyCode);
  });
</script>

<div class="contact">
  {#if personalData.email}
    <div>
      <span><a href={`mailto:${personalData.email}`}>{personalData.email}</a></span>
      <i class="fa-solid fa-envelope contact-icon" aria-hidden="true"></i>
    </div>
  {/if}
  {#if personalData.linkedin}
    <div>
      <span><a href={`https://${personalData.linkedin}`} target="_blank" rel="noopener noreferrer">{personalData.linkedin}</a></span>
      <i class="fa-brands fa-linkedin contact-icon" aria-hidden="true"></i>
    </div>
  {/if}
  {#if personalData.whatsapp} 
    <div>
      <span><a href={`https://${personalData.whatsapp}`} target="_blank" rel="noopener noreferrer">{personalData.whatsapp}</a></span>
      <i class="fa-brands fa-whatsapp contact-icon whatsapp-icon" aria-hidden="true"></i>
    </div>
  {/if}
  {#if personalData.website}
    <div>
      <span><a href={`https://${personalData.website}`} target="_blank" rel="noopener noreferrer">{personalData.website}</a></span>
      <i class="fa-solid fa-earth-americas contact-icon" aria-hidden="true"></i>
    </div>
  {/if}
  {#if personalData.docker}
    <div>
      <span>
        <button class="contact-link contact-modal-trigger" type="button" onclick={() => (quayDialogOpen = true)}>{personalData.docker}</button>
        <a class="contact-print-link" href={`https://${personalData.docker}`} target="_blank" rel="noopener noreferrer">{personalData.docker}</a>
      </span>
      <i class="fa-brands fa-docker contact-icon" aria-hidden="true"></i>
    </div>
  {/if}
</div>

  <Modal bind:open={quayDialogOpen} title={$_(commonLabels.containerImage)}>
  <div bind:this={modalMarkdown} class="modal-markdown">{@html renderMarkdown(modalContent)}</div>
</Modal>

<style>
.contact {
  position: absolute;
  top: 39px;
  left: 62px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

@media screen and (max-width: 600px) {
  .contact {
    position: relative;
    top: 0;
    right: 2px;
    padding-bottom: 12px;
  }
}

.contact-link {
  padding: 0;
  border: 0;
  background: transparent;
  font-family: inherit;
  font-weight: inherit;
  line-height: inherit;
  cursor: pointer;
}

.contact-print-link {
  display: none;
}

@media print {
  .contact-modal-trigger {
    display: none;
  }

  .contact-print-link {
    display: inline;
  }
}

:global(.modal-content header #modal-title) {
  font-weight: 400;
}
:global(.modal-content p) {
  font-size: .875rem;
}
:global(.modal-content a),
:global(.modal-content a:visited) {
  color: #435b86;
  text-decoration: none;
}
:global(.modal-content code),
:global(.modal-content pre) {
  font-size: .75rem;
  color: #555;
}
:global(.modal-content pre) {
  padding: 6px 8px;
  background-color: #ededef;
  border: #ccc .5px solid;
  border-radius: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
:global(.modal-code-block) {
  position: relative;
}
:global(.modal-code-block pre) {
  padding-right: 1.75rem;
}
:global(.copy-code-button) {
  position: absolute;
  top: 2px;
  right: 2px;
  display: grid;
  width: 1.5rem;
  height: 1.5rem;
  place-items: center;
  padding: 0;
  border: 1px solid #b3c0d0;
  border-radius: 4px;
  color: #7b8cac;
  background: #fff;
  cursor: pointer;
  opacity: 0.35;
  transition: opacity 200ms ease, color 200ms ease, background 200ms ease;
}
:global(.copy-code-button:hover),
:global(.copy-code-button.copied) {
  color: #435b86;
  background: #f5f7fa;
  opacity: 1;
  transition: opacity 350ms ease, color 350ms ease, background 350ms ease;
}
</style>
