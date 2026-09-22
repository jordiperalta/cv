<script>
  import { languageData, languageLabels } from '../../data/language.js';
  import { commonLabels } from '../../data/common.js';
  import { locale } from '../i18n.js';
  import { _ } from 'svelte-i18n';
  import { Tooltip as BitsTooltip } from 'bits-ui';
  import Tooltip from './Tooltip.svelte';
  export let historyHover = false;

  function selectLanguage(languageLocale) {
    locale.set(languageLocale);
  }

  function handleLanguageKeydown(event, languageLocale) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectLanguage(languageLocale);
    }
  }

  function createLanguageArc(score, radius) {
    const normalizedScore = Math.max(0, Math.min(100, score));
    const arcAngle = (normalizedScore / 100) * 270;

    if (arcAngle === 0) {
      return '';
    }

    const endAngle = ((arcAngle - 90) * Math.PI) / 180;
    const x = 75 + radius * Math.cos(endAngle);
    const y = 75 + radius * Math.sin(endAngle);
    const largeArc = arcAngle > 180 ? 1 : 0;

    return `M 75 ${75 - radius} A ${radius} ${radius} 0 ${largeArc} 1 ${x} ${y}`;
  }
</script>

<div class:history-hover={historyHover} class="history-footer">
  <div class="history-header-section header-education history-footer-heading">
    <span>Language</span>
    <i class="fa-solid fa-language" aria-hidden="true"></i>
  </div>
  <BitsTooltip.Provider delayDuration={200} disableHoverableContent={true} disableCloseOnTriggerClick={true}>
    {#each languageData as language (language.name)}
      <Tooltip content={$_(language.certification)}>
        <svg height="150" width="125" viewBox="0 0 150 180">
          <path fill="none" stroke={language.colors.base} stroke-width="30" d="M 25 75 A 50 50 0 1 0 75 25"></path>
          <path class="language-arc speak" fill="none" stroke={language.colors.speak} stroke-width="10" pathLength="100" d={createLanguageArc(language.speak, 60)}></path>
          <path class="language-arc read" fill="none" stroke={language.colors.read} stroke-width="10" pathLength="100" d={createLanguageArc(language.read, 50)}></path>
          <path class="language-arc write" fill="none" stroke={language.colors.write} stroke-width="10" pathLength="100" d={createLanguageArc(language.write, 40)}></path>
          <text x="62" y="14" font-size="0.875em" fill="#56698F" text-anchor="end">{$_(languageLabels.speak)}</text>
          <text x="62" y="28" font-size="0.875em" fill="#56698F" text-anchor="end">{$_(languageLabels.read)}</text>
          <text x="62" y="42" font-size="0.875em" fill="#56698F" text-anchor="end">{$_(languageLabels.write)}</text>
          <text x="77" y="66" font-size="0.875em" fill="#56698F" text-anchor="middle">{$_(languageLabels.level)}</text>
          <text x="75" y="88" font-size="1.5em" fill="#56698F" text-anchor="middle">{language.level}</text>
          <text
            x="75"
            y="165"
            font-size="1.375em"
            fill={language.colors.label}
            text-anchor="middle"
            class="select-language"
            role="button"
            tabindex="0"
            aria-label={`Select ${language.name}`}
            onclick={() => selectLanguage(language.locale)}
            onkeydown={(event) => handleLanguageKeydown(event, language.locale)}
          >{language.name}</text>
        </svg>
      </Tooltip>
    {/each}
  </BitsTooltip.Provider>
</div>

<style>
  .history-footer {
    flex: 0 0 125px;
    width: 100%;
    max-width: 285px;
    position: relative;
    display: flex;
    padding: 0;
    min-width: 0;
    align-self: flex-end;
    align-items: flex-end;
    border-right: #485e881f 1px solid;
    transition: padding-right var(--history-hover-duration) var(--history-hover-easing);
  }

  .select-language {
    cursor: pointer;
  }

  .select-language:focus {
    outline: none;
  }

  .select-language:focus-visible {
    text-decoration: underline;
  }

  .history-footer.history-hover { padding-right: var(--history-hover-swing); }
  .history-footer-heading { position: absolute; top: -16px; right: 0; width: calc(50% - 10px); z-index: 1; flex: none; justify-content: center; }
  .history-footer-heading { min-width: 0; display: flex; align-items: center; gap: 2px; font-size: .9375rem; font-weight: 300; }
  .history-footer-heading span { color: #485e88; padding: 0 2px; transform: scaleX(.925); transform-origin: top right; transition: color 250ms ease; }
  .history-footer-heading .fa-language { color: #485e88; font-size: 19px; transition: color 250ms ease; }
  :global(.history-footer:has(svg:hover) .history-footer-heading span),
  :global(.history-footer:has(svg:hover) .history-footer-heading .fa-language) { color: #bbb; }
  .history-footer :global(.tooltip-trigger) { flex: 1 1 0; min-width: 0; }
  .history-footer svg { width: 100%; height: auto; transition: filter 250ms ease, opacity 250ms ease; }
  :global(.history-footer:has(svg:hover) .tooltip-trigger:not(:has(svg:hover)) svg) { filter: grayscale(1); opacity: .4; }
  .language-arc { stroke-dasharray: 100; stroke-dashoffset: 0; }
  .history-footer svg:hover .language-arc.write { animation: draw-language-arc 750ms ease 0ms both; }
  .history-footer svg:hover .language-arc.read { animation: draw-language-arc 750ms ease 250ms both; }
  .history-footer svg:hover .language-arc.speak { animation: draw-language-arc 750ms ease 500ms both; }
  @keyframes draw-language-arc { from { stroke-dashoffset: 100; } to { stroke-dashoffset: 0; } }

  @media screen and (max-width: 600px) {
    .history-footer {
      border-right: none;
      align-self: center;
    }

    .history-footer.history-hover {
      padding: 0;
    }
  }
</style>
