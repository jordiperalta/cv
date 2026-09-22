<script>
  import { onMount } from 'svelte';

  export let x1 = 0;
  export let y1 = 0;
  export let x2 = 100;
  export let y2 = 0;
  export let startXOffset = 0;
  export let endXOffset = 0;
  export let min = 16;
  export let max = 60;
  export let value = 20;

  let rangeLayer;
  let documentWidth = 1;
  let documentHeight = 1;
  let offsetLeft = 0;
  let offsetTop = 0;

  $: startX = (x1 / 100) * documentWidth + startXOffset;
  $: startY = (y1 / 100) * documentHeight;
  $: endX = (x2 / 100) * documentWidth + endXOffset;
  $: endY = (y2 / 100) * documentHeight;
  $: width = Math.hypot(endX - startX, endY - startY);
  $: angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);

  onMount(() => {
    const wheel = rangeLayer.closest('.wheel');
    const documentElement = rangeLayer.closest('.document');

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
  bind:this={rangeLayer}
  class="wheel-range-layer"
  style="left: {offsetLeft + startX}px; top: {offsetTop + startY}px; width: {width}px; transform: rotate({angle}deg);"
>
  <input
    class="document-line-range"
    type="range"
    min={min}
    max={max}
    step="1"
    bind:value
    aria-label="Image pixelation resolution"
  />
</div>

<style>
.document-line-range {
  position: absolute;
  z-index: 1;
  height: 16px;
  margin-top: -8px;
  padding: 0;
  border: 0;
  background: transparent;
  opacity: 0.15;
  transition: opacity 200ms ease;
  pointer-events: auto;
  transform-origin: 0 50%;
}

@media print {
  .document-line-range {
    opacity: 0;
  }
}

.wheel-range-layer:hover .document-line-range {
  opacity: 1;
}

.document-line-range:focus-visible {
  opacity: 1;
}

.document-line-range::-webkit-slider-runnable-track {
  height: 2px;
  border: 0;
  background-color: transparent;
  border-radius: 1px;
}

.document-line-range::-moz-range-track {
  height: 2px;
  border: 0;
  background-color: transparent;
  border-radius: 1px;
}

.document-line-range::-moz-range-progress {
  background-color: transparent;
}

.document-line-range::-webkit-slider-thumb {
  appearance: none;
  width: 12px;
  height: 12px;
  margin-top: -5px;
  border: 0;
  border-radius: 50%;
  background: #555555;
  cursor: pointer;
}

.document-line-range::-moz-range-thumb {
  width: 12px;
  height: 12px;
  border: 0;
  border-radius: 50%;
  background: #555555;
  cursor: pointer;
}

.document-line-range {
  appearance: none;
  pointer-events: auto;
}

.wheel-range-layer {
  position: absolute;
  z-index: 20;
  height: 16px;
  margin-top: -8px;
  pointer-events: none;
  transform-origin: 0 50%;
}

.wheel-range-layer .document-line-range {
  position: static;
  width: 100%;
  height: 16px;
  margin: 0;
}
</style>
