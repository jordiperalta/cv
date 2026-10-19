<script>
  import { experienceData } from '../../data/experience.js';
  import { commonLabels } from '../../data/common.js';
  import { _, locale } from 'svelte-i18n';
  import DOMPurify from 'dompurify';
  import { marked } from 'marked';
  import Modal from './Modal.svelte';

  export let rainbowColors;
  let experienceModalOpen = false;
  let selectedExperience = null;
  let armedRecordId = null;

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

  function formatDate(value) {
    if (value === 'Present') return $_(commonLabels.present);
    return new Intl.DateTimeFormat($locale || 'en', {
      month: 'short',
      year: 'numeric',
    }).format(new Date(`${value}T00:00:00`));
  }

  function renderMarkdown(value) {
    return DOMPurify.sanitize(marked.parseInline($_(value)));
  }

  function openExperience(record) {
    selectedExperience = record;
    experienceModalOpen = true;
  }

  function handleCardClick(event, record, recordId) {
    if (window.matchMedia('(max-width: 1023px)').matches) {
      event.currentTarget.focus();

      if (armedRecordId !== recordId) {
        armedRecordId = recordId;
        return;
      }

      armedRecordId = null;
    }

    openExperience(record);
  }

  function handleCardKeydown(event, record) {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    openExperience(record);
  }

  function disarmExperience(recordId) {
    if (armedRecordId === recordId) armedRecordId = null;
  }

</script>

<div class="experience-details">
  {#each experienceData as record, index (`experience-${index}`)}
    {@const recordId = `experience-${index}`}
    {@const color = rainbowColors[index]}
    <div
      class="details-card"
      data-record-id={recordId}
      role="button"
      tabindex="0"
      aria-label={$_(record.title)}
      onclick={(event) => handleCardClick(event, record, recordId)}
      onkeydown={(event) => handleCardKeydown(event, record)}
      onfocusout={() => disarmExperience(recordId)}
    >
      <div class="details-card-accent" style={`--accent-color: ${color}`}></div>
      {#each record.periods as period}
        {@const start = formatYearMonth(period.startDate)}
        {@const end = formatYearMonth(period.endDate)}
        <div class="details-card-dates">
          <span class="timeline-card-year">{start.year}</span>{start.month} |
          {#if end.isPresent}
            <b>{$_(commonLabels.present)}</b>
          {:else}
            <span class="timeline-card-year">{end.year}</span>{end.month}
          {/if}
        </div>
      {/each}
      <div class="timeline-card-entity">{$_(record.entity)}</div>
      <div class="timeline-card-title">{$_(record.title)}</div>
    </div>
  {/each}
</div>

<Modal
  bind:open={experienceModalOpen}
  title={selectedExperience ? $_(selectedExperience.title) : ''}
  wide
>
  {#if selectedExperience}
    <div class="experience-modal">
      <p class="experience-modal-organization">
        {$_(selectedExperience.entity)} <span>· {$_(selectedExperience.location)}</span>
      </p>
      <div class="experience-modal-periods">
        {#each selectedExperience.periods as period}
          <p>{formatDate(period.startDate)} – {formatDate(period.endDate)}</p>
        {/each}
      </div>
      {#if selectedExperience.mainTasks?.length}
        <ul>
          {#each selectedExperience.mainTasks as task}
            <li>{@html renderMarkdown(task)}</li>
          {/each}
        </ul>
      {/if}
    </div>
  {/if}
</Modal>

<style>
  .details-card[role="button"] {
    cursor: pointer;
  }

  .details-card[role="button"]:focus-visible {
    outline: 2px solid #485e88;
    outline-offset: 2px;
  }

  .experience-modal-organization {
    margin: 0 0 .45rem;
    color: #438b70;
    font-weight: 600;
  }

  .experience-modal-organization span {
    color: #65738a;
    font-weight: 400;
  }

  .experience-modal-periods {
    margin-bottom: 1rem;
    color: #65738a;
  }

  .experience-modal-periods p {
    margin: .2rem 0;
    font-size: .75rem;
  }

  .experience-modal ul {
    margin: 0;
    padding-left: 1.25rem;
    color: #46546a;
    line-height: 1.55;
  }

  .experience-modal li + li {
    margin-top: .6rem;
  }

  @media screen and (max-width: 600px) {
    .experience-details .details-card.details-card {
      width: calc(100% - 7px);
      max-width: 170px;
      margin-left: auto;
      margin-right: 3px;
    }
  }
</style>
