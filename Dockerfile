FROM node:22.20.0

RUN apt-get update && apt-get install -y tzdata && \
    ln -snf /usr/share/zoneinfo/Asia/Jakarta /etc/localtime && \
    echo "Asia/Jakarta" > /etc/timezone && \
    rm -rf /var/lib/apt/lists/*

ENV TZ=Asia/Jakarta

WORKDIR /app
COPY package*.json .

RUN npm i


COPY . .
CMD [ "npm", "start" ]
EXPOSE 4000

