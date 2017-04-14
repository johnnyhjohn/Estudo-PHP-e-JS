// Classe alerta para mostrar notificações de sucesso ou erro
var alerta = new alert();

$(document).ready(function(){
	
	var CSRF_TOKEN 	= $('meta[name="csrf-token"]').attr('content')
	,	url 		= window.location.href
	,   date 		= new Date()
	,	mes 		= date.getMonth()
    , 	$body 		= $('body');

	addMaterialInput();
	// buscaKeyPress() é um plugin para busca dinâmica
	$('.busca-keypress').buscaKeyPress();

	$(document).on('focus', '.material-input',addMaterialFocus);

	if(localStorage.getItem('body')){
		$body.addClass('full');
		$('.btn-burguer').addClass('active');
	}

	$('.full [data-toggle="tooltip"]').tooltip({'placement': 'right'});

	$(document).on('click', '.btn-burguer', function(){
		let $this = $(this);

	    if($('body').hasClass('full')) {
	        $('.full [data-toggle="tooltip"]').tooltip('disable');
	    	if(localStorage.getItem('body')){
	    		localStorage.removeItem('body');
	    	}
	    } else {
	    	localStorage.setItem('body', 'full');
	        $('[data-toggle="tooltip"]').tooltip({'placement': 'right'});
	        $('[data-toggle="tooltip"]').tooltip("enable");
	    }

		$this.toggleClass('active');
		$body.toggleClass('full');
	});


	$(document).on('click', '.notificacao', function(){
		let $this = $(this);

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

	$(document).on('click', '.pagina', paginacao);
	////////////////////////////////////////////////////////////////
	////				Evento de busca dinâmica				////
	////////////////////////////////////////////////////////////////
	$(document).on('keyup', '#busca input[type="text"]', buscaAjax);

	$(document).on('change', '#imagem', function(event){
	    if (this.files && this.files[0]) {
	        var reader = new FileReader();
	        reader.onload = imageIsLoaded;
	        reader.readAsDataURL(this.files[0]);
	    }
	});

	$(document).on('click', '.btn-add', function(event){
		event.preventDefault();

		let $ingrediente = $('.ingredientes');
		let item 		 = $ingrediente.find('.item').last().clone(true);

		item.append('<button class="btn btn-red btn-remove-produto"><i class="fa fa-minus"></i></button>');
		item.find('input').val('1');
		$ingrediente.find('.item').last().after(item);
	});

	$(document).on('click', '.btn-remove-produto', function(event){
		let $this = $(this);

		$this.parent('.item').remove();
	});

	$('#loader').addClass('active');


})

function imageIsLoaded(e) {
    $('#imagem-thumb').attr('src', e.target.result);
    $('#imagem-upload').val(e.target.result);
};

function addMaterialFocus(){
	// material_input é um plugin para
	$('input').material_input();
	$('select').material_input();
	$("textarea").material_input();	
}

function addMaterialInput(){
	var inputs = setInterval(function(){
		if($(document).find("input")){
			$('input').material_input();
			$('select').material_input();
			$("textarea").material_input();
			clearInterval(inputs);
		}
	}, 200);	
};

/**
*
*	Função para adicionar classe do material em inputs novos
*
*/
function resetMaterialInput( $input ){
	$input.each(function(key, value){
		let $value = $(value);
		if(!$value.siblings('label').hasClass('label-active')){
			$value.siblings('label').addClass('label-active');
			$value.siblings('span').addClass('input-focus');
		}
	})
}

function loginAjax(){
	let data = {
		email 	 : $('#username').val(),
		password : $('#senha').val()
	};
	if($.trim($('#username').val()) == ''){
		alerta.danger('Insira o usuário');
		return false;
	}
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

		if(JSON.parse(retorno) !== 'erro'){
			alerta.success('Logado com sucesso. Aguarde enquanto redirecionado');
			setTimeout(() => {
				window.location = '/admin';
			}, 1000);
		} else{
			alerta.danger('Login ou senha incorretos. Tente novamente!');
		}
	})
	.fail(function(error) {
		alerta.danger('Ocorreu um erro, contate o administrador.');
	});
}

function buscaAjax() {	
	let $this = $(this);
	let busca = $this.data('busca');

	$.get('/admin/data/busca/'+busca+'?valor='+$this.val(), function(data) {
		// chama método com nome padrão que esta nos script de cada seção
		ajaxAtualizaTabela( data );
	});
}

function paginacao() {
	let $this 		= $(this);
	let pagina  	= $this.text();
	let controller 	= $this.data('controller');

	if($this.hasClass('active')){
		return false;
	}
	$('.pagina').removeClass('active');
	$this.addClass('active');

	$.get('/admin/data/pagina/'+controller+'/'+ pagina, function(data) {
		// chama método com nome padrão que esta nos script de cada seção
		ajaxAtualizaTabela( data );
	});
}

