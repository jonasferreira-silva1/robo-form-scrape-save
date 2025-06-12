# Como Usar o RPA Studio

Este guia ensina, de forma simples e detalhada, como utilizar o RPA Studio para automatizar o preenchimento de formulários web usando dados de uma planilha Excel.

---

## 1. Instale e rode o projeto

1.1. **Pré-requisitos:**

- Node.js (versão 16 ou superior)
- npm ou yarn

  1.2. **Instale as dependências:**

```sh
npm install
# ou
yarn install
```

1.3. **Inicie o servidor de desenvolvimento:**

```sh
npm run dev
# ou
yarn dev
```

1.4. **Abra o navegador:**
Acesse [http://localhost:5173](http://localhost:5173)

---

## 2. Criando uma automação

### Passo 1: Acesse o Assistente

- Na tela inicial, clique na aba **Assistente** ou **Nova Automação**.

### Passo 2: Preencha as informações básicas

- Dê um **nome** e uma **descrição** para sua automação.

### Passo 3: Informe a URL do formulário

- Cole o endereço do site onde o robô irá preencher os dados.
- Exemplo: `https://exemplo.com/formulario`

### Passo 4: Faça upload do arquivo Excel

- Clique em **Selecionar arquivo** e envie sua planilha com os dados.
- O arquivo deve ter colunas correspondentes aos campos do formulário.

### Passo 5: Mapeie os campos do formulário

- Informe, para cada campo do formulário, o seletor CSS correspondente (exemplo: `#nome`, `.email-field`).
- Dica: Use o inspecionar elemento do navegador (F12) para encontrar os seletores.

### Passo 6 (Opcional): Agende a automação

- Se quiser, defina horários para o robô rodar automaticamente.

### Passo 7: Finalize e execute

- Revise as configurações e clique em **Finalizar** ou **Iniciar Automação**.

---

## 3. Monitorando e acompanhando

- Acompanhe o progresso em tempo real na aba **Monitor**.
- Veja quantos registros já foram processados, erros e tempo estimado.
- Consulte o **Dashboard** para métricas gerais.

---

## 4. Gerando relatórios

- Após a execução, acesse a aba **Relatórios** para visualizar e exportar os resultados.

---

## 5. Dicas rápidas

- Sempre revise os seletores CSS dos campos do formulário.
- Certifique-se de que a planilha está no formato correto.
- Use o agendamento para automatizar tarefas recorrentes.
- Em caso de erro, verifique o monitor para detalhes.

---

Pronto! Agora você já sabe como usar o RPA Studio para automatizar tarefas repetitivas de preenchimento de formulários web.

Se tiver dúvidas, consulte este guia ou peça ajuda ao desenvolvedor responsável pelo projeto.
