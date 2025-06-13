# Robô de Automação de Formulários

Sistema de automação para preenchimento de formulários web com interface moderna e recursos avançados.

## 🚀 Tecnologias

- **Frontend:**

  - React + TypeScript
  - Vite
  - Tailwind CSS
  - Shadcn/ui
  - React Query
  - React Router

- **Backend:**
  - FastAPI
  - SQLite
  - Selenium
  - WebDriver Manager

## 🛠️ Instalação

### Usando Docker (Recomendado)

1. **Clone o repositório:**

```bash
git clone [URL_DO_REPOSITÓRIO]
cd robo-form-scrape-save
```

2. **Inicie os containers:**

```bash
docker-compose up --build
```

3. **Acesse a aplicação:**

- Frontend: http://localhost:8080
- Backend API: http://localhost:8000
- Documentação API: http://localhost:8000/docs

### Instalação Manual

1. **Backend:**

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

2. **Frontend:**

```bash
npm install
npm run dev
```

## 📦 Estrutura do Projeto

```
robo-form-scrape-save/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── Dockerfile
├── src/
│   ├── components/
│   ├── pages/
│   └── ...
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
└── package.json
```

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:8000
```

### Configuração do Nginx

O arquivo `nginx.conf` está configurado para:

- Servir o frontend na porta 8080
- Proxy reverso para o backend na porta 8000
- Configuração de cache para assets estáticos

## 🚀 Uso

1. **Criar um Template:**

   - Acesse http://localhost:8080
   - Vá para a seção "Templates"
   - Clique em "Novo Template"
   - Preencha os campos necessários

2. **Agendar uma Execução:**

   - Vá para "Agendamentos"
   - Configure a frequência e horário
   - Selecione o template

3. **Monitorar Execuções:**
   - Acesse "Monitoramento"
   - Veja o status em tempo real
   - Acompanhe os logs

## 📚 Documentação da API

A documentação completa da API está disponível em http://localhost:8000/docs

### Endpoints Principais:

- `GET /templates` - Lista todos os templates
- `POST /templates` - Cria um novo template
- `GET /schedules` - Lista todos os agendamentos
- `POST /schedules` - Cria um novo agendamento
- `GET /reports` - Lista todos os relatórios
- `POST /reports` - Cria um novo relatório

## 🐳 Docker

O projeto está configurado com Docker para facilitar o desenvolvimento e deploy:

- **Frontend:** Node.js + Nginx
- **Backend:** Python + FastAPI
- **Compose:** Orquestração dos serviços

### Comandos Docker Úteis:

```bash
# Iniciar os containers
docker-compose up --build

# Parar os containers
docker-compose down

# Ver logs
docker-compose logs -f

# Reconstruir containers
docker-compose up --build --force-recreate
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
<img width="716" alt="image" src="https://github.com/user-attachments/assets/f4685097-0ce4-469e-9963-28cce87d2592" />

