<?php  
	require_once('conexao.php');
	session_start();

	if(!$_SESSION['nome']){
		header('Location: login.php');
	}else{
		$sql = "DELETE FROM pessoas where id = ".$_GET['id'].";";
		pg_query($sql);

		header('Location: admin.php');
	}
?>