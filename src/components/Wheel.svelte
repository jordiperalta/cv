<script>
  import { onMount } from 'svelte';
  import WheelArc from './WheelArc.svelte';
  import WheelRadius from './WheelRadius.svelte';
  import WheelResolution from './WheelResolution.svelte';
  import DocumentLine from './DocumentLine.svelte';
  import profileUrl from '../../assets/profile.jpg';
  // import profileUrl from '../../assets/pixelated-profile.png';

  let canvas;
  const size = 120;
  const resolutionMin = 20;
  let resolution = 30;
  let profileImage;
  const lineX1 = 0.25;
  const lineY1 = 15.4;
  const lineX2 = 37.5;
  const lineY2 = 15.4;

  function drawPixelatedImage(image, resolutionValue) {
    const pixelResolution = (resolutionValue/10)**3
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
   
  <WheelArc size={size} startAngle={135} endAngle={171} color="#485e88" />
  <WheelRadius inner={size} angle={171} length={70} color="#485e88" />
  <WheelArc size={size} startAngle={181} endAngle={230} color="#ffdd22" />
  <WheelArc size={size} startAngle={240} endAngle={317} color="#cc1931" />
  <WheelRadius inner={size} angle={317} length={65} color="#cc1931" />
  <WheelArc size={size} startAngle={327} endAngle={0} color="#555555" />
  <WheelRadius inner={size} angle={0} length={250} color="#555555" />
  <DocumentLine
    x1={lineX1}
    y1={lineY1}
    x2={lineX2}
    y2={lineY2}
    startColor="#485e88"
    endColor="#485e88"
  />
  <WheelResolution size={size} min={resolutionMin} max={60} bind:value={resolution} />
</div>
