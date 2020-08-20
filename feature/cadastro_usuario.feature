#language: pt

@Cadastros

Funcionalidade: Cadastro de usuário

 Esquema do Cenário: Cadastrar usuário sem preencher o campo usuário
 Dado que acesso a url, url: "<url>"
 Quando efetuo o cadastro sem preencher o usuário, senha: "<senha>", nome: "<nome>"
 Então o cadastro não deve ser realizado sem usuario
 Exemplos:
 |url                   |senha |nome          |
 |treinar-automacao.php |teste |Thiago Usuário|


 Esquema do Cenário: Cadastrar usuário sem preencher o campo senha
 Dado que acesso a url, url: "<url>"
 Quando efetuo o cadastro sem preencher a senha, usuário: "<usuario>"
 Então o cadastro não deve ser realizado sem a senha
 Exemplos:
 |url                   |usuario       |
 |treinar-automacao.php |Thiago Usuário|


 Esquema do Cenário: Cadastrar usuário sem preencher o campo nome
 Dado que acesso a url, url: "<url>"
 Quando efetuo o cadastro sem preencher o nome, usuário: "<usuario>", senha: "<senha>"
 Então o cadastro não deve ser realizado sem o nome
 Exemplos:
 |url                   |usuario        |senha|
 |treinar-automacao.php |Thiago Usuário |teste|


 Esquema do Cenário: Cadastrar usuário
 Dado que acesso a url, url: "<url>"
 Quando efetuo o cadastro, usuário: "<usuario>", senha: "<senha>", nome "<nome>"
 Então o cadastro deve ser realizado
 Exemplos:
 |url                   |usuario      |senha |nome   |
 |treinar-automacao.php |helena.souza |teste |Helena |


 Esquema do Cenário: Atualizar usuário
 Dado que acesso a url, url: "<url>"
 Quando atualizo o cadastro existente, usuário: "<usuario>", senha: "<senha>", nome "<nome>"
 Então o cadastro deve ser atualizado
 Exemplos:
 |url                   |usuario      |senha  |nome |
 |treinar-automacao.php |helena.souza |qwerty |Rose |


 Esquema do Cenário: Excluir usuário
 Dado que acesso a url, url: "<url>"
 Quando excluo o usuario, usuário: "<usuario>"
 Então o cadastro deve ser excluído
 Exemplos:
 |url                   |usuario      |
 |treinar-automacao.php |helena.souza |


 Esquema do Cenário: Atualizar página
 Dado que acesso a url, url: "<url>"
 Quando atualizo a página
 Então a página deve ser atualizada
 Exemplos:
 |url                   |
 |treinar-automacao.php |