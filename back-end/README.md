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

<h2 align='center'> Listagem de Usuários </h2>

``
GET -> /users - FORMATO DA REQUISIÇÃO
``

Sem corpo da requisição - A aplicação ficará responsável em buscar todos os usuários.

``FORMATO DA RESPOSTA - STATUS 200 - OK``

```json
[
	{
		"id": "38bcd026-bb3c-4bea-a225-c92a5bae891e",
		"full_name": "Jorge Eik",
		"email": "tester@gmail.com",
		"telephone": "21912345670",
		"created_at": "2023-01-31T19:46:53.911Z",
		"updated_at": "2023-02-01T17:05:20.309Z",
		"contacts": [
			{
				"id": "9635e0dd-f3a6-448c-bd2b-87a981c60b9b",
				"full_name": "Lorenzo Kimura",
				"email": "lorenzo.kimura@gmail.com",
				"telephone": "41912345678",
				"created_at": "2023-02-01T13:07:14.997Z",
				"updated_at": "2023-02-01T17:06:01.354Z"
			}
		]
	},
	{
		"id": "28cb0a18-6959-4dc4-abeb-b7173329aa46",
		"full_name": "Lorenzo Kimura",
		"email": "tester23@gmail.com",
		"telephone": "41912345678",
		"created_at": "2023-02-01T13:08:27.629Z",
		"updated_at": "2023-02-01T13:08:27.629Z",
		"contacts": []
	}
]
```

### Endpoints que precisam de autenticação e apenas o próprio usuário pode acessar
Rotas que necessitam de autorização deve ser informado no cabeçalho da requisição o campo "Authorization", dessa forma: 

> Authorization: Bearer {token}

Após o usuário estar logado, ele deve conseguir acessar as informações sem problemas.

<h2 align='center'> Listagem de Usuário </h2>

``
GET -> /users/<uuid:user_id> - FORMATO DA REQUISIÇÃO
``

Sem corpo da requisição - Na requisição apenas é necessário um TOKEN, a aplicação ficará responsável em buscar o usuário que está no parâmetro da rota.

``FORMATO DA RESPOSTA - STATUS 200 - OK``

```json
{
	"id": "38bcd026-bb3c-4bea-a225-c92a5bae891e",
	"full_name": "Jorge Eik",
	"email": "tester@gmail.com",
	"telephone": "21912345670",
	"created_at": "2023-01-31T19:46:53.911Z",
	"updated_at": "2023-02-01T17:05:20.309Z",
	"contacts": [
		{
			"id": "9635e0dd-f3a6-448c-bd2b-87a981c60b9b",
			"full_name": "Lorenzo Kimura",
			"email": "lorenzo.kimura@gmail.com",
			"telephone": "41912345678",
			"created_at": "2023-02-01T13:07:14.997Z",
			"updated_at": "2023-02-01T17:06:01.354Z"
		}
	]
}
```

<h2 align='center'> Possíveis Erros </h2>

``GET -> /users/<uuid:user_id>/ - FORMATO DA REQUISIÇÃO - Outro usuário``

Sem corpo da requisição - Na requisição apenas é necessário um TOKEN, a aplicação ficará responsável em buscar o usuário que está no parâmetro da rota.

``FORMATO DA RESPOSTA - STATUS 401 - UNAUTHORIZED``

```json
{
	"message": "You don't have permission."
}
```

<br>

``GET -> /users/<uuid:user_id>/ - FORMATO DA REQUISIÇÃO - Sem token``

Sem corpo da requisição - Na requisição apenas é necessário um TOKEN, a aplicação ficará responsável em buscar o usuário que está no parâmetro da rota.

``FORMATO DA RESPOSTA - STATUS 401 - UNAUTHORIZED``

```json
{
	"message": "Invalid token"
}
```

<h2 align='center'> Atualização de Usuário </h2>

``
PATCH -> /users/<uuid:user_id>/ - FORMATO DA REQUISIÇÃO
``

```json
{
	"email": "lorenzo@mail.com"
}
```

``FORMATO DA RESPOSTA - STATUS 200 - OK``

```json
{
	"id": "28cb0a18-6959-4dc4-abeb-b7173329aa46",
	"full_name": "Lorenzo Kimura",
	"email": "lorenzo@mail.com",
	"telephone": "41912345678",
	"created_at": "2023-02-01T13:08:27.629Z",
	"updated_at": "2023-02-02T00:23:38.232Z",
	"contacts": []
}
```

<h2 align='center'> Possíveis Erros </h2>

``PATCH -> /users/<uuid:user_id>/ - FORMATO DA REQUISIÇÃO - Outro usuário``

```json
{
	"email": "lorenzo@mail.com"
}
```

``FORMATO DA RESPOSTA - STATUS 401 - UNAUTHORIZED``

```json
{
	"message": "You don't have permission."
}
```

<br>

``PATCH -> /users/<uuid:user_id>/ - FORMATO DA REQUISIÇÃO - Sem token``

```json
{
	"email": "lorenzo@mail.com"
}
```

``FORMATO DA RESPOSTA - STATUS 401 - UNAUTHORIZED``

```json
{
	"message": "Invalid token"
}
```

<br>

``
PATCH -> /users/<uuid:user_id>/ - FORMATO DA REQUISIÇÃO - Faltando campos
``

```json
{
	"batata": "123"
}
```

``FORMATO DA RESPOSTA - STATUS 400 - BAD REQUEST``

```json
{
	"message": "Some data is missings"
}
```

<h2 align = "center"> Deleção de Usuário </h2>

``DELETE -> /users/<uuid:user_id>/ - FORMATO DA REQUISIÇÃO``

Sem corpo da requisição - Na requisição apenas é necessário um TOKEN, a aplicação ficará responsável em buscar o usuário que está no parâmetro da rota.

``FORMATO DA RESPOSTA - STATUS 204 - NO CONTENT``

Sem corpo da resposta, porém o usuário foi deletado.

<h2 align='center'> Possíveis Erros </h2>

``DELETE -> /users/<uuid:user_id>/ - FORMATO DA REQUISIÇÃO - Outro usuário``

Sem corpo da requisição - Na requisição apenas é necessário um TOKEN, a aplicação ficará responsável em buscar o usuário que está no parâmetro da rota.

``FORMATO DA RESPOSTA - STATUS 401 - UNAUTHORIZED``

```json
{
	"message": "You don't have permission."
}
```

<br>

``DELETE -> /users/<uuid:user_id>/ - FORMATO DA REQUISIÇÃO - Sem token``

Sem corpo da requisição - Na requisição apenas é necessário um TOKEN, a aplicação ficará responsável em buscar o usuário que está no parâmetro da rota.

``FORMATO DA RESPOSTA - STATUS 401 - UNAUTHORIZED``

```json
{
	"message": "Invalid token"
}
```

