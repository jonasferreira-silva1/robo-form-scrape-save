#!/bin/bash

# Script para facilitar operações com Docker no projeto RPA Studio

case "$1" in
  start)
    echo "Iniciando containers..."
    docker-compose up -d
    echo "Containers iniciados! Acesse http://localhost:8080"
    ;;
  stop)
    echo "Parando containers..."
    docker-compose down
    echo "Containers parados!"
    ;;
  restart)
    echo "Reiniciando containers..."
    docker-compose down
    docker-compose up -d
    echo "Containers reiniciados! Acesse http://localhost:8080"
    ;;
  build)
    echo "Reconstruindo imagem..."
    docker-compose build --no-cache
    echo "Imagem reconstruída!"
    ;;
  dev)
    echo "Iniciando ambiente de desenvolvimento..."
    # Salvar docker-compose.yml original
    cp docker-compose.yml docker-compose.yml.bak
    # Modificar docker-compose.yml para ambiente de desenvolvimento
    sed -i 's/# image: node:18-alpine/image: node:18-alpine/' docker-compose.yml
    sed -i 's/# command:/command:/' docker-compose.yml
    sed -i 's/# volumes:/volumes:/' docker-compose.yml
    sed -i 's/#   -/  -/' docker-compose.yml
    sed -i 's/# working_dir:/working_dir:/' docker-compose.yml
    sed -i 's/# ports:/ports:/' docker-compose.yml
    sed -i 's/#   - "5173:5173"/  - "5173:5173"/' docker-compose.yml
    sed -i 's/# environment:/environment:/' docker-compose.yml
    sed -i 's/#   - VITE_HOST=0.0.0.0/  - VITE_HOST=0.0.0.0/' docker-compose.yml
    # Comentar a build
    sed -i 's/build:/# build:/' docker-compose.yml
    sed -i 's/  context:/# context:/' docker-compose.yml
    sed -i 's/  dockerfile:/# dockerfile:/' docker-compose.yml
    # Comentar a porta de produção
    sed -i 's/  - "8080:80"/# - "8080:80"/' docker-compose.yml
    
    # Iniciar containers
    docker-compose up -d
    echo "Ambiente de desenvolvimento iniciado! Acesse http://localhost:5173"
    ;;
  prod)
    echo "Restaurando configuração de produção..."
    # Restaurar docker-compose.yml original
    if [ -f docker-compose.yml.bak ]; then
      mv docker-compose.yml.bak docker-compose.yml
      echo "Configuração de produção restaurada!"
    else
      echo "Backup não encontrado. Não foi possível restaurar."
    fi
    ;;
  logs)
    echo "Exibindo logs..."
    docker-compose logs -f
    ;;
  *)
    echo "Uso: ./docker.sh [comando]"
    echo "Comandos disponíveis:"
    echo "  start   - Inicia os containers"
    echo "  stop    - Para os containers"
    echo "  restart - Reinicia os containers"
    echo "  build   - Reconstrói a imagem"
    echo "  dev     - Configura e inicia ambiente de desenvolvimento"
    echo "  prod    - Restaura configuração de produção"
    echo "  logs    - Exibe logs dos containers"
    ;;
esac 