<script>
  export let historyHover = false;
</script>

<div class:history-hover={historyHover} class="history-header">
  <div class="history-header-section header-experience">
    <i data-lucide="pickaxe" aria-hidden="true"></i>
    <span>Experience</span>
  </div>
  <div class="history-header-section header-education">
    <span>Education & Courses</span>
    <i data-lucide="graduation-cap" aria-hidden="true"></i>
  </div>
</div>

<style>
  .history-header {
    flex: 0 0 32px;
    display: flex;
    padding: 0 var(--history-header-padding-h, 4px) 2px;
    background-color: #ffffffef;
    transition: padding 350ms ease;
  }

  .history-header.history-hover {
    padding: 0 calc(var(--history-header-padding-h, 2px) + var(--history-hover-swing)) 2px;
  }

  .history-header > :nth-child(1) { justify-content: start; }
  .history-header > :nth-child(1) span { transform-origin: top left; }
  .history-header > :nth-child(2) { justify-content: end; }
  .history-header > :nth-child(2) span { transform-origin: top right; }

  .history-header-section {
    flex: 0 1 auto;
    min-width: 0;
    display: flex;
    align-items: center;
    gap: 2px;
    font-size: .9375rem;
    font-weight: 300;
  }

  .history-header-section + .history-header-section { margin-left: auto; }
  .history-header-section span { padding: 0 2px; transform: scaleX(.925); }
  .history-header-section :global(svg) { color: #485e88; width: 16px; height: 16px; stroke-width: 1.75; }
  .history-header-section.header-education :global(svg) { width: 19px; height: 19px; }
</style>
