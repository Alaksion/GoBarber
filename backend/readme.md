# Recuperacão de senha
**Requisitos Funcionais**

- O usuário deve poder recuperar sua senha informando seu email
- O usuário deve receber um e-mail com instruções de recuperação de senha
- O usuário deve poder resetar sua senha

**Requisitos não funcionais**

- Utilizar MailTrap para testar envios de e-mail no ambiente de desenvolvimento
- Utilizar o Amazon SES para envios de e-mail em produção
- O envio de e-mails deve acontecer em segundo plano (background job)

**Regras de negócio**

- O link de recuperação de senha deve expirar em duas horas
- O usuário precisa confirmar a nova senha

# Atualização do perfil

**Requisitos Funcionais**

- Usuário deve poder alterar seu nome, email e senha

**Requisitos não funcionais**

**Regras de negócio**

- O usuário não pode alterar seu e-mail para um e-mail já cadastrado por outro usuário
- Para atualizar sua senha, o usuário deve informar a senha antiga
- Para atualizar sua senha o usuário deve confirmar a nova senha


# Painel do prestador

**Requisitos Funcionais**

- O usuário deve poder listar seus agendamentos de um dia específico
- O prestador deve receber uma notificação sempre que houver um novo agendamento
- O prestador deve poder visualizar as notificações não lidas

**Requisitos não funcionais**

- Os agendamentos do prestador no dia devem ser armazenados em cache
- As notificações do prestador ficarão armazenadas em mongoDb
- As notificaçoes do prestador devem ser enviadas em tempo real

**Regras de negócio**

- A notificação deve ter um status de lida ou não lida para que o prestador possa controlar

# Agendamento de serviços

**Requisitos Funcionais**

- O usuário deve poder listar todos os prestadores de serviços cadastrados
- O usuário deve poder ver os horários disponíveis para o prestador selecionado
- O usuário deve poder realizar novos agendamentos com um prestador

**Requisitos não funcionais**

- A listagem de prestadores ficará armazenado em cache

**Regras de negócio**

- Cada agendamento deve durar 1 hora exatamente\
- Os agendametos devem estar disponíveis entre 8:00 as 18:00
- O usuário não pode agendar em um horário já ocupado
- O usuário não pode agendar em um horário que já passou
- O usuário não pode agendar serviços consigo mesmo


