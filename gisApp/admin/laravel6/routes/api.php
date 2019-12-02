<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register','RegisterController@register');

Route::post('/login','LoginController@login');

Route::post('/hover','HoverController@hover');

/*
 * post: scene_id
 * response: Detail
 */
Route::post('/sceneDetail','DetailController@sceneDetail');
Route::post('/hotelDetail','DetailController@hotelDetail');
Route::post('/restaurantDetail','DetailController@restaurantDetail');
Route::post('/trafficDetail','DetailController@trafficDetail');

Route::post('/getScene','GetSceneController@getScene');

Route::post('/searchType','SearchController@searchType');
Route::post('/searchLocation','SearchController@searchLocation');
Route::post('/searchName','SearchController@searchName');

Route::post('/sortScene','SortController@sortScene');

Route::post('/addScene','AddSceneController@addScene');
