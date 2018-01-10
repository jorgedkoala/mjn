<?php 
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT"); 
include("./inc/conexion.php");
///CONPROBAR TOKEN
///CONPROBAR TOKEN
require_once('./inc/jwt.php');
use \Firebase\JWT\JWT;
$key = "mjnKeyForToken";
$token = $_GET["token"];
try{
$decoded = JWT::decode($token, $key, array('HS256'));
///




$method = $_SERVER['REQUEST_METHOD'];
$userId = $_GET["userId"];
$key = $_GET["id"];
$entidad = $_GET["entidad"];
$order = "";
$where = "";
$filter="";
if ($_GET["order"]){
  $order = " ORDER BY " . mysqli_real_escape_string($conexion,$_GET["order"]);
}
if ($_GET["WHERE"]){
  $where = " AND " . mysqli_real_escape_string($conexion,$_GET["WHERE"]) . "'". mysqli_real_escape_string($conexion,$_GET["valor"]) ."'";
}
if ($_GET["filterdates"] && $_GET["fecha_inicio"] && $_GET["fecha_fin"] && $_GET["fecha_field"]){
  $filter = " AND ".$_GET["fecha_field"].">='" . $_GET["fecha_inicio"] . "' AND ".$_GET["fecha_field"]." <='".$_GET["fecha_fin"]."'";
}

$input = json_decode(file_get_contents('php://input'),true);

$table = $entidad;



// escape the columns and values from the input object
$columns = preg_replace('/[^a-z0-9_]+/i','',array_keys($input));
$values = array_map(function ($value) use ($conexion) {
  if ($value===null) return null;
  return mysqli_real_escape_string($conexion,(string)$value);
},array_values($input));
// echo "valores:"; var_dump($values);
// build the SET part of the SQL command
$set = '';
for ($i=0;$i<count($columns);$i++) {
  $set.=($i>0?',':'').'`'.$columns[$i].'`=';
  $set.=($values[$i]===null?'NULL':'"'.$values[$i].'"');
}
 
// create SQL based on HTTP method
switch ($method) {
  case 'GET':
    //$sql = "select * from `$table` WHERE idempresa=$idempresa" . $where . $filter . $order; break;
    $sql = "select * from `$table` WHERE uuid='$userId'" . $where . $filter . $order; break;
  case 'PUT':
    $sql = "update `$table` set $set where id=$key"; break;
  case 'POST':
    $sql = "insert into `$table` set $set ON DUPLICATE KEY update  $set"; break;
  case 'DELETE':
    $sql = "delete from `$table` where id=$key"; break;
}
//echo $sql;
$registros=mysqli_query($conexion,$sql) or die('{"success":"false","error":"query->'.mysqli_error($conexion).$sql.'"}');

if ($method == 'GET') {
  while ($reg=mysqli_fetch_array($registros))
  { 
    $rows[] = $reg;
  }
  if($registros){
    $result = '{"success":"true","data":' . json_encode($rows) . ',"sql":"'.$sql.'"}';
  }
  else {
    $result = '{"success":"false"}';
  }
} elseif ($method == 'POST') {
    $result = '{"success":"true","id":' . mysqli_insert_id($conexion). '}';
} else {
    $result = '{"success":"true","rows":' . mysqli_affected_rows($conexion). '}';
}

print json_encode($result);

}
catch (Exception $e) {
    echo '{"success":"false","error":"',  $e->getMessage(), '"}';
}

?>