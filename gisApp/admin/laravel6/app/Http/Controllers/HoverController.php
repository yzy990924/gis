<?php

namespace App\Http\Controllers;

use App\Http\Requests\HoverRequest;
use Illuminate\Http\Request;
use mysqli;

class HoverController extends Controller
{
    public function hover(HoverRequest $request)
    {
        $scene_id = $request->input('scene_id');

        $mysqli = new mysqli('127.0.0.1','root','','gis');
        if ($mysqli->connect_error){
            die('Connect Error ('.$mysqli->connect_errno.')'."<br>".$mysqli->connect_error);
        }

        mysqli_query($mysqli,'set names utf8');

        $sql = "select name,type,location,score,time,telephone from scene where id = ?";
        $q = mysqli_prepare($mysqli,$sql);
        mysqli_stmt_bind_param($q,'d',$scene_id);
        mysqli_stmt_execute($q);
        mysqli_stmt_bind_result($q,$name,$type,$location,$score,$time,$telephone);

        while (mysqli_stmt_fetch($q)){
            return response()->json([
                "name" => $name,
                "type" => $type,
                "location" => $location,
                "score" => $score,
                "time" => $time,
                "telephone" => $telephone
            ]);
        }
    }
}
