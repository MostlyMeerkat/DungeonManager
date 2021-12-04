<template>
  <div class="sheet">
    <div class="top-page">
      <div class="char-name-div">
        <h4 class="stat-value">{{ this.charName }}</h4>
        <p class="stat-label">Character Name</p>
      </div>
      <div class="char-info">
        <div class="info-item-div">
          <h4 class="stat-value">{{ this.class }}</h4>
          <h4 class="stat-value">{{ this.level }}</h4>
          <p class="stat-label">Class and Level</p>
        </div>
        <div class="info-item-div">
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
        </div>
      </div>
    </div>

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
                <!-- need to add proficiency -->
                <p>{{ save.bonus }} {{ save.name }}</p>
              </div>
              <p class="stat-label">Saving Throws</p>
            </div>
            <div class="skill-div">
              <div class="skills" v-for="skill in skills" :key="skill.id">
                <!-- need to add proficiency -->
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

        <div class="hp-div">
          <div class="cur-hp-div">
            <p class="max-hp-value">Hit Point Maximum {{ this.maxHP }}</p>
            <h3 class="cur-hp-value">{{ this.curHP }}</h3>
            <p class="stat-label">Current Hit Points</p>
          </div>
          <div class="temp-hp-div">
            <h3 class="temp-hp-value">{{ this.tempHP }}</h3>
            <p class="stat-label">Temporary Hit Points</p>
          </div>
        </div>

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
    </div>
  </div>
</template>

<script>
export default {
  name: 'charsheet',
  data () {
    return {
      charName: "",
      class: "",
      level: -1,
      background: "",
      playerName: "",
      race: "",
      alignment: "",
      xp: -1,

      str: -1,
      strMod: -1,
      dex: -1,
      dexMod: -1,
      con: -1,
      conMod: -1,
      int: -1,
      intMod: -1,
      wis: -1,
      wisMod: -1,
      cha: -1,
      chaMod: -1,

      inspiration: -1,
      proficiency: -1,

      savingThrows: [
        {name: "Strength", bonus: -1, proficient: false},
        {name: "Dexterity", bonus: -1, proficient: false},
        {name: "Constitution", bonus: -1, proficient: false},
        {name: "Intelligence", bonus: -1, proficient: false},
        {name: "Wisdom", bonus: -1, proficient: false},
        {name: "Charisma", bonus: -1, proficient: false},
      ],

      skills: [
        {name: "Acrobatics", stat: "Dex", bonus: -1, proficient: false},
        {name: "Animal Handling", stat: "Wis", bonus: -1, proficient: false},
        {name: "Arcana", stat: "Int", bonus: -1, proficient: false},
        {name: "Athletics", stat: "Str", bonus: -1, proficient: false},
        {name: "Deception", stat: "Cha", bonus: -1, proficient: false},
        {name: "History", stat: "Int", bonus: -1, proficient: false},
        {name: "Insight", stat: "Wis", bonus: -1, proficient: false},
        {name: "Intimidation", stat: "Cha", bonus: -1, proficient: false},
        {name: "Investigation", stat: "Int", bonus: -1, proficient: false},
        {name: "Medicine", stat: "Wis", bonus: -1, proficient: false},
        {name: "Nature", stat: "Int", bonus: -1, proficient: false},
        {name: "Perception", stat: "Wis", bonus: -1, proficient: false},
        {name: "Performance", stat: "Cha", bonus: -1, proficient: false},
        {name: "Persuasion", stat: "Cha", bonus: -1, proficient: false},
        {name: "Religion", stat: "Int", bonus: -1, proficient: false},
        {name: "Sleight of Hand", stat: "Dex", bonus: -1, proficient: false},
        {name: "Stealth", stat: "Dex", bonus: -1, proficient: false},
        {name: "Survival", stat: "Wis", bonus: -1, proficient: false},
      ],

      passiveWis: -1,
      profLanguages: "",

      ac: -1,
      init: -1,
      speed: -1,
      maxHP: -1,
      curHP: -1,
      tempHP: 0,
      hitD: "",
      deathSaves: [
        {success: [0, 0, 0]},
        {fail: [0, 0, 0]}
      ],
      attacks: [
        {name: "", bonus: -1, dmgType: ""},
      ],
      money: [
        {name: "CP", amount: -1},
        {name: "SP", amount: -1},
        {name: "EP", amount: -1},
        {name: "GP", amount: -1},
        {name: "PP", amount: -1},
      ],
      equip: "",

      personality: "",
      ideals: "",
      bonds: "",
      flaws: "",

      featureTraits: ""
    }
  },
}
</script>

<style>
.sheet {
  border: 1px solid black;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 100px;
}

.top-page {
  margin: 10px;
  border: 1px solid blue;
  display: flex;
  align-items: center;
}

.char-info {
  display: flex;
}

.bottom-page {
  display: flex;
  align-items: center;
}

.left-page {
  margin: 10px;
  border: 1px solid blue;
}

.inspiration-div, .prof-div {
  display: flex;
  flex-direction: row;
}

.stats-prof {
  display: flex;
}

.stats-prof {
  margin: 10px;
  border: 1px solid blue;
}

.stat-value {
  color: gray;
}

.stat-label {
  color: black;
}

</style>
