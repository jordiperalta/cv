<script>
  export let size;
  export let startAngle = 0;
  export let endAngle = 90;
  export let color = '#000000';

  const strokeWidth = 10;
  const gap = 15;
  $: radius = size / 2 + gap + strokeWidth / 2;
  $: box = radius * 2 + strokeWidth;
  $: center = box / 2;

  function pointAtAngle(angle) {
    const radians = (angle * Math.PI) / 180;
    return {
      x: center + radius * Math.cos(radians),
      y: center + radius * Math.sin(radians),
    };
  }

  function createArcPath(start, end) {
    const arcStart = pointAtAngle(start);
    const arcEnd = pointAtAngle(end);
    let sweep = end - start;
    while (sweep < 0) sweep += 360;
    sweep = Math.min(sweep, 360);
    const largeArcFlag = sweep > 180 ? 1 : 0;

    return `M ${arcStart.x} ${arcStart.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${arcEnd.x} ${arcEnd.y}`;
  }

  $: arcPath = createArcPath(startAngle, endAngle);
</script>

<svg
  class="wheel-arch"
  viewBox="0 0 {box} {box}"
  aria-hidden="true"
  style="width: {box}px; height: {box}px; margin-top: -{center}px; margin-left: -{center}px;"
>
  <path d={arcPath} fill="none" stroke={color} stroke-width={strokeWidth} />
</svg>
