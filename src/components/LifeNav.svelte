<script>
  import { onMount, tick } from 'svelte';
  import { educationData } from '../../data/education.js';
  import { experienceData } from '../../data/experience.js';
  import EducationColumn from './EducationColumn.svelte';
  import ExperienceColumn from './ExperienceColumn.svelte';

  const timelineStartDate = new Date();
  const timelineStartYear = timelineStartDate.getFullYear();
  const timelineOldestYear = 2011;
  const dividerCount = timelineStartYear - timelineOldestYear + 1;
  const firstFullYearDividerHeight = 12;
  const lastDividerHeight = 4;
  const logarithmicScale = 10;
  const timelineOldestDate = new Date(timelineOldestYear, 0, 1);
  const rainbowColors = createRainbowColors(
    experienceData.length + educationData.length,
  );
  const dividerWeights = createDividerWeights();

  let experienceTimeline;
  let educationTimeline;
  let dividerElements = [];
  let experiencePeriods = [];
  let educationPeriods = [];
  export let historyHover = false;

  function createRainbowColors(count) {
    const colorStops = [
      [148, 0, 211],
      [0, 120, 255],
      [0, 180, 0],
      [255, 220, 0],
      [255, 120, 0],
      [220, 0, 0],
    ];

    return Array.from({ length: count }, (_, index) => {
      const position = (index / Math.max(count - 1, 1)) * (colorStops.length - 1);
      const lower = colorStops[Math.floor(position)];
      const upper = colorStops[Math.ceil(position)];
      const blend = position % 1;
      const color = lower.map((channel, channelIndex) =>
        Math.round(channel + (upper[channelIndex] - channel) * blend),
      );

      return `rgb(${color.join(', ')})`;
    });
  }

  function createDividerWeights() {
    const fullYearDividerCount = Math.max(dividerCount - 1, 1);
    const lastFullYearIndex = Math.max(fullYearDividerCount - 1, 1);
    const weights = Array.from({ length: dividerCount }, (_, index) => {
      if (index === 0) return 0;

      const fullYearIndex = index - 1;
      const logarithmicPosition =
        1 -
        Math.log(1 + fullYearIndex * logarithmicScale) /
          Math.log(1 + lastFullYearIndex * logarithmicScale);

      return (
        lastDividerHeight +
        (firstFullYearDividerHeight - lastDividerHeight) * logarithmicPosition
      );
    });

    const startOfTimelineYear = new Date(timelineStartYear, 0, 1);
    const startOfNextTimelineYear = new Date(timelineStartYear + 1, 0, 1);
    const yearProgress =
      (timelineStartDate - startOfTimelineYear) /
      (startOfNextTimelineYear - startOfTimelineYear);

    weights[0] = (weights[1] ?? firstFullYearDividerHeight) * yearProgress;
    return weights;
  }

  function parseDate(value) {
    return value === 'Present' ? timelineStartDate : new Date(`${value}T00:00:00`);
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

  function getTimelinePosition(date, timeline) {
    const dividerIndex = timelineStartYear - date.getFullYear();
    const divider = dividerElements[dividerIndex];

    if (!divider || date > timelineStartDate) return null;

    const yearStart = new Date(date.getFullYear(), 0, 1);
    const yearEnd =
      dividerIndex === 0
        ? timelineStartDate
        : new Date(date.getFullYear() + 1, 0, 1);

    if (date < yearStart || date > yearEnd) return null;

    const dividerBounds = divider.getBoundingClientRect();
    const timelineBounds = timeline.getBoundingClientRect();
    const yearProgress = (yearEnd - date) / Math.max(yearEnd - yearStart, 1);

    return (
      dividerBounds.top -
      timelineBounds.top +
      dividerBounds.height * Math.min(Math.max(yearProgress, 0), 1)
    );
  }

  function createTimelinePeriods(
    timeline,
    records,
    recordType,
    colorOffset = 0,
    reverseColors = false,
  ) {
    if (!timeline) return [];

    return records.flatMap((record, index) => {
      const recordId = `${recordType}-${index}`;
      const colorIndex = reverseColors ? records.length - 1 - index : index;
      const color = rainbowColors[(colorOffset + colorIndex) % rainbowColors.length];

      return record.periods.flatMap((period, periodIndex) => {
        const startDate = parseDate(period.startDate);
        const endDate = parseDate(period.endDate);

        if (startDate > timelineStartDate || endDate < timelineOldestDate) return [];

        const startPosition = getTimelinePosition(
          new Date(Math.max(startDate, timelineOldestDate)),
          timeline,
        );
        const endPosition = getTimelinePosition(
          new Date(Math.min(endDate, timelineStartDate)),
          timeline,
        );

        if (startPosition === null || endPosition === null) return [];

        return [{
          id: `${recordId}-${periodIndex}`,
          recordId,
          color,
          top: Math.min(startPosition, endPosition) + 1,
          height: Math.max(2, Math.abs(endPosition - startPosition) - 2),
        }];
      });
    });
  }

  async function updateTimelinePeriods() {
    await tick();
    experiencePeriods = createTimelinePeriods(experienceTimeline, experienceData, 'experience');
    educationPeriods = createTimelinePeriods(
      educationTimeline,
      educationData,
      'education',
      experienceData.length,
      true,
    );
  }

  function recordIdFromTarget(target) {
    if (!(target instanceof Element)) return null;

    return target.closest('.details-card, .experience-period, .education-period')
      ?.dataset.recordId ?? null;
  }

  function yearFromTarget(target) {
    if (!(target instanceof Element)) return null;

    const year = target.closest('.history-divider')?.dataset.year;
    return year ? Number(year) : null;
  }

  function recordIdsForYear(year) {
    const yearStart = new Date(year, 0, 1);
    const nextYearStart = new Date(year + 1, 0, 1);
    const recordsOverlapYear = (records, recordType) =>
      records.flatMap((record, index) =>
        record.periods.some((period) => {
          const startDate = parseDate(period.startDate);
          const endDate = parseDate(period.endDate);
          return startDate < nextYearStart && endDate >= yearStart;
        })
          ? [`${recordType}-${index}`]
          : [],
      );

    return [
      ...recordsOverlapYear(experienceData, 'experience'),
      ...recordsOverlapYear(educationData, 'education'),
    ];
  }

  function yearsForRecordIds(recordIds) {
    const records = [
      ...experienceData.map((record, index) => ({ record, id: `experience-${index}` })),
      ...educationData.map((record, index) => ({ record, id: `education-${index}` })),
    ];

    return [...new Set(records.flatMap(({ record, id }) => {
      if (!recordIds.includes(id)) return [];

      return record.periods.flatMap((period) => {
        const startYear = Math.max(parseDate(period.startDate).getFullYear(), timelineOldestYear);
        const endYear = Math.min(parseDate(period.endDate).getFullYear(), timelineStartYear);
        return Array.from({ length: Math.max(endYear - startYear + 1, 0) }, (_, index) => startYear + index);
      });
    }))];
  }

  function activateRecords(recordIds, activeYears = yearsForRecordIds(recordIds)) {
    document.querySelectorAll('.details-card').forEach((card) => {
      const isActive = recordIds.includes(card.dataset.recordId);
      card.classList.toggle('active', isActive);
      card.classList.toggle('non-active', !isActive);
    });

    document
      .querySelectorAll('.experience-period, .education-period')
      .forEach((period) => {
        const isActive = recordIds.includes(period.dataset.recordId);
        period.classList.toggle('active', isActive);
        period.classList.toggle('non-active', !isActive);
      });

    document.querySelectorAll('.history-divider').forEach((divider) => {
      const isActive = activeYears.includes(Number(divider.dataset.year));
      divider.classList.toggle('active', isActive);
      divider.classList.toggle('non-active', !isActive);
    });
  }

  function activateRecord(recordId) {
    activateRecords([recordId]);
  }

  function activateYear(year) {
    activateRecords(recordIdsForYear(year), [year]);
  }

  function resetActiveRecord() {
    document
      .querySelectorAll('.details-card, .experience-period, .education-period, .history-divider')
      .forEach((element) => element.classList.remove('active', 'non-active'));
  }

  function handleRecordPointerOver(event) {
    const recordId = recordIdFromTarget(event.target);
    if (recordId) {
      activateRecord(recordId);
      return;
    }

    const year = yearFromTarget(event.target);
    if (year !== null) activateYear(year);
  }

  function handleRecordPointerOut(event) {
    const previousRecordId = recordIdFromTarget(event.target);
    const previousYear = yearFromTarget(event.target);
    if (!previousRecordId && previousYear === null) return;

    const nextRecordId = recordIdFromTarget(event.relatedTarget);
    const nextYear = yearFromTarget(event.relatedTarget);
    if (nextRecordId === previousRecordId && nextYear === previousYear) return;

    if (nextRecordId) {
      activateRecord(nextRecordId);
    } else if (nextYear !== null) {
      activateYear(nextYear);
    } else {
      resetActiveRecord();
    }
  }

  onMount(async () => {
    await document.fonts?.ready;
    await updateTimelinePeriods();
    window.lucide?.createIcons();

    window.addEventListener('resize', updateTimelinePeriods);
    return () => window.removeEventListener('resize', updateTimelinePeriods);
  });
</script>

<div
  class:history-hover={historyHover}
  class="history-main"
  onpointerover={handleRecordPointerOver}
  onpointerout={handleRecordPointerOut}
>
  <ExperienceColumn
    bind:timelineElement={experienceTimeline}
    periods={experiencePeriods}
    {rainbowColors}
  />

  <div class="history-main-centre">
    {#each dividerWeights as weight, index}
      {@const year = timelineStartYear - index}
      <div
        bind:this={dividerElements[index]}
        class={`history-divider history-${year}`}
        data-year={year}
        style={`--divider-weight: ${weight}`}
      >
        <span class="history-divider-year">{year}</span>
      </div>
    {/each}
  </div>

  <EducationColumn
    bind:timelineElement={educationTimeline}
    periods={educationPeriods}
    {rainbowColors}
    experienceCount={experienceData.length}
  />
</div>

<style>
  .history-main {
    flex: 1 1 auto;
    min-height: 0;
    display: flex;
    border-right: #485e881f 1px solid;
    transition: padding 350ms ease;
  }

  .history-main.history-hover { padding: 0 var(--history-hover-swing); }

  .history-main-centre {
    margin: 0;
    flex: 0 0 16px;
    min-width: 0;
    height: 100% - 4px;
    background-image: linear-gradient(#56698FFF 92%, #56698F00 100%);
    background-clip: padding-box;
    border: 1px solid #e5e7eb7f;
    display: flex;
    flex-direction: column;
  }

  .history-divider {
    position: relative;
    flex: var(--divider-weight, 1) 1 0;
    min-height: 0;
    border-bottom: 1px solid #e5e7eb7f;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    user-select: none;
    padding-bottom: .25rem;
    transition: border-color 350ms ease, opacity 350ms ease;
  }

  .history-divider::before {
    content: '';
    position: absolute;
    inset: 0 0 1px;
    background-image: linear-gradient(to bottom, #b5bdce, #cfd5e6 50%);
    opacity: 0;
    pointer-events: none;
    transition: opacity 350ms ease;
  }

  .history-divider.active::before { opacity: 1; }
  .history-divider.active { border-bottom-color: #9ba5b9; }
  .history-divider.active .history-divider-year { color: #56698f; }
  .history-divider.non-active { opacity: .85; }

  .history-divider:first-child { min-height: 30px; }
  .history-divider-year { position: relative; z-index: 1; width: 100%; text-align: center; transform: rotate(-90deg); font-size: .625rem; color: #e3e6ee; transition: color 200ms ease; }
</style>
