<script>
  import { languageData } from '../../data/language.js';

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

<div class="history-footer">
  <div class="history-header-section header-education history-footer-heading">
    <span>Language</span>
    <i class="fa-solid fa-language" aria-hidden="true"></i>
  </div>
  {#each languageData as language (language.name)}
    <svg height="150" width="125" viewBox="0 0 150 180">
      <path fill="none" stroke={language.colors.base} stroke-width="30" d="M 25 75 A 50 50 0 1 0 75 25"></path>
      <path class="language-arc speak" fill="none" stroke={language.colors.speak} stroke-width="10" pathLength="100" d={createLanguageArc(language.speak, 60)}></path>
      <path class="language-arc read" fill="none" stroke={language.colors.read} stroke-width="10" pathLength="100" d={createLanguageArc(language.read, 50)}></path>
      <path class="language-arc write" fill="none" stroke={language.colors.write} stroke-width="10" pathLength="100" d={createLanguageArc(language.write, 40)}></path>
      <text x="62" y="14" font-size="0.875em" fill="#56698F" text-anchor="end">speak</text>
      <text x="62" y="28" font-size="0.875em" fill="#56698F" text-anchor="end">read</text>
      <text x="62" y="42" font-size="0.875em" fill="#56698F" text-anchor="end">write</text>
      <text x="77" y="66" font-size="0.875em" fill="#56698F" text-anchor="middle">level*</text>
      <text x="75" y="88" font-size="1.5em" fill="#56698F" text-anchor="middle">{language.level}</text>
      <text x="75" y="165" font-size="1.375em" fill={language.colors.label} text-anchor="middle">{language.name}</text>
    </svg>
  {/each}
</div>
