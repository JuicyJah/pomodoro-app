<script>
  import { pomodoro } from "stores/pomodoro";
  import CircularProgress from "$lib/CircularProgress.svelte";
  import Time from "$lib/Time.svelte";

  // export let timer
  export let title

  $: timer = $pomodoro.timer
  $: percentElapsed = ((timer.duration - $timer.elapsed) / timer.duration) * 100
</script>

<div style="position: relative; display: flex; justify-content: center; align-items: center; font-family: 'Roboto', sans-serif; font-size: 40pt; font-weight: 500">
  <CircularProgress percent={percentElapsed}/>
  <div style="position: absolute;">
    <div>
      <Time style="" time={$timer.elapsed}/>
      <div style="font-size: 12pt; font-weight: 400; text-transform: uppercase; text-align: center;">{title}</div>
    </div>
  </div>
</div>
