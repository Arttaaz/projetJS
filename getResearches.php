<?php 

include_once 'DataBase.php';

$term = $_GET["term"];

$bd = new DataBase();

$tab = $bd->getByWeight($term);

echo json_encode($tab);
?>