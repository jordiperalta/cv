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
    <LifeHeader />
    <LifeNav />
    <Language />
</div>