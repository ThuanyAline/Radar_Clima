// api.js
// Radar Clima - busca dados de geocodificação e clima via Open-Meteo

export async function getWeatherData(city) {
  try {
    // 1. Buscar latitude/longitude pela API de Geocodificação
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=pt&format=json`;
    const geoResponse = await fetch(geoUrl);

    if (!geoResponse.ok) {
      throw new Error("Falha na API de geocodificação");
    }

    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error("Cidade não encontrada");
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // 2. Buscar dados de clima pela API do Open-Meteo
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    const weatherResponse = await fetch(weatherUrl);

    if (!weatherResponse.ok) {
      throw new Error("Falha na API de clima");
    }

    const weatherData = await weatherResponse.json();

    if (!weatherData.current_weather) {
      throw new Error("Dados de clima indisponíveis");
    }

    const { temperature, weathercode, time } = weatherData.current_weather;

    // 3. Converter código do clima em descrição amigável
    const weatherDescriptions = {
      0: "Céu limpo",
      1: "Principalmente limpo",
      2: "Parcialmente nublado",
      3: "Nublado",
      45: "Nevoeiro",
      48: "Nevoeiro com gelo",
      51: "Chuvisco leve",
      53: "Chuvisco moderado",
      55: "Chuvisco intenso",
      61: "Chuva leve",
      63: "Chuva moderada",
      65: "Chuva forte",
      71: "Neve leve",
      73: "Neve moderada",
      75: "Neve forte",
      95: "Trovoadas",
      96: "Trovoadas com granizo leve",
      99: "Trovoadas com granizo forte"
    };

    const description = weatherDescriptions[weathercode] || "Clima desconhecido";

    // 4. Data e hora formatadas
    const date = new Date(time);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', 
                      hour: '2-digit', minute: '2-digit' };
    const formattedDate = date.toLocaleDateString('pt-BR', options);

    // 5. Retornar dados organizados
    return {
      city: `${name}, ${country}`,
      temperature: `${temperature} °C`,
      description,
      icon: weathercode,
      datetime: formattedDate
    };

  } catch (error) {
    console.error("Erro ao obter dados:", error.message);
    throw error;
  }
}
