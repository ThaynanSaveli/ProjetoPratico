new Vue({
  el: '#app',
  data:{
      form: {
          inputs: [],
          buttons: [],
      },
      exibirLink: 'submit',
      bool_mask: 0,
      exibirValoresForm: false,
      imagem: ''
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      $('#div_dados_form').html('')
      this.exibirValoresForm = true
      $.each(this.form.inputs, function(index, input){
        $('#div_dados_form').append(
          '<div class="col-12 col-md-4">'
              +input.label+ $('#'+input.id).val()+
          '</div>'
        );
      });
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
      var tem_mascara = this.bool_mask;
      var input = new Input(label.val()+':', placeholder.val(), name.val(), id.val(), tem_mascara);
      var pode_inserir = true;

      if(this.bool_mask == 1){
        if(this.form.inputs.length){
          $.each(this.form.inputs, function(index, input_inserido) {
            if(input_inserido.tem_mascara == 0){
              label.val('');
              placeholder.val('');
              name.val('');
              id.val('');
            }else{
              pode_inserir = false;
              alert('Ops! Numero máximo de campos com máscara atingido! Máximo: 1');
              this.bool_mask = 0;
            }
          });
          if(pode_inserir)
            this.form.inputs.push(input);
        }else{
          label.val('');
          placeholder.val('');
          name.val('');
          id.val('');
    
          this.form.inputs.push(input);
          this.bool_mask = 0;
        }
      }else{
        label.val('');
        placeholder.val('');
        name.val('');
        id.val('');
  
        this.form.inputs.push(input);
        this.bool_mask = 0;
      }    
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
        alert('Ops! Limite de botões do formulário atingido! Máximo: 3 botões!')
      }
    },
    selected(){
      this.exibirLink = this.exibirLink == true ? false : true
    },
    aplicarImagem(evt){
      this.imagem = $('#'+evt.srcElement.id)[0].src
    }
  }
});