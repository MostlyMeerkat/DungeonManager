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
                    updateInstructions('Unrecognized query.  Please make sure you have selected the correct category and have not misspelled your query.');
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
	console.log("parsing ability scores");
}

function parseSkills(json) {

}

function parseLanguages(json) {

}

function parseAlignments(json) {

}

function parseBackgrounds(json) {

}

function parseClasses(json) {

}

function parseRace(json) {
	let str = "";
	str += "<h3>" + json["name"] + "</h3>";
	str += "<ul>Ability Bonuses:"
	for (var i in json["ability_bonuses"]) {
		str+="<li>" + json["ability_bonuses"][i].ability_score.name + " + " + json["ability_bonuses"][i].bonus;
	}
	str += "</ul>";
	str += "<p>Size: " + json["size"] + "</p>";
	str += "<p> Movement Speed: " + json["speed"] + "</p>";
	str += "<p> Alignment: " + json["alignment"] + "</p>";
	str += "<p>" + json["size_description"] + "</p>";
	if (json["starting_proficiencies"].length > 0) {
		str += "<ul>Starting Proficiencies:";
		for (var i in json["starting_proficiencies"]) {
			str += "<li>" + json["starting_proficiencies"][i].name + "</li>";
		}
		str += "</ul>";
	}
	if (json["subraces"].length > 0) {
		str += "<ul>Subraces:";
		for (var i in json["subraces"]) {
			str += "<li>" + json["subraces"][i].name + "</li>";
		}
		str += "</ul>";
	}
	if (json["traits"].length > 0) {
		str += "<ul>Traits:";
		for (var i in json["traits"]) {
			str += "<li>" + json["traits"][i].name + "</li>";
		}
		str += "</ul>";
	}
	  return str;
}


function parseMagicItems(json) {
	let str = "";
	str += "<h3>" + json["name"] + "</h3>";

	for (var i in json["desc"]) {
		str += "<p>" + json["desc"][i] + "</p>";
	}
	return str;
}

function parseSpells(json) {
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
	if (json.hasOwnProperty("material")) {
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
	if (json.hasOwnProperty("damage")) {
		str += "<p> Damage: " + json["damage"]["damage_at_slot_level"][json["level"]] + "</p>";
	}

	str += "<p>" + json["desc"] + "</p>";
	if (json.hasOwnProperty("higher_level")) {
		str += "<p>" + json["higher_level"] + "</p>";
	}

	str += "<p>Classes: ";
	for (var i in json["classes"]) {
		str += json["classes"][i].name;
		if (i < json["classes"].length - 1) {
			str += ", ";
		}
	}

	if (json.hasOwnProperty("material")) {
		str += "<p><em>* " + json["material"] + "</p>";
	}


	return str;
}

function parseMonsters(json) {

}

function parseConditions(json) {
	let str = "";
	str += "<h3>" + json["name"] + "</h3>";

	for (var i in json["desc"]) {
		str += "<p>" + json["desc"][i] + "</p>";
	}
	return str;
}

function parseMagicSchools(json) {

}
