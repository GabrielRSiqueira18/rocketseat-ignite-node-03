# App

Gympass style app.

## Rfs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas;
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possívelo o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar um check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;	 

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] O check-in só pode ser validado até 20 minutos após criado;
- [x] O check-in só pode ser validado por adiministradores;
- [x] A academia só pode ser 	

## RNFs (Requisitos não funcionais)

- [x] A senha do usuário precisa criptografada;
- [x] Os dados da aplicação precisam estar persistindos em um banco PostgresSQL;
- [x] Todas 	as listas de dados precisam estar páginadas com 20 itens por página;
- [x] O usuário deve ser indentificado por um JWT (Jason Web Token);

# SOLID
## D -> Depency Inversion Principle
