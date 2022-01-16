# 1STChallenge
API para cadastro de usuários 

# Requisitos
* Docker (20.10.7)
* docker-compose (1.25.0)
* node (12.16.3 ou superior) <- Para os testes
* Insomnia (2021.7.2) <- Não é necessário para fazer o projeto funcionar(mas facilita bastante)

# Como instalar
Clonar o projeto
```
git clone https://github.com/c0nradLC/1STChallenge.git
```

Entrar no diretório do projeto
```
cd 1STChallenge
```

Executar os containeres do projeto(caso o usuário atual não esteja no grupo do docker será necessário rodar este comando com sudo)
```
docker-compose up
```
Após executar ```docker-compose up```, devemos esperar até aparecer a linha ```server        | Server running```, após isso o projeto está rodando.

# Como utilizar
## Insomnia
Após o projeto estar rodando, devemos abrir o Insomnia e importar as requisições clicando em "Create", selecionando "File" e selecionando o arquivo "Imsonmnia.json"
na raíz do projeto, isso irá criar a coleção de requisiçoes "1stchallenge", após isso devemos seguir os seguintes passos:

1. Executar a requisição "Create user" com as informações preenchidas;
2. Executar a requisição "Authenticate user" com as informações preenchidas e copiar o valor do campo "token";
3. Colar o valor copiado do campo "token" em todas as requisições restantes na aba "Auth", selecionando o tipo de token "Bearer";
4. Executar as requisições restantes com as informações preenchidas ou com as informações desejadas.

Detalhe: As requisições "Delete user" e "Update user" estão preenchidas com o id de um usuário cadastrado anteriormente, à fim de demonstrar que com o token do usuário criado no passo 1 não é possível remover ou atualizar as informações de outro usuário, caso deseje remover ou atualizar as informações do usuário já existente(id: 6), é necessário obter o token do mesmo pela requisição "Authenticate user" com
```
{
  "telefone": "11111111111",
  "cpf": "76226968036"
}
```

## Banco de dados
É possível visualizar o banco de dados acessando a url ```http://localhost:8090``` no navegador com Username: ```root``` e Password: ```1stchallenge```.

## Testes unitários
É possível executar os testes unitários executando o comando ```npm run test``` ou ```npm run test:coverage``` no diretório raíz do projeto.

