<template>
<div>
    <h1 class='darkText'>Characters</h1>
    <div class="editButton">
      <router-link to="/editchars">
        <p class="editButtonText">Edit</p>
      </router-link>
    </div>
    <div class="dropdown">
      <form>
        <select name="characters" id="characters"  @change="selectChar($event)">
          <option v-for="character in characters" :value="character._id" :key="character.id">
            {{ character.charName }}
          </option>
        </select>
      </form>
    </div>
    <div class="charsheet">
      <div class="charInfo" v-if="currentChar != null">
        <div class="char-name-div">
          <h4 class="stat-value">{{ this.charName }}</h4>
          <p class="stat-label">Character Name</p>
        </div>

        <div class="info-item-div">
          <div class="stat-level-div">
            <h4 class="stat-value">{{ this.className }}</h4>
            <h4 class="stat-value">{{ this.level }}</h4>
          </div>
          <p class="stat-label">Class and Level</p>
        </div>
        <!-- <div class="info-item-div">
          <h4 class="stat-value">{{ this.background }}</h4>
          <p class="stat-label">Background</p>
        </div>
        <div class="info-item-div">
          <h4 class="stat-value">{{ this.playerName }}</h4>
          <p class="stat-label">Player Name</p>
        </div>
        <div class="info-item-div">
          <h4 class="stat-value">{{ this.race }}</h4>
          <p class="stat-label">Race</p>
        </div>
        <div class="info-item-div">
          <h4 class="stat-value">{{ this.alignment }}</h4>
          <p class="stat-label">Alignment</p>
        </div>
        <div class="info-item-div">
          <h4 class="stat-value">{{ this.xp }}</h4>
          <p class="stat-label">Experience Points</p>
        </div> -->
      </div>
<!-- </div>

    <div class="bottom-page">
      <div class="left-page">
        <div class="stats-prof">
          <div class="stats">
            <div class="stat-div">
              <p class="stat-label">Strength</p>
              <h4 class="stat-value">{{ this.str }}</h4>
              <p class="stat-mod">{{ this.strMod }}</p>
            </div>
            <div class="stat-div">
              <p class="stat-label">Dexterity</p>
              <h4 class="stat-value">{{ this.dex }}</h4>
              <p class="stat-mod">{{ this.dexMod }}</p>
            </div>
            <div class="stat-div">
              <p class="stat-label">Constitution</p>
              <h4 class="stat-value">{{ this.con }}</h4>
              <p class="stat-mod">{{ this.conMod }}</p>
            </div>
            <div class="stat-div">
              <p class="stat-label">Intelligence</p>
              <h4 class="stat-value">{{ this.int }}</h4>
              <p class="stat-mod">{{ this.intMod }}</p>
            </div>
            <div class="stat-div">
              <p class="stat-label">Wisdom</p>
              <h4 class="stat-value">{{ this.wis }}</h4>
              <p class="stat-mod">{{ this.wisMod }}</p>
            </div>
            <div class="stat-div">
              <p class="stat-label">Charisma</p>
              <h4 class="stat-value">{{ this.cha }}</h4>
              <p class="stat-mod">{{ this.chaMod }}</p>
            </div>
          </div>

          <div class="left-two">
            <div class="inspiration-div">
              <h4 class="stat-value">{{ this.inspiration }}</h4>
              <h5 class="insp-label">Inspiration</h5>
            </div>
            <div class="prof-div">
              <h4 class="stat-value">{{ this.proficiency }}</h4>
              <h5 class="prof-label">Proficiency</h5>
            </div>

            <div class="save-throw-div">
              <div class="save-throws" v-for="save in savingThrows" :key="save.id">
                <p>{{ save.bonus }} {{ save.name }}</p>
              </div>
              <p class="stat-label">Saving Throws</p>
            </div>
            <div class="skill-div">
              <div class="skills" v-for="skill in skills" :key="skill.id">
                <p>{{ skill.bonus }} {{ skill.name }} ({{ skill.stat }})</p>
              </div>
              <p class="stat-label">Skills</p>
            </div>
          </div>
        </div>

        <div class="pass-wis-div">
          <h4 class="stat-value">{{ this.passiveWis }}</h4>
          <h5 class="pass-wis-label">Passive Wisodm (Perception)</h5>
        </div>

        <div class="prof-lang-div">
          <p class="prof-lang">{{ this.profLanguages }}</p>
          <p class="stat-label">Other Proficiencies and Languages</p>
        </div>
      </div>

      <div class="mid-page">
        <div class="ac-init-spd">
          <div class="ac-div">
            <h4 class="stat-value">{{ this.ac }}</h4>
            <p class="stat-label">Armor Class</p>
          </div>
          <div class="init-div">
            <h4 class="stat-value">{{ this.init }}</h4>
            <p class="stat-label">Initiative</p>
          </div>
          <div class="spd-div">
            <h4 class="stat-value">{{ this.speed }}</h4>
            <p class="stat-label">Speed</p>
          </div>
        </div>
-->
        <div class="hp-div">
          <div class="cur-hp-div">
            <h3 class="stat-value">{{ this.maxHP }}</h3>
            <p class="stat-label">Hit Point Maximum</p>
            <h3 class="stat-value">{{ this.curHP }}</h3>
            <p class="stat-label">Current Hit Points</p>
          </div>
          <div class="temp-hp-div">
            <h3 class="stat-value">{{ this.tempHP }}</h3>
            <p class="stat-label">Temporary Hit Points</p>
          </div>
        </div>
<!--
        <div class="hitD-deathSave-div">
          <div class="hitD-div">
            <p>Total</p>
            <h4 class="stat-value">{{ this.hitD }}</h4>
            <p class="stat-label">Hit Dice</p>
          </div>
          <div class="deathSave-div">
            <div class="saves" v-for="save in deathSaves" :key="save.id">
              <p>Successes {{ save.success }}</p>
              <p>Failures {{ save.fail }}</p>
            </div>
            <p class="stat-label">Death Saves</p>
          </div>
        </div>

        <div class="spells-attacks-div" v-for="attack in attacks" :key="attack.id">
          <p>{{ attack.name }}</p>
          <p>{{ attack.bonus }}</p>
          <p>{{ attack.type }}</p>
          <p class="stat-label">Attacks and Spellcasting</p>
        </div>
        <div class="equipment-div">
          <p>{{ this.equip }}</p>
          <p class="stat-label">Equipment</p>
        </div>
      </div>

      <div class="right-page">
        <div class="char-extras">
          <div class="personality-div">
            <p>{{ this.personality }}</p>
            <p class="stat-label">Personality Traits</p>
          </div>
          <div class="ideals-div">
            <p>{{ this.ideals }}</p>
            <p class="stat-label">Ideals</p>
          </div>
          <div class="bonds-div">
            <p>{{ this.bonds }}</p>
            <p class="stat-label">Bonds</p>
          </div>
          <div class="flaws-div">
            <p>{{ this.flaws }}</p>
            <p class="stat-label">Flaws</p>
          </div>
        </div>

        <div class="char-features">
          <p>{{ this.featureTraits }}</p>
          <p class="stat-label">Features and Traits</p>
        </div>
      </div>
    </div> -->
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Characters',
  created () {
    this.getChars();
  },
  data () {
    return {
      characters: [],
      currentChar: null,

      charName: "",
      className: "",
      level: -1,

      maxHP: -1,
      curHP: -1,
      tempHP: -1,
    }
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
.charsheet {
  display: flex;
  flex-direction: column;
  flex-basis: content;
  margin-bottom: 100px;
  margin-left: 50px;
  margin-right: 50px;
  margin-top: 20px;
  background-color: #A60808;
}

.charInfo, .info-item-div, .hp-div {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 10px;
  padding: 10px;
  background-color: #F2B705;
}

.stat-level-div {
  display: flex;
  flex-direction: row;
}

.stat-value {
  margin-left: 5px;
  margin-right: 5px;
  color: black;
}

.stat-label {
  color: #730606;
}

.editButton:hover {
  background-color: #610505;
  border: 7px solid #F2B705;
  color: #f2f2f2;
}

.editButton {
  display: inline-block;
  padding: 10px;
  margin: 10px;
  background-color: #730606;
  border: 5px solid #F2B705;
  font-size: 24px;
}

.editButtonText {
  margin: 0 auto;
}
</style>
