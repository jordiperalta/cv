<script>
  import LifeHeader from './LifeHeader.svelte';
  import LifeNav from './LifeNav.svelte';
  import Language from './Language.svelte';

  let historyHover = false;
</script>

<div
    class:history-hover={historyHover}
    class="history"
    onmouseenter={() => (historyHover = true)}
    onmouseleave={() => (historyHover = false)}
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
    background-image: linear-gradient(to bottom, #b8c0d1cf, #fcfdfef7);
    transition: flex-basis 350ms ease, margin-right 350ms ease, padding-left 350ms ease;
  }

  .history.history-hover {
    flex-basis: calc(35% + var(--history-hover-swing) + var(--history-hover-swing));
    margin-right: calc(0px - var(--history-hover-swing) - var(--history-hover-swing));
    z-index: 3;
  }

</style>
