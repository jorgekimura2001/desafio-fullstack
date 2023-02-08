# Desafio Full-Stack 💪

Este é o frontend do desafio Full-Stack do 6° Módulo da Kenzie Academy Brasil - Uma plataforma que permite o cadastramento de clientes que poderá conter muitos contatos associados.

Para inciar este projeto, é necessário instalar as dependências, que foram utilizadas na elaboração do projeto. Portanto utilize o comando abaixo para instalar tais dependências:
````
yarn install
````

**Atenção:** é necessário utilizar o `yarn` pois esse projeto foi iniciado com esse gerenciador de pacotes.

Para verificar se já possui o gerenciador yarn instalado utilize o seguinte comando:

````
yarn --version
````

Caso não possua o yarn instalado, utilize o comando abaixo para instalar globalmente na sua máquina:

````
npm install --global yarn
````

# **Rodando a aplicação**
Digite o seguinte comando no terminal para rodar a aplicação em sua máquina:

````
yarn start
````

## Rotas

A aplicação possui 4 rotas sendo:
<ul>
  <li>/login - Login de usuários que já possuem uma conta </li>
  <li>/registration - Cadastro de usuários </li>
  <li>/dashboard - Página que contém todos os contatos do usuário logado </li>
  <li>/profile - Página que o usuário pode editar suas informações ou deletar sua conta </li>
</ul>

Qualquer rota fora dessas redireciona o usuário à página de login.

## Observações

### Criação de usuário

Para criação de usuários deve se seguir a seguinte forma:

```
  Nome completo: De preferência primeiro nome e o sobrenome,
  Telefone: DD9XXXXXXXX,
  Email: example@example.com - Único,
  Senha: Números e Letras maiúsculas e minúsculas e Caracteres Especiais e No mínimo 6 e no máximo 15 
```

### Login de usuários

Digitar corretamente os campos e clicar no botão que será gerado um token e as informações do usuário exceto a senha.

### Adição de contatos

Para adição de contatos deve se seguir a seguinte forma:

```
  Nome completo: De preferência primeiro nome e o sobrenome,
  Telefone: DD9XXXXXXXX,
  Email: example@example.com,
```

### Edição de contatos

Para edição de contatos deve se seguir a seguinte forma, todos os campos são opcionais:

```
  Nome completo: De preferência primeiro nome e o sobrenome,
  Telefone: DD9XXXXXXXX,
  Email: example@example.com,
```

### Deleção de contatos 

Ao clicar no botão já deleta o contato.

### Edição de usuários

Para edição de usuários deve se seguir a seguinte forma, todos os campos são opcionais:

```
  Nome completo: De preferência primeiro nome e o sobrenome,
  Telefone: DD9XXXXXXXX,
  Email: example@example.com - Único,
  Senha: Números e Letras maiúsculas e minúsculas e Caracteres Especiais e No mínimo 6 e no máximo 15,
```

### Deleção de contatos 

Ao clicar no botão já deleta o usuário e o redireciona para à página de login.

##

Elaborado com ❤ por Jorge Kimura
