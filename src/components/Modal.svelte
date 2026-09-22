<script>
  import { _ } from 'svelte-i18n';
  import { commonLabels } from '../../data/common.js';
  export let open = false;
  export let title = '';

  let dialog;

  $: if (dialog) {
    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }

  function close() {
    open = false;
  }

  function handleClose() {
    open = false;
  }

  function handleClick(event) {
    if (event.target === dialog) {
      close();
    }
  }
</script>

<dialog
  bind:this={dialog}
  aria-labelledby="modal-title"
  onclose={handleClose}
  onclick={handleClick}
>
  <div class="modal-content">
    <header>
      <h2 id="modal-title">{title}</h2>
      <button class="close-button" type="button" aria-label={$_(commonLabels.closeDialog)} onclick={close}>
        &times;
      </button>
    </header>
    <slot />
  </div>
</dialog>

<style>
  dialog {
    width: min(28rem, calc(100vw - 2rem));
    padding: 0;
    border: 1px solid #b3c0d0;
    border-radius: .5rem;
    color: #1a1a1a;
    background: #fff;
    box-shadow: 0 12px 32px #1e293b5f;
  }

  dialog::backdrop {
    background: #1e293b80;
  }

  .modal-content {
    padding: 1rem 1.25rem 1.25rem;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: .75rem;
  }

  h2 {
    margin: 0;
    color: #485e88;
    font-size: 1.125rem;
  }

  .close-button {
    padding: 0;
    border: 0;
    color: #56698f;
    background: transparent;
    cursor: pointer;
    font-size: 1.5rem;
    line-height: 1;
  }
</style>
