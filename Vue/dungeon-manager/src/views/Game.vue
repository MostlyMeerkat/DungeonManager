<template>
  <div class="game">
    <div class="headerContainer">
      <h1 class="darkText">Game Tracker</h1>
    </div>

    <div class="gameContainer">
      <div class= "weatherContainer">
        <div class="weather">
          <div class="temperature">
            <img class="weatherIcon" src="/images/partly-cloudy.png">
            70&#176;F</div>
          <p class="weatherDescription">Wind: 10mph NE</p>
          <button class="button">Randomize</button>
        </div>
      </div>
      <div class="initiative">
        <div class="upNext">
          <h2 class="darkText">Current</h2>
          <ul class="no-bullet">
            <li class="darkText">20 | <strong>Jade</strong> | HP: 39/39</li>
          </ul>
          <h2 class="darkText">Up Next</h2>
          <ul class="no-bullet">
            <li class="darkText initiativeOrder">19 | <strong>Goblin #1</strong> | HP: 9/9</li>
            <li class="darkText initiativeOrder">17 | <strong>Goblin #2</strong> | HP: 1/9</li>
            <li class="darkText initiativeOrder">15 | <strong>Dmitri</strong> | HP: 41/41</li>
            <li class="darkText initiativeOrder">10 | <strong>Diego</strong> | HP: 36/39</li>
            <li class="darkText initiativeOrder">9 | <strong>Goblin #3</strong> | HP: 9/9</li>
            <li class="darkText initiativeOrder">8 | <strong>Rodenstock</strong> | HP: 52/59</li>
            <li class="darkText initiativeOrder">6 | <strong>Tibalt</strong> | HP: 35/35</li>
            <li class="darkText initiativeOrder">3 | <strong>Clarg</strong> | HP: 120/137</li>
          </ul>
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
