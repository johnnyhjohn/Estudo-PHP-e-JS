<?php  
	
	require_once('config.php');
	
	pg_connect('host='.DB_HOST.' port=5432 dbname='.DB_DATABASE.' user='.DB_USERNAME) 
	or die('Morreu');
	
?>