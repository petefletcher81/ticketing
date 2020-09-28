FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install
# Copy over everything else from the library
COPY . .

CMD ["npm","start"]