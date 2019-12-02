<?php

namespace App\Http\Controllers;

use App\Http\Requests\GetSceneRequest;
use Illuminate\Http\Request;
use mysqli;

class GetSceneController extends Controller
{
    public function getScene(GetSceneRequest $request)
    {
        $user_id = $request->input('user_id');

        $mysqli = new mysqli('127.0.0.1','root','','gis');

        if ($mysqli->connect_error){
            die('Connect Error ('.$mysqli->connect_errno.")<br>".$mysqli->connect_error);
        }

        $sql = "select scene_id from my_scene where user_id = ?";
        $q = mysqli_prepare($mysqli,$sql);
        mysqli_stmt_bind_param($q,'d',$user_id);
        mysqli_stmt_execute($q);
        mysqli_stmt_bind_result($q,$scene_id);

        $result = array();

        while (mysqli_stmt_fetch($q)){
            $result[] = $scene_id;
        }

        return json_encode($result);
    }
}
