# Desafio Full-Stack

Este é o backend do desafio Full-Stack do 6° Módulo da Kenzie Academy Brasil - Uma plataforma que permite o cadastramento de clientes que poderá conter muitos contatos associados.

## Endpoints

A API tem um total de 14 endpoints, sendo em volta principalmente do usuário - podendo cadastrar seu perfil e adicionar seu contatos:

<!-- O url base da API é https://techquiz-api.herokuapp.com -->

### Endpoints que não precisam de autenticação
Não é necessário passar um token para realizar uma requisição bem sucedida nos seguintes endpoints:

<h2 align='center'> Criação de Usuários </h2>

``
POST -> /users - FORMATO DA REQUISIÇÃO
``

```json
{
	"full_name": "Lorenzo Kimura",
	"email": "tester23@gmail.com",
	"telephone": "41912345678",
	"password": "123456"
}
```

``FORMATO DA RESPOSTA - STATUS 201 - CREATED``

```json
{
	"full_name": "Lorenzo Kimura",
	"email": "tester23@gmail.com",
	"telephone": "41912345678",
	"id": "28cb0a18-6959-4dc4-abeb-b7173329aa46",
	"created_at": "2023-02-01T13:08:27.629Z",
	"updated_at": "2023-02-01T13:08:27.629Z"
}
```

<h2 align='center'> Possíveis Erros </h2>

``
POST -> /users - FORMATO DA REQUISIÇÃO - Email já existente no Banco de Dados
``

```json
{
	"full_name": "Lorenzo Kimura",
	"email": "tester23@gmail.com",
	"telephone": "41912345678",
	"password": "123456"
}
```

``FORMATO DA RESPOSTA - STATUS 400 - BAD REQUEST``

```json
{
	"message": "Email already exists!"
}
```

<br>

``
POST -> /users - FORMATO DA REQUISIÇÃO - Faltando campos
``

```json
{
	"full_name": "Lorenzo Kimura",
	"email": "tester23@gmail.com",
	"password": "123456"
}
```

``FORMATO DA RESPOSTA - STATUS 400 - BAD REQUEST``

```json
{
	"message": "Some data is missings"
}
```


