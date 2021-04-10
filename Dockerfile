from node:15

COPY package*.json ./

RUN npm install

copy . .

EXPOSE 3000

CMD [ "node", "index.js" ]