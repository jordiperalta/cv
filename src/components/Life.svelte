<script>
  import LifeHeader from './LifeHeader.svelte';
  import LifeNav from './LifeNav.svelte';
  import Language from './Language.svelte';

  let historyHover = false;

  function handleHistoryMouseEnter() {
    if (window.matchMedia('(min-width: 601px)').matches) {
      historyHover = true;
    }
  }

  function handleHistoryMouseLeave() {
    historyHover = false;
  }
</script>

<div
    class:history-hover={historyHover}
    class="history"
    onmouseenter={handleHistoryMouseEnter}
    onmouseleave={handleHistoryMouseLeave}
>
    <LifeHeader {historyHover} />
    <LifeNav {historyHover} />
    <Language {historyHover} />
</div>

<style>
  .history {
    --history-hover-swing: 8px;
    --history-header-padding-h: 4px;
    flex: 0 0 35%;
    height: 100%;
    min-height: 0;
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    background-image: linear-gradient(to bottom, #b8c0d1cf, #fcfdfedf);
    border-radius: 16px;
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
    transition: flex-basis 350ms ease, margin-right 350ms ease, padding-left 350ms ease, box-shadow 200ms ease-in-out;
  }

  .history.history-hover {
    flex-basis: calc(35% + var(--history-hover-swing) + var(--history-hover-swing));
    margin-right: calc(0px - var(--history-hover-swing) - var(--history-hover-swing));
    z-index: 3;
    box-shadow: 4px 0 8px rgba(0, 0, 0, 0.4);
  }

  @media screen and (max-width: 600px) {
    .history {
      flex: none;
      width: calc(100% - 1rem);
      max-width: 600px;
      height: 900px;
      margin-top: 4px;
      margin-inline: auto;
      border: #b3c0d0 2px solid;
    }

    .history.history-hover {
      flex-basis: auto;
      margin-right: 0;
      box-shadow: none;
    }
  }

</style>
