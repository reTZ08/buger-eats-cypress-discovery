
// representa a página de cadastro
class SignupPage {

    go() {
        cy.visit('https://buger-eats-qa.vercel.app')

        cy.get('a[href="/deliver"]').click()
        cy.get('#page-deliver form h1').should('have.text','Cadastre-se para  fazer entregas')
    }

    fillForm(deliver) {
         //achando o elemento e preenchendo:
         cy.get('input[name="fullName"]').type(deliver.name)
         cy.get('input[name="cpf"]').type(deliver.cpf)
         cy.get('input[name="email"]').type(deliver.email)
         cy.get('input[name="whatsapp"]').type(deliver.whatsapp)
 
         cy.get('input[name="postalcode"]').type(deliver.address.postalcode)
         cy.get('input[type="button"][value="Buscar CEP"]').click()
 
         cy.get('input[name="address-number"]').type(deliver.address.number)
         cy.get('input[name="address-details"]').type(deliver.address.details)
         //achando o elemento e validando o preenchimento automatico do CEP
         cy.get('input[name="address"]').should('have.value',deliver.address.street)
         cy.get('input[name="district"]').should('have.value',deliver.address.district)
         cy.get('input[name="city-uf"]').should('have.value',deliver.address.city_state)
         //CY.CONTAINS: buscar elemento por TEXTO, mesmo efeito do x-path
         // junta o localizador CSS com TEXTO
         cy.contains('.delivery-method li', deliver.delivery_method).click()
         //ATTACHFILE: é a função para o aquivo de upload de fotos baixado 
         // no cypress
         cy.get('input[accept^="image"]').attachFile('/images/' + deliver.cnh)
    }

    submit() {
        cy.get('form button[type="submit"]').click()
    }

    modalContentShouldBe(expectedMessage) {
        cy.get('.swal2-container .swal2-html-container')
        .should('have.text', expectedMessage)
    }

    alertMessageShouldBe(expectedMessage) {
        //cy.get('span[class="alert-error"]').should('have.text', expectedMessage)
        cy.contains('span[class="alert-error"]',expectedMessage).should('be.visible')
    }
}

export default new SignupPage;