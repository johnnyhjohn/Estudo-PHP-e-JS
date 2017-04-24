
// Classe alerta para mostrar notificações de sucesso ou erro
var alerta = new alert();

$(document).ready(function(){
	
	var CSRF_TOKEN 	= $('meta[name="csrf-token"]').attr('content') // Variavel para pegar o atributo content
	,	url 		= window.location.href // Variável para pegar o href
	,   date 		= new Date() // Variavel pra pegar data
	,	mes 		= date.getMonth() // Variavel pra pegar o mês
    , 	$body 		= $('body'); // Variavel pra pegar o elemento body

	addMaterialInput();
	// buscaKeyPress() é um plugin para busca dinâmica
	$('.busca-keypress').buscaKeyPress();

	$(document).on('focus', '.material-input',addMaterialFocus); // No elemento de classe .material-input quando estiver no focus chama a função AddMaterialFocus

	if(localStorage.getItem('body')){ // Um if para verificar se existe o body no localstorage 
		$body.addClass('full'); // Adiciona classe full no elemento $body
		$('.btn-burguer').addClass('active'); // Adiciona classe active no elemento .btn-burger
	}

	$('.full [data-toggle="tooltip"]').tooltip({'placement': 'right'});

	$(document).on('click', '.btn-burguer', function(){ // Evento de clique no elemento .btn-burguer
		let $this = $(this); // Criação da variável $(this)

	    if($('body').hasClass('full')) { // If para verificar se o body possui a classe full
	        $('.full [data-toggle="tooltip"]').tooltip('disable'); // Desabilita o tooltip
	    	if(localStorage.getItem('body')){ // Um if para verificar se existe o body no localstorage 
	    		localStorage.removeItem('body'); // Se tiver o item ele remove para limpar
	    	}
	    } else {
	    	localStorage.setItem('body', 'full'); // Se não ele coloca no localstorage
	        $('[data-toggle="tooltip"]').tooltip({'placement': 'right'});
	        $('[data-toggle="tooltip"]').tooltip("enable"); 
	    }

		$this.toggleClass('active'); // Ativa classe active
		$body.toggleClass('full'); // Ativa classe full
	});


	$(document).on('click', '.notificacao', function(){ // Evento de clique no elemento .notificacao
		let $this = $(this); // Criação da variável $(this)

		$('#notificacoes').toggleClass('active'); // Ativa classe active
	});


	
	////////////////////////////////////////////////////////////////
	////				Evento de login dinâmico				////
	////////////////////////////////////////////////////////////////
	$(document).on('click', '#btn-login', loginAjax);
	$(document).on('keypress', '#username, #senha', function(e){
	  	if ( e.which == 13 ) {
		    loginAjax();
		}
	});

	////////////////////////////////////////////////////////////////
	////			Evento de paginacao dinâmica				////
	////////////////////////////////////////////////////////////////

	$(document).on('click', '.pagina', paginacao); // evento de clique no elemento .pagina chama funcao paginacao
	////////////////////////////////////////////////////////////////
	////				Evento de busca dinâmica				////
	////////////////////////////////////////////////////////////////
	$(document).on('keyup', '#busca input[type="text"]', buscaAjax); // evento de keyup no elemento #busca... chama funcao buscaAjax

	$(document).on('change', '#imagem', function(event){ // evento de troca no elemento #imagem 
	    if (this.files && this.files[0]) {
	        var reader = new FileReader();
	        reader.onload = imageIsLoaded;
	        reader.readAsDataURL(this.files[0]);
	    }
	});

	$(document).on('click', '.btn-add', function(event){ // evento de clique no elemento .btn-add
		event.preventDefault();//previne ações default

		let $ingrediente = $('.ingredientes'); // criação de variável chamando elemento .ingrediente
		let item 		 = $ingrediente.find('.item').last().clone(true); // criação variavel item

		item.append('<button class="btn btn-red btn-remove-produto"><i class="fa fa-minus"></i></button>'); // da um append no item para adicionar o botão
		// ** Corrigido procura por input e adiciona o valor de 1
		item.find('input').val('1'); // procura o input com val 1
		// ** Corrigido procura pelo ultimo .item e appenda depois do elemento o valor da var item depois
		$ingrediente.find('.item').last().after(item); // procura o ultimo .item depois do item
	});

	$(document).on('click', '.btn-remove-produto', function(event){ // Evento de clique no elemento .btn-remove-produto
		let $this = $(this); // criação da variável $(this)

		$this.parent('.item').remove(); // pega o elemento pai deste item e remove
	});

	$('#loader').addClass('active'); // adiciona class active no #loader


})

function imageIsLoaded(e) { // cria funcao imageIsLoaded
    $('#imagem-thumb').attr('src', e.target.result); // adiciona o atributo src q trás no parametro e.target.result
    $('#imagem-upload').val(e.target.result); // adiciona o val q trás no parametro e.result
};

function addMaterialFocus(){
	// material_input é um plugin para inputs
	$('input').material_input(); //cada elemetno chama a função .material_input();
	$('select').material_input(); //cada elemetno chama a função .material_input();
	$("textarea").material_input();	 //cada elemetno chama a função .material_input();
}

function addMaterialInput(){
	var inputs = setInterval(function(){
		if($(document).find("input")){ // se encontrar o elemento input
			$('input').material_input(); //cada elemetno chama a função .material_input();
			$('select').material_input(); //cada elemetno chama a função .material_input();
			$("textarea").material_input(); //cada elemetno chama a função .material_input();
			clearInterval(inputs);
		}
	}, 200);	
};

/**
*
*	Função para adicionar classe do material em inputs novos
*
*/
function resetMaterialInput( $input ){ // criação da funcao resetMaterialInput
	$input.each(function(key, value){ // para cada input
		let $value = $(value); // criação da variável $value chamando $(value) para melhor performance trazendo o parametro value como o elemento a ser verificado
		if(!$value.siblings('label').hasClass('label-active')){ // se o $value irmão label tiver classe .label-active
			$value.siblings('label').addClass('label-active'); // adiciona classe label-active ao elemento irmao label 
			$value.siblings('span').addClass('input-focus'); // adiciona classe .input-focus no irmao span
		}
	})
}

function loginAjax(){
	let data = { // criação do array data contendo email e password
		email 	 : $('#username').val(), // criacao da variavel email pegando o val do elemento #username
		password : $('#senha').val() // criacao da variavel password pegando o val do elemento #senha
	};
	if($.trim($('#username').val()) == ''){ // verifica se o campo de usuario está vazio, se tiver pede para inserir
	 	alerta.danger('Insira o usuário');
		return false;
	}
	if($.trim($('#senha').val()) == ''){ // verifica se o campo de senha está vazio, se tiver pede para inserir
		alerta.danger('Insira a senha');
		return false;
	}

	$.ajax({
		url: 'login',
		type: 'POST',
		data: data,
	})
	.done(function( retorno ) { 

		if(JSON.parse(retorno) !== 'erro'){ // se o retorno for diferente de error
			alerta.success('Logado com sucesso. Aguarde enquanto redirecionado'); // função alerta.sucess
			setTimeout(() => { // adiciona um tempo de 1segundo até realizar o redirecionamento 
				window.location = '/admin';
			}, 1000);
		} else{ // se for = a erro  chama o alerta.danger
			alerta.danger('Login ou senha incorretos. Tente novamente!'); 
		}
	})
	.fail(function(error) { // se acontecer algo não esperado cai no erro chamando o alerta.danger
		alerta.danger('Ocorreu um erro, contate o administrador.');
	});
}

function buscaAjax() {	// Cria função buscaAjax
	let $this = $(this); // criação da variável $this
	let busca = $this.data('busca'); // Criação da variavel busca pegando o data-busca do elemento $this

	$.get('/admin/data/busca/'+busca+'?valor='+$this.val(), function(data) {
		// chama método com nome padrão que esta nos script de cada seção
		ajaxAtualizaTabela( data ); // chama função ajaxAtualizaTabela com o parametro data
	});
}

function paginacao() { // Cria função paginacao
	let $this 		= $(this); // criação da variável $this
	let pagina  	= $this.text(); // criação de variavel pagina pegando o elemento $this.text()
	let controller 	= $this.data('controller'); // Criação da variavel controller pegando o data-controller do elemento $this

	if($this.hasClass('active')){ // verifica se tem a classe active
		return false;
	}
	$('.pagina').removeClass('active'); // remopve classe active no elemento  .pagina
	$this.addClass('active'); // Adiciona classe active no elemento  $this

	$.get('/admin/data/pagina/'+controller+'/'+ pagina, function(data) {
		// chama método com nome padrão que esta nos script de cada seção
		ajaxAtualizaTabela( data ); // chama função ajaxAtualizaTabela com o parametro data
	});
}