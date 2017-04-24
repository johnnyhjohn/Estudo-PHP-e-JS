// Classe alerta para mostrar notificações de sucesso ou erro
//erro nno console do navegador => Uncaught TypeError: alert is not a constructor at script.js:2    
var alerta = new alert();
 
$(document).ready(function(){                          
	// na variavel CSRF_TOKEN será inserido valores de content;
	var CSRF_TOKEN 	= $('meta[name="csrf-token"]').attr('content')
	//declaração de variavel url, captando a href
	,	url 		= window.location.href 
	 // variaveis de date e mes, captando a data
	,   date 		= new Date()
	,	mes 		= date.getMonth()
	//$body está se referindo ao <body>, transformando-o em elemento jQuery
    , 	$body 		= $('body');
    // chama a Função addMaterialInput
	addMaterialInput();

	// console.log('content', url, date, mes, $body);

	// buscaKeyPress() é um plugin para busca dinâmica
	$('.busca-keypress').buscaKeyPress();

	// no focus do input, adiciona-se addMaterialFocus
	$(document).on('focus', '.material-input',addMaterialFocus);

	// função de verificação de if, se localStorage tem o item body,
	//  adiciona-se a classe full no body, e .btn-burguer adiciona-se a classe de active
	if(localStorage.getItem('body')){
		$body.addClass('full');
		$('.btn-burguer').addClass('active');
	}

	// adicioda a classe full no body, abriremos um popup à direita dos elementos com data-toggle="tooltip"
	$('.full [data-toggle="tooltip"]').tooltip({'placement': 'right'});


	$(document).on('click', '.btn-burguer', function(){
		/* referindo-se ao elemento .btn-burguer, let indica que essa é uma variavel interna 
			dessa Função
		*/
		let $this = $(this);

		// verificação de classe no body
	    if($('body').hasClass('full')) {
	    	// se body tem a classe full, tooltip será "desativado" e body retirado do localStorage
	        $('.full [data-toggle="tooltip"]').tooltip('disable');
	    	if(localStorage.getItem('body')){
	    		localStorage.removeItem('body');
	    	}
	    } else {
	    	// senão, colocaremos a classe full em body, faremos o popup aparecer à direita
	    	// dos elementos e deixaremos o tooltip enable para exibir o aviso do popup
	    	localStorage.setItem('body', 'full');
	        $('[data-toggle="tooltip"]').tooltip({'placement': 'right'});
	        $('[data-toggle="tooltip"]').tooltip("enable");
	    }
	    /*
			$this alterna classe active;
			$body alterna classe full.
	    */
		$this.toggleClass('active');
		$body.toggleClass('full');
	});


	$(document).on('click', '.notificacao', function(){
		/* referindo-se ao elemento .notificacao, let indica que essa é uma variavel interna 
			dessa Função
		*/
		let $this = $(this);
		// ao clicar em .notificacao, #notificacoes alterna classes com active
		$('#notificacoes').toggleClass('active');
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
	// ao clicar em .pagina chamamos a  função paginação dinamica
	$(document).on('click', '.pagina', paginacao);
	////////////////////////////////////////////////////////////////
	////				Evento de busca dinâmica				////
	////////////////////////////////////////////////////////////////
	// ao evento de keyup, chama buscaAjax
	$(document).on('keyup', '#busca input[type="text"]', buscaAjax);
	// evento de troca em  #imagem 
	$(document).on('change', '#imagem', function(event){
	    if (this.files && this.files[0]) {
	        var reader = new FileReader();
	        reader.onload = imageIsLoaded;
	        reader.readAsDataURL(this.files[0]);
	    }
	});

		// definimos um evento de clique em .btn-add
		$(document).on('click', '.btn-add', function(event){
			//previnimos ações default de um elemento, por ex, se for um a, evitamos que ele recarregua a pagina 
		event.preventDefault();

		/*
		declaramos as variaveis $ingediente e item;
		$ingredientes diz respeito ao elemento jQuery $('.ingredientes');
		item representa o ultimo item de $ingrediente e executa uma copia do mesmo.
		*/
		let $ingrediente = $('.ingredientes');
		let item 		 = $ingrediente.find('.item').last().clone(true);

		// executa um .append em item, adicionando um botão
		item.append('<button class="btn btn-red btn-remove-produto"><i class="fa fa-minus"></i></button>');
		// procula pelo input com val 1
		// ** Corrigido procura por input e adiciona o valor de 1
		item.find('input').val('1');
		// executa uma busca pelo ultimo .item depois de item
		// ** Corrigido procura pelo ultimo .item e appenda depois do elemento o valor da var item depois
		$ingrediente.find('.item').last().after(item);
	});

	$(document).on('click', '.btn-remove-produto', function(event){
		/* referindo-se ao elemento .btn-remove-produto, let indica que essa é uma variavel interna 
			dessa Função
		*/
		let $this = $(this);
		//excluímos o pai do elemento .item;
		$this.parent('.item').remove();
	});
	// adicionamos a classe active em #loader
	$('#loader').addClass('active');


})

/*
|Criamos a função imageIsLoaded(e) com e de parametro;
| esse e servirá para debugarmos a função com o console.log e captarmos os valores dos elementos da função
*/
function imageIsLoaded(e) {
	// insere o atributo src que mostra no parametro e.target.result
    $('#imagem-thumb').attr('src', e.target.result);
    // insere o val que mostra no parametro e.result
    $('#imagem-upload').val(e.target.result);
};

function addMaterialFocus(){
	// material_input é um plugin para inputs

	//.material_input(); é chamado em cada elemento.
	$('input').material_input();
	$('select').material_input();
	$("textarea").material_input();	
}

function addMaterialInput(){
	var inputs = setInterval(function(){ // setamos um intervalo que executa a seguinte função:
		// se achar input
		if($(document).find("input")){
			//.material_input(); é chamado em cada elemento.
			$('input').material_input();
			$('select').material_input();
			$("textarea").material_input();
			clearInterval(inputs);
		}
	}, 200); // essa função será executada em um intervalo de 200 milisegundos quando for chamada.
};

/**
*
*	Função para adicionar classe do material em inputs novos
*
*/
// criamos a função resetMaterialInput com $input de parametro
function resetMaterialInput( $input ){
	// para cada $input, executa a seguinte função
	$input.each(function(key, value){
		/* criamos a variavel $value se referindo à $(value)*/
		let $value = $(value);
		// verifica se $value irmão, se em sua label houver classe .label-active
		if(!$value.siblings('label').hasClass('label-active')){
			// em cada label irmão, adicionaremos a classe .label-active
			$value.siblings('label').addClass('label-active'); 
			// em seu irmão span, adicionaremos a classe .input-focus
			$value.siblings('span').addClass('input-focus');
		}
	})
}
// criamos a função loginAjax
function loginAjax(){
	// na variavel data, interna da função, criamos um array contento email e password, são os .val de  $('#username') e $('#senha')
	// ** Corrigido : criamos um objeto.
	let data = {
		email 	 : $('#username').val(),
		password : $('#senha').val()
	};
	//verifica o campo de email, se estiver vazio (... .val()) == '')), mostra o aviso de alerta.danger();
	if($.trim($('#username').val()) == ''){
		alerta.danger('Insira o usuário');
		return false;
	}
	//verifica o campo de password, se estiver vazio (... .val()) == '')), mostra o aviso de alerta.danger();
	if($.trim($('#senha').val()) == ''){
		alerta.danger('Insira a senha');
		return false;
	}

	$.ajax({
		url: 'login',
		type: 'POST',
		data: data,
	})
	.done(function( retorno ) {
		// se retorno for !== à erro
		if(JSON.parse(retorno) !== 'erro'){
			//mostra alerta.success
			alerta.success('Logado com sucesso. Aguarde enquanto redirecionado');
			// usuario é redirecionado para /admin em um timeout de até 1s
			setTimeout(() => {
				window.location = '/admin';
			}, 1000);
			//senão, caso retorno == erro, mostra alerta de alerta.danger()
		} else{
			alerta.danger('Login ou senha incorretos. Tente novamente!');
		}
	})
	//em caso de um erro inesperado, mostra o seguinte alerta
	.fail(function(error) {
		alerta.danger('Ocorreu um erro, contate o administrador.');
	});
}

// criamos a função de busca
function buscaAjax() {	
	// definimos duas variaveis internas da função
	let $this = $(this);
	let busca = $this.data('busca');
	// faz a concatenação na url referente à busca do usuario
	$.get('/admin/data/busca/'+busca+'?valor='+$this.val(), function(data) {
		// chama método com nome padrão que esta nos script de cada seção
		ajaxAtualizaTabela( data );
		//ajaxAtualizaTabela( data ); chama a tabela atualizada pelo parametro data		
	});
}

//criamos a função de paginação
function paginacao() {
	// definimos as variaveis internas da função
	let $this 		= $(this);
	let pagina  	= $this.text();
	let controller 	= $this.data('controller');

	// verifica se temos a classe active
	if($this.hasClass('active')){
		return false;
	}
	// removemos a classe active no elemento referente à .pagina
	$('.pagina').removeClass('active');
	// e adicionamos a classe .active no elemento referente à $this
	$this.addClass('active');

	$.get('/admin/data/pagina/'+controller+'/'+ pagina, function(data) {
		// chama método com nome padrão que esta nos script de cada seção
		ajaxAtualizaTabela( data );
		// ajaxAtualizaTabela é mencionada com o parametro de data atualizada
	});
}
