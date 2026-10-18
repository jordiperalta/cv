<script>
  import { _ } from 'svelte-i18n';
  import { commonLabels } from '../data/common.js';
  import Contact from './components/Contact.svelte';
  import Content from './components/Content.svelte';
  import Document from './components/Document.svelte';
  import Header from './components/Header.svelte';
  import InfoLabel from './components/InfoLabel.svelte';
  import Life from './components/Life.svelte';
  import Location from './components/Location.svelte';
  import Main from './components/Main.svelte';
  import Classic from './components/Classic.svelte';
  import Wheel from './components/Wheel.svelte';
</script>

{#if window.location.pathname.replace(/\/$/, '') === '/classic'}
  <Classic />
{:else}
<Document>
  <Header />
  <Content>
    <Life />
    <Main />
  </Content>
  <Location />
  <InfoLabel>
    <Contact />
  </InfoLabel>
  <Wheel />

</Document>

<div class="interactive-actions">
  <a class="interactive-classic-link" href="/classic">Classic CV</a>
  <button class="interactive-print-button" type="button" onclick={() => window.print()}>
    {$_(commonLabels.saveAsPdf)}
  </button>
</div>
{/if}
