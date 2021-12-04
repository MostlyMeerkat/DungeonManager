<template>
  <div class="game">
    <div class="headerContainer">
      <h1 class="darkText">Game Tracker</h1>
    </div>

    <div class="gameContainer">
      <Weather/>
      <div class="initiative">
        <div class="upNext">
          <h2 class="darkText">Current</h2>
          <ul class="no-bullet">
            <li class="darkText initiativeOrder" v-for="(item, idx) in current" :key="idx">
              <label>{{ item.initiative }} | <strong>{{item.name}} </strong></label>
              <button v-on:click="deleteItem(item)" class="delete">X</button>
            </li>
          </ul>
          <h2 class="darkText">Up Next</h2>
          <ul class="no-bullet">
            <li class="darkText initiativeOrder" v-for="(item, idx) in upNext" :key="idx">
              <label>{{ item.initiative }} | <strong>{{item.name}} </strong></label>
              <button v-on:click="deleteItem(item)" class="delete">X</button>
            </li>
          </ul>
          <form v-on:submit.prevent="next">
            <button class="nextButton" type="submit">Next</button>
          </form>

          <form v-on:submit.prevent="addItem">
            <input type="text" class="searchbar" v-model="name" placeholder="name">
            <input type="text" class="searchbar" v-model="initiative" placeholder="initiative">
            <button class="addButton" type="submit">Add</button>
          </form>

        </div>

      </div>
      <div class="reminders">
        <div class="headerContainer">
          <h1 class="darkText">Reminders</h1>
        </div>
        <div class="reminderColumn">
          <ul>
            <li>Characters don't fail! The world is just unpredictable and dangerous.</li>
            <li>Stealth is always an option for PCs as well as NPCs</li>
            <li>LISTEN TO YOUR PLAYERS! DON'T ZONE OUT</li>
            <li>Monsters/NPCs want to survive, not just mindlessly attack PCs</li>
          </ul>
        </div>
        <div class="reminderColumn">
          <ul>
            <li>USE LEGENDARY ACTIONS AFTER A PC FINISHES THEIR TURN</li>
            <li>Keep combat moving</li>
            <li>Check your monsters' stat block for unique moves (or make some up in advance)</li>
            <li>Ask questions to the players: How are you moving? How is ____ feeling?</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Weather from '../components/Weather.vue'
export default {
  name: 'Game',
  components: {
	Weather
  },
  data: function() {
    return {
      combatants: [],
      name: '',
      initiative: '',
      show: 'all',
      curr: null,
    }
  },
  computed: {
      upNext() {
        if (this.combatants.length > 1) {
          let currIdx = this.combatants.indexOf(this.curr);
          let upN = [];
          for (let i = 1; i < this.combatants.length; i++) upN.push(this.combatants[(currIdx+i) % this.combatants.length]);
          return upN;
        }
        return [];
      },
      current() {
        if (this.combatants.length >= 1) return [ this.curr ];
        return [];
      }
  },
  methods: {
      addItem() {
        console.log('name: ' + this.name + ", init: " + this.initiative);
        this.combatants.push({name: this.name, initiative: Number(this.initiative)});
        if (this.combatants.length === 1) this.curr = this.combatants[0];
        this.combatants.sort((a, b) => {
          return b.initiative - a.initiative;
        });
        this.name = '';
        this.initiative = '';
        console.log(this.combatants);
      },
      deleteItem(item) {
          var index = this.combatants.indexOf(item);
          if (index > -1)
            this.combatants.splice(index,1);
          if (this.combatants.length === 0) this.curr = null;
      },
      showAll() {
          this.show = 'all';
      },
      next() {
        this.curr = this.combatants[(this.combatants.indexOf(this.curr) + 1) % this.combatants.length];
      }
  }
}
</script>
