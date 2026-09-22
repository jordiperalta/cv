<script>
  import { _ } from 'svelte-i18n';
  import { commonLabels } from '../../data/common.js';
  import EducationDetails from './EducationDetails.svelte';

  export let timelineElement;
  export let periods;
  export let rainbowColors;
  export let experienceCount;

</script>

<div class="history-main-right">
  <div bind:this={timelineElement} class="education-timeline" aria-label={$_(commonLabels.educationTimeline)}>
    {#each periods as period (period.id)}
      <div
        class="education-period"
        data-record-id={period.recordId}
        style={`background-color: ${period.color}; top: ${period.top}px; height: ${period.height}px`}
      ></div>
    {/each}
  </div>

  <EducationDetails
    {rainbowColors}
    {experienceCount}
  />
</div>

<style>
  .history-main-right {
    flex: 1 1 0;
    min-width: 0;
    height: 100%;
    position: relative;
  }
</style>
