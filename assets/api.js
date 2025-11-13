async function buscarTemperatura() {
  const cidade = document.getElementById("cidade").value.trim();
  const resultado = document.getElementById("resultado");

  if (!cidade) {
    resultado.innerHTML = "<p>Por favor, digite uma cidade.</p>";
    return;
  }

  try {
    // 🌍 Busca coordenadas da cidade
    const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      cidade
    )}&count=1&language=pt&format=json`;
    const geoResponse = await fetch(geoURL);
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      resultado.innerHTML = "<p>Cidade não encontrada.</p>";
      return;
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // 🌦️ Busca dados climáticos
    const climaURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`;
    const climaResponse = await fetch(climaURL);
    const climaData = await climaResponse.json();

    if (!climaData.current_weather) {
      resultado.innerHTML = "<p>Não foi possível obter os dados climáticos.</p>";
      return;
    }

    const { temperature, windspeed, winddirection, weathercode } = climaData.current_weather;

    // 🕒 Usa a data/hora exata do momento da pesquisa (agora)
    const timezone = climaData.timezone || "UTC";
    const agora = new Date();
    const dataFormatada = agora.toLocaleString("pt-BR", {
      timeZone: timezone,
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    const horaCidade = new Date().toLocaleString("pt-BR", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
    });

    // 🌤️ Ícones e descrições de clima
    const icones = {
      0: "☀️",
      1: "🌤️",
      2: "⛅",
      3: "☁️",
      45: "🌫️",
      51: "🌦️",
      61: "🌧️",
      71: "❄️",
      80: "🌩️",
    };
    const descricoes = {
      0: "Ensolarado",
      1: "Parcialmente nublado",
      2: "Nublado",
      3: "Muito nublado",
      45: "Neblina",
      51: "Chuvisco",
      61: "Chuva",
      71: "Neve",
      80: "Tempestade",
    };
    const icone = icones[weathercode] || "🌈";
    const descricao = descricoes[weathercode] || "Desconhecido";

    // 🌙 Modo noturno conforme hora local da cidade
    const horaNum = parseInt(
      new Date().toLocaleString("en-US", { timeZone: timezone, hour: "2-digit", hour12: false })
    );

    if (horaNum >= 6 && horaNum < 18) {
      document.body.style.backgroundColor = "#e0f7fa"; // ☀️ Dia
      document.body.style.color = "#000";
    } else {
      document.body.style.backgroundColor = "#263238"; // 🌙 Noite
      document.body.style.color = "#fff";
    }

    // 🧭 Exibe resultado
    resultado.innerHTML = `
      <h2>${name}, ${country}</h2>
      <p>${dataFormatada}</p>
      <p>🕒 Hora local: ${horaCidade}</p>
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

