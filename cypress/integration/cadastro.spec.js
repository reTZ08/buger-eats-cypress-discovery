import SignupPage from '../pages/SignupPage'
import signup from '../pages/SignupPage'
// Inicio padrão caso de testes
describe('cadastro', ()=> {
// GANCHOS:
//    before(function(){
//        cy.log('Tudo aqui é executado uma única vez ANTES de TODOS os casos de testes')
    
//    })
    
 //   beforeEach(function(){
 //       cy.log('Tudo aqui é executado sempre ANTES de CADA caso de teste')
  //  })

  //  after(function(){
  //      cy.log('Tudo aqui é executado uma única vez DEPOIS de TODOS os casos de testes')
   // })

  //  afterEach(function(){
   //     cy.log('Tudo aqui é executado sempre DEPOIS de CADA caso de teste')
  //  })
    beforeEach(function() {
        cy.fixture('deliver').then((d)=> {
            this.deliver = d
        })
    })
    
    it('Usuário deve se tornar um entregador', function() {

        // Estância da classe SignupPage
        // signup: PADRÃO DE PROJEDO PAGEUP
       

        signup.go()
        signup.fillForm(this.deliver.signup)
        signup.submit()
        // CONST: uma constante ou seja ela não muda
        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldBe(expectedMessage)

      })
      //outro caso de teste a partir daqui:
      // IT: começo de caso de teste 
      it('CPF incorreto', function() {

       
        signup.go()
        signup.fillForm(this.deliver.cpf_inv)
        signup.submit()
        signup.alertMessageShouldBe( 'Oops! CPF inválido')
      })   
      
        //outro caso de teste a partir daqui:
      // IT: começo de caso de teste 
      it('email incorreto', function() {

       
        signup.go()
        signup.fillForm(this.deliver.email_inv)
        signup.submit()
        signup.alertMessageShouldBe( 'Oops! Email com formato inválido.')
      })  
      
      context('Required fields',function(){
        const messages = [
        {field: 'name',output:'É necessário informar o nome'},
        {field: 'cpf',output:'É necessário informar o CPF'},
        {field: 'email',output:'É necessário informar o email'},
        {field: 'postalcode',output:'É necessário informar o CEP'},
        {field: 'number',output:'É necessário informar o número do endereço'},
        {field: 'delivery_method',output:'Selecione o método de entrega'},
        {field: 'cnh',output:'Adicione uma foto da sua CNH'}

        ]

        before(function(){
          SignupPage.go()
          SignupPage.submit()
        })

        messages.forEach(function(msg){
          it(`${msg.field} is required`,function(){
            SignupPage.alertMessageShouldBe(msg.output)
          })
        })

      })

})