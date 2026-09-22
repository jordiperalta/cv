<script>
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { commonLabels } from '../../data/common.js';

  onMount(() => window.lucide?.createIcons());
</script>

<div class="info">
    <div class="info-label">
        <i data-lucide="info" class="contact-icon" aria-hidden="true"></i>
        <span>{$_(commonLabels.contactInfo)}</span>
    </div>
    <slot />
</div>

<style>

.info {
  position: absolute;
  top: 121px;
  left: 532px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.contact-icon {
  flex: 0 0 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}

.info-label .contact-icon {
  position: absolute;
  top: 36px;
  left: 8px;
  flex-basis: 30px;
  width: 32px;
  height: 32px;
  fill: #666;
  color: #ffffff;
}

@media screen and (max-width: 600px) {
  .info {
    margin: 12px 0;
    padding: 0 10px;
    position: relative;
    display: flex;
    inset: auto;
    align-self: stretch;
    min-height: 80px;
  }

  .info .info-label {
    position: absolute;
    left: 42px;
  }

  .info-label .contact-icon {
    top: -5px;
    left: -34px;
  }
}

</style>
