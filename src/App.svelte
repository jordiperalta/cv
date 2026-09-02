<script>
  import Contact from './components/Contact.svelte';
  import Content from './components/Content.svelte';
  import Document from './components/Document.svelte';
  import Header from './components/Header.svelte';
  import Life from './components/Life.svelte';
  import Location from './components/Location.svelte';
  import Wheel from './components/Wheel.svelte';
</script>

<Document>
  <Header />
  <Content>
    <Life />
    <div class="experience"></div>
  </Content>
  <Location />
  <Contact />
  <Wheel />

</Document>

<button class="print-button" type="button" onclick={() => window.print()}>
  Save as PDF
</button>
