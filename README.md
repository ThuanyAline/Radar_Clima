# 🌦️ Radar Clima - Aplicativo de Previsão do Tempo

[![Licença: MIT](https://img.shields.io/badge/Licen%C3%A7a-MIT-cyan.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![Jest](https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=white)](https://jestjs.io/)

Aplicativo web moderno e responsivo para consulta de previsão do tempo em tempo real, com interface glassmorphism e animações fluidas.

## 📋 Índice

- [Características](#-características)
- [Demonstração](#-demonstração)
- [Tecnologias](#️-tecnologias)
-  [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Como Usar](#-como-usar)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Testes](#-testes)
- [APIs Utilizadas](#-apis-utilizadas)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)
- [Autor](#-autor)
- [Agradecimentos](#-agradecimentos)

## ✨ Características

- 🌍 **Busca Global**: Pesquise previsão do tempo de qualquer cidade do mundo
- 🎨 **Design Moderno**: Interface glassmorphism com gradientes ciano/turquesa
- 🌓 **Modo Dia/Noite**: Tema automático baseado no horário local
- 📱 **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- ⚡ **Tempo Real**: Dados atualizados via API Open-Meteo
- 🎭 **Animações**: Transições suaves e efeitos visuais premium
- 🧪 **Testado**: Cobertura de testes unitários com Jest
- 🔒 **Privacidade**: Não coleta ou compartilha dados pessoais

## 🎯 Demonstração

Execute localmente:

```bash
# Clone o repositório
git clone https://github.com/ThuanyAline

# Entre no diretório
cd RadarClima

# Abra o index.html no navegador
# Windows: start index.html
# Mac: open index.html
# Linux: xdg-open index.html
```

## 🛠️ Tecnologias

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Estilos avançados (Grid, Flexbox, Animações, Gradientes)
- **JavaScript (ES6+)** - Lógica e interação
- **Google Fonts** - Tipografia (Outfit, Space Grotesk)

### APIs
- **Open-Meteo Geocoding API** - Geolocalização de cidades
- **Open-Meteo Weather API** - Dados meteorológicos em tempo real

### Testes
- **Jest** - Framework de testes unitários
- **jsdom** - Simulação de ambiente DOM

## 📦 Pré-requisitos

- Navegador web moderno (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Node.js 14+ e npm 6+ (apenas para executar testes)
- Conexão com internet (para APIs e fontes)

## 🚀 Instalação

### 1. Clone o Repositório

```bash
git clone https://github.com/ThuanyAline
cd Radar Clima
```

### 2. Instalação de Dependências (opcional - apenas para testes)

```bash
npm install
```

Isso instalará:
- Jest (framework de testes)
- jsdom (ambiente DOM para testes)

## 💻 Como Usar

### Executar a Aplicação

1. Abra o arquivo `index.html` diretamente no navegador
2. Digite o nome de uma cidade no campo de busca
3. Clique em "Buscar" ou pressione Enter
4. Visualize os dados meteorológicos em tempo real

### Funcionalidades Disponíveis

- **Busca de Cidades**: Digite qualquer cidade (ex: "São Paulo", "Tóquio", "Nova York")
- **Enter para Buscar**: Pressione Enter no campo de input para buscar
- **Informações Exibidas**:
  - 📍 Nome da cidade e país
  - 📅 Data e hora local formatada
  - 🌡️ Temperatura atual em Celsius
  - 💨 Velocidade do vento em km/h
  - 🧭 Direção do vento em graus
  - ☁️ Condições climáticas (ensolarado, nublado, chuva, etc.)

### Exemplos de Uso

```
São Paulo      → Busca clima de São Paulo, Brasil
Rio de Janeiro → Busca clima do Rio de Janeiro
Londres        → Busca clima de Londres, Reino Unido
Tóquio         → Busca clima de Tóquio, Japão
```

## 📁 Estrutura do Projeto

```
RadarClima/
│
├── index.html              # Estrutura HTML principal
├── styles.css              # Estilos visuais (glassmorphism)
├── script.js               # Lógica JavaScript (busca e exibição)
│
├── api.test.js             # Testes unitários Jest
├── package.json            # Configuração npm
├── jest.config.js          # Configuração Jest (opcional)
│
├── README.md               # Este arquivo
├── LICENSE                 # Licença MIT
└── NOTICE.md               # Atribuições e créditos
```

## 🧪 Testes

O projeto inclui testes unitários completos usando Jest.

### Executar Todos os Testes

```bash
npm test
```

### Executar Testes com Cobertura

```bash
npm run test:coverage
```

### Testes Implementados

✅ Requisições corretas para cidade válida  
✅ Tratamento de cidade inexistente  
✅ Validação de entrada vazia  
✅ Tratamento de timeout da API  
✅ Tratamento de erro 500 do servidor  
✅ Processamento de dados climáticos  
✅ Mapeamento de códigos meteorológicos  
✅ Formatação de data em português  
✅ Lógica de modo dia/noite  

## 🌐 APIs Utilizadas

### Open-Meteo Geocoding API
- **Endpoint**: `https://geocoding-api.open-meteo.com/v1/search`
- **Uso**: Conversão de nome de cidade para coordenadas (latitude/longitude)
- **Licença**: CC BY 4.0 (Creative Commons Attribution 4.0)
- **Documentação**: https://open-meteo.com/en/docs/geocoding-api

### Open-Meteo Weather API
- **Endpoint**: `https://api.open-meteo.com/v1/forecast`
- **Uso**: Obtenção de dados meteorológicos atuais
- **Licença**: CC BY 4.0 (Creative Commons Attribution 4.0)
- **Documentação**: https://open-meteo.com/en/docs

**Importante**: Ambas as APIs são gratuitas, não requerem chave de API e não possuem limite de requisições para uso pessoal.

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga estas etapas:

1. Faça um Fork do projeto
2. Crie uma Branch para sua feature (`git checkout -b RadarClima`)
3. Commit suas mudanças (`git commit -m 'Adiciona RadarClima'`)
4. Push para a Branch (`git push origin RadarClima`)
5. Abra um Pull Request

### Diretrizes de Contribuição

- ✅ Escreva código limpo e comentado
- ✅ Siga os padrões de código existentes
- ✅ Adicione testes para novas funcionalidades
- ✅ Atualize a documentação quando necessário
- ✅ Teste localmente antes de enviar PR

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

**Resumo da Licença MIT:**
- ✅ Uso comercial permitido
- ✅ Modificação permitida
- ✅ Distribuição permitida
- ✅ Uso privado permitido
- ⚠️ Sem garantia
- ⚠️ Licença e copyright devem ser incluídos

## 👥 Autor

- **Thuany Silva** - *Desenvolvimento* - [@seu-usuario](https://github.com/ThuanyAline)



## 🙏 Agradecimentos

- **Open-Meteo** - Por fornecer APIs gratuitas e de alta qualidade
- **Google Fonts** - Pelas fontes Outfit e Space Grotesk
- **Comunidade Open Source** - Por inspiração e recursos
- **Jest** - Framework de testes robusto

## 🔒 Privacidade

Esta aplicação **não coleta dados ou compartilha dados pessoais**. As buscas são processadas em tempo real diretamente com as APIs de terceiros. Nenhuma informação do usuário é armazenada ou transmitida para servidores próprios.

## 📞 Contato

- **Email**: thuany.aline@hotmail.com
- **LinkedIn**: [Thuany Silva](https://www.linkedin.com/in/thuanyalinesilva/)
- **GitHub**: [@ThuanyAline](https://github.com/ThuanyAline)

---

⭐ Se este projeto foi útil para você, considere dar uma estrela no GitHub!

**Desenvolvido com 💙 e ☕**
