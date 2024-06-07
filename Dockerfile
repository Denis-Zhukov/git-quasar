# Используем официальный образ Node.js версии 20.11.0
FROM node:20.11.0

# Устанавливаем pnpm
RUN npm install -g pnpm

# Создаем рабочую директорию
WORKDIR /app

# Копируем файлы package.json и pnpm-lock.yaml для установки зависимостей
COPY package.json pnpm-lock.yaml ./

# Устанавливаем зависимости
RUN pnpm install

# Копируем все остальные файлы проекта
COPY . .

# Генерируем Prisma клиент
RUN prisma generate

# Копируем файлы .env для каждого сервиса
COPY packages/gateway/.env ./packages/gateway/
COPY packages/account-service/.env ./packages/account-service/
COPY packages/notification-service/.env ./packages/notification-service/
COPY packages/repository-service/.env ./packages/repository-service/

# Экспонируем необходимые порты
# Предположим, что ваши сервисы работают на портах 3000, 3001, 3002, 3003
EXPOSE 3000
EXPOSE 3001
EXPOSE 3002
EXPOSE 3003
EXPOSE 80
# Порт для клиентского приложения

# Команды для запуска всех сервисов в dev режиме
CMD ["sh", "-c", "\
  pnpm --filter gateway start:dev & \
  pnpm --filter account-service start:dev & \
  pnpm --filter notification-service start:dev & \
  pnpm --filter repository-service start:dev & \
  pnpm --filter client dev \
"]
