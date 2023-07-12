# App

Gympass style app.

## Rfs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [] Deve ser obter o número de check-ins realizados pelo usuário logado;
- [] Deve ser possível o usuário obter seu histórico de check-ins;
- [] Deve ser possível o usuário buscar academias próximas;
- [] Deve ser possível o usuário buscar academias pelo nome;
- [] Deve ser possívelo o usuário realizar check-in em uma academia;
- [] Deve ser possível validar um check-in de um usuário;
- [] Deve ser possível cadastrar uma academia;	 

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [] O usuário não pode fazer 2 check-ins no mesmo dia;
- [] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [] O check-in só pode ser validado até 20 minutos após criado;
- [] O check-in só pode ser validado por adiministradores;
- [] A academia só pode ser 	

## RNFs (Requisitos não funcionais)

- [x] A senha do usuário precisa criptografada;
- [x] Os dados da aplicação precisam estar persistindos em um banco PostgresSQL;
- [] Todas 	as listas de dados precisam estar páginadas com 20 itens por página;
- [] O usuário deve ser indentificado por um JWT (Jason Web Token);

# SOLID
## D -> Depency Inversion Principle