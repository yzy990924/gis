<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterUserRequest;
use Illuminate\Http\Request;
use mysqli;

class RegisterController extends Controller
{
    /**
     * @param RegisterUserRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(RegisterUserRequest $request)
    {

        $name = $request->input('name');
        $password = $request->input('password');

        error_reporting(0);
        $mysqli = new mysqli('localhost','root','','gis');
        if ($mysqli->connect_error){
            die('Connect Error! ('. $mysqli->connect_errno. ')<br>'.$mysqli->connect_error);
        }

        $sql = "INSERT INTO user (name,password) VALUES (?,?)";
        $q = mysqli_prepare($mysqli,$sql);
        mysqli_stmt_bind_param($q,'ss',$name,$password);
        mysqli_stmt_execute($q);


        return response()->json([
            'data' => 'user create.'
        ],201);
    }
}
