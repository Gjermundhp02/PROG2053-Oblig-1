const url = "https://api.open-meteo.com/v1/forecast?latitude=37.8874,53.2214,47.6152,48.3038,48.0674&longitude=41.1322,-4.2033,10.5213,10.9709,12.8631&current=temperature_2m,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m&wind_speed_unit=ms"

const cities = [
    "Batman",
    "Llanfairpwllgwyng",
    "Wank",
    "Kissing",
    "Fucking"
]

const urls = {
    Batman: "https://api.open-meteo.com/v1/forecast?latitude=37.8874&longitude=41.1322&current=temperature_2m,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m&wind_speed_unit=ms",
    Llanfairpwllgwyngyll: "https://api.open-meteo.com/v1/forecast?latitude=53.13277&longitude=4.11532&current=temperature_2m,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m&wind_speed_unit=ms",
    Wank: "https://api.open-meteo.com/v1/forecast?latitude=47.6152&longitude=10.5213&current=temperature_2m,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m&wind_speed_unit=ms",
    Kissing: "https://api.open-meteo.com/v1/forecast?latitude=48.3038&longitude=10.9709&current=temperature_2m,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m&wind_speed_unit=ms",
    Fucking: "https://api.open-meteo.com/v1/forecast?latitude=48.0674&longitude=12.8631&current=temperature_2m,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m&wind_speed_unit=ms"
}

function element(data, city){
    const div = document.createElement('div');
    div.classList.add('card');
    div.insertAdjacentHTML("beforeend", `
        <div>
            <div>
                <img src="${descriptions[data.current.weather_code][data.current.is_day ? 'day' : 'night'].image}">
                <h1>${city}</h1>
            </div>
            <div>
                <h2>${data.current.temperature_2m+data.current_units.temperature_2m}</h2>
                <h2>${data.current.wind_speed_10m+data.current_units.wind_speed_10m}</h2>
                <h2>${data.current.precipitation+data.current_units.precipitation}</h2>
            </div>
        </div>
        <div>
            <div>
                <img src="../images/south.png" id="windDir" style="transform:rotate(${data.current.wind_direction_10m}deg);">
                <h2>${data.current.wind_speed_10m+data.current_units.wind_speed_10m}</h2>
            </div>
        </div>
    `);
    return div;
}

async function update(){
    const container = document.getElementById('weather');
    const response = await fetch(url);
    if(response.ok){
        const data = await response.json();
        const elements = data.map((data, i) => element(data, cities[i]));
        container.replaceChildren(...elements);
    }
    else{
        throw new Error('Failed to fetch data');
    }
    // const responses = await Promise.all(Object.values(urls).map(async url => fetch(url)));
    // const data = await Promise.all(responses.map(async response => {
        // // if(response.ok){
        // //     return response.json()
        // // }
        // // else{
        // //     throw new Error('Failed to fetch data');
    //     // }
    // // }))
    // // const elements = data.map((data, i) => element(data, Object.keys(urls)[i]));
    // container.replaceChildren(...elements);
}

setInterval(update, 20000);

update();