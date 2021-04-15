FROM node:alpine
WORKDIR /usr/app/
RUN apk update
RUN apk add python3
RUN apk add sqlite
COPY package.json package*.json ./
RUN npm install --save sqlite3
RUN npm install
COPY . .

#RUN npm run build
EXPOSE 3000
CMD npm run dev

#-p 0.0.0.0:3000:3000 