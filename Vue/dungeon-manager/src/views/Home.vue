<template>
  <div class="home">
    <div class='imageheader'><img src='images/dm-title.svg' class='dm-title' /></div>
    <div class='imageheader mtd'><img src='images/mtd-title.svg' class='mtd-title' /></div>

    <div class='content'>
      <h1>Welcome!</h1>
      <p>...to the solution to all your DMing needs! Whether you have far too many character sheets to keep track of,
        or the details of your evil scheme are just too much to keep in your head, we have you covered!</p>
    </div>

    <div class='content char'>
      <h2>Characters</h2>
      <p>Organize and view all your characters, their weapons, stats, and other equipment at a glance!</p>
    </div>

    <div class='content init'>
      <h2>Initiative</h2>
      <p>Easily organize notes for initiative, weather, and terrain effects!</p>
    </div>

    <div class='content data'>
      <h2>Database</h2>
      <p>Quickly collect information for monsters, weapons, locations, and more!</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    //
  }
}
</script>
