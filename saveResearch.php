<?php 

include_once 'DataBase.php';

$research = $_GET["data"];

$bd = new DataBase();

$bd->addResearch($research);

echo "good";

?>