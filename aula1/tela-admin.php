<?php
	echo "Olá ".$_SESSION['nome'];

	$sql = "SELECT * from pessoas;";

	$query = pg_query( $sql );
?>
<a href="logout.php">Logout</a>
<table style="border:1px solid green;width:100%;text-align: center">
	<thead>
		<th>ID</th>
		<th>NOME</th>
		<th>IDADE</th>
		<th>SENHA</th>
		<th>AÇÃO</th>
	</thead>
	<tbody>
		<?php while($linha = pg_fetch_assoc($query)) : ?>
		<tr style="color: blue;">
			<td><?php echo $linha['id']; ?></td>
			<td><?php echo $linha['nome']; ?></td>
			<td><?php echo $linha['idade']; ?></td>
			<td><?php echo $linha['senha']; ?></td>
			<td><a href="deletar.php?id=<?php echo $linha['id'] ?>">Deletar</a></td>
			<td><a href="editar.php?id=<?php echo $linha['id'] ?>">Editar</a></td>
		</tr>
		<?php endwhile; ?>
	</tbody>
</table>
