<script>
  import { experienceData } from '../../data/experience.js';

  export let rainbowColors;

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

</script>

<div class="experience-details">
  {#each experienceData as record, index (`experience-${index}`)}
    {@const recordId = `experience-${index}`}
    {@const color = rainbowColors[index]}
    <div
      class="details-card"
      data-record-id={recordId}
    >
      <div class="details-card-accent" style={`--accent-color: ${color}`}></div>
      {#each record.periods as period}
        {@const start = formatYearMonth(period.startDate)}
        {@const end = formatYearMonth(period.endDate)}
        <div class="details-card-dates">
          <span class="timeline-card-year">{start.year}</span>{start.month}-
          {#if end.isPresent}
            <b>Present</b>
          {:else}
            <span class="timeline-card-year">{end.year}</span>{end.month}
          {/if}
        </div>
      {/each}
      <div class="timeline-card-entity">{record.entity}</div>
      <div class="timeline-card-title">{record.title}</div>
    </div>
  {/each}
</div>
