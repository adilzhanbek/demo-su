FROM node:18.16
LABEL ITFUSION BACKEND <itfusion>



WORKDIR /usr/src/app
COPY package*.json ./


RUN npm install



# Bundle app source
COPY . .


EXPOSE 8001

CMD ["node", "server.js"]
