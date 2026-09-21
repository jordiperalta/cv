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

.contact-icon {
  flex: 0 0 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}

.info .contact-icon {
  position: absolute;
  top: 36px;
  left: 8px;
  flex-basis: 30px;
  width: 32px;
  height: 32px;
  fill: #666;
  color: #ffffff;
}

</style>
