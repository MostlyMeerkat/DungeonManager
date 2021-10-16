document.getElementById('query').onkeydown = function(e){
    if(e.keyCode == 13){
        let query = document.getElementById('query').value;
        query = parseQuery(query);
        let category = document.getElementById('category');
        let currCategory = category.options[category.selectedIndex].value;
        let url = 'https://www.dnd5eapi.co/api/' + currCategory + '/' + query;
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
                for (var key in json) {
                  if (json.hasOwnProperty(key)) {

                    if (key === "index") {
                      continue;
                    }
                    if (key === "full_name" || key === "name") {
                      resultStr += "<h3>" + json[key];
                      if (currCategory === "ability-scores" && key === "full_name") {
                        resultStr += " (" + json["name"] + ")</h3>";
                      }
                    }

                    resultStr += "<p>" + json[key] + "</p>";
                  }
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
