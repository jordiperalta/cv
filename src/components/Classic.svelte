<script>
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { locale, supportedLocales } from '../i18n.js';
  import { classicLabels } from '../../data/classic.js';
  import { personalData } from '../../data/personal.js';
  import { aboutMe } from '../../data/about.js';
  import { experienceData } from '../../data/experience.js';
  import { educationData } from '../../data/education.js';
  import { languageData } from '../../data/language.js';
  import { skillsData } from '../../data/skills.js';
  import { commonLabels } from '../../data/common.js';
  import DOMPurify from 'dompurify';
  import { marked } from 'marked';
  import profilePhoto from '../../assets/profile.jpg';

  const avatarSize = 104;
  const avatarResolution = 24;
  let avatarCanvas;
  const summary = aboutMe.summary;

  onMount(() => {
    const image = new Image();
    image.addEventListener('load', () => {
      const sourceCanvas = document.createElement('canvas');
      sourceCanvas.width = avatarResolution;
      sourceCanvas.height = avatarResolution;

      const sourceContext = sourceCanvas.getContext('2d');
      const avatarContext = avatarCanvas?.getContext('2d');
      if (!sourceContext || !avatarContext) return;

      sourceContext.drawImage(image, 0, 0, avatarResolution, avatarResolution);
      avatarContext.imageSmoothingEnabled = false;
      avatarContext.drawImage(
        sourceCanvas,
        0, 0, avatarResolution, avatarResolution,
        0, 0, avatarSize, avatarSize,
      );
    });
    image.src = profilePhoto;
  });

  function plainMarkdown(value) {
    return DOMPurify.sanitize(marked.parseInline($_(value)));
  }

  function formatDate(value) {
    if (value === 'Present') return $_(classicLabels.current);
    const date = new Date(`${value}T00:00:00`);
    return new Intl.DateTimeFormat($locale || 'en', { month: 'short', year: 'numeric' }).format(date);
  }

  function periodLabel(periods) {
    return periods.map(({ startDate, endDate }) => `${formatDate(startDate)} – ${formatDate(endDate)}`).join(' · ');
  }

  function educationPeriodLabel(periods) {
    const earliestStart = periods.reduce((earliest, period) =>
      period.startDate < earliest.startDate ? period : earliest,
    );
    const latestEnd = periods.reduce((latest, period) =>
      period.endDate > latest.endDate ? period : latest,
    );
    const dates = `${formatDate(earliestStart.startDate)} ... ... ${formatDate(latestEnd.endDate)}`;
    const totalHours = periods.reduce((total, period) => total + (period.hours ?? 0), 0);
    const hasHours = periods.every((period) => typeof period.hours === 'number');
    const formatHours = (hours) => new Intl.NumberFormat($locale || 'en', {
      style: 'unit',
      unit: 'hour',
      unitDisplay: 'long',
    }).format(hours);

    if (periods.length > 2) {
      return hasHours ? `${formatHours(totalHours)}, ${dates}` : dates;
    }

    return periods.map((period) => {
      const hours = typeof period.hours === 'number' ? `${formatHours(period.hours)}, ` : '';
      return `${hours}${formatDate(period.startDate)} – ${formatDate(period.endDate)}`;
    }).join(' · ');
  }

</script>

<main class="classic-page">
  <nav class="classic-nav" aria-label="Page navigation">
    <a href="/">{$_(classicLabels.portfolio)}</a>
    <div class="nav-actions">
      <label class="language-picker">
        <span class="sr-only">{$_(commonLabels.language)}</span>
        <select bind:value={$locale} aria-label={$_(commonLabels.language)}>
          {#each supportedLocales as language}
            <option value={language}>{language.toUpperCase()}</option>
          {/each}
        </select>
      </label>
      <button type="button" onclick={() => window.print()}><i class="fa-solid fa-print" aria-hidden="true"></i> {$_(classicLabels.print)}</button>
    </div>
  </nav>

  <article class="classic-sheet">
    <header class="classic-header">
      <canvas
        bind:this={avatarCanvas}
        class="classic-avatar"
        width={avatarSize}
        height={avatarSize}
        role="img"
        aria-label="Jordi Peralta"
      ></canvas>
      <div class="identity">
        <p class="eyebrow">Full-stack software developer</p>
        <h1>{personalData.firstName} {personalData.lastName}</h1>
        <p class="headline">{$_(aboutMe.title)}</p>
        <p class="focus">{$_(aboutMe.subtitle)}</p>
      </div>
      <address class="contact-list">
        <span><i class="fa-solid fa-location-dot" aria-hidden="true"></i> {personalData.location.city}, {personalData.location.country} {personalData.location.code}</span>
        <a href={`mailto:${personalData.email}`}><i class="fa-solid fa-envelope" aria-hidden="true"></i> {personalData.email}</a>
        <a href={`https://${personalData.linkedin}`} target="_blank" rel="noreferrer"><i class="fa-brands fa-linkedin" aria-hidden="true"></i> {personalData.linkedin}</a>
        <a href={`https://${personalData.website}`} target="_blank" rel="noreferrer"><i class="fa-solid fa-globe" aria-hidden="true"></i> {personalData.website}</a>
        <a href={`https://${personalData.docker}`} target="_blank" rel="noreferrer"><i class="fa-brands fa-docker" aria-hidden="true"></i> {personalData.docker}</a>
      </address>
    </header>

    <section class="summary-section">
      <h2>{$_(classicLabels.summary)}</h2>
      {#each summary as paragraph}
        <p>{@html plainMarkdown(paragraph)}</p>
      {/each}
    </section>

    <div class="classic-columns">
      <section class="experience-section">
        <h2>{$_(commonLabels.experience)}</h2>
        {#each experienceData as job (job.entity)}
          <article class="entry">
            <div class="entry-heading">
              <div>
                <h3>{$_(job.title)}</h3>
                <p class="organization">{$_(job.entity)} <span>· {$_(job.location)}</span></p>
              </div>
              <p class="dates">
                {#each job.periods as period, index}
                  <span>{formatDate(period.startDate)} – {formatDate(period.endDate)}</span>
                  {#if index < job.periods.length - 1}<br />{/if}
                {/each}
              </p>
            </div>
            {#if job.mainTasks?.length}
              <ul>
                {#each job.mainTasks as task}
                  <li>{@html plainMarkdown(task)}</li>
                {/each}
              </ul>
            {/if}
          </article>
        {/each}
      </section>

      <aside class="sidebar">
        <section>
          <h2>{$_(classicLabels.skills)}</h2>
          <div class="skill-list">
            {#each skillsData as skill}<span>{skill}</span>{/each}
          </div>
        </section>
        <section>
          <h2>{$_(commonLabels.educationCourses)}</h2>
          {#each educationData as education (education.title)}
            <article class="education-entry">
              <h3>{$_(education.title)}</h3>
              <p>{$_(education.entity)}</p>
              <small>{educationPeriodLabel(education.periods)}</small>
            </article>
          {/each}
        </section>
        <section>
          <h2>{$_(classicLabels.languages)}</h2>
          {#each languageData as language}
            <div class="language-entry"><strong>{language.name}</strong><span>{language.level}</span><small>{$_(language.certification)}</small></div>
          {/each}
        </section>
      </aside>
    </div>

    <footer>Jordi Peralta <span>·</span> {personalData.website}</footer>
  </article>
</main>

<style>
  .classic-page { min-height: 100vh; padding: 24px 20px 48px; color: #202b3b; }
  .classic-nav { max-width: 1040px; margin: 0 auto 18px; display: flex; justify-content: space-between; align-items: center; }
  .classic-nav a { color: #455d83; text-decoration: none; font-size: .9rem; font-weight: 600; }
  .nav-actions { display: flex; gap: 10px; align-items: center; }
  .nav-actions button, .language-picker select { border: 1px solid #d8dee8; background: #fff; color: #34445d; border-radius: 6px; padding: 8px 11px; font: inherit; font-size: .82rem; }
  .nav-actions button { cursor: pointer; }
  .classic-sheet { max-width: 1040px; margin: 0 auto; padding: 48px 56px 28px; background: #fff; box-shadow: 0 12px 48px #15243b1a; border-top: 5px solid #438b70; }
  .classic-header { display: grid; grid-template-columns: 104px 1fr auto; gap: 25px; align-items: center; padding-bottom: 26px; border-bottom: 1px solid #e5e9ef; }
  .classic-avatar { width: 104px; height: 104px; border-radius: 50%; image-rendering: pixelated; }
  .identity .eyebrow { margin: 0 0 5px; color: #438b70; text-transform: uppercase; letter-spacing: .13em; font-size: .68rem; font-weight: 700; }
  h1 { margin: 0; font-size: 2.2rem; line-height: 1.12; color: #182438; }
  .headline { margin: 7px 0 3px; font-size: 1rem; font-weight: 600; }
  .focus { margin: 0; color: #65738a; font-size: .82rem; }
  .contact-list { display: flex; flex-direction: column; gap: 8px; font-style: normal; font-size: .78rem; }
  .contact-list a { color: #475a74; text-decoration: none; }
  .contact-list i { width: 16px; color: #438b70; }
  section h2 { margin: 0 0 15px; color: #26364e; font-size: .85rem; text-transform: uppercase; letter-spacing: .12em; }
  .summary-section { padding: 23px 0 20px; border-bottom: 1px solid #e5e9ef; }
  .summary-section h2 { margin-bottom: 8px; }
  .summary-section p { margin: 5px 0; color: #46546a; font-size: .85rem; line-height: 1.55; }
  .summary-section :global(strong), .entry :global(strong) { color: #26364e; }
  .classic-columns { display: grid; grid-template-columns: minmax(0, 1.7fr) minmax(225px, .9fr); gap: 40px; padding-top: 24px; }
  .experience-section > h2, .sidebar section > h2 { padding-bottom: 9px; border-bottom: 2px solid #e7eee9; }
  .entry { position: relative; padding: 0 0 18px 15px; border-left: 1px solid #dce5df; }
  .entry::before { content: ''; position: absolute; width: 7px; height: 7px; border-radius: 50%; left: -4px; top: 4px; background: #438b70; }
  .entry-heading { display: flex; gap: 12px; justify-content: space-between; }
  .entry h3, .education-entry h3 { margin: 0; color: #26364e; font-size: .92rem; line-height: 1.35; }
  .organization { margin: 4px 0 0; color: #438b70; font-weight: 600; font-size: .79rem; }
  .organization span { color: #778398; font-weight: 400; }
  .dates { flex: 0 0 auto; margin: 2px 0 0; color: #79869a; font-size: .7rem; text-align: right; }
  .entry ul { margin: 8px 0 0; padding-left: 16px; color: #4b586d; font-size: .76rem; line-height: 1.48; }
  .entry li { margin: 4px 0; padding-left: 2px; }
  .entry li::marker { color: #76a88f; }
  .entry li :global(a) { color: #416e87; text-decoration: none; }
  .sidebar section { margin-bottom: 24px; }
  .skill-list { display: flex; gap: 6px; flex-wrap: wrap; }
  .skill-list span { padding: 5px 8px; background: #f0f5f2; border: 1px solid #e1ebe5; border-radius: 4px; color: #3e5c4d; font-size: .7rem; }
  .language-entry { display: grid; grid-template-columns: 1fr auto; gap: 3px 8px; padding: 0 0 11px; color: #3b4a60; font-size: .8rem; }
  .language-entry > span { color: #438b70; font-size: .75rem; font-weight: 700; }
  .language-entry small { grid-column: 1 / -1; color: #8490a1; font-size: .68rem; }
  .education-entry { padding: 0 0 12px; }
  .education-entry h3 { font-size: .79rem; }
  .education-entry p { margin: 3px 0; color: #438b70; font-size: .73rem; }
  .education-entry small { color: #8490a1; font-size: .67rem; }
  footer { margin-top: 16px; padding-top: 14px; border-top: 1px solid #e5e9ef; color: #8b96a6; font-size: .68rem; text-align: right; }
  footer span { padding: 0 4px; }
  .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
  @media (max-width: 720px) {
    .classic-page { padding: 14px 10px 28px; }
    .classic-sheet { padding: 28px 24px 22px; }
    .classic-header { grid-template-columns: 76px 1fr; gap: 15px; }
    .classic-avatar { width: 76px; height: 76px; }
    .contact-list { grid-column: 1 / -1; display: grid; grid-template-columns: 1fr 1fr; }
    h1 { font-size: 1.7rem; }
    .classic-columns { grid-template-columns: 1fr; gap: 24px; }
    .sidebar { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 22px; }
    .sidebar section:last-child { grid-column: 1 / -1; }
  }
  @media (max-width: 450px) {
    .classic-sheet { padding: 22px 17px; }
    .classic-nav { align-items: flex-start; }
    .contact-list { grid-template-columns: 1fr; }
    .entry-heading { display: block; }
    .dates { text-align: left; }
    .sidebar { display: block; }
  }
  @media print {
    .classic-page { padding: 0; background: #fff; }
    .classic-nav { display: none; }
    .classic-sheet { max-width: none; page: classic; box-shadow: none; padding: 12mm 13mm 8mm; border-top-width: 3px; }
    .entry::before { content: '●'; top: -1px; left: -4px; width: auto; height: auto; background: none; border: 0; color: #438b70; font-size: .75rem; line-height: 1; print-color-adjust: exact; -webkit-print-color-adjust: exact; }
    .entry, .education-entry { break-inside: avoid; }
    .sidebar section h2 { break-after: avoid; }
    .classic-sheet > footer { display: none; }
  }
</style>
