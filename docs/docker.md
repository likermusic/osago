### Запуск Docker локально

1. Запустить docker demon
2. docker build -t osagoinsurance-frontend --build-arg GITHUB_NPM_TOKEN=<TOKEN> .
3. docker run --env-file .env osagoinsurance-frontend

[Return to main README](../README.md)
