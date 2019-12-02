<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddSceneRequest;
use http\Env\Response;
use Illuminate\Http\Request;
use mysqli;

class AddSceneController extends Controller
{
    public function addScene(AddSceneRequest $request)
    {
        $scene_id = $request->input('scene_id');
        $user_id = $request->input('user_id');

        $mysqli = new mysqli('127.0.0.1','root','','gis');

        mysqli_query($mysqli,'set names utf8');
        if ($mysqli->connect_error){
            die('Connect Error! ('. $mysqli->connect_errno. ')<br>'.$mysqli->connect_error);
        }

        $sql = "select scene_id from my_scene where user_id = ? and scene_id = ?";
        $q = mysqli_prepare($mysqli,$sql);
        mysqli_stmt_bind_param($q,'dd',$user_id,$scene_id);
        mysqli_stmt_execute($q);
        mysqli_stmt_bind_result($q,$id);

        if (mysqli_stmt_fetch($q)) {
            return response()->json([
               "code" => 0
                //该景点已经在当前用户的“我的景点”里了
            ]);
        }else{
            //添加该景点至当前用户的“我的景点”
            $sql_add = "insert into my_scene (user_id,scene_id)values (?,?)";
            $q_add = mysqli_prepare($mysqli,$sql_add);
            mysqli_stmt_bind_param($q_add,'dd',$user_id,$scene_id);
            mysqli_stmt_execute($q_add);

            return response()->json([
                "code" => 1
                //code为1时提示已添加成功
            ]);
        }

    }
}
