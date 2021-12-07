<template>
  <div>
    <form>
      <select name="characters" id="characters"  @change="selectChar($event)">
        <option v-for="character in characters" :value="character._id" :key="character.id">
          {{ character.charName }}
        </option>
      </select>
    </form>
    <div>
      <button class="del" @click="delChar()">Delete</button>
    </div>
    <!-- form stuff -->
    <div v-if="currentChar != null">
      <div >
        <div>
          <input class="charName" v-model="charName" placeholder="Name">
          <p class="stat-label darkText">Character Name</p>
        </div>
        <div>
          <div>
            <input class="stat-value-in" v-model="className"> <!-- className -->
            <input class="stat-value-in" v-model="level"> <!-- level -->
            <p class="stat-label darkText">Class and Level</p>
          </div>
<!--
          <div class="info-item-div">
            <input class="stat-value-in">
            <p class="stat-label">Background</p>
          </div>
          <div class="info-item-div">
            <input class="stat-value-in">
            <p class="stat-label">Player Name</p>
          </div>
          <div class="info-item-div">
            <input class="stat-value-in">
            <p class="stat-label">Race</p>
          </div>
          <div class="info-item-div">
            <input class="stat-value-in">
            <p class="stat-label">Alignment</p>
          </div>
          <div class="info-item-div">
            <input class="stat-value-in">
            <p class="stat-label">Experience Points</p>
          </div> -->
        </div>
      </div>
<!--
      <div class="bottom-page">
        <div class="left-page">
          <div class="stats-prof">
            <div class="stats">
              <div class="stat-div">
                <p class="stat-label">Strength</p>
                <input class="stat-value-in">
                <input class="stat-mod-in">
              </div>
              <div class="stat-div">
                <p class="stat-label">Dexterity</p>
                <input class="stat-value-in">
                <input class="stat-mod-in">
              </div>
              <div class="stat-div">
                <p class="stat-label">Constitution</p>
                <input class="stat-value-in">
                <input class="stat-mod-in">
              </div>
              <div class="stat-div">
                <p class="stat-label">Intelligence</p>
                <input class="stat-value-in">
                <input class="stat-mod-in">
              </div>
              <div class="stat-div">
                <p class="stat-label">Wisdom</p>
                <input class="stat-value-in">
                <input class="stat-mod-in">
              </div>
              <div class="stat-div">
                <p class="stat-label">Charisma</p>
                <input class="stat-value-in">
                <input class="stat-mod-in">
              </div>
            </div>

            <div class="left-two">
              <div class="inspiration-div">
                <input class="stat-value">
                <h5 class="insp-label">Inspiration</h5>
              </div>
              <div class="prof-div">
                <input class="stat-value">
                <h5 class="prof-label">Proficiency</h5>
              </div>

              <div class="save-throw-div">
                <div class="save-throws" v-for="save in savingThrows" :key="save.id">
                  <input class="save-bonus-in">
                  <input class="save-name-in">
                </div>
                <p class="stat-label">Saving Throws</p>
              </div>
              <div class="skill-div">
                <div class="skills" v-for="skill in skills" :key="skill.id">
                  <input class="skill-bonus-in">
                  <p>{{ skill.name }} ({{ skill.stat }})</p>
                </div>
                <p class="stat-label">Skills</p>
              </div>
            </div>
          </div>

          <div class="pass-wis-div">
            <input class="stat-value-in">
            <h5 class="pass-wis-label">Passive Wisodm (Perception)</h5>
          </div>

          <div class="prof-lang-div">
            <textarea class="prof-lang-in"/>
            <p class="stat-label">Other Proficiencies and Languages</p>
          </div>
        </div>

        <div class="mid-page">
          <div class="ac-init-spd">
            <div class="ac-div">
              <input class="stat-value-in">
              <p class="stat-label">Armor Class</p>
            </div>
            <div class="init-div">
              <input class="stat-value-in">
              <p class="stat-label">Initiative</p>
            </div>
            <div class="spd-div">
              <input class="stat-value-in">
              <p class="stat-label">Speed</p>
            </div>
          </div>
-->
          <div>
            <div>
              <input class="max-hp-value-in" v-model="maxHP">
              <p class="stat-label darkText">Hit Point Maximum</p>
              <input class="cur-hp-value-in" v-model="curHP">
              <p class="stat-label darkText">Current Hit Points</p>
            </div>
            <div>
              <input class="temp-hp-value" v-model="tempHP">
              <p class="stat-label darkText">Temporary Hit Points</p>
            </div>
          </div>
<!--
          <div class="hitD-deathSave-div">
            <div class="hitD-div">
              <p>Total</p>
              <input class="stat-value">
              <p class="stat-label">Hit Dice</p>
            </div>
            <div class="deathSave-div">
              <div class="saves" v-for="save in deathSaves" :key="save.id">
                <input class="save-success-in">
                <p>Successes</p>
                <input class="save-success-in">
                <p>Failures</p>
              </div>
              <p class="stat-label">Death Saves</p>
            </div>
          </div>

          <div class="spells-attacks-div" v-for="attack in attacks" :key="attack.id">
            <input class="attack-name-in">
            <input class="attack-bonus-in">
            <input class="attack-type-in">
            <p class="stat-label">Attacks and Spellcasting</p>
          </div>
          <div class="equipment-div">
            <textarea class="equip-in"/>
            <p class="stat-label">Equipment</p>
          </div>
        </div>

        <div class="right-page">
          <div class="char-extras">
            <div class="personality-div">
              <textarea class="personality-in"/>
              <p class="stat-label">Personality Traits</p>
            </div>
            <div class="ideals-div">
              <textarea class="ideals-in"/>
              <p class="stat-label">Ideals</p>
            </div>
            <div class="bonds-div">
              <textarea class="bonds-in"/>
              <p class="stat-label">Bonds</p>
            </div>
            <div class="flaws-div">
              <textarea class="flaws-in"/>
              <p class="stat-label">Flaws</p>
            </div>
          </div>

          <div class="char-features">
            <textarea class="features-in"/>
            <p class="stat-label">Features and Traits</p>
          </div>
        </div>
      </div> -->

    </div>
    <button class="add" @click="addChar">Add</button>
    <button class="edit" @click="editChar">Edit</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'EditChars',
  data () {
    return {
      characters: [],
      currentChar: null,

      charName: "",
      className: "",
      level: -1,
      // background: "",
      // playerName: "",
      // race: "",
      // alignment: "",
      // xp: -1,
      //
      // str: -1,
      // strMod: -1,
      // dex: -1,
      // dexMod: -1,
      // con: -1,
      // conMod: -1,
      // int: -1,
      // intMod: -1,
      // wis: -1,
      // wisMod: -1,
      // cha: -1,
      // chaMod: -1,
      //
      // inspiration: -1,
      // proficiency: -1,
      //
      // savingThrows: [
      //   {name: "Strength", bonus: -1, proficient: false},
      //   {name: "Dexterity", bonus: -1, proficient: false},
      //   {name: "Constitution", bonus: -1, proficient: false},
      //   {name: "Intelligence", bonus: -1, proficient: false},
      //   {name: "Wisdom", bonus: -1, proficient: false},
      //   {name: "Charisma", bonus: -1, proficient: false},
      // ],
      //
      // skills: [
      //   {name: "Acrobatics", stat: "Dex", bonus: -1, proficient: false},
      //   {name: "Animal Handling", stat: "Wis", bonus: -1, proficient: false},
      //   {name: "Arcana", stat: "Int", bonus: -1, proficient: false},
      //   {name: "Athletics", stat: "Str", bonus: -1, proficient: false},
      //   {name: "Deception", stat: "Cha", bonus: -1, proficient: false},
      //   {name: "History", stat: "Int", bonus: -1, proficient: false},
      //   {name: "Insight", stat: "Wis", bonus: -1, proficient: false},
      //   {name: "Intimidation", stat: "Cha", bonus: -1, proficient: false},
      //   {name: "Investigation", stat: "Int", bonus: -1, proficient: false},
      //   {name: "Medicine", stat: "Wis", bonus: -1, proficient: false},
      //   {name: "Nature", stat: "Int", bonus: -1, proficient: false},
      //   {name: "Perception", stat: "Wis", bonus: -1, proficient: false},
      //   {name: "Performance", stat: "Cha", bonus: -1, proficient: false},
      //   {name: "Persuasion", stat: "Cha", bonus: -1, proficient: false},
      //   {name: "Religion", stat: "Int", bonus: -1, proficient: false},
      //   {name: "Sleight of Hand", stat: "Dex", bonus: -1, proficient: false},
      //   {name: "Stealth", stat: "Dex", bonus: -1, proficient: false},
      //   {name: "Survival", stat: "Wis", bonus: -1, proficient: false},
      // ],
      //
      // passiveWis: -1,
      // profLanguages: "",
      //
      // ac: -1,
      // init: -1,
      // speed: -1,
      maxHP: -1,
      curHP: -1,
      tempHP: 0,
      // hitD: "",
      // deathSaves: [
      //   {success: [0, 0, 0]},
      //   {fail: [0, 0, 0]}
      // ],
      // attacks: [
      //   {name: "", bonus: -1, dmgType: ""},
      // ],
      // money: [
      //   {name: "CP", amount: -1},
      //   {name: "SP", amount: -1},
      //   {name: "EP", amount: -1},
      //   {name: "GP", amount: -1},
      //   {name: "PP", amount: -1},
      // ],
      // equip: "",
      //
      // personality: "",
      // ideals: "",
      // bonds: "",
      // flaws: "",
      //
      // featureTraits: ""
    }
  },
  created () {
    this.getChars();
  },
  methods: {
    async getChars() {
      try {
        let res = await axios.get('/api/characters');
        this.characters = res.data;
        this.currentChar = this.characters[0];
        console.log(this.characters);
        return true;
      }
      catch (error) {
        console.log(error);
      }
    },
    async getChar() { //get characters from api
        try {
          let response = await axios.get("/api/characters/:id");
          this.character = response.data;
          return true;
        }
        catch (error) {
          console.log(error);
        }
    },
    async addChar() {
      try {
        await axios.post('/api/characters', {
          charName: this.charName,
          className: this.className,
          level: this.level,
          maxHP: this.maxHP,
          curHP: this.curHP,
          tempHP: this.tempHP,
        });
        this.getChars();
        return true;
      }
      catch (error) {
        console.log(error);
      }
    },
    async delChar() {
      try {
        if (this.characters.length < 2) {
          console.log("You cannot delete your last remaining character!");
          return false;
        }
        await axios.delete('/api/characters/' + this.currentChar._id);
        this.getChars();
        return true;
      }
      catch (error) {
        console.log(error);
      }
    },
    async editChar() {
      try {
        await axios.put('/api/characters/' + this.currentChar._id, {
          charName: this.charName,
          className: this.className,
          level: this.level,
          maxHP: this.maxHP,
          curHP: this.curHP,
          tempHP: this.tempHP,
        });
        this.getChars();
      }
      catch (error) {
        console.log(error);
      }
    },
    selectChar(event) {
      //console.log("selected " + event.target.value);
      this.currentChar = this.characters.find((a) => a._id === event.target.value);
      //console.log("name: " + this.currentChar.charName);
      this.className = this.currentChar.className;
      this.level = this.currentChar.level;
      this.charName = this.currentChar.charName;
      this.maxHP = this.currentChar.maxHP;
      this.curHP = this.currentChar.curHP;
      this.tempHP = this.currentChar.tempHP;
    }
  },
}
</script>

<style>
.add, .edit {
  margin-bottom: 100px;
}

.del {
  margin: 10px;
}
</style>
