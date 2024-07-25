# express-todo

## Для dev

### Запустить контейнеры

```bash
docker compose up app db
```

### Накатить базу данных

```bash
docker compose exec app npx sequelize db:migrate
```

### Накатить сиды

```bash
docker compose exec app npx sequelize db:seed:all
```

#### Пояснение

`app` - имя контейнера с приложением

`docker compose up` - запускает контейнеры и создает их в фоне

`docker compose exec app npx sequelize db:migrate` - запускает контейнер с приложением и выполняет команду на нем

## Для prod

### Установить Git

```bash
sudo apt update
sudo apt install git
```

### Установить Docker

```bash
sudo apt-get update && \
sudo apt-get install -y ca-certificates curl && \
sudo install -m 0755 -d /etc/apt/keyrings && \
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc && \
sudo chmod a+r /etc/apt/keyrings/docker.asc && \
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo \"$VERSION_CODENAME\") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null && \
sudo apt-get update && \
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin && \
sudo systemctl start docker && \
sudo systemctl enable docker && \
docker --version && \
docker compose version

```

### Установить Docker Compose

```bash
sudo apt-get update
sudo apt-get install docker-compose-plugin
```

### Установить make

```bash
sudo apt-get update
sudo apt-get install make
```

### Создать app директорию
```bash
mkdir app
cd app
```

### Склонировать репозиторий

```bash
git clone https://github.com/${YOUR_USERNAME}/${PROJECT_NAME}.git
cd ${PROJECT_NAME}
```

### Добавить env и .env.prod файл. В env.prod добавить:

```
NODE_ENV=production

POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
```

### Запустить контейнеры

```bash
docker compose up app-prod db
```

### Накатить миграции

```bash
docker compose exec app-prod npx sequelize db:migrate
```

### Накатить сиды

```bash
docker compose exec app-prod npx sequelize db:seed:all
```

#### Пояснение

`app-prod` - имя контейнера с приложением для продакшена

`docker compose up` - запускает контейнеры и создает их в фоне

`docker compose exec app-prod npx sequelize db:migrate` - запускает контейнер с приложением для продакшена и выполняет
команду на нем

## Makefile

1. **Обновление кода из репозитория:**
    ```bash
    make update-code
    ```

2. **Пересборка и перезапуск контейнеров для dev окружения:**
    ```bash
    make build
    ```

3. **Очистка неиспользуемых данных (без удаления томов):**
    ```bash
    make clean
    ```

4. **Запуск всех миграций:**
    ```bash
    make migrate
    ```

5. **Запуск одной конкретной миграции:**
    ```bash
    make migrate MIGRATION_NAMES="20230101120000-create-users.js"
    ```

6. **Запуск нескольких конкретных миграций:**
    ```bash
    make migrate MIGRATION_NAMES="20230101120000-create-users.js 20230102120000-add-posts.js"
    ```

7. **Отмена последней миграции:**
    ```bash
    make migrate-undo
    ```

8. **Отмена конкретной миграции:**
    ```bash
    make migrate-undo MIGRATION_NAME="20230101120000-create-users.js"
    ```

9. **Отмена всех миграций:**
    ```bash
    make migrate-undo-all
    ```

10. **Отмена всех миграций до конкретной:**
    ```bash
    make migrate-undo-all MIGRATION_NAME="20230101120000-create-users.js"
    ```

11. **Полный процесс: обновление кода, пересборка и безопасная очистка (CleanUpdateBuild):**
    ```bash
    make cub
    ```

## Команды Docker

### Показать список всех запущенных контейнеров

```bash
docker ps
```

### Следить за логами всех контейнеров в реальном времени

```bash
docker  logs -f
```

### Просмотреть логи только одного сервиса

```bash
docker  logs <service_name>
```

### Следить за логами сервиса frontend в режиме реального времени

```bash
docker  logs -f frontend
```

### Посмотреть логи за последние n строк (например, 100 строк)

```bash
docker  logs --tail 100
```

### Посмотреть последние 100 строк логов сервиса frontend

```bash
docker  logs --tail 100 frontend
```

## Дополнительная информация
`wait-for-it.sh` - скрипт для проверки соединения с базой данных и запуска контейнера с приложением в режиме реального времени. Файл скачан отсюда: https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh