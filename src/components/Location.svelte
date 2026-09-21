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

<style>   

.location {
  position: absolute;
  top: 10px;
  right: 160px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.location > div > span {
  margin-top: -5px;
  line-height: 1.1;
  color: #cc1931;
  text-decoration: none;
  text-align: right;
}

.location .contact-icon {
  flex: 0 0 32px;
  height: 28px;
  width: 28px;
  margin: 4px;
  color: #cc1931;
}

@media screen and (max-width: 600px) {
  .location {
    display: none;
  }
}
</style>