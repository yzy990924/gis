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

/*
 * post: name, password
 * response: null
 */

Route::post('/register','RegisterController@register');

/*
 * post: name, password
 *
 * response:
 * login successfully -> (code: 1, user_id)
 * login unsuccessfully [password is incorrect] -> (code: 0)
 *
 * if login successfully, then the user_id is returned,
 * which is used to get "myScene" later.
 */

Route::post('/login','LoginController@login');

/*
 * When the mouse hovers over a scene, then part of information
 * of this scene will be showed
 *
 * post: scene_id
 * response: name, type, location, score, time, telephone
 */

Route::post('/hover','HoverController@hover');

/*
 * post: scene_id
 *
 * response of sceneDetail:
 * scene_name, scene_type, scene_location, scene_score, scene_time,
 * scene_telephone, scene_detail, scene_evaluation
 *
 * response of hotelDetail:
 * hotel_name, hotel_location, hotel_distance, hotel_price, hotel_score
 *
 * response of restaurantDetail:
 * res_name, res_location, res_type, res_distance, res_price, res_score
 *
 * response of trafficDetail:
 * traffic_name, traffic_distance
 *
 */
Route::post('/sceneDetail','DetailController@sceneDetail');
Route::post('/hotelDetail','DetailController@hotelDetail');
Route::post('/restaurantDetail','DetailController@restaurantDetail');
Route::post('/trafficDetail','DetailController@trafficDetail');


/*
 * post: user_id
 * response: scene_id
 *
 * the user_id is got when the login is performed successfully.
 * the set of scene_id can be obtained based on "myScene" of users
 */
Route::post('/getScene','GetSceneController@getScene');


/*
 * user search for scenes based on type
 *
 * post: type
 * response: id, name, type
 */
Route::post('/searchType','SearchController@searchType');

/*
 * user search for scenes based on location
 *
 * post: location
 * response: id, name, location
 */
Route::post('/searchLocation','SearchController@searchLocation');

/*
 * user search for scenes based on name
 *
 * post: name
 * response: id, name
 */
Route::post('/searchName','SearchController@searchName');

/*
 * sort scenes in descending order of the score
 *
 * post: null
 * response: id, name, score
 */
Route::post('/sortScene','SortController@sortScene');

/*
 * add the scene to the list of "myScene"
 *
 * post: scene_id, user_id
 *
 * response:
 * code:0 when the scene has been part of "myScene"
 * code:1 the scene is added to "myScene" successfully
 */
Route::post('/addScene','AddSceneController@addScene');
