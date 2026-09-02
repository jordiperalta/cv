<script>
  export let size;
  export let min = 16;
  export let max = 60;
  export let value = 20;
  export let length = 250;
  export let inset = 10;

  $: left = size / 2 + 15 + inset;
  $: width = length - inset;
</script>

<div class="wheel-range-layer" style="left: {left}px; top: -1px; width: {width}px;">
  <input
    class="document-line-range"
    type="range"
    min={min}
    max={max}
    step="0.25"
    bind:value
    aria-label="Image pixelation resolution"
  />
</div>
