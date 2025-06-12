@echo off
REM Script para facilitar operações com Docker no projeto RPA Studio (Windows)

IF "%1"=="" GOTO help
IF "%1"=="start" GOTO start
IF "%1"=="stop" GOTO stop
IF "%1"=="restart" GOTO restart
IF "%1"=="build" GOTO build
IF "%1"=="logs" GOTO logs

:start
echo Iniciando containers...
docker-compose up -d
echo Containers iniciados! Acesse http://localhost:8080
GOTO end

:stop
echo Parando containers...
docker-compose down
echo Containers parados!
GOTO end

:restart
echo Reiniciando containers...
docker-compose down
docker-compose up -d
echo Containers reiniciados! Acesse http://localhost:8080
GOTO end

:build
echo Reconstruindo imagem...
docker-compose build --no-cache
echo Imagem reconstruída!
GOTO end

:logs
echo Exibindo logs...
docker-compose logs -f
GOTO end

:help
echo Uso: docker.bat [comando]
echo Comandos disponíveis:
echo   start   - Inicia os containers
echo   stop    - Para os containers
echo   restart - Reinicia os containers
echo   build   - Reconstrói a imagem
echo   logs    - Exibe logs dos containers
GOTO end

:end 