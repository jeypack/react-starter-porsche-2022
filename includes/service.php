<?php
//require_once('_config.php');
// file_get_contents second parameter set to true for $data['name'] style
//$data = json_decode(file_get_contents("php://input"));
//$result = array('$log' => $log);

//create json return object
$result = new stdClass();
$result->action = $_POST['action'];
$result->success = false;

//$action = $_POST['action'];

if (isset($result->action)) {
    if ($result->action === 'login') {
        $result->username = $_POST['username'];
        $path = '../uploads';
        /* if (!is_dir($path)) {
            mkdir($path, 0660);
        } */
        $result->file = __FILE__;
        $result->dirname = dirname(__FILE__, 2);
        $result->success = validateLogin($result->username);
        echo json_encode($result);
    }
    if ($result->action === 'message') {
        $result->name = $_POST['name'];
        $result->vorname = $_POST['vorname'];
        $result->email = $_POST['email'];
        $result->restaurant = $_POST['restaurant'];
        $result->message = $_POST['message'];
        $result->success = true;
        echo json_encode($result);
    }
    if ($result->action === 'upload') {
        $result->name = $_POST['name'];
        $result->vorname = $_POST['vorname'];
        $result->email = $_POST['email'];
        $result->restaurant = $_POST['restaurant'];
        $result->message = $_POST['message'];
        //$result->photos = $_FILES['file'];
        //$result->success = validateLogin($result->username);
        //uploadFiles($result);
        if (isset($_FILES['file'])) {
            $tempPath = $_FILES['file']['tmp_name'];
            //make folder if not exists
            $dir = dirname(__FILE__, 2) . DIRECTORY_SEPARATOR . 'uploads';
            if (!is_dir($dir)) {
                mkdir($dir, 0777);
            }
            $uploadPath = $dir . DIRECTORY_SEPARATOR . $_FILES['file']['name'];
            move_uploaded_file($tempPath, $uploadPath);
            $result->success = true;
            $result->nfo = 'File transfer completed';
        } else {
            $result->success = false;
            $result->nfo = 'No files!';
        }
        echo json_encode($result);

    }
}

function validateLogin($username) {
    if (isset($username) && $username === 'mcdo-sporthilfe') {
        return true;
    }
    return false;
}

function uploadFiles($result) {
    //$result->files = $_FILES['file'];
    if (isset($_FILES['file'])) {
        $tempPath = $_FILES['file']['tmp_name'];
        $uploadPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . $_FILES['file']['name'];

        move_uploaded_file($tempPath, $uploadPath);

        $result->message = 'File transfer completed';
    } else {
        $result->message = 'No files!';
    }
    echo json_encode($result);
}




/* if (!empty($_FILES)) {
    $tempPath = $_FILES['file']['tmp_name'];
    $uploadPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . $_FILES['file']['name'];

    move_uploaded_file($tempPath, $uploadPath);

    $answer = array('answer' => 'File transfer completed');
} else {
    $answer = array('answer' => 'No files!');
}
$json = json_encode($answer);
echo $json; */


// HERE WE SAVE USER DATA FOR THE USER
/*
$data->language
$data->mcdonaldsId
$data->firstname
$data->lastname
$data->email
$data->userState
$data->matrix

email: "joerg.pfeifer@egplusww.com"
firstname: "Jörg"
id: "debug"
language: "de"
lastname: "Pfeifer"
matrix: (6) [1, 1, 1, 0, 0, 0]
price: "London"
userState: "form"
*/

//
// convert matrix back to string list
// $comma_separated_matrix = isset($data->matrix) ? implode(",", $data->matrix) : '0,0,0,0,0,0';
/* $comma_separated_matrix = implode(",", $data->matrix);
$sql = "UPDATE users SET user_state='$data->userState', matrix='$comma_separated_matrix' WHERE userid='$userid'";
if (mysqli_query($conn, $sql)) {
    $data->done = true;
} else {
    $data->done = false;
    echo mysqli_error($conn);
}
//
if ($data->userState === 'scratch') {
    $data->gameState = 'WIN';
}

$conn->close(); */

//echo json_encode($data);
?>
