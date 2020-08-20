'use strict'
const {element, browser} = require("protractor");
const EC = protractor.ExpectedConditions;


class CadastroUsuario {
    constructor() {
        //Texto
        this.txtUsuario = element(by.css('input[name="form_usuario"]'));
        this.txtSenha = element(by.css('input[name="form_senha"]'));
        this.txtNome = element(by.css('input[name="form_nome"]'));
        this.txtColunaId = element(by.css('table > tbody > tr > th:nth-child(1)'))
        this.txtRegistroId = element(by.css('div > table > tbody > tr:nth-child(2) > td:nth-child(1)'));
        this.txtRegistroNome = element(by.css('div > table > tbody > tr:nth-child(2) > td:nth-child(2)'));
        this.txtRegistroUsuario = element(by.css('div > table > tbody > tr:nth-child(2) > td:nth-child(3)'));
        this.txtRegistroSenha = element(by.css('div > table > tbody > tr:nth-child(2) > td:nth-child(4)'));
        this.txtRegistroAcao = element(by.css('div > table > tbody > tr:nth-child(2) > td:nth-child(5)'));
        this.txtMsg = element(by.xpath("//td[text()='Existem campos em branco.']"))
        //Botões
        this.btnEnviar = element(by.css('input[type="submit"]'));
        //Link
        this.linkAtualizar = element(by.xpath("//a[text()='Clique aqui']"));
        this.linkApagar = element(by.xpath("//a[text()='Apagar']"));
    }

    async abrirUrl(url) {
        browser.get(url);
    }
    async preencherUsuario(usuario) {
        browser.wait(EC.visibilityOf(this.txtUsuario), 9000, "Elemento texto usuário não visível na tela");
        return await this.txtUsuario.sendKeys(usuario);
    }
    async preencherSenha(senha) {
        browser.wait(EC.visibilityOf(this.txtSenha), 9000, "Elemento texto senha não visível na tela");
        return await this.txtSenha.sendKeys(senha);
    }
    async preencherNome(nome) {
        browser.wait(EC.visibilityOf(this.txtNome), 9000, "Elemento texto nome não visível na tela");
        return await this.txtNome.sendKeys(nome);
    }
    async clicarEnviar() {
        await this.btnEnviar.click()
    }
    async clicarAtualizar() {
        browser.wait(EC.visibilityOf(this.linkAtualizar), 9000, "Elemento link atualizar não visível na tela");
        return await this.linkAtualizar.click();
    }
    async clicarApagar() {
        browser.wait(EC.visibilityOf(this.txtRegistroAcao), 9000, "Elemento link atualizar não visível na tela");
        return await this.txtRegistroAcao.click();
    }
}
module.exports = CadastroUsuario