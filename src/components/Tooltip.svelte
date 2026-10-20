<script>
  import { Tooltip as BitsTooltip } from 'bits-ui';

  let { content, children } = $props();
</script>

<BitsTooltip.Root>
  <BitsTooltip.Trigger child={trigger}>
    {#snippet trigger({ props })}
      <span {...props} class="tooltip-trigger">
        {@render children?.()}
      </span>
    {/snippet}
  </BitsTooltip.Trigger>

  <BitsTooltip.Portal>
    <BitsTooltip.Content
      side="top"
      sideOffset={3}
      class="tooltip-content"
      style="z-index: 2147483647;"
    >
      {content}
      <BitsTooltip.Arrow class="tooltip-arrow" />
    </BitsTooltip.Content>
  </BitsTooltip.Portal>
</BitsTooltip.Root>

<style>
  .tooltip-trigger { display: block; }
  :global(.tooltip-content) {
    z-index: 500;
    max-width: 12rem;
    padding: .2rem .35rem;
    border: 1px solid #9baabd;
    border-radius: .35rem;
    background: #fff;
    color: #56698f;
    font-size: .55rem;
    line-height: 1.15;
    text-align: center;
    box-shadow: 0 4px 12px #1e293b3f;
  }

  :global(.tooltip-arrow) { fill: #fff; stroke: #b3c0d0; }
</style>
