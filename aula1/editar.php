<?php  
	require_once('conexao.php');
	session_start();

	if($_SERVER['REQUEST_METHOD'] == "POST") {
		$nome 	= $_POST['nome'];
		$idade 	= $_POST['idade'];
		$senha 	= $_POST['senha'];

		$sql = "UPDATE pessoas set nome = '$nome',idade = $idade, senha = '$senha' where id =".$_GET['id'].";";

		if(pg_query($sql)){
			header('Location: admin.php');
		} else{
			echo "Erro";
		};
	};

	if(!$_SESSION['nome']){
		header('Location: login.php');
	}else{
		$sql = "SELECT * FROM pessoas where id = ".$_GET['id'].";";
		$pessoa = pg_query($sql);

		$pessoa = pg_fetch_assoc($pessoa);
	}
?>

<!DOCTYPE html>
<html>
<head>
	<title>EDITAR</title>
</head>
<body>
<h2>EDITAR</h2>
<form method="post">
	<input type="text" name="nome" value="<?php echo $pessoa['nome'] ?>"><br>
	<input type="number" min="0" name="idade" value="<?php echo $pessoa['idade'] ?>"><br>
	<input type="text" name="senha" value="<?php echo $pessoa['senha'] ?>"><br>
	<input type="submit" value="atualizar">
</form>
</body>
</html>