// Set the first year shown in the timeline: year, zero-based month, day.
const timelineStartDate = new Date(); // new Date(2025, 1, 5);
const timelineStartYear = timelineStartDate.getFullYear();
// Change this value to control the oldest year displayed on the timeline.
const timelineOldestYear = 2011;
const firstFullYearDividerHeight = 12;
const lastDividerHeight = 4;
const logarithmicScale = 10;
const totalDetails = experienceData.length + educationData.length;
const rainbowColors = createRainbowColors(totalDetails);
const timelineDividerCount = timelineStartYear - timelineOldestYear + 1;
const dividerContainer = document.querySelector('.history-main-centre');
const dividers = Array.from({ length: timelineDividerCount }, () => {
  const divider = document.createElement('div');
  divider.className = 'history-divider';
  return divider;
});

dividerContainer?.replaceChildren(...dividers);
const timelineOldestDate = new Date(timelineOldestYear, 0, 1);
const fullYearDividerCount = Math.max(dividers.length - 1, 1);
const lastFullYearIndex = Math.max(fullYearDividerCount - 1, 1);

const rawHeights = dividers.map((_, index) => {
  if (index === 0) {
    return 0;
  }

  const fullYearIndex = index - 1;
  const logarithmicPosition =
    1 -
    Math.log(1 + fullYearIndex * logarithmicScale) /
      Math.log(1 + lastFullYearIndex * logarithmicScale);

  return lastDividerHeight +
    (firstFullYearDividerHeight - lastDividerHeight) * logarithmicPosition;
});

const startOfTimelineYear = new Date(timelineStartYear, 0, 1);
const startOfNextTimelineYear = new Date(timelineStartYear + 1, 0, 1);
const timelineYearProgress =
  (timelineStartDate - startOfTimelineYear) /
  (startOfNextTimelineYear - startOfTimelineYear);

if (dividers.length > 0) {
  rawHeights[0] =
    (rawHeights[1] ?? firstFullYearDividerHeight) * timelineYearProgress;
}

dividers.forEach((divider, index) => {
  const year = document.createElement('span');
  year.className = 'history-divider-year';
  year.textContent = String(timelineStartYear - index);
  divider.replaceChildren(year);
  divider.style.setProperty('--divider-weight', rawHeights[index]);
});

const experienceTimeline = document.querySelector('.experience-timeline');
const experienceDetails = document.querySelector('.experience-details');
const educationTimeline = document.querySelector('.education-timeline');
const educationDetails = document.querySelector('.education-details');
const history = document.querySelector('.history');

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

  if (count === 1) {
    return [`rgb(${colorStops[0].join(', ')})`];
  }

  return Array.from({ length: count }, (_, index) => {
    const position = (index / (count - 1)) * (colorStops.length - 1);
    const lowerIndex = Math.floor(position);
    const upperIndex = Math.ceil(position);
    const blend = position - lowerIndex;
    const lower = colorStops[lowerIndex];
    const upper = colorStops[upperIndex];
    const color = lower.map((channel, channelIndex) =>
      Math.round(channel + (upper[channelIndex] - channel) * blend),
    );

    return `rgb(${color.join(', ')})`;
  });
}

function parseExperienceDate(value) {
  return value === 'Present'
    ? timelineStartDate
    : new Date(`${value}T00:00:00`);
}

function createYearMonthElement(value) {
  if (value === 'Present') {
    const dateElement = document.createElement('b');
    dateElement.textContent = value;
    return dateElement;
  }

  const date = parseExperienceDate(value);
  const month = date.toLocaleString('en-US', { month: 'short' });
  const dateElement = document.createElement('span');
  const yearElement = document.createElement('span');

  yearElement.className = 'timeline-card-year';
  yearElement.textContent = date.getFullYear();
  dateElement.append(yearElement, month);

  return dateElement;
}

function createDetailsCardAccent(color) {
  const accent = document.createElement('div');
  accent.className = 'details-card-accent';
  accent.style.setProperty('--accent-color', color);

  return accent;
}

function activateDetailsCard(recordId) {
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

function resetDetailsCards() {
  document.querySelectorAll('.details-card').forEach((card) => {
    card.classList.remove('active', 'non-active');
  });

  document
    .querySelectorAll('.experience-period, .education-period')
    .forEach((period) => period.classList.remove('active', 'non-active'));
}

function bindRecordHover(element, recordId) {
  element.addEventListener('mouseenter', () => activateDetailsCard(recordId));
  element.addEventListener('mouseleave', resetDetailsCards);
}

function createDetailsCardDateRange(periods) {
  const datesElement = document.createElement('div');
  datesElement.className = 'details-card-dates';

  if (periods.length === 0) {
    return datesElement;
  }

  const oldestPeriod = periods.reduce((oldest, period) =>
    parseExperienceDate(period.startDate) < parseExperienceDate(oldest.startDate)
      ? period
      : oldest,
  );
  const newestPeriod = periods.reduce((newest, period) =>
    parseExperienceDate(period.endDate) > parseExperienceDate(newest.endDate)
      ? period
      : newest,
  );

  datesElement.append(
    createYearMonthElement(oldestPeriod.startDate),
    document.createTextNode('-'),
    createYearMonthElement(newestPeriod.endDate),
  );

  return datesElement;
}

function createDetailsCardPeriodLines(periods) {
  const dateElements = document.createDocumentFragment();

  periods.forEach(({ startDate, endDate }) => {
    const datesElement = document.createElement('div');
    datesElement.className = 'details-card-dates';
    datesElement.append(
      createYearMonthElement(startDate),
      document.createTextNode('-'),
      createYearMonthElement(endDate),
    );
    dateElements.append(datesElement);
  });

  return dateElements;
}

function renderExperienceCards(experience) {
  experienceDetails.replaceChildren();

  experience.forEach(({ entity, periods = [], title }, index) => {
    const card = document.createElement('div');
    card.className = 'details-card';
    const recordId = `experience-${index}`;
    card.dataset.recordId = recordId;
    bindRecordHover(card, recordId);
    const color = rainbowColors[index % rainbowColors.length];

    const entityElement = document.createElement('div');
    entityElement.className = 'timeline-card-entity';
    entityElement.textContent = entity;

    const titleElement = document.createElement('div');
    titleElement.className = 'timeline-card-title';
    titleElement.textContent = title;

    card.append(
      createDetailsCardAccent(color),
      createDetailsCardPeriodLines(periods),
      entityElement,
      titleElement,
    );
    experienceDetails.append(card);
  });
}

function renderEducationCards(education, experienceCount) {
  educationDetails.replaceChildren();

  education.forEach(({ entity, periods = [], title }, index) => {
    const card = document.createElement('div');
    card.className = 'details-card';
    const recordId = `education-${index}`;
    card.dataset.recordId = recordId;
    bindRecordHover(card, recordId);
    const color = rainbowColors[
      (experienceCount + education.length - 1 - index) % rainbowColors.length
    ];

    const entityElement = document.createElement('div');
    entityElement.className = 'timeline-card-entity';
    entityElement.textContent = entity;

    const titleElement = document.createElement('div');
    titleElement.className = 'timeline-card-title';
    titleElement.textContent = title;

    card.append(
      createDetailsCardAccent(color),
      createDetailsCardDateRange(periods),
      entityElement,
      titleElement,
    );
    educationDetails.append(card);
  });
}

function getTimelinePosition(date, timeline) {
  const dividerIndex = timelineStartYear - date.getFullYear();
  const divider = dividers[dividerIndex];

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

function renderTimelinePeriods(
  timeline,
  records,
  periodClassName,
  recordType,
  colorOffset = 0,
  reverseColors = false,
) {
  timeline.replaceChildren();

  records.forEach(({ periods = [] }, index) => {
    const recordId = `${recordType}-${index}`;
    const colorIndex = reverseColors ? records.length - 1 - index : index;
    const color = rainbowColors[
      (colorOffset + colorIndex) % rainbowColors.length
    ];

    periods.forEach(({ startDate, endDate }) => {
      const periodStartDate = parseExperienceDate(startDate);
      const periodEndDate = parseExperienceDate(endDate);

      if (
        periodStartDate > timelineStartDate ||
        periodEndDate < timelineOldestDate
      ) {
        return;
      }

      const startPosition = getTimelinePosition(
        new Date(Math.max(periodStartDate, timelineOldestDate)),
        timeline,
      );
      const endPosition = getTimelinePosition(
        new Date(Math.min(periodEndDate, timelineStartDate)),
        timeline,
      );

      if (startPosition === null || endPosition === null) {
        return;
      }

      const period = document.createElement('div');
      period.className = periodClassName;
      period.dataset.recordId = recordId;
      period.style.backgroundColor = color;
      period.style.top = `${Math.min(startPosition, endPosition) + 1}px`;
      period.style.height = `${Math.max(
        2,
        Math.abs(endPosition - startPosition) - 2,
      )}px`;
      bindRecordHover(period, recordId);
      timeline.append(period);
    });
  });
}

async function initializeExperiencePeriods() {
  const experience = experienceData;
  const education = educationData;
  await document.fonts?.ready;
  history?.addEventListener('mouseenter', () => {
    history.classList.add('history-hover');
  });
  history?.addEventListener('mouseleave', () => {
    history.classList.remove('history-hover');
  });
  renderExperienceCards(experience);
  renderEducationCards(education, experience.length);
  const renderPeriods = () => {
    renderTimelinePeriods(
      experienceTimeline,
      experience,
      'experience-period',
      'experience',
    );
    renderTimelinePeriods(
      educationTimeline,
      education,
      'education-period',
      'education',
      experience.length,
      true,
    );
  };

  renderPeriods();
  window.addEventListener('resize', renderPeriods);
}

initializeExperiencePeriods().catch((error) => {
  console.error('Unable to render experience periods:', error);
});
