# Use a imagem base do Node.js
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências da aplicação
RUN npm install

# Copia o restante do código da aplicação para o diretório de trabalho
COPY . .

# Expõe a porta em que a aplicação irá rodar (por exemplo, 3000)
EXPOSE 3001

# Comando para rodar a aplicação
CMD ["npm", "run", "dev"]
