FROM node:18

WORKDIR /usr/lib/app

COPY package*.json ./

RUN npm install

COPY lib/infrastructure/database/prisma-orm/prisma ./prisma

COPY . .

COPY .env .env

RUN npx prisma generate --schema=./prisma/schema.prisma

RUN npm run build

EXPOSE 3333

CMD ["node", "dist/main"]
