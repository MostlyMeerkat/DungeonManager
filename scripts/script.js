document.getElementById('query').onkeydown = function(e){
    if(e.keyCode == 13){
        let query = document.getElementById('query').value;
        query = parseQuery(query);
        let category = document.getElementById('category');
        let currCategory = category.options[category.selectedIndex].value;
        let url = 'https://www.dnd5eapi.co/api/' + currCategory + '/' + query;
        // let url-cat = 'https://www.dnd5eapi.co/api/' + currCategory;
        // fetch(url-cat) {
        //   .then(function(response) {
        //     if (response.status != 200) {
        //         console.log('non-200 response');
        //     }
        //     else {
        //       return response.json();
        //     }
        //   })
        //   .then(function(json) {
        //     console.log(json);
        //   });
        // }
        fetch(url)
            .then(function(response) {
                if (response.status != 200) {
                    console.log('non-200 response');
                    updateInstructions('Unrecognized query.  Please make sure you have selected the correct category and have not misspelled your query. Try searching "Ability Scores": str, dex; "Skills": Athletics; "Languages: Draconic"; "Alignments": Chaotic Evil; "Backgrounds": Acolyte; "Monsters": Aboleth');
                }
                else {
                  return response.json();
                }
            }).then(function(json) {
                console.log(json);
        				let resultStr = "";
        				switch(currCategory) {
        					case "ability-scores":
        						resultStr = parseAbilityScores(json);
        						break;
        					case "skills":
        						resultStr = parseSkills(json);
        						break;
        					case "proficiencies":
        						resultStr = parseProficiencies(json);
        						break;
        					case "languages":
        						resultStr = parseLanguages(json);
        						break;
        					case "alignments":
        						resultStr = parseAlignments(json);
        						break;
        					case "backgrounds":
        						resultStr = parseBackgrounds(json);
        						break;
                    //
        					case "classes":
        						resultStr = parseClasses(json);
        						break;
        					case "races":
        						resultStr = parseRace(json);
        						break;
        					case "magic-items":
        						resultStr = parseMagicItems(json);
        						break;
        					case "spells":
        						resultStr = parseSpells(json);
        						break;
        					case "feats":
        						resultStr = parseFeats(json);
        						break;
        					case "monsters":
        						resultStr = parseMonsters(json);
        						break;
        					case "conditions":
        						resultStr = parseConditions(json);
        						break;
        					case "magic-schools":
        						resultStr = parseMagicSchools(json);
        						break;
        				}
                updateResult(resultStr);
            });
        }
};

function parseArray(array) {
  let string = "";
  for (let i = 0; i < array.length; i++) {
    string += array[i] + "<br/>";
  }
  return string;
}

function parseQuery(query) {
    queryParts = query.split(' ');
    finalQuery = '';
    for (let i = 0; i < queryParts.length; i++) {
        if (i != 0 && queryParts[i] != '') {
            finalQuery += '-';
        }
        finalQuery += queryParts[i].toLowerCase();
    }
    return finalQuery;
}

function updateResult(info) {
    document.getElementById('result').innerHTML = info;
}

function updateInstructions(info) {
    console.log('updating instructions: ' + info);
    document.getElementById('instructions').textContent = info;
}

function parseAbilityScores(json) {
  let str = "";
  str += "<h3>" + json.full_name + " (" + json.name + ")</h3>";
  str += "<p>" + json.desc + "</p>";
  return str;
}

function parseSkills(json) {
  let str = "";
  str += "<h3>" + json.name + "</h3>";
  str += "<p>" + json.desc + "</p>";
  return str;
}

function parseLanguages(json) {
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
}

function parseAlignments(json) {
  let str = "";
  str += "<h3>" + json.name + "</h3>";
  str += "<p>" + json.desc + "</p>";
  return str;
}

function parseBackgrounds(json) {
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
}
//
function parseClasses(json) {

}

function parseRace(json) {

}

function parseEquipment(json) {

}

function parseMagicItems(json) {

}

function parseSpells(json) {

}


function parseFeats(json) {

}

function parseMonsters(json) {
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
  for (var key in json.senses) {
    str += key + " (" + json.senses[key] + ") ";
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
}

function parseConditions(json) {

}

function parseMagicSchools(json) {
  let str = "";
  str += "<h3>" + json.name + "</h3>";
  str += "<p>" + json.desc + "</p>";
  return str;
}
