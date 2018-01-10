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
try{
$decoded = JWT::decode($token, $key, array('HS256'));
///


	 function sendMessage(){
$input = json_decode(file_get_contents('php://input'),true);


$contents= $input['contents'];
$titles=  $input['titles'];





		$fields = array(
			'app_id' => "e6314cc9-368d-4bb3-b982-24a87ff4a0fd",
			'included_segments' => array('All'),
      'data' => array("foo" => "bar"),
			'headings' => $titles,
			'contents' => $contents
		);
		
		$fields = json_encode($fields);
    // print("\nJSON sent:\n");
    // print($fields);
		
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
		curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json; charset=utf-8',
												   'Authorization: Basic OGY5ODFkODYtM2RkNS00YWNlLWFlOTQtNjE5ZTQ5MjBlMzkw'));
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
		curl_setopt($ch, CURLOPT_HEADER, FALSE);
		curl_setopt($ch, CURLOPT_POST, TRUE);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);

		$response = curl_exec($ch);
		curl_close($ch);
		
		return $response;
	 }
	
	$response = sendMessage();
	$return["allresponses"] = $response;
	$return = json_encode( $return);
	
  // print("\n\nJSON received:\n");
	print json_encode($return);
  // print("\n");

  }
catch (Exception $e) {
    echo '{"success":"false","error":"',  $e->getMessage(), '"}';
}

  ?>