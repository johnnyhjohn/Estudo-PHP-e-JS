<?php  
	require_once('conexao.php');
	session_start();

	if($_SESSION) {
		include 'tela-admin.php';
	} else if($_SERVER['REQUEST_METHOD'] == "POST") {

		$username = $_POST['username'];
		$senha 	  = $_POST['senha'];

		$sql = "SELECT id,nome from pessoas where nome = '$username' AND senha = '$senha';";

		$query = pg_query( $sql );

		if(pg_num_rows($query)){
			echo "Usuário $username";
			session_start();
			$_SESSION['nome'] 	= $username;

			include 'tela-admin.php';

		} else{
			echo "Não existe";
		}
	}


?>