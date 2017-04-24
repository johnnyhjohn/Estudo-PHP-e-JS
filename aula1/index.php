<?php  
	
	$numero = 7;
	$animal = "Leão";
	// if($numero === '5') {
	// 	echo "ok";
	// } else if($numero === 5){
	// 	echo 'else if é integer';
	// } else{
	// 	echo "Sei de nada";
	// }

	// echo ($numero == 5 || $numero == 7) ? 'é 5 ou 7' : 'não é 5';
	// $animal = "elefante";
	// switch ($animal) {
	// 	case 'Leão':
	// 		echo "RAWR";
	// 		break;
	// 	case 'Elefante' :
	// 		echo "Barulho de elefante";
	// 		break;
	// 	default:
	// 		echo "Nenhum animal";
	// 		break;
	// }

	// $contador = 0;

	// for ($contador; $contador <= 5; $contador++) { 
	// 	var_dump($contador);
	// };

	$Pessoas = array(
		0 => array(
			'Nome' => 'Johnny',
			'Idade'=> 21
		),
		1 => array(
			'Nome' => 'Breno',
			'Idade'=> 21
		),
	);


	// foreach ($Pessoas as $pessoa) {
	// 	echo "<li>".$pessoa['Nome']."</li>";
	// }
	// $contador = 0;
	// while($contador < 5) {
	// 	echo $contador;
	// 	$contador++;
	// }

	function doMal( $demonio, $sacrificio=null ) 
	{	
		try{
			$mensagem = "Invocação do exu ".$demonio;

			if($sacrificio) {
				if(is_array($sacrificio)){
					$mensagem .= " com os sacrificios de ";

					foreach ($sacrificio as $key => $value) {
						if( $key == 0){
							$mensagem .= $value;	
						} else{
							$mensagem .= ','.$value;
						}
					}
				}else {
					$mensagem .= " com o sacrificio de ".$sacrificio;
				}
			} else {
				$mensagem .= " sem sacrificio.";
			}

			return $mensagem;
		} catch(Execption $e) {
			return $e;
		}
	
	}

	$sacrificios = array('Cabra','Galinha','Virgem', 'Gay');

	$invocacao = doMal('Belzebu', $sacrificios);

	// echo $invocacao;
	$sacrificiosString = implode($sacrificios,',');
	// var_dump(explode(',',$sacrificiosString));
	// echo "<pre>";
	// var_dump($_SERVER['REQUEST_METHOD']);
	// var_dump($_POST['password']);
	// if($_SERVER['REQUEST_METHOD'] == "PUT") {
	// 	echo "Olá ". $_PUT['nome'];
	// }

?>


<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
<form action="cadastro.php" method="post">
	<input type="text" name="nome">
	<input type="number" min="0" name="idade">
	<input type="password" name="senha">
	<input type="submit" value="Enviar">
</form> 
</body>
</html>