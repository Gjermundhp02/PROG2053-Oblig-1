async function update(){
    const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=60.7957&longitude=10.6915&current=temperature_2m,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m&wind_speed_unit=ms&timezone=Europe%2FBerlin&forecast_days=1')
    const data = await res.json();
    const el = document.getElementById('weather');
    el.querySelector('img').src = descriptions[data.current.weather_code][data.current.is_day ? 'day' : 'night'].image;
    el.querySelector('div>h1').textContent = "Gjøvik";
    document.getElementById('temp').textContent = `${data.current.temperature_2m+data.current_units.temperature_2m}`;
    document.getElementById('wind').textContent = `${data.current.wind_speed_10m+data.current_units.wind_speed_10m}`;
    document.getElementById('precipitation').textContent = `${data.current.precipitation+data.current_units.precipitation}`;
    document.getElementById('windDir').style.transform = `rotate(${data.current.wind_direction_10m}deg)`;
    document.getElementById('windDir').style.width = '3rem';
    el.querySelector('#wind>div>h2').textContent = data.current.wind_speed_10m+data.current_units.wind_speed_10m;
}

setInterval(update, 10000);

update();