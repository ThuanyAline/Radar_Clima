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

    const { temperature, windspeed, winddirection, weathercode, time } = climaData.current_weather;

    // 🕒 Data e hora formatadas
    const data = new Date(time);
    const opcoes = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const dataFormatada = data.toLocaleString('pt-BR', opcoes);

    // 🌤️ Ícones e descrição
    const icones = {
      0: "☀️", 1: "🌤️", 2: "⛅", 3: "☁️", 45: "🌫️",
      51: "🌦️", 61: "🌧️", 71: "❄️", 80: "🌩️"
    };
    const descricoes = {
      0: "Ensolarado", 1: "Parcialmente nublado", 2: "Nublado", 3: "Muito nublado", 45: "Neblina",
      51: "Chuvisco", 61: "Chuva", 71: "Neve", 80: "Tempestade"
    };
    const icone = icones[weathercode] || "🌈";
    const descricao = descricoes[weathercode] || "Desconhecido";

    // 🌙 Modo noturno
    const hora = data.getHours();
    document.body.style.backgroundColor = hora >= 6 && hora < 18 ? "#e0f7fa" : "#263238";
    document.body.style.color = hora >= 6 && hora < 18 ? "#000" : "#fff";

    resultado.innerHTML = `
      <h2>${name}, ${country}</h2>
      <p>${dataFormatada}</p>
      <p>${icone} ${descricao}</p>
      <p>🌡️ Temperatura: ${temperature}°C</p>
      <p>💨 Vento: ${windspeed} km/h</p>
      <p>🧭 Direção do vento: ${winddirection}°</p>
    `;
  } catch (erro) {
    resultado.innerHTML = "<p>Erro ao buscar dados climáticos.</p>";
    console.error("Erro:", erro);
  }
}
module.exports = { buscarTemperatura };
