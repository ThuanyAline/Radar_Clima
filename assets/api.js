async function buscarTemperatura() {
  const cidade = document.getElementById("cidade").value.trim();
  const resultado = document.getElementById("resultado");

  if (!cidade) {
    resultado.innerHTML = "<p>Por favor, digite uma cidade.</p>";
    return;
  }

  try {
    const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cidade)}&count=1&language=pt&format=json`;
    const geoResponse = await fetch(geoURL);
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      resultado.innerHTML = "<p>Cidade não encontrada.</p>";
      return;
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    const climaURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    const climaResponse = await fetch(climaURL);
    const climaData = await climaResponse.json();

    if (!climaData.current_weather) {
      resultado.innerHTML = "<p>Não foi possível obter os dados climáticos.</p>";
      return;
    }

    const { temperature, windspeed, winddirection, weathercode } = climaData.current_weather;

    const icones = {
      0: "☀️", 1: "🌤️", 2: "⛅", 3: "☁️", 45: "🌫️",
      51: "🌦️", 61: "🌧️", 71: "❄️", 80: "🌩️"
    };
    const icone = icones[weathercode] || "🌈";

    resultado.innerHTML = `
      <h2>${name}, ${country}</h2>
      <p>${icone} Temperatura: ${temperature}°C</p>
      <p>💨 Vento: ${windspeed} km/h</p>
      <p>🧭 Direção do vento: ${winddirection}°</p>
    `;
  } catch (erro) {
    resultado.innerHTML = "<p>Erro ao buscar dados climáticos.</p>";
    console.error("Erro:", erro);
  }
}
