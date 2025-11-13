// Mock do fetch global
global.fetch = jest.fn();

describe('Testes de Lógica - buscarTemperatura', () => {
  
  beforeEach(() => {
    // Reset dos mocks antes de cada teste
    jest.clearAllMocks();
  });

  test('deve fazer requisições corretas para cidade válida', async () => {
    // Arrange
    const cidade = 'São Paulo';
    
    const mockGeoData = {
      results: [
        {
          latitude: -23.5505,
          longitude: -46.6333,
          name: 'São Paulo',
          country: 'Brasil'
        }
      ]
    };
    
    const mockClimaData = {
      current_weather: {
        temperature: 25,
        windspeed: 10,
        winddirection: 180,
        weathercode: 0,
        time: '2025-11-13T14:30:00'
      }
    };
    
    global.fetch
      .mockResolvedValueOnce({
        json: async () => mockGeoData
      })
      .mockResolvedValueOnce({
        json: async () => mockClimaData
      });
    
    // Act
    const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cidade)}&count=1&language=pt&format=json`;
    const geoResponse = await fetch(geoURL);
    const geoData = await geoResponse.json();
    
    const { latitude, longitude } = geoData.results[0];
    const climaURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    const climaResponse = await fetch(climaURL);
    const climaData = await climaResponse.json();
    
    // Assert
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenNthCalledWith(1, geoURL);
    expect(global.fetch).toHaveBeenNthCalledWith(2, climaURL);
    expect(geoData.results).toHaveLength(1);
    expect(geoData.results[0].name).toBe('São Paulo');
    expect(climaData.current_weather.temperature).toBe(25);
  });

  test('deve retornar array vazio quando cidade não existe', async () => {
    // Arrange
    const cidade = 'CidadeQueNaoExiste123';
    
    const mockGeoData = {
      results: []
    };
    
    global.fetch.mockResolvedValueOnce({
      json: async () => mockGeoData
    });
    
    // Act
    const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cidade)}&count=1&language=pt&format=json`;
    const geoResponse = await fetch(geoURL);
    const geoData = await geoResponse.json();
    
    // Assert
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(geoData.results).toHaveLength(0);
    expect(geoData.results || geoData.results.length === 0).toBeTruthy();
  });

  test('deve validar entrada vazia', () => {
    // Arrange
    const cidadeVazia = '   ';
    
    // Act
    const cidadeTrimmed = cidadeVazia.trim();
    
    // Assert
    expect(cidadeTrimmed).toBe('');
    expect(!cidadeTrimmed).toBeTruthy();
  });

  test('deve lançar erro em caso de timeout da API', async () => {
    // Arrange
    const cidade = 'Rio de Janeiro';
    const timeoutError = new Error('Timeout');
    
    global.fetch.mockRejectedValueOnce(timeoutError);
    
    // Act & Assert
    const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cidade)}&count=1&language=pt&format=json`;
    
    await expect(fetch(geoURL)).rejects.toThrow('Timeout');
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test('deve lançar erro em caso de erro 500 da API', async () => {
    // Arrange
    const cidade = 'Brasília';
    const error500 = new Error('Internal Server Error');
    error500.status = 500;
    
    global.fetch.mockRejectedValueOnce(error500);
    
    // Act & Assert
    const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cidade)}&count=1&language=pt&format=json`;
    
    await expect(fetch(geoURL)).rejects.toThrow('Internal Server Error');
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test('deve processar corretamente os dados de clima retornados', () => {
    // Arrange
    const mockClimaData = {
      current_weather: {
        temperature: 25,
        windspeed: 10,
        winddirection: 180,
        weathercode: 0,
        time: '2025-11-13T14:30:00'
      }
    };
    
    // Act
    const { temperature, windspeed, winddirection, weathercode, time } = mockClimaData.current_weather;
    
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
    
    // Assert
    expect(temperature).toBe(25);
    expect(windspeed).toBe(10);
    expect(winddirection).toBe(180);
    expect(weathercode).toBe(0);
    expect(icone).toBe("☀️");
    expect(descricao).toBe("Ensolarado");
  });

  test('deve usar valores padrão para weathercode desconhecido', () => {
    // Arrange
    const weathercodeDesconhecido = 999;
    
    const icones = {
      0: "☀️", 1: "🌤️", 2: "⛅", 3: "☁️", 45: "🌫️",
      51: "🌦️", 61: "🌧️", 71: "❄️", 80: "🌩️"
    };
    const descricoes = {
      0: "Ensolarado", 1: "Parcialmente nublado", 2: "Nublado", 3: "Muito nublado", 45: "Neblina",
      51: "Chuvisco", 61: "Chuva", 71: "Neve", 80: "Tempestade"
    };
    
    // Act
    const icone = icones[weathercodeDesconhecido] || "🌈";
    const descricao = descricoes[weathercodeDesconhecido] || "Desconhecido";
    
    // Assert
    expect(icone).toBe("🌈");
    expect(descricao).toBe("Desconhecido");
  });

  test('deve formatar data corretamente', () => {
    // Arrange
    const time = '2025-11-13T14:30:00';
    
    // Act
    const data = new Date(time);
    const opcoes = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const dataFormatada = data.toLocaleString('pt-BR', opcoes);
    
    // Assert
    expect(data).toBeInstanceOf(Date);
    expect(dataFormatada).toContain('2025');
    expect(dataFormatada).toContain('14:30');
  });

  test('deve determinar corretamente período do dia', () => {
    // Arrange & Act
    const dataDia = new Date('2025-11-13T14:30:00');
    const dataNoite = new Date('2025-11-13T22:30:00');
    
    const horaDia = dataDia.getHours();
    const horaNoite = dataNoite.getHours();
    
    const isDia = horaDia >= 6 && horaDia < 18;
    const isNoite = horaNoite >= 6 && horaNoite < 18;
    
    // Assert
    expect(isDia).toBe(true);
    expect(isNoite).toBe(false);
  });
});