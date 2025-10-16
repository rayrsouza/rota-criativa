# Projeto Rayr - Formulário de Inscrição

## Como fazer deploy na Vercel

### Passo 1: Prepare seu projeto
Certifique-se de que todos os arquivos estão commitados no Git:
```bash
git init
git add .
git commit -m "Primeiro commit"
```

### Passo 2: Faça deploy na Vercel
Você tem duas opções:

#### Opção A - Via CLI (Linha de Comando):
1. Instale a CLI da Vercel:
```bash
npm i -g vercel
```

2. Faça login:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

#### Opção B - Via GitHub (Recomendado):
1. Crie um repositório no GitHub
2. Envie seu código:
```bash
git remote add origin https://github.com/seu-usuario/seu-repositorio.git
git branch -M main
git push -u origin main
```

3. Acesse [vercel.com](https://vercel.com)
4. Clique em "Add New Project"
5. Importe seu repositório do GitHub
6. A Vercel detectará automaticamente que é um projeto Flask
7. Clique em "Deploy"

### ⚠️ IMPORTANTE: Limitação da Vercel com Arquivos JSON

A Vercel usa **funções serverless**, que são **stateless** (sem estado). Isso significa:
- ❌ O arquivo `inscricoes.json` **NÃO será persistido** entre requisições
- ❌ Cada deploy limpa os dados anteriores
- ❌ Não é possível salvar dados em arquivos no servidor

### Soluções para persistir dados na Vercel:

#### Solução 1: Usar um banco de dados (Recomendado)
- **MongoDB Atlas** (gratuito): https://www.mongodb.com/cloud/atlas
- **PostgreSQL Vercel** (integrado): https://vercel.com/storage/postgres
- **Supabase** (PostgreSQL gratuito): https://supabase.com

#### Solução 2: Usar Vercel KV (Key-Value Storage)
- Armazenamento Redis da Vercel
- Tier gratuito disponível

#### Solução 3: Usar outra plataforma
Se quiser manter arquivos JSON:
- **Render.com** (permite persistência de arquivos)
- **Railway.app** (permite persistência de arquivos)
- **PythonAnywhere** (permite persistência de arquivos)

## Estrutura do Projeto
```
├── app.py              # Aplicação Flask principal
├── requirements.txt    # Dependências Python
├── vercel.json        # Configuração da Vercel
├── inscricoes.json    # Dados (não funciona na Vercel)
├── static/
│   ├── script.js      # JavaScript
│   └── style.css      # Estilos
└── templates/
    └── index.html     # Template HTML
```
