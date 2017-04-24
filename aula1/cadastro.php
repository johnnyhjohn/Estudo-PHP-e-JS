<?php  
	require_once('conexao.php');

	$nome 	= $_POST['nome'];
	$idade 	= $_POST['idade'];
	$senha 	= $_POST['senha'];

	$sql = "INSERT INTO pessoas(nome,idade,senha) values('$nome','$idade','$senha');";

	if(pg_query( $sql )){
		
		header('Location: login.php');
	}else{
		echo "Erro";
	}
?>