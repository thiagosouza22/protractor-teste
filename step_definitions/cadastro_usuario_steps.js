const { Given, When, Then } = require('cucumber')
const protractor = require('protractor')
const EC = protractor.ExpectedConditions;
const assert = require('assert');

const CadastroUsuario = require('../page_objects/cadastro_usuario_po');
const _CadastroUsuario = new CadastroUsuario();


//#region - Cadastrar usuário sem preencher o campo usuário
Given('que acesso a url, url: {string}', async function (url) {
    await _CadastroUsuario.abrirUrl(url);
});

When('efetuo o cadastro sem preencher o usuário, senha: {string}, nome: {string}', async function (senha, nome) {
    await _CadastroUsuario.preencherSenha(senha);
    await _CadastroUsuario.preencherNome(nome);
    await _CadastroUsuario.clicarEnviar();
    let world = this;
    {
        await browser.takeScreenshot().then(function (buffer) {
            world.attach(buffer, "image/png");
        });
    }
});

Then('o cadastro não deve ser realizado sem usuario', async function () {
    //Asserção verifica se o cadastro foi realizado considerando que não tem nenhum registro
    if (await _CadastroUsuario.txtRegistroId.isPresent() == false) {
        assert.equal('Passou', 'Passou', "Campo Usuário é Obrigatório");
    }
    else {
        assert.equal('Passou', 'Falhou', "O teste falhou usuário foi cadastro incorretamente");
    }
});
//#endregion


//#region - Cadastrar usuário sem preencher o campo senha
When('efetuo o cadastro sem preencher a senha, usuário: {string}', async function (usuario) {
    await _CadastroUsuario.preencherUsuario(usuario);
    await _CadastroUsuario.clicarEnviar();
    let world = this;
    {
        await browser.takeScreenshot().then(function (buffer) {
            world.attach(buffer, "image/png");
        });
    }
});

Then('o cadastro não deve ser realizado sem a senha', async function () {
    //Asserção verifica se o cadastro foi realizado considerando que não tem nenhum registro
    if (await _CadastroUsuario.txtRegistroId.isPresent() == false) {
        assert.equal('Passou', 'Passou', "Campo Usuário é Obrigatório");
    }
    else {
        assert.equal('Passou', 'Falhou', "O teste falhou usuário foi cadastro incorretamente");
    }
});
//#endregion


//#region - Cadastrar usuário sem preencher o campo nome
When('efetuo o cadastro sem preencher o nome, usuário: {string}, senha: {string}', async function (usuario, senha) {
    await _CadastroUsuario.preencherUsuario(usuario);
    await _CadastroUsuario.preencherSenha(senha);
    await browser.actions().mouseMove(_CadastroUsuario.txtColunaId).perform();
    let world = this;
    {
        await browser.takeScreenshot().then(function (buffer) {
            world.attach(buffer, "image/png");
        });
    }
    await _CadastroUsuario.clicarEnviar();
});

Then('o cadastro não deve ser realizado sem o nome', async function () {
    browser.wait(EC.visibilityOf(_CadastroUsuario.txtMsg), 5000)
    //Asserção que valida mensagem exibida na tela
    var _validaMsg = await _CadastroUsuario.txtMsg.getText()
    assert.equal(_validaMsg, 'Existem campos em branco.')
    await browser.actions().mouseMove(_CadastroUsuario.txtColunaId).perform();
    let world = this;
    {
        await browser.takeScreenshot().then(function (buffer) {
            world.attach(buffer, "image/png");
        });
    }

    //Asserção verifica se o cadastro foi realizado considerando que não tem nenhum registro
    if (await _CadastroUsuario.txtRegistroId.isPresent() == false) {
        assert.equal('Passou', 'Passou', "Campo Usuário é Obrigatório");
    }
    else {
        assert.equal('Passou', 'Falhou', "O teste falhou usuário foi cadastro incorretamente");
    }
});
//#endregion


//#region - Cadastrar usuário
When('efetuo o cadastro, usuário: {string}, senha: {string}, nome {string}', async function (usuario, senha, nome) {
    _usuario = usuario;
    _senha = senha;
    _nome = nome;
    await _CadastroUsuario.preencherUsuario(_usuario);
    await _CadastroUsuario.preencherSenha(_senha);
    await _CadastroUsuario.preencherNome(_nome);
    await browser.actions().mouseMove(_CadastroUsuario.txtColunaId).perform();
    let world = this;
    {
        await browser.takeScreenshot().then(function (buffer) {
            world.attach(buffer, "image/png");
        });
    }
    await _CadastroUsuario.clicarEnviar();
});

Then('o cadastro deve ser realizado', async function () {
    browser.wait(EC.visibilityOf(_CadastroUsuario.txtRegistroId), 5000)

    await browser.actions().mouseMove(_CadastroUsuario.txtColunaId).perform();
    await browser.executeScript('window.scrollBy(0,800);')
    let world = this;
    {
        await browser.takeScreenshot().then(function (buffer) {
            world.attach(buffer, "image/png");
        });
    }

    //Valida se id foi gravado no cadastro
    var _validaId = await _CadastroUsuario.txtRegistroId.getText()
    assert(_validaId > 1);

    //Valida se nome foi gravado no cadastro
    var _validaNome = await _CadastroUsuario.txtRegistroNome.getText()
    assert.equal(_validaNome, _nome);

    //Valida se usuario foi gravado no cadastro
    var _validaUsuario = await _CadastroUsuario.txtRegistroUsuario.getText()
    assert.equal(_validaUsuario, _usuario);

    //Valida se senha foi gravado no cadastro
    var _validaSenhas = await _CadastroUsuario.txtRegistroSenha.getText()
    assert.equal(_validaSenhas, _senha);

    //Valida se opção apagar foi gravado no cadastro
    var _validaAcao = await _CadastroUsuario.txtRegistroAcao.getText()
    assert.equal(_validaAcao, 'Apagar');
});
//#endregion


//#region - Atualizar usuário
When('atualizo o cadastro existente, usuário: {string}, senha: {string}, nome {string}', async function (usuario, senha, nome) {
    _usuario = usuario;
    _senha = senha;
    _nome = nome;
    await _CadastroUsuario.preencherUsuario(_usuario);
    await _CadastroUsuario.preencherSenha(_senha);
    await _CadastroUsuario.preencherNome(_nome);
    await browser.actions().mouseMove(_CadastroUsuario.txtColunaId).perform();
    let world = this;
    {
        await browser.takeScreenshot().then(function (buffer) {
            world.attach(buffer, "image/png");
        });
    }
    await _CadastroUsuario.clicarEnviar();
});

Then('o cadastro deve ser atualizado', async function () {
    browser.wait(EC.visibilityOf(_CadastroUsuario.txtRegistroId), 5000)

    await browser.actions().mouseMove(_CadastroUsuario.txtColunaId).perform();
    await browser.executeScript('window.scrollBy(0,800);')
    let world = this;
    {
        await browser.takeScreenshot().then(function (buffer) {
            world.attach(buffer, "image/png");
        });
    }

    //Valida se id foi gravado no cadastro
    var _validaId = await _CadastroUsuario.txtRegistroId.getText()
    assert(_validaId > 1);

    //Valida se nome foi gravado no cadastro
    var _validaNome = await _CadastroUsuario.txtRegistroNome.getText()
    assert.equal(_validaNome, _nome);

    //Valida se usuario foi gravado no cadastro
    var _validaUsuario = await _CadastroUsuario.txtRegistroUsuario.getText()
    assert.equal(_validaUsuario, _usuario);

    //Valida se senha foi gravado no cadastro
    var _validaSenhas = await _CadastroUsuario.txtRegistroSenha.getText()
    assert.equal(_validaSenhas, _senha);

    //Valida se opção apagar foi gravado no cadastro
    var _validaAcao = await _CadastroUsuario.txtRegistroAcao.getText()
    assert.equal(_validaAcao, 'Apagar');
});
//#endregion


//#region - Excluir Usuario
When('excluo o usuario, usuário: {string}', async function (usuario) {
    browser.wait(EC.visibilityOf(_CadastroUsuario.txtColunaId), 9000)
    await browser.actions().mouseMove(_CadastroUsuario.txtColunaId).perform();
    await browser.executeScript('window.scrollBy(0,800);')
    let world = this;
    {
        await browser.takeScreenshot().then(function (buffer) {
            world.attach(buffer, "image/png");
        });
    }

    var _validaUsuario = await _CadastroUsuario.txtRegistroUsuario.getText()
    assert.equal(_validaUsuario, usuario);
    await _CadastroUsuario.clicarApagar();
});

Then('o cadastro deve ser excluído', async function () {
    await browser.actions().mouseMove(_CadastroUsuario.txtColunaId).perform();
    await browser.executeScript('window.scrollBy(0,800);')

    let world = this;
    {
        await browser.takeScreenshot().then(function (buffer) {
            world.attach(buffer, "image/png");
        });
    }

    //Asserção verifica se o registro foi excluido
    if (await _CadastroUsuario.txtRegistroId.isPresent() == false) {
        assert.equal('Passou', 'Passou', "Cadastro excluído com sucesso");
    }
    else {
        assert.equal('Passou', 'Falhou', "Cadastro não foi excluído");
    }
});
//#endregion


//#region - Atualizar página
When('atualizo a página', async function () {
    browser.wait(EC.visibilityOf(_CadastroUsuario.txtColunaId), 9000)
    await browser.actions().mouseMove(_CadastroUsuario.txtColunaId).perform();
    await browser.executeScript('window.scrollBy(0,800);')
    let world = this;
    {
        await browser.takeScreenshot().then(function (buffer) {
            world.attach(buffer, "image/png");
        });
    }

    await _CadastroUsuario.clicarAtualizar();
});

Then('a página deve ser atualizada', async function () {
    browser.wait(EC.visibilityOf(_CadastroUsuario.txtColunaId), 5000);
    await browser.actions().mouseMove(_CadastroUsuario.txtColunaId).perform();
    await browser.executeScript('window.scrollBy(0,800);')

    let world = this;
    {
        await browser.takeScreenshot().then(function (buffer) {
            world.attach(buffer, "image/png");
        });
    }

    //Asserção verifica se a página foi atualizada sem alterações
    if (await _CadastroUsuario.txtRegistroId.isPresent() == false) {
        browser.wait(EC.visibilityOf(_CadastroUsuario.txtUsuario), 5000);
        browser.wait(EC.visibilityOf(_CadastroUsuario.txtSenha), 5000);
        browser.wait(EC.visibilityOf(_CadastroUsuario.txtNome), 5000);
        assert.equal('Passou', 'Passou', "Página atualizada com sucesso");
    }
    else {
        browser.wait(EC.visibilityOf(_CadastroUsuario.txtUsuario), 5000);
        browser.wait(EC.visibilityOf(_CadastroUsuario.txtSenha), 5000);
        browser.wait(EC.visibilityOf(_CadastroUsuario.txtNome), 5000);
        assert.equal('Passou', 'Falhou', "Página foi atualizada com erro");
    }
});
//#endregion