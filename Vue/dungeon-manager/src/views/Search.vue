<template>
  <div id="search">
    <div class="search-wrapper">
      <div class="search">
        <div class="dropdown">
          <form>
            <select name="Category" id="category">
              <option value="ability-scores">Ability Scores</option>
              <option value="skills">Skills</option>
              <!-- <option value="proficiencies">Proficiencies</option> -->
              <option value="languages">Languages</option>
              <option value="alignments">Alignments</option>
              <option value="backgrounds">Backgrounds</option>
              <!-- <option value="classes">Classes</option> -->
              <!-- <option value="subclasses">Subclasses</option> -->
              <!-- <option value="features">Features</option> -->
              <option value="races">Races</option>
              <!-- <option value="subraces">Subraces</option> -->
              <!-- <option value="traits">Traits</option> -->
              <!-- <option value="equipment-categories">Equipment Categories</option> -->
              <!-- <option value="weapons">Weapons</option> -->
              <!-- <option value="armor">Armor</option> -->
              <!-- <option value="equipment">Equipment</option> -->
              <option value="magic-items">Magic Items</option>
              <!-- <option value="weapon-properties">Weapon Properties</option> -->
              <option value="spells">Spells</option>
              <!-- <option value="feats">Feats</option> -->
              <option value="monsters">Monsters</option>
              <option value="conditions">Conditions</option>
              <!-- <option value="damage-types">Damage Types</option> -->
              <option value="magic-schools">Magic Schools</option>
              <!-- <option value="rules">Rules</option> -->
              <!-- <option value="rule-sections">Rule Sections</option> -->
            </select>
          </form>
        </div>
        <div class="searchbar">
          <input type="text" placeholder="Search Here!" id="query" v-on:input="returnResults">
        </div>
      </div>
    </div>

    <div class='results-wrapper' id='instructions'>
      <p>To use this bestiary, please select the correct category, type in the desired query, and press 'Enter'.  It is not case sensitive, but please type in the exact name of what you are searching for as this is not a true search engine, merely an online index.</p>
      <p>Try searching "Ability Scores": str, dex; "Skills": Athletics; "Languages: Draconic"; "Alignments": Chaotic Evil; "Backgrounds": Acolyte; "Monsters": Aboleth</p>
    </div>

    <div class="results-wrapper" id='result'>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  components: {
  },
  methods: {
    returnResults() {
      let selfVar = this;
      document.getElementById('query').onkeydown = function(e){
          if(e.keyCode == 13){
              let query = document.getElementById('query').value;
              query = selfVar.parseQuery(query);
              let category = document.getElementById('category');
              let currCategory = category.options[category.selectedIndex].value;
              let url = 'https://www.dnd5eapi.co/api/' + currCategory + '/' + query;
              fetch(url)
                  .then(function(response) {
                      if (response.status != 200) {
                          console.log('non-200 response');
                          selfVar.updateInstructions('Unrecognized query.  Please make sure you have selected the correct category and have not misspelled your query. Try searching "Ability Scores": str, dex; "Skills": Athletics; "Languages: Draconic"; "Alignments": Chaotic Evil; "Backgrounds": Acolyte; "Monsters": Aboleth');
                      }
                      else {
                        return response.json();
                      }
                  }).then(function(json) {
                      console.log(json);
                      let resultStr = "";
                      switch(currCategory) {
                        case "ability-scores":
                          resultStr = selfVar.parseAbilityScores(json);
                          break;
                        case "skills":
                          resultStr = selfVar.parseSkills(json);
                          break;
                        case "proficiencies":
                          resultStr = selfVar.parseProficiencies(json);
                          break;
                        case "languages":
                          resultStr = selfVar.parseLanguages(json);
                          break;
                        case "alignments":
                          resultStr = selfVar.parseAlignments(json);
                          break;
                        case "backgrounds":
                          resultStr = selfVar.parseBackgrounds(json);
                          break;
                        case "classes":
                          resultStr = selfVar.parseClasses(json);
                          break;
                        case "races":
                          resultStr = selfVar.parseRace(json);
                          break;
                        case "magic-items":
                          resultStr = selfVar.parseMagicItems(json);
                          break;
                        case "spells":
                          resultStr = selfVar.parseSpells(json);
                          break;
                        case "feats":
                          resultStr = selfVar.parseFeats(json);
                          break;
                        case "monsters":
                          resultStr = selfVar.parseMonsters(json);
                          break;
                        case "conditions":
                          resultStr = selfVar.parseConditions(json);
                          break;
                        case "magic-schools":
                          resultStr = selfVar.parseMagicSchools(json);
                          break;
                      }
                      selfVar.updateResult(resultStr);
                  });
          }
      }
    },
    parseArray(array) {
      let string = "";
      for (let i = 0; i < array.length; i++) {
        string += array[i] + "<br/>";
      }
      return string;
    },
    parseQuery(query) {
      let queryParts = query.split(' ');
      let finalQuery = '';
      for (let i = 0; i < queryParts.length; i++) {
          if (i != 0 && queryParts[i] != '') {
              finalQuery += '-';
          }
          finalQuery += queryParts[i].toLowerCase();
      }
      return finalQuery;
    },
    updateResult(info) {
        document.getElementById('result').innerHTML = info;
    },
    updateInstructions(info) {
        console.log('updating instructions: ' + info);
        document.getElementById('instructions').textContent = info;
    },
    parseAbilityScores(json) {
      let str = "";
      str += "<h3>" + json.full_name + " (" + json.name + ")</h3>";
      str += "<p>" + json.desc + "</p>";
      return str;
    },
    parseSkills(json) {
      let str = "";
      str += "<h3>" + json.name + "</h3>";
      str += "<p>" + json.desc + "</p>";
      return str;
    },
    parseLanguages(json) {
      let str = "";
      str += "<h3>" + json.name + "</h3>";
      str += "<p>" + json.desc + "</p>";
      str += "<h6>Typical Speakers</h6>";
      str += "<ul>";
      for (let i = 0; i < json.typical_speakers.length; i++) {
        str += "<li>" + json.typical_speakers[i] + "</li>";
      }
      str += "</ul>";
      return str;
    },
    parseAlignments(json) {
      let str = "";
      str += "<h3>" + json.name + "</h3>";
      str += "<p>" + json.desc + "</p>";
      return str;
    },
    parseBackgrounds(json) {
      let str = "";
      str += "<h3>" + json.name + "</h3>";
      str += "<p>" + json.feature.desc + "</p>";

      str += "<h4>Up to one of these bonds are available to you:</h4>";
      str += "<ol>";
      for (let i = 0; i < json.bonds.from.length; i++) {
        str += "<li>" + json.bonds.from[i] + "</li>";
      }
      str += "</ol>";

      str += "<h4>Choose from one of these flaws:</h4>";
      str += "<ol>";
      for (let i = 0; i < json.flaws.from.length; i++) {
        str += "<li>" + json.flaws.from[i] + "</li>";
      }
      str += "</ol>";

      str += "<h4>Choose an ideal to ascribe to:</h4>";
      str += "<ol>";
      for (let i = 0; i < json.ideals.from.length; i++) {
        str += "<li>" + json.ideals.from[i].desc + " Alignments include: <em>";
        for (let x = 0; x < json.ideals.from[i].alignments.length; x++) {
          str += json.ideals.from[i].alignments[x].name + ", ";
        }
        str += "</em></li>";
      }
      str += "</ol>";

      str += "<h4>Choose two of the following languages:</h4>"
      str += "<ol>";
      for (let i = 0; i < json.language_options.from.length; i++) {
        str += "<li>" + json.language_options.from[i].name + "</li>";
      }
      str += "</ol>";

      str += "<h4>Choose two personality traits:</h4>"
      str += "<ol>";
      for (let i = 0; i < json.personality_traits.from.length; i++) {
        str += "<li>" + json.personality_traits.from[i] + "</li>";
      }
      str += "</ol>";

      str += "<h4>You start with the following equipment:</h4>"
      str += "<ol>";
      for (let i = 0; i < json.starting_equipment.length; i++) {
        str += "<li>" + json.starting_equipment[i].equipment.name + "</li>";
      }
      str += "</ol>";

      str += "<h4>You can also choose from these equipment options:</h4>"
      str += "<ol>";
      for (let i = 0; i < json.starting_equipment_options.length; i++) {
        for (let x = 0; x < json.starting_equipment_options[i].from.length; x++) {
            str += "<li>" + json.starting_equipment_options[i].from[x].equipment_category.name + "</li>";
        }
      }
      str += "</ol>";

      str += "<h4>Also begin with proficiency in:</h4>"
      str += "<ol>";
      for (let i = 0; i < json.starting_proficiencies.length; i++) {
        str += "<li>" + json.starting_proficiencies[i].name + "</li>";
      }
      str += "</ol>";
      return str;
    },
    parseRace(json) {
      let str = "";
      str += "<h3>" + json["name"] + "</h3>";
      str += "<h5>Ability Bonuses: </h5><ul>"
      for (var i in json["ability_bonuses"]) {
        str+="<li>" + json["ability_bonuses"][i].ability_score.name + " + " + json["ability_bonuses"][i].bonus;
      }
      str += "</ul>";
      str += "<h5>Size: </h5><p>" + json["size"] + "</p>";
      str += "<p>" + json["size_description"] + "</p>";
      str += "<h5>Movement Speed: </h5><p>" + json["speed"] + " feet</p>";
      str += "<h5>Alignment: </h5><p> " + json["alignment"] + "</p>";

      if (json["starting_proficiencies"].length > 0) {
        str += "<h5>Starting proficiencies: </h5><ul>";
        for (var j in json["starting_proficiencies"]) {   //"var i has already been defined"; temporary fix
          str += "<li>" + json["starting_proficiencies"][j].name + "</li>";
        }
        str += "</ul>";
      }
      if (json["subraces"].length > 0) {
        str += "<h5>Subraces: </h5><ul>";
        for (var k in json["subraces"]) {
          str += "<li>" + json["subraces"][k].name + "</li>";
        }
        str += "</ul>";
      }
      if (json["traits"].length > 0) {
        str += "<h5>Traits: </h5><ul>";
        for (var l in json["traits"]) { //"var i has already been defined"; temporary fix
          str += "<li>" + json["traits"][l].name + "</li>";
        }
        str += "</ul>";
      }
      return str;
    },
    parseMagicItems(json) {
      let str = "";
      str += "<h3>" + json["name"] + "</h3>";

      for (var i in json["desc"]) {
        str += "<p>" + json["desc"][i] + "</p>";
      }
      return str;
    },
    parseSpells(json) {
      let str = "";
      str += "<h3>" + json["name"] + "</h3>";
      str += "<p>Level " + json["level"] + " " + json["school"].name + "</p>"
      str += "<p>";
      for (var i in json["components"]) {
        str += json["components"][i];
        if (i < json["components"].length - 1) {
          str += ", ";
        }
      }
      if (json.hasOwnProperty.call("material")) {
        str += "*";
      }
      str += "</p>";
      if (json["concentration"]) {
        str += "<p>Requires Concentration</p>";
      }
      if (json["ritual"]) {
        str += "<p>Ritual</p>";
      }
      str += "<p>Duration: " + json["duration"] + "</p>";
      str += "<p>Casting time: " + json["casting_time"] + "</p>";
      str += "<p>Range: " + json["range"] + "</p>";
      if (json.hasOwnProperty.call("damage")) {
        str += "<p> Damage: " + json["damage"]["damage_at_slot_level"][json["level"]] + "</p>";
      }
      str += "<p>" + json["desc"] + "</p>";
      if (json.hasOwnProperty.call("higher_level")) {
        str += "<p>" + json["higher_level"] + "</p>";
      }
      str += "<p>Classes: ";
      for (var m in json["classes"]) { //"var i has already been defined"; temporary fix
        str += json["classes"][m].name;
        if (m < json["classes"].length - 1) {
          str += ", ";
        }
      }
      if (json.hasOwnProperty.call("material")) {
        str += "<p><em>* " + json["material"] + "</p>";
      }
      return str;
    },
    parseMonsters(json) {
      let str = "";
      str += "<h3>" + json.name + "</h3>";
      str += "<p>Alignment: " + json.alignment + "</p>";
      str += "<p>Challenge Rating: " + json.challenge_rating + "</p>";
      str += "<p>Hit Points: " + json.hit_points + "</p>";
      str += "<p>Hit Dice: " + json.hit_dice + "</p>";
      str += "<p>XP: " + json.xp + "</p>";
      str += "<p>Size: " + json.size + "</p>";
      str += "<p>Armor Class: " + json.armor_class + "</p>";
      str += "<p>Strength: " + json.strength + "</p>";
      str += "<p>Dexterity: " + json.dexterity + "</p>";
      str += "<p>Intelligence: " + json.intelligence + "</p>";
      str += "<p>Wisdom: " + json.wisdom + "</p>";
      str += "<p>Constitution: " + json.constitution + "</p>";
      str += "<p>Charisma: " + json.charisma + "</p>";
      str += "<p>Languages: " + json.languages + "</p>";
      str += "<p>Speed: "
      for (var key in json.speed) {
        str += json.speed[key] + " (" + key + ") ";
      }
      str += "</p>";
      str += "<p>Senses: "
      for (var keyX in json.senses) {  //"var key has already been defined"; temporary fix
        str += keyX + " (" + json.senses[keyX] + ") ";
      }
      str += "</p>";

      str += "<h4>Immunities (condition):</h4>"
      str += "<ol>";
      if (json.condition_immunities.length < 1) {
        str += "<li>None</li>";
      }
      else {
        for (let i = 0; i < json.condition_immunities.length; i++) {
          str += "<li>" + json.condition_immunities[i] + "</li>";
        }
      }
      str += "</ol>";

      str += "<h4>Immunities (damage):</h4>"
      str += "<ol>";
      if (json.damage_immunities.length < 1) {
        str += "<li>None</li>";
      }
      else {
        for (let i = 0; i < json.damage_immunities.length; i++) {
          str += "<li>" + json.damage_immunities[i] + "</li>";
        }
      }
      str += "</ol>";

      str += "<h4>Damage Resistances:</h4>"
      str += "<ol>";
      if (json.damage_resistances.length < 1) {
        str += "<li>None</li>";
      }
      else {
        for (let i = 0; i < json.damage_resistances.length; i++) {
          str += "<li>" + json.damage_resistances[i] + "</li>";
        }
      }
      str += "</ol>";

      str += "<h4>Damage Vulnerabilities:</h4>"
      str += "<ol>";
      if (json.damage_vulnerabilities.length < 1) {
        str += "<li>None</li>";
      }
      else {
        for (let i = 0; i < json.damage_vulnerabilities.length; i++) {
          str += "<li>" + json.damage_vulnerabilities[i] + "</li>";
        }
      }
      str += "</ol>";

      str += "<h4>Proficiencies:</h4>"
      str += "<ol>";
      for (let i = 0; i < json.proficiencies.length; i++) {
        str += "<li>" + json.proficiencies[i].proficiency.name + "</li>";
      }
      str += "</ol>";

      str += "<h4>Actions:</h4>"
      str += "<ol>";
      for (let i = 0; i < json.actions.length; i++) {
        str += "<li>" + json.actions[i].name + ": " + json.actions[i].desc + "</li>";
      }
      str += "</ol>";

      str += "<h4>Legendary Actions:</h4>"
      str += "<ol>";
      for (let i = 0; i < json.legendary_actions.length; i++) {
        str += "<li>" + json.legendary_actions[i].name + ": " + json.legendary_actions[i].desc + "</li>";
      }
      str += "</ol>";

      str += "<h4>Special Abilities:</h4>"
      str += "<ol>";
      for (let i = 0; i < json.special_abilities.length; i++) {
        str += "<li>" + json.special_abilities[i].name + ": " + json.special_abilities[i].desc + "</li>";
      }
      str += "</ol>";
      return str;
    },
		parseConditions(json) {
		let str = "";
			str += "<h3>" + json["name"] + "</h3>";

			for (var i in json["desc"]) {
				str += "<p>" + json["desc"][i] + "</p>";
			}
			return str;
		},
		parseMagicSchools(json) {
			let str = "";
			str += "<h3>" + json.name + "</h3>";
			str += "<p>" + json.desc + "</p>";
			return str;
		},
	}
}
</script>
