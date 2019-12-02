<?php

namespace App\Http\Controllers;

use App\Http\Requests\DetailRequest;
use Illuminate\Http\Request;
use mysqli;

class DetailController extends Controller
{
    public function sceneDetail(DetailRequest $request)
    {
        $scene_id = $request->input('scene_id');

        $mysqli = new mysqli('127.0.0.1','root','','gis');
        if ($mysqli->connect_error){
            die('Connect Error ('.$mysqli->connect_errno.")<br>".$mysqli->connect_error);
        }

        mysqli_query($mysqli,'set names utf8');

        $sql_scene = "select name,type,location,score,time,telephone,detail,evaluation from scene where id = ?";
        $q_scene = mysqli_prepare($mysqli,$sql_scene);
        mysqli_stmt_bind_param($q_scene,'d',$scene_id);
        mysqli_stmt_execute($q_scene);
        mysqli_stmt_bind_result($q_scene,$scene_name,$scene_type,$scene_location,$scene_score,$scene_time,$scene_telephone,$scene_detail,$scene_evaluation);

        while (mysqli_stmt_fetch($q_scene)){
            return response()->json([
                "scene_name" => $scene_name,
                "scene_type" => $scene_type,
                "scene_location" => $scene_location,
                "scene_score" => $scene_score,
                "scene_time" => $scene_time,
                "scene_telephone" => $scene_telephone,
                "scene_detail" => $scene_detail,
                "scene_evaluation" => $scene_evaluation
            ]);
        }
    }

    public function hotelDetail(DetailRequest $request)
    {
        $scene_id = $request->input('scene_id');

        $mysqli = new mysqli('127.0.0.1','root','','gis');
        if ($mysqli->connect_error){
            die('Connect Error ('.$mysqli->connect_errno.")<br>".$mysqli->connect_error);
        }

        mysqli_query($mysqli,'set names utf8');

        $sql_hotel = "select name,location,distance,price,score from hotel where scene_id = ?";
        $q_hotel = mysqli_prepare($mysqli,$sql_hotel);
        mysqli_stmt_bind_param($q_hotel,'d',$scene_id);
        mysqli_stmt_execute($q_hotel);
        mysqli_stmt_bind_result($q_hotel,$hotel_name,$hotel_location,$hotel_distance,$hotel_price,$hotel_score);

        $hotel_result = array();

        while (mysqli_stmt_fetch($q_hotel)){
                $result = array(
                "hotel_name" => $hotel_name,
                "hotel_location" => $hotel_location,
                "hotel_distance" => $hotel_distance,
                "hotel_price" => $hotel_price,
                "hotel_score" => $hotel_score
            );
                $hotel_result[] = $result;
        }

        return json_encode($hotel_result);
    }

    public function restaurantDetail(DetailRequest $request)
    {
        $scene_id = $request->input('scene_id');

        $mysqli = new mysqli('127.0.0.1','root','','gis');
        if ($mysqli->connect_error){
            die('Connect Error ('.$mysqli->connect_errno.")<br>".$mysqli->connect_error);
        }

        mysqli_query($mysqli,'set names utf8');

        $sql_restaurant = "select name,location,type,distance,price,score from restaurant where scene_id = ?";
        $q_restaurant = mysqli_prepare($mysqli,$sql_restaurant);
        mysqli_stmt_bind_param($q_restaurant,'d',$scene_id);
        mysqli_stmt_execute($q_restaurant);
        mysqli_stmt_bind_result($q_restaurant,$res_name,$res_location,$res_type,$res_distance,$res_price,$res_score);

        $restaurant_result = array();

        while (mysqli_stmt_fetch($q_restaurant)){
                $result = array(
                "res_name" => $res_name,
                "res_location" => $res_location,
                "res_type" => $res_type,
                "res_distance" => $res_distance,
                "res_price" => $res_price,
                "res_score" => $res_score
                );

                $restaurant_result[] = $result;
        }

        return json_encode($restaurant_result);
    }

    public function trafficDetail(DetailRequest $request)
    {
        $scene_id = $request->input('scene_id');

        $mysqli = new mysqli('127.0.0.1','root','','gis');
        if ($mysqli->connect_error){
            die('Connect Error ('.$mysqli->connect_errno.")<br>".$mysqli->connect_error);
        }

        mysqli_query($mysqli,'set names utf8');

        $sql_traffic = "select name, distance from traffic where scene_id = ?";
        $q_traffic = mysqli_prepare($mysqli,$sql_traffic);
        mysqli_stmt_bind_param($q_traffic,'d',$scene_id);
        mysqli_stmt_execute($q_traffic);
        mysqli_stmt_bind_result($q_traffic,$traffic_name,$traffic_distance);

        $traffic_result = array();

        while (mysqli_stmt_fetch($q_traffic)){
                $result = array(
                "traffic_name" => $traffic_name,
                "traffic_distance" => $traffic_distance
                );

                $traffic_result[] = $result;
        }

        return json_encode($traffic_result);
    }
}
