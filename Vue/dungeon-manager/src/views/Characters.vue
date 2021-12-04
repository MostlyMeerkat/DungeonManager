<template>
  <div id="characters">
    <h1 class='darkText'>Characters</h1>
    <div class="charsheet-spread">
      <Charsheet></Charsheet>
    </div>
  </div>
</template>

<script>
import Charsheet from '../components/Charsheet.vue';
export default {
  name: 'Characters',
  components: {
    Charsheet
  }
}
</script>
