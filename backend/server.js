const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/characters', {
  useNewUrlParser: true
});

const multer = require('multer')
const upload = multer({
  dest: '../Vue/src/components/Charsheet.vue',
  limits: {
    fileSize: 10000000
  }
});

const saveSchema = new mongoose.Schema({
    bonus: Number,
    name: String
})

const skillSchema = new mongoose.Schema({
    proficiency: Boolean,
    bonus: Number,
    name: String,
    stat: String
})

const attackSchema = new mongoose.Schema({
    name: String,
    bonus: Number,
    type: String
})

const deathSaveSchema = new mongoose.Schema({
    saves: [Boolean]
})

const charSchema = new mongoose.Schema({
  charName: String,
  className: String,
  level: Number,
  background: String,
  playerName: String,
  race: String,
  alignment: String,
  xp: Number,
  str: Number,
  strMod: Number,
  dex: Number,
  dexMod: Number,
  con: Number,
  conMod: Number,
  int: Number,
  intMod: Number,
  wis: Number,
  wisMod: Number,
  cha: Number,
  chaMod: Number,
  inspiration: Boolean,
  proficiency: Number,
  passiveWis: Number,
  profLanguages: String,
  ac: Number,
  init: Number,
  speed: Number,
  maxHP: Number,
  curHP: Number,
  tempHP: Number,
  hitD: String,
  equip: String,
  personality: String,
  ideals: String,
  bonds: String,
  flaws: String,
  featureTraits: String,
  skills: [skillSchema],
  saves: [saveSchema],
  attacks: [attackSchema],
  deathSaves: deathSaveSchema
});

const Character = mongoose.model('Character', charSchema);


app.listen(3000, () => console.log('Server listening on port 3000!'));


app.post('/api/characters', async (req, res) => {
  const item = new Character({
    title: req.body.title,
    desc: req.body.desc,
    path: req.body.path,
    charName: req.body.charName,
    className: req.body.class,
    level: req.body.level,
    background: req.body.background,
    playerName: req.body.playerName,
    race: req.body.race,
    alignment: req.body.alignment,
    xp: req.body.xp,
    str: req.body.str,
    strMod: req.body.strMod,
    dex: req.body.dex,
    dexMod: req.body.dexMod,
    con: req.body.con,
    conMod: req.body.conMod,
    int: req.body.int,
    intMod: req.body.intMod,
    wis: req.body.wis,
    wisMod: req.body.wisMod,
    cha: req.body.cha,
    chaMod: req.body.chaMod,
    inspiration: req.body.inspiration,
    proficiency: req.body.proficiency,
    passiveWis: req.body.passiveWis,
    profLanguages: req.body.profLanguages,
    ac: req.body.ac,
    init: req.body.init,
    speed: req.body.speed,
    maxHP: req.body.maxHP,
    curHP: req.body.curHP,
    tempHP: req.body.tempHP,
    hitD: req.body.hitD,
    equip: req.body.equip,
    personality: req.body.personality,
    ideals: req.body.ideals,
    bonds: req.body.bonds,
    flaws: req.body.flaws,
    featureTraits: req.body.featureTraits,
    skills: req.body.skills,
    saves: req.body.saves,
    attacks: req.body.attacks,
    deathSaves: req.body.deathSaves
  
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/characters', async (req, res) => {
  try {
    let characters = await Character.find();
    res.send(characters);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/characters/:id', async (req, res) => {
    try {
      let character = await Character.findOne({
          _id: req.params.id
      });
      res.send(character);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });  

app.delete('/api/characters/:id', async (req, res) => {
  try {
    await Character.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200)
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/characters/:id', async (req, res) => {
  try {
    var character = await Character.findOne({
      _id: req.params.id
    });
    // edit properties
    character.charName = req.body.charName;
    character.className = req.body.class;
    character.level = req.body.level;
    character.background = req.body.background;
    character.playerName = req.body.playerName;
    character.race = req.body.race;
    character.alignment = req.body.alignment;
    character.xp = req.body.xp;
    character.str = req.body.str;
    character.strMod = req.body.strMod;
    character.dex = req.body.dex;
    character.dexMod = req.body.dexMod;
    character.con = req.body.con;
    character.conMod = req.body.conMod;
    character.int = req.body.int;
    character.intMod = req.body.intMod;
    character.wis = req.body.wis;
    character.wisMod = req.body.wisMod;
    character.cha = req.body.cha;
    character.chaMod = req.body.chaMod;
    character.inspiration = req.body.inspiration;
    character.proficiency = req.body.proficiency;
    character.passiveWis = req.body.passiveWis;
    character.profLanguages = req.body.profLanguages;
    character.ac = req.body.ac;
    character.init = req.body.init;
    character.speed = req.body.speed;
    character.maxHP = req.body.maxHP;
    character.curHP = req.body.curHP;
    character.tempHP = req.body.tempHP;
    character.hitD = req.body.hitD;
    character.equip = req.body.equip;
    character.personality = req.body.personality;
    character.ideals = req.body.ideals;
    character.bonds = req.body.bonds;
    character.flaws = req.body.flaws;
    character.featureTraits = req.body.featureTraits;  
    character.skills = req.body.skills;
    character.saves = req.body.saves;
    character.attacks = req.body.attacks;
    character.deathSaves = req.body.deathSaves;

    character.save();
    res.sendStatus(200)
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
