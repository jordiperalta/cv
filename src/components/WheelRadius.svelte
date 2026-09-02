<script>
  export let inner;
  export let angle = 0;
  export let length = 30;
  export let color = '#000000';

  const strokeWidth = 2;
  const arcGap = 15;
  $: startRadius = inner / 2 + arcGap;
  $: endRadius = startRadius + length;
  $: box = (endRadius + strokeWidth / 2) * 2;
  $: center = box / 2;
  $: radians = (angle * Math.PI) / 180;
  $: x1 = center + startRadius * Math.cos(radians);
  $: y1 = center + startRadius * Math.sin(radians);
  $: x2 = center + endRadius * Math.cos(radians);
  $: y2 = center + endRadius * Math.sin(radians);
</script>

<svg
  class="wheel-radius"
  viewBox="0 0 {box} {box}"
  aria-hidden="true"
  style="width: {box}px; height: {box}px; margin-top: -{center}px; margin-left: -{center}px;"
>
  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} stroke-width={strokeWidth} />
</svg>
