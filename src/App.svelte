<script>
  import { onMount, tick } from 'svelte';
  import qrCodeUrl from '../assets/qr-jordiperalta-cv.svg';
  import { educationData } from '../data/education.js';
  import { experienceData } from '../data/experience.js';
  import { personalData } from '../data/personal.js';

  const timelineStartDate = new Date();
  const timelineStartYear = timelineStartDate.getFullYear();
  // Change this value to control the oldest year displayed on the timeline.
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

  let historyHover = false;
  let activeRecordId = null;
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

    if (count === 0) {
      return [];
    }

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
      if (index === 0) {
        return 0;
      }

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

    if (!divider || date > timelineStartDate) {
      return null;
    }

    const yearStart = new Date(date.getFullYear(), 0, 1);
    const yearEnd =
      dividerIndex === 0
        ? timelineStartDate
        : new Date(date.getFullYear() + 1, 0, 1);

    if (date < yearStart || date > yearEnd) {
      return null;
    }

    const dividerBounds = divider.getBoundingClientRect();
    const timelineBounds = timeline.getBoundingClientRect();
    const yearProgress =
      (yearEnd - date) / Math.max(yearEnd - yearStart, 1);

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
    if (!timeline) {
      return [];
    }

    return records.flatMap((record, index) => {
      const recordId = `${recordType}-${index}`;
      const colorIndex = reverseColors ? records.length - 1 - index : index;
      const color = rainbowColors[(colorOffset + colorIndex) % rainbowColors.length];

      return record.periods.flatMap((period, periodIndex) => {
        const startDate = parseDate(period.startDate);
        const endDate = parseDate(period.endDate);

        if (startDate > timelineStartDate || endDate < timelineOldestDate) {
          return [];
        }

        const startPosition = getTimelinePosition(
          new Date(Math.max(startDate, timelineOldestDate)),
          timeline,
        );
        const endPosition = getTimelinePosition(
          new Date(Math.min(endDate, timelineStartDate)),
          timeline,
        );

        if (startPosition === null || endPosition === null) {
          return [];
        }

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
    experiencePeriods = createTimelinePeriods(
      experienceTimeline,
      experienceData,
      'experience',
    );
    educationPeriods = createTimelinePeriods(
      educationTimeline,
      educationData,
      'education',
      experienceData.length,
      true,
    );
  }

  function detailClass(recordId) {
    if (activeRecordId === null) {
      return 'details-card';
    }

    return `details-card ${activeRecordId === recordId ? 'active' : 'non-active'}`;
  }

  function periodClass(type, recordId) {
    const state =
      activeRecordId === null
        ? ''
        : activeRecordId === recordId
          ? ' active'
          : ' non-active';

    return `${type}-period${state}`;
  }

  onMount(async () => {
    await document.fonts?.ready;
    await updateTimelinePeriods();
    window.lucide?.createIcons();

    window.addEventListener('resize', updateTimelinePeriods);
    return () => window.removeEventListener('resize', updateTimelinePeriods);
  });
</script>

<main class="document">
  <div class="header">
    <div>
      <p>{personalData.firstName}<br />{personalData.lastName}</p>
    </div>
    <div class="qr-code">
      <img
        alt={`QR code for ${personalData.firstName} ${personalData.lastName}'s CV`}
        src={qrCodeUrl}
      />
    </div>
  </div>

  <div class="content">
    <div
      class:history-hover={historyHover}
      class="history"
      onmouseenter={() => (historyHover = true)}
      onmouseleave={() => (historyHover = false)}
    >
      <div class="history-header">
        <div class="history-header-section header-experience">
          <i data-lucide="pickaxe" aria-hidden="true"></i>
          <span>Experience</span>
        </div>
        <div class="history-header-section header-education">
          <span>Education</span>
          <i data-lucide="graduation-cap" aria-hidden="true"></i>
        </div>
      </div>

      <div class="history-main">
        <div class="history-main-left">
          <div bind:this={experienceTimeline} class="experience-timeline" aria-label="Professional experience timeline">
            {#each experiencePeriods as period (period.id)}
              <div
                class={periodClass('experience', period.recordId)}
                data-record-id={period.recordId}
                style={`background-color: ${period.color}; top: ${period.top}px; height: ${period.height}px`}
                onmouseenter={() => (activeRecordId = period.recordId)}
                onmouseleave={() => (activeRecordId = null)}
              ></div>
            {/each}
          </div>

          <div class="experience-details">
            {#each experienceData as record, index (`experience-${index}`)}
              {@const recordId = `experience-${index}`}
              {@const color = rainbowColors[index]}
              <div
                class={detailClass(recordId)}
                data-record-id={recordId}
                onmouseenter={() => (activeRecordId = recordId)}
                onmouseleave={() => (activeRecordId = null)}
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
        </div>

        <div class="history-main-centre">
          {#each dividerWeights as weight, index}
            <div
              bind:this={dividerElements[index]}
              class="history-divider"
              style={`--divider-weight: ${weight}`}
            >
              <span class="history-divider-year">{timelineStartYear - index}</span>
            </div>
          {/each}
        </div>

        <div class="history-main-right">
          <div bind:this={educationTimeline} class="education-timeline" aria-label="Education timeline">
            {#each educationPeriods as period (period.id)}
              <div
                class={periodClass('education', period.recordId)}
                data-record-id={period.recordId}
                style={`background-color: ${period.color}; top: ${period.top}px; height: ${period.height}px`}
                onmouseenter={() => (activeRecordId = period.recordId)}
                onmouseleave={() => (activeRecordId = null)}
              ></div>
            {/each}
          </div>

          <div class="education-details">
            {#each educationData as record, index (`education-${index}`)}
              {@const recordId = `education-${index}`}
              {@const color = rainbowColors[experienceData.length + educationData.length - 1 - index]}
              {@const range = getDateRange(record.periods)}
              {@const start = formatYearMonth(range.startDate)}
              {@const end = formatYearMonth(range.endDate)}
              <div
                class={detailClass(recordId)}
                data-record-id={recordId}
                onmouseenter={() => (activeRecordId = recordId)}
                onmouseleave={() => (activeRecordId = null)}
              >
                <div class="details-card-accent" style={`--accent-color: ${color}`}></div>
                <div class="details-card-dates">
                  <span class="timeline-card-year">{start.year}</span>{start.month}-
                  {#if end.isPresent}
                    <b>Present</b>
                  {:else}
                    <span class="timeline-card-year">{end.year}</span>{end.month}
                  {/if}
                </div>
                <div class="timeline-card-entity">{record.entity}</div>
                <div class="timeline-card-title">{record.title}</div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>

    <div class="experience"></div>
  </div>

  <div class="location">
    {#if personalData.location}
      <div>
        <span>{personalData.location.city} <br />{personalData.location.code}, {personalData.location.country}</span>
        <i data-lucide="map-pin-house" class="contact-icon" aria-hidden="true"></i>
      </div>
    {/if}
  </div>

  <div class="contact">
    {#if personalData.email}
      <div>
        <i class="fa-solid fa-envelope contact-icon" aria-hidden="true"></i>
        <span><a href={`mailto:${personalData.email}`}>{personalData.email}</a></span>
      </div>
    {/if}
    {#if personalData.linkedin}
      <div>
        <i class="fa-brands fa-linkedin contact-icon" aria-hidden="true"></i>
        <span><a href={`https://${personalData.linkedin}`} target="_blank" rel="noopener noreferrer">{personalData.linkedin}</a></span>
      </div>
    {/if}
    {#if personalData.whatsapp} 
      <div>
        <i class="fa-brands fa-whatsapp contact-icon whatsapp-icon" aria-hidden="true"></i>
        <span><a href={`https://${personalData.whatsapp}`} target="_blank" rel="noopener noreferrer">{personalData.whatsapp}</a></span>
      </div>
    {/if}
    {#if personalData.website}
      <div>
        <i class="fa-solid fa-earth-americas contact-icon" aria-hidden="true"></i>
        <span><a href={`https://${personalData.website}`} target="_blank" rel="noopener noreferrer">{personalData.website}</a></span>
      </div>
    {/if}
    {#if personalData.docker}
      <div>
        <i class="fa-brands fa-docker contact-icon" aria-hidden="true"></i>
        <span><a href={`https://${personalData.docker}`} target="_blank" rel="noopener noreferrer">{personalData.docker}</a></span>
      </div>
    {/if}
  </div>
</main>

<button class="print-button" type="button" onclick={() => window.print()}>
  Save as PDF
</button>
