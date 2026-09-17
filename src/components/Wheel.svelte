<script>
  import { onMount } from 'svelte';
  import WheelArc from './WheelArc.svelte';
  import WheelRadius from './WheelRadius.svelte';
  import WheelResolution from './WheelResolution.svelte';
  import DocumentLine from './DocumentLine.svelte';
  import profileUrl from '../../assets/profile.jpg';

  let canvas;
  const size = 120;
  const resolutionMin = 20;
  const resolutionMiddle = 30;
  const resolutionMax = 120;
  let resolution = (resolutionMin + resolutionMax) / 2;
  let profileImage;

  function getPixelResolution(rangeValue) {
    const midpoint = (resolutionMin + resolutionMax) / 2;

    if (rangeValue <= midpoint) {
      const progress = (rangeValue - resolutionMin) / (midpoint - resolutionMin);
      return Math.round(resolutionMin * (resolutionMiddle / resolutionMin) ** progress);
    }

    const progress = (rangeValue - midpoint) / (resolutionMax - midpoint);
    return Math.round(resolutionMiddle * (resolutionMax / resolutionMiddle) ** progress);
  }

  function drawPixelatedImage(image, resolutionValue) {
    const pixelResolution = getPixelResolution(resolutionValue);
    const sourceCanvas = document.createElement('canvas');
    sourceCanvas.width = pixelResolution;
    sourceCanvas.height = pixelResolution;

    const sourceContext = sourceCanvas.getContext('2d');
    const targetContext = canvas.getContext('2d');
    targetContext.clearRect(0, 0, size, size);
    targetContext.imageSmoothingEnabled = false;
    sourceContext.drawImage(image, 0, 0, pixelResolution, pixelResolution);
    targetContext.drawImage(
      sourceCanvas,
      0, 0, pixelResolution, pixelResolution,
      0, 0, size, size,
    );
  }

  $: if (profileImage && canvas && resolution) {
    drawPixelatedImage(profileImage, resolution);
  }

  onMount(() => {
    const image = new Image();

    image.addEventListener('load', () => (profileImage = image));

    image.src = profileUrl;
  });
</script>

<div class="wheel">
  <div
    class="wheel-profile-frame"
    style="height: {size}px; width: {size}px; margin-top: -{size/2}px; margin-left: -{size/2}px;"
  >
    <canvas
      bind:this={canvas}
      class="wheel-profile"
      width={size}
      height={size}
      aria-label="Pixelated profile"
    ></canvas>
  </div>
   
  <WheelArc size={size} startAngle={140} endAngle={196} color="#485e88" />
  <WheelRadius inner={size} angle={140} length={30} color="#485e88" />
  <DocumentLine x1={0.25} y1={15.4} x2={38.4} y2={15.4} endXOffset={50} startColor="#485e88" endColor="#485e88"/>
  <WheelArc size={size} startAngle={205} endAngle={256} color="#ffdd22" />
  <!-- <WheelRadius inner={size} angle={219} length={51} color="#ffdd22" /> -->
  <!-- <DocumentLine x1={15.25} y1={2.25} x2={36.15} y2={2.25} startColor="#ffffff" endColor="#ffdd22"/> -->
  <WheelArc size={size} startAngle={265} endAngle={325} color="#cc1931" />
  <WheelRadius inner={size} angle={325} length={30} color="#cc1931" />
  <DocumentLine x1={59.3} y1={4.0} x2={59.3} y2={1.0} startXOffset={50} endXOffset={50} startColor="#cc1931" endColor="#cc1931"/>
  <WheelArc size={size} startAngle={334} endAngle={30} color="#555555" />
  <DocumentLine x1={56.9} y1={12.63} x2={67.4} y2={14.8} startXOffset={50} startColor="#555555" endColor="#555555"/>
  <DocumentLine x1={61.15} y1={14.87} x2={67.45} y2={13.27} startXOffset={50} startColor="#555555" endColor="#555555"/>
  <DocumentLine x1={61.1} y1={13.35} x2={90} y2={13.35} startXOffset={50} startColor="#555555" endColor="#555555"/>
  <DocumentLine x1={83.6} y1={13.35} x2={98} y2={13.35} startXOffset={50} startColor="#555555" endColor="#55555500"/>
  <WheelResolution x1={63} y1={13.25} x2={81.5} y2={13.25} startXOffset={50} endXOffset={50} min={resolutionMin} max={resolutionMax} bind:value={resolution} />
  <WheelArc size={size} startAngle={39} endAngle={132} color="#10AF40" />
  <WheelRadius inner={size} angle={39} length={95.5} color="#10AF40" />
  <!-- <DocumentLine x1={48.75} y1={14.5} x2={44.75} y2={17} startXOffset={0} startColor="#10AF40" endColor="#10AF40"/> -->
  <DocumentLine x1={45} y1={18.9} x2={71.45} y2={18.9} startXOffset={0} startColor="#08714f" endColor="#10AF40"/>
  <DocumentLine x1={36.075} y1={18.9} x2={45} y2={18.9} startXOffset={0} startColor="#08714f00" endColor="#08714fff"/>
</div>
