<script>
  import { _ } from 'svelte-i18n';
  import { commonLabels } from '../../data/common.js';
  import ExperienceDetails from './ExperienceDetails.svelte';

  export let timelineElement;
  export let periods;
  export let rainbowColors;

</script>

<div class="history-main-left">
  <div bind:this={timelineElement} class="experience-timeline" aria-label={$_(commonLabels.professionalTimeline)}>
    {#each periods as period (period.id)}
      <div
        class="experience-period"
        data-record-id={period.recordId}
        style={`background-color: ${period.color}; top: ${period.top}px; height: ${period.height}px`}
      ></div>
    {/each}
  </div>

  <ExperienceDetails {rainbowColors} />
</div>

<style>
  .history-main-left {
    flex: 1 1 0;
    min-width: 0;
    height: 100%;
    position: relative;
  }
</style>
