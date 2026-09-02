<script>
  import { personalData } from '../../data/personal.js';
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
      <span><a href={`https://${personalData.docker}`} target="_blank" rel="noopener noreferrer">{personalData.docker}</a></span>
      <i class="fa-brands fa-docker contact-icon" aria-hidden="true"></i>
    </div>
  {/if}
</div>