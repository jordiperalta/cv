<script>
  import { personalData } from '../../data/personal.js';
</script>

<div class="location">
    {#if personalData.location}
        <div>
        <span>{personalData.location.city} <br />{personalData.location.code}, {personalData.location.country}</span>
        <i data-lucide="map-pin-house" class="contact-icon" aria-hidden="true"></i>
        </div>
    {/if}
</div>