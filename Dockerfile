FROM node:23-slim

ENV PUPPETEER_SKIP_DOWNLOAD=true

# Instala o pnpm globalmente
RUN corepack enable && corepack prepare pnpm@latest --activate

RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor -o /usr/share/keyrings/googlechrome-linux-keyring.gpg \
    && sh -c 'echo "deb [arch=amd64 signed-by=/usr/share/keyrings/googlechrome-linux-keyring.gpg] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-khmeros fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* 
    
WORKDIR /app

COPY package.json package-lock.json ./

RUN pnpm install

COPY . .

RUN pnpm run build

CMD ["sh", "-c", "if [ \"$AMBIENT\" = 'prod' ]; then npm run start:prod; else npm run start:dev; fi"]