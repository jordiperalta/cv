<script>
  import { onMount } from 'svelte';

  export let x1 = 0;
  export let y1 = 0;
  export let x2 = 100;
  export let y2 = 100;
  export let startColor = '#000000';
  export let endColor = '#ffffff';
  export let strokeWidth = 2;

  let svg;
  let documentWidth = 1;
  let documentHeight = 1;
  let offsetLeft = 0;
  let offsetTop = 0;
  const gradientId = `document-line-${Math.random().toString(36).slice(2)}`;

  $: lineX1 = (x1 / 100) * documentWidth;
  $: lineY1 = (y1 / 100) * documentHeight;
  $: lineX2 = (x2 / 100) * documentWidth;
  $: lineY2 = (y2 / 100) * documentHeight;

  onMount(() => {
    const wheel = svg.closest('.wheel');
    const documentElement = svg.closest('.document');

    function updatePosition() {
      const wheelBounds = wheel.getBoundingClientRect();
      const documentBounds = documentElement.getBoundingClientRect();
      documentWidth = documentBounds.width;
      documentHeight = documentBounds.height;
      offsetLeft = documentBounds.left - wheelBounds.left;
      offsetTop = documentBounds.top - wheelBounds.top;
    }

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  });
</script>

<div
  bind:this={svg}
  class="document-line-layer"
  style="left: {offsetLeft}px; top: {offsetTop}px; width: {documentWidth}px; height: {documentHeight}px;"
>
  <svg class="document-line" viewBox="0 0 {documentWidth} {documentHeight}" aria-hidden="true">
    <defs>
      <linearGradient id={gradientId} x1={lineX1} y1={lineY1} x2={lineX2} y2={lineY2} gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color={startColor} />
        <stop offset="100%" stop-color={endColor} />
      </linearGradient>
    </defs>
    <line x1={lineX1} y1={lineY1} x2={lineX2} y2={lineY2} stroke={`url(#${gradientId})`} stroke-width={strokeWidth} />
  </svg>
</div>
