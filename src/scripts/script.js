const querySelector = el => document.querySelector(`${el}`);

querySelector('.busca').addEventListener('submit', async (event) => {
  event.preventDefault();

  let input = querySelector('#searchInput').value;

  const apiKey = '397f0fab662dfe0b1549c41bfd15bf8a';

  let param = 'metric';

  input != '' && showWarning('carregando ...');

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=${apiKey}&units=${param}&lang=${param = 'pt_br'}`;

  let res = await fetch(url);

  let json = await res.json();
  console.log(json);
  if (json.cod === 200) {
    clearInfo();
    showInfo({
      name: json.name,
      country: json.sys.country,
      temp: json.main.temp,
      iconTemp: json.weather[0].icon,
      desc: json.weather[0].description,
      windSpeed: json.wind.speed,
      windAngle: json.wind.deg,
    })
  } else {
    clearInfo();
    showWarning('Não encontramos está localização')
  }

})

const showInfo = (json) => {
  showWarning('');

  querySelector('.resultado').style.display = 'block';

  querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;

  querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;

  querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;

  querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.iconTemp}@2x.png`);

  querySelector('.desc').innerHTML = json.desc;

  querySelector('.ventoPonto ').setAttribute('style', `transform: rotate(${json.windAngle - 90} deg)`);



}

const showWarning = msg => querySelector('.aviso').innerHTML = `${msg}`;

const clearInfo = () => {
  showWarning('')
  querySelector('.resultado').style.display = 'none';
}