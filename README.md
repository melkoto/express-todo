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

### Пояснение

`app` - имя контейнера с приложением

`docker compose up` - запускает контейнеры и создает их в фоне

`docker compose exec app npx sequelize db:migrate` - запускает контейнер с приложением и выполняет команду на нем

## Для prod

### Запустить контейнеры

```bash
docker compose up app-prod db
```

### Накатить базу данных

```bash
docker compose exec app-prod npx sequelize db:migrate
```

### Накатить сиды
```bash
docker compose exec app-prod npx sequelize db:seed:all
```

### Пояснение

`app-prod` - имя контейнера с приложением для продакшена

`docker compose up` - запускает контейнеры и создает их в фоне

`docker compose exec app-prod npx sequelize db:migrate` - запускает контейнер с приложением для продакшена и выполняет команду на нем

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