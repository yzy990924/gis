<?php

namespace App\Http\Controllers;

use App\Http\Requests\SearchRequest;
use Illuminate\Http\Request;
use mysqli;

class SearchController extends Controller
{
    public function searchType(SearchRequest $request)
    {
        $type = $request->input('type');

        $mysqli = new mysqli('127.0.0.1','root','','gis');

        mysqli_query($mysqli,'set names utf8');
        if ($mysqli->connect_error){
            die('Connect Error ('.$mysqli->connect_errno.")<br>".$mysqli->connect_error);
        }

        $sql = "select id,name,type from scene where type like '%{$type}%'";
        $q = mysqli_prepare($mysqli,$sql);
        mysqli_stmt_execute($q);
        mysqli_stmt_bind_result($q,$id,$name,$type);

        $result = array();

        while (mysqli_stmt_fetch($q)){
            $scene = array("id"=>$id, "name"=>$name, "type"=>$type);
            $result[] = $scene;
        }

        return json_encode($result);
    }

    public function searchLocation(SearchRequest $request)
    {
        $location = $request->input('location');

        $mysqli = new mysqli('127.0.0.1','root','','gis');

        mysqli_query($mysqli,'set names utf8');
        if ($mysqli->connect_error){
            die('Connect Error ('.$mysqli->connect_errno.")<br>".$mysqli->connect_error);
        }

        $sql = "select id,name,location from scene where location like '%{$location}%'";
        $q = mysqli_prepare($mysqli,$sql);
        mysqli_stmt_execute($q);
        mysqli_stmt_bind_result($q,$id,$name,$location);

        $result = array();
        while (mysqli_stmt_fetch($q)){
            $scene = array("id"=>$id,"name"=>$name,"location"=>$location);
            $result[] = $scene;
        }

        return json_encode($result);
    }

    public function searchName(SearchRequest $request)
    {
        $name = $request->input('name');

        $mysqli = new mysqli('127.0.0.1','root','','gis');

        mysqli_query($mysqli,'set names utf8');
        if ($mysqli->connect_error){
            die('Connect Error ('.$mysqli->connect_errno.")<br>".$mysqli->connect_error);
        }

        $sql = "select id,name from scene where name like '%{$name}%'";
        $q = mysqli_prepare($mysqli,$sql);
        mysqli_stmt_execute($q);
        mysqli_stmt_bind_result($q,$id,$name);

        $result = array();
        while (mysqli_stmt_fetch($q)){
            $scene = array("id"=>$id,"name"=>$name);
            $result[] = $scene;
        }

        return json_encode($result);
    }
}
