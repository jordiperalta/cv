<script>
  import { educationData } from '../../data/education.js';
  import { commonLabels } from '../../data/common.js';
  import { _ } from 'svelte-i18n';

  export let rainbowColors;
  export let experienceCount;

  function parseDate(value) {
    return value === 'Present' ? new Date() : new Date(`${value}T00:00:00`);
  }

  function formatYearMonth(value) {
    const date = parseDate(value);
    return {
      isPresent: value === 'Present',
      year: date.getFullYear(),
      month: date.toLocaleString('en-US', { month: 'short' }),
    };
  }

  function getDateRange(periods) {
    const oldest = periods.reduce((current, period) =>
      parseDate(period.startDate) < parseDate(current.startDate) ? period : current,
    );
    const newest = periods.reduce((current, period) =>
      parseDate(period.endDate) > parseDate(current.endDate) ? period : current,
    );

    return { startDate: oldest.startDate, endDate: newest.endDate };
  }

</script>

<div class="education-details">
  {#each educationData as record, index (`education-${index}`)}
    {@const recordId = `education-${index}`}
    {@const color = rainbowColors[experienceCount + educationData.length - 1 - index]}
    {@const range = getDateRange(record.periods)}
    {@const start = formatYearMonth(range.startDate)}
    {@const end = formatYearMonth(range.endDate)}
    <div
      class="details-card"
      data-record-id={recordId}
    >
      <div class="details-card-accent" style={`--accent-color: ${color}`}></div>
      <div class="details-card-dates">
        <span class="timeline-card-year">{start.year}</span>{start.month} |
        {#if end.isPresent}
          <b>Present</b>
        {:else}
          <span class="timeline-card-year">{end.year}</span>{end.month}
        {/if}
      </div>
      <div class="timeline-card-entity">{$_(record.entity)}</div>
      <div class="timeline-card-title">{$_(record.title)}</div>
    </div>
  {/each}
</div>

<style>
  @media screen and (max-width: 600px) {
    .education-details .details-card.details-card {
      width: calc(100% - 7px);
      max-width: 170px;
      margin-right: auto;
      margin-left: 3px;
    }
  }
</style>
