<?php

namespace App\Http\Controllers;

use App\Http\Requests\SortRequest;
use Illuminate\Http\Request;
use mysqli;

class SortController extends Controller
{
    public function sortScene(SortRequest $request)
    {
        $mysqli = new mysqli('127.0.0.1','root','','gis');

        mysqli_query($mysqli,'set names utf8');
        if ($mysqli->connect_error){
            die('Connect Error ('.$mysqli->connect_errno.")<br>".$mysqli->connect_error);
        }

        $sql = "select id, name, score from scene order by score DESC ";
        $q = mysqli_prepare($mysqli,$sql);
        mysqli_stmt_execute($q);
        mysqli_stmt_bind_result($q,$id,$name,$score);

        $result = array();

        while (mysqli_stmt_fetch($q)){
            $scene = array("id"=> $id, "name"=>$name, "score"=>$score);
            $result[] = $scene;
        }

        return json_encode($result);
    }
}
