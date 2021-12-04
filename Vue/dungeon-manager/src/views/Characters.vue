<template>
  <div>
    <h1 class='darkText'>Characters</h1>
    <div class="dropdown">
      <form>
        <select name="characters" id="characters">
          <option v-for="character in characters" :value="character.charName" :key="character.id">
          </option>
        </select>
      </form>
    </div>
    <div class="charsheet">
      <Charsheet></Charsheet>
    </div>
  </div>
</template>

<script>
import Charsheet from '../components/Charsheet.vue';
import axios from '../axios';
export default {
  name: 'Characters',
  methods: {
    async getCharacters() { //get characters from api
        try {
          let response = await axios.get("/api/characters");
          this.characters = response.data;
          return true;
        }
        catch (error) {
          console.log(error);
        }
    },
  },
  components: {
    Charsheet
  },
}
</script>
