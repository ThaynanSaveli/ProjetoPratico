new Vue({
  el: '#app',
  data:{
      form: {
          inputs: [],
          buttons: [],
      },
      exibirLink: 'submit',
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      alert(JSON.stringify('Nome: '+this.form))
    },
    onReset(evt) {
      evt.preventDefault()
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    addInput() {
      var label = $('#str_texto_label');
      var placeholder = $('#str_texto_placeholder');
      var name = $('#str_nome_campo');
      var id = $('#str_id_campo');
      var input = new Input(label.val(), placeholder.val(), name.val(), id.val());
      
      label.val('');
      placeholder.val('');
      name.val('');
      id.val('');

      this.form.inputs.push(input);
    },
    deleteRow(index) {
      this.form.inputs.splice(index, 1)
    },
    addButton() {
      if(this.form.buttons.length < 3){
        var texto = $('#str_texto_botao');
        var cor = $('#str_cor_botao');
        var cor_texto = $('#str_cor_texto_botao');
        var name = $('#str_nome_botao');
        var id = $('#str_id_botao');
        var tipo = $('input[name="some-radios"]:checked');
        var link = $('#str_link_botao');
        if(link.val().search('https://') == -1 && link.val().search('http://') == -1){
          link.val('https://'+link.val());
        }
        var button = new Button(texto.val(), cor.val(), cor_texto.val(), name.val(), id.val(), tipo.val(), link.val());
        
        texto.val('');
        cor.val('');
        cor_texto.val('');
        name.val('');
        id.val('');
        tipo.val('');
        link.val('');

        this.form.buttons.push(button);
      }else{
        alert('Limite de botões do formulário atingido! Máximo: 3 botões!')
      }
    },
    selected(){
      this.exibirLink = this.exibirLink == true ? false : true
    }
  }
});