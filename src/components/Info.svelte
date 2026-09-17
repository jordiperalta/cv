<script>
  import { onMount } from 'svelte';

  onMount(() => window.lucide?.createIcons());
</script>

<div class="info">
    <div>
        <i data-lucide="info" class="contact-icon" aria-hidden="true"></i>
        <span>Contact Info</span>
    </div>
</div>

<style>

.info {
  position: absolute;
  top: 121px;
  right: 170px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.info .contact-icon {
    position: absolute;
    top: 36px;
    left: 8px;
}

</style>
