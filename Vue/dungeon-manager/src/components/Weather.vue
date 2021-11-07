<template>
        <div class="weather">
          <div class="temperature">
            <img class="weatherIcon" v-bind:src="'/images/' + this.mock[weatherIndex].image" v-bind:alt=this.mock[weatherIndex].title>
            {{this.temperature}}&#176;F</div>
          <p class="weatherDescription">Wind: {{this.wind}}mph {{this.windDirection[windDirectionIndex]}}</p>
          <button @click="randomize" class="button">Randomize</button>
        </div>
</template>

<script>
import mock from '../mock-weather.js'

export default {
	name: 'Weather',
	data() {
		return {
		mock,
		weatherIndex: 2,
		temperature: 70,
		wind: 5,
		windDirectionIndex: 3,
		windDirection: [
			"N",
			"NE",
			"E",
			"SE",
			"S",
			"SW",
			"W",
			"NW"
		]
		}
	},
	methods: {
		randomize() {
			this.weatherIndex = Math.floor(Math.random() * 6);
			if (mock[this.weatherIndex].title === "Cloudy") {
				this.generateWeather(80, 0, 30);
			}
			if (mock[this.weatherIndex].title === "Rainy") {
				this.generateWeather(80, 33, 30);
			}
			if (mock[this.weatherIndex].title === "Snowy") {
				this.generateWeather(32, -30, 30);
			}
			if (mock[this.weatherIndex].title === "Sunny") {
				this.generateWeather(115, -30, 45);
			}
			if (mock[this.weatherIndex].title === "Fog") {
				this.generateWeather(70, -30, 5);
			}
			if (mock[this.weatherIndex].title === "Thunderstorm") {
				this.generateWeather(80, 32, 60);
			}

			
		},
		generateWeather(maxTemp, minTemp, maxWindSpeed) {
			this.temperature = this.temperature = Math.floor(Math.random() * maxTemp) + minTemp;
			this.wind = Math.floor(Math.random() * maxWindSpeed);
			this.windDirectionIndex = Math.floor(Math.random() * 8);
		}
	}

	
}
</script>
