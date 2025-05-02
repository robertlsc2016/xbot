# WhatsApp Group Bot to Post Tweets on X (ex-Twitter)

Este é um bot para **grupos de WhatsApp** que permite **postar tweets** diretamente no **X (antigo Twitter)** usando um **comando no grupo**.

> ⚡ Apenas o usuário autorizado pode postar tweets usando o bot.

---

## Como Funciona

- O bot se conecta a um grupo no WhatsApp usando o WhatsApp Web.
- Um usuário autorizado envia uma mensagem que começa com o trigger (`/t` por padrão).
- O bot lê o conteúdo da mensagem e publica como um tweet via API do X (Twitter).
- O bot responde no grupo com o status do tweet criado ou uma mensagem de erro.

---

## Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/seu-repo.git](https://github.com/robertlsc2016/xbot.git)
   cd xbot
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente criando um arquivo `.env` na raiz do projeto:**

   Exemplo de `.env`:

   ```env
   # Caminho do navegador para o Puppeteer
   # (Defina apenas o caminho correspondente ao seu sistema operacional)

   # Para Linux
   PUPPETEER_EXECUTABLE_PATH="/usr/bin/chromium"

   # Para Windows
   PUPPETEER_EXECUTABLE_PATH="C:\Program Files\Google\Chrome\Application\chrome.exe"

   # Se estiver usando Windows, instale sem baixar o Chromium:
   # PUPPETEER_SKIP_DOWNLOAD=true npm install

   # Credenciais da API do X (Twitter)
   APP_KEY=""
   APP_SECRET=""
   ACCESS_TOKEN=""
   ACCESS_TOKEN_SECRET=""

   # Configurações do grupo e usuário
   GROUP_ID=""
   USER_ID=""
   TRIGGER=/t
   ```

   🔒 **Importante:** Nunca compartilhe seu arquivo `.env`. Ele contém credenciais sensíveis!

4. **Execute o bot:**
   ```bash
   npm start
   ```

   Será exibido um QR Code no terminal para autenticação no WhatsApp Web.

---

## Uso

No grupo configurado, o usuário autorizado deve enviar uma mensagem começando com o trigger configurado (por padrão `/t`):

```bash
/t Aqui está meu tweet!
```

- **Limite de caracteres:** Se o tweet tiver mais de 280 caracteres, o bot irá:
  - Avisar que o texto ultrapassou o limite.
  - Cortar o texto para o tamanho máximo permitido.
  - Enviar o texto cortado para reavaliação.

- **Confirmação:** Se o tweet for postado com sucesso, o bot responderá com a confirmação e detalhes do tweet publicado.

---

## Requisitos

- Node.js 18 ou superior
- WhatsApp ativo no número autenticado
- Conta de desenvolvedor no X (Twitter) e credenciais da API
- Navegador Chromium ou Google Chrome instalado

---

## Tecnologias Utilizadas

- `whatsapp-web.js`
- `twitter-api-v2`
- `dotenv`
- `puppeteer`

---

## Observações

- Este bot é para uso pessoal ou ambientes controlados.
- Para servidores Linux, recomenda-se usar o Chromium com as flags apropriadas para ambientes headless.
- O bot autentica e salva sua sessão localmente na pasta `./auth`.

---

## Licença

Distribuído sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais informações.

---

Essas mudanças foram feitas para garantir maior clareza, além de correções no formato e na estrutura geral do arquivo.
