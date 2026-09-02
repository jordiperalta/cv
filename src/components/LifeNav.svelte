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

  function activateRecord(recordId) {
    document.querySelectorAll('.details-card').forEach((card) => {
      const isActive = card.dataset.recordId === recordId;
      card.classList.toggle('active', isActive);
      card.classList.toggle('non-active', !isActive);
    });

    document
      .querySelectorAll('.experience-period, .education-period')
      .forEach((period) => {
        const isActive = period.dataset.recordId === recordId;
        period.classList.toggle('active', isActive);
        period.classList.toggle('non-active', !isActive);
      });
  }

  function resetActiveRecord() {
    document
      .querySelectorAll('.details-card, .experience-period, .education-period')
      .forEach((element) => element.classList.remove('active', 'non-active'));
  }

  function handleRecordPointerOver(event) {
    const recordId = recordIdFromTarget(event.target);
    if (recordId) activateRecord(recordId);
  }

  function handleRecordPointerOut(event) {
    const previousRecordId = recordIdFromTarget(event.target);
    if (!previousRecordId) return;

    const nextRecordId = recordIdFromTarget(event.relatedTarget);
    if (nextRecordId === previousRecordId) return;

    if (nextRecordId) {
      activateRecord(nextRecordId);
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
      <div bind:this={dividerElements[index]} class="history-divider" style={`--divider-weight: ${weight}`}>
        <span class="history-divider-year">{timelineStartYear - index}</span>
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
