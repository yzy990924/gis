<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use http\Env\Response;
use Illuminate\Http\Request;
use mysqli;

class LoginController extends Controller
{
    public function login(LoginRequest $request)
    {
        $all = $request->input();
        $name = $all['name'];
        $password = $all['password'];

        error_reporting(0);
        $mysqli = new mysqli('127.0.0.1','root','','gis');

        if ($mysqli->connect_error){
            die('Connect Error! ('. $mysqli->connect_errno. ')<br>'.$mysqli->connect_error);
        }

        $sql = "select id,password from user where name=?";
        $q = mysqli_prepare($mysqli,$sql);
        mysqli_stmt_bind_param($q,'s',$name);
        mysqli_stmt_execute($q);
        mysqli_stmt_bind_result($q,$id,$result);

        while (mysqli_stmt_fetch($q)){
            if (!strcmp($result,$password)){
                return response()->json([
                   'code' => 1,
                    //password is correct
                    'user_id' => $id
                ]);
            }
        }
        return response()->json([
            'code' => 0
            //password is incorrect
        ]);
    }
}
