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
  import Wheel from './components/Wheel.svelte';
</script>

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

<button class="print-button" type="button" onclick={() => window.print()}>
  {$_(commonLabels.saveAsPdf)}
</button>
