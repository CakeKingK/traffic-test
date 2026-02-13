FROM node:20-alpine
WORKDIR /app

# 1) 의존성 먼저 설치 (캐시 효율 좋음)
COPY package.json /app/package.json
RUN npm install --omit=dev

# 2) 앱 소스 복사
COPY server.js /app/server.js

EXPOSE 8080
CMD ["node", "server.js"]
