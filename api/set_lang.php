<?PHP

header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT"); 
include("./inc/conexion.php");
///CONPROBAR TOKEN
///CONPROBAR TOKEN
require_once('./inc/jwt.php');
use \Firebase\JWT\JWT;
$key = "mjnKeyForToken";
$token = $_GET["token"];
$language =  $_GET["language"];
try{
$decoded = JWT::decode($token, $key, array('HS256'));
///

$playerID =  $_GET["playerId"];
$fields = array( 
'app_id' => 'e6314cc9-368d-4bb3-b982-24a87ff4a0fd',
'language' => $language,
'tags' => array('laguage_user_defined' => 'YES')
); 
$fields = json_encode($fields); 

$ch = curl_init(); 
curl_setopt($ch, CURLOPT_URL, 'https://onesignal.com/api/v1/players/'.$playerID); 
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json')); 
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
curl_setopt($ch, CURLOPT_HEADER, false); 
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
curl_setopt($ch, CURLOPT_POSTFIELDS, $fields); 
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); 
$response = curl_exec($ch); 
curl_close($ch); 

$resultData = json_decode($response, true);
echo $resultData;

  }
catch (Exception $e) {
    echo '{"success":"false","error":"',  $e->getMessage(), '"}';
}

  ?>