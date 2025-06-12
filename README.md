# RPA Studio - Projeto pessoal de Automação de Formulários Web

## Sobre o Projeto

O RPA Studio é uma plataforma de Automação Robótica de Processos (RPA) focada no preenchimento automático de formulários web utilizando dados de planilhas Excel. A aplicação oferece uma interface moderna e intuitiva para configurar, executar e monitorar automações.

## Funcionalidades Principais

- **Dashboard de Métricas**: Visualização de estatísticas e desempenho das automações
- **Assistente de Configuração**: Interface passo a passo para criar novas automações
- **Gerenciamento de Templates**: Salve e reutilize configurações de automação
- **Agendamento**: Configure execuções automáticas em horários específicos
- **Monitoramento em Tempo Real**: Acompanhe o progresso das automações em execução
- **Relatórios**: Gere relatórios detalhados sobre as execuções

## Tecnologias Utilizadas

- **Frontend**:
  - React 18
  - TypeScript
  - Tailwind CSS
  - Shadcn/UI (Componentes UI)
  - React Router
  - React Hook Form
  - React Query
  - Vite (Build tool)
- **Containerização**:
  - Docker
  - Docker Compose
  - Nginx

## Como Executar o Projeto

### Método 1: Instalação Local

Requisitos:

- Node.js (versão 16 ou superior)
- npm ou yarn

```sh
# Clonar o repositório
git clone <URL_DO_REPOSITÓRIO>

# Acessar o diretório do projeto
cd robo-form-scrape-save

# Instalar dependências
npm install
# ou
yarn install

# Iniciar o servidor de desenvolvimento
npm run dev
# ou
yarn dev
```

O aplicativo estará disponível em `http://localhost:5173`.

### Método 2: Usando Docker

Requisitos:

- Docker
- Docker Compose

```sh
# Clonar o repositório
git clone <URL_DO_REPOSITÓRIO>

# Acessar o diretório do projeto
cd robo-form-scrape-save

# Construir e iniciar os containers
docker-compose up -d

# Para ambiente de desenvolvimento (opcional)
# Edite o docker-compose.yml para descomentar a configuração de desenvolvimento
```

O aplicativo estará disponível em `http://localhost:8080`.

#### Scripts de Conveniência para Docker

O projeto inclui scripts para facilitar o uso do Docker:

**Linux/Mac**:

```sh
# Tornar o script executável
chmod +x docker.sh

# Iniciar containers
./docker.sh start

# Parar containers
./docker.sh stop

# Reiniciar containers
./docker.sh restart

# Reconstruir imagem
./docker.sh build

# Iniciar em modo desenvolvimento
./docker.sh dev

# Restaurar configuração de produção
./docker.sh prod

# Ver logs
./docker.sh logs
```

**Windows**:

```cmd
# Iniciar containers
docker.bat start

# Parar containers
docker.bat stop

# Reiniciar containers
docker.bat restart

# Reconstruir imagem
docker.bat build

# Ver logs
docker.bat logs
```

## Estrutura do Projeto

- `/src`: Código fonte da aplicação
  - `/components`: Componentes React reutilizáveis
  - `/pages`: Páginas da aplicação
  - `/hooks`: Custom hooks
  - `/lib`: Utilitários e configurações
- `Dockerfile`: Configuração para construção da imagem Docker
- `docker-compose.yml`: Configuração para orquestração de containers
- `nginx.conf`: Configuração do servidor web Nginx
- `docker.sh`/`docker.bat`: Scripts para facilitar operações com Docker

## Fluxo de Trabalho

1. **Configuração**: Use o assistente para configurar uma nova automação
2. **Upload de Dados**: Faça upload do arquivo Excel com os dados a serem preenchidos
3. **Mapeamento**: Configure os seletores CSS para os campos do formulário
4. **Execução**: Inicie a automação e monitore o progresso
5. **Resultados**: Visualize e exporte os resultados da automação

## Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

<img width="800" alt="image" src="https://github.com/user-attachments/assets/e18d24f6-02db-4720-8531-163bc22846da" />

