<script>
  import '@fortawesome/fontawesome-free/scss/fontawesome.scss';
  import '@fortawesome/fontawesome-free/scss/brands.scss';
  import '@fortawesome/fontawesome-free/scss/regular.scss';
  import '@fortawesome/fontawesome-free/scss/solid.scss';
  import '@fortawesome/fontawesome-free/scss/v4-shims.scss';

  import { pomodoro } from 'stores/pomodoro';
  import Controls from "$lib/Controls.svelte";
  import CountdownClock from "$lib/CountdownClock.svelte";

  import { browserPermissions, appPermissions } from "stores/app.js"

  function toggleNotifications() {
    if ($browserPermissions.notifications)
      return appPermissions.update("notifications", !$appPermissions.notifications)

    if (!$appPermissions.notifications)
      Notification.requestPermission().then(result => {
        if (result == "granted")
          appPermissions.update("notifications", true)
      })
  }

  let stripAd, strippedAd = []

  function removeBloat() {
    const cnRegex = new RegExp(/[cC][nN]=([a-zA-Z_]+)/)
    strippedAd = stripAd.split(/([cC][nN]=[a-zA-Z_]+)/g)
    strippedAd = strippedAd.filter(x => /([cC][nN]=[a-zA-Z_]+)/.test(x))
    strippedAd = strippedAd.map(x => 
      x.split(/[cC][nN]=([a-zA-Z_]+)/)[1]
    )
    console.log("split", strippedAd)
  }
</script>

<style>
  button {
    all: unset;
    border-radius: 50%;
    padding: 0.5em;
    cursor: pointer;
  }
</style>

<div style="display: flex; justify-content: center;">
  <div style="display: flex; flex-direction: column; position: relative;">
    <div style="display: flex; justify-content: center;">
      <CountdownClock timer={$pomodoro.timer} title={$pomodoro.stage} />
    </div>
    <div>
      <Controls />
    </div>
    <div style="font-family: 'Roboto', sans-serif; padding: 1em; text-align: center;">
      <span>{$pomodoro.iteration}/4 Cycles</span>
    </div>
    <button style="position: absolute; right: 0; font-size: 14pt" on:click={toggleNotifications}>
      {#if $browserPermissions.notifications && $appPermissions.notifications}
        <i class="fa-regular fa-bell"></i>
      {:else}
        <i class="fa-regular fa-bell-slash"></i>
      {/if}
    </button>
  </div>
</div>




<!-- <textarea bind:value={stripAd}></textarea>

<button on:click={removeBloat}>Ad Filter</button>

<div>{strippedAd.length} groups</div>
<p>
  {#each strippedAd as group}
    {group}<br/>
  {/each}
</p> -->
