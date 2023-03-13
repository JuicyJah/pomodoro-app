<script>
  import { pomodoro } from "stores/pomodoro";

  $: timer = $pomodoro.timer
</script>

<style>
  button {
    all: unset;
    cursor: pointer;
    box-sizing: border-box;
    border-radius: 50%;
    border: 1px solid purple;
    width: 2em;
    height: 2em;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin: 0 0.5em;
  }
  button > i {
    position: absolute;
  }
</style>

<div style="display: flex; justify-content: center; align-items: center;">
  <button style="font-size: 14pt" on:click={timer.reset}><i class="fa-solid fa-rotate-left"></i></button>
  {#if !$timer.running}
    <button on:click={pomodoro.start} style="padding: 1.5em;"><i class="fa-solid fa-play"></i></button>
  {:else if $timer.running}
    <button on:click={pomodoro.stop} style="padding: 1.5em;"><i class="fa-solid fa-pause"></i></button>
  {/if}
  <button style="font-size: 14pt" on:click={pomodoro.next}><i class="fa-solid fa-forward"></i></button>
</div>
