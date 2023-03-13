<script>
  export let percent
  const circumference = (r) => 2 * Math.PI * r
  const fill = (r, percent) => (percent / 100) * circumference(r)
</script>

<style>
  svg {
    position: relative;
    height: 100%;
    width: 100%;
    transform: rotate(-90deg);
  }
  svg circle:nth-child(1)
  {
    stroke-width: 6;
    stroke: #6C0969;
  }
  svg circle:nth-child(2)
  {
    stroke:#4E10D8;
  }

  svg circle {
    fill: none;
    stroke-width: 6;
    stroke: black;
  }
</style>

<svg viewbox="0 0 100 100">
  <circle cx="50%" cy="50%" r="30"></circle>
  <circle cx="50%" cy="50%" r="30" style="stroke-dasharray: {circumference(30)}; stroke-dashoffset: {fill(30, percent)}"></circle>
</svg>
