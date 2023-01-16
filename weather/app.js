const API_KEY = `eab61593501a45e6908192713231601`;
const API_URL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}`

const request = new XMLHttpRequest();

class App {
    constructor(el) {
        this.el = el;
        const citiesJSON = localStorage.getItem('cities');
        let cities = [];
        
        if (citiesJSON) {
            cities = JSON.parse(citiesJSON);
        }
        
        this.cities = cities.map(c => new City(c.name, this));

        this.render();
    }
    addCity(c) {
        this.cities.push(c);
        this.render();
        this.saveIntoStorage();
    }
    removeCity(c) {
        const index = this.cities.findIndex(city => city.name === c.name);
        this.cities.splice(index, 1);

        //        this.cities = this.cities.filter(city => city.name !== c.name);
        this.render();
        this.saveIntoStorage();
    }

    render() {
        this.el.innerHTML = '';
        this.cities.forEach(city => city.render(this.el))
    }

    saveIntoStorage() {
        localStorage.setItem('cities', JSON.stringify(this.cities))
    }
}

class City {
    constructor(name, app) {
        this.name = name;
        this.app = app;
    }

    async getWeather() {
        const res = await fetch(`${API_URL}&q=${this.name}`)
            .then(response => response.json())

        console.log(res);

        this.info = res.current;
        return this.info;
    }

    async render(ctr) {
        const info = await this.getWeather();
        const cityEl = document.createElement('div');
        cityEl.className = 'city-el d-flex flex-column align-items-center';
        cityEl.innerHTML = `   
         <span class="city-name">${this.name}</span>
         <span class="city-temp">${this.info.temp_c}°C</span>
         <img class="city-icon" src="https:${this.info.condition.icon}" width="50px"/>
         <span class="city-name">${this.info.condition.text}</span>
         <span class="city-close"><i class="fas fa-times"></i></span>  
`
        ctr.appendChild(cityEl);

        const close = cityEl.querySelector(".city-close");
        close.addEventListener("click", () => this.app.removeCity(this));
    }

    toJSON() {
        return {
            name: this.name
        };
    }
}
const app = new App(document.querySelector('.weather-locations'));

const modal = document.querySelector('#addCityModal')
const bootstrapModal = new bootstrap.Modal(modal, {
    keyboard: false
})

const saveBtn = document.querySelector('#saveCity');

const input = document.querySelector('#cityName');

input.addEventListener('keypress', (ev) => {
    if (ev.key === 'Enter') {
        addCity();
    }
})
modal.addEventListener('shown.bs.modal', () => {
    input.focus();
})

saveBtn.addEventListener('click', () => {
    const city = new City(input.value, app);
    app.addCity(city);
    bootstrapModal.hide();
})


