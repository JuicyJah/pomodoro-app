<script>
  export let time = 0 //milliseconds
  let clazz = ""
  export {clazz as class}
  export let style = ""

  const getSeconds = (t) => Math.ceil(t / 1000)
  const getMinutes = (t) => Math.floor(getSeconds(t) / 60)
  $: minutes = getMinutes(time)
  $: seconds = getSeconds(time) - (getMinutes(time) * 60)

  function padPartialTime(t) {
    return t < 10 ? `0${t}` : `${t}`
  }

</script>

<span {style}>
  <span>{padPartialTime(minutes)}</span><span>:</span><span>{padPartialTime(seconds)}</span>
</span>
