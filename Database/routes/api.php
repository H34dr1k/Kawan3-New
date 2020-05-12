<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// User

Route::get('user', 'UserController@all');
Route::get('user/{email}', 'UserController@getData');
Route::get('userBB/{kodeuser}', 'UserController@getUser');
Route::post('user', 'UserController@createUser');
Route::put('user/{kodeuser}', 'UserController@update');
Route::delete('user/{kodeuser}', 'UserController@delete');

// Setting

Route::post('setting', 'UserController@createSetting');
Route::put('setting/{kodeuser}', 'UserController@updateSetting');

// Event

Route::get('event', 'UserController@getEvents');
Route::get('event/{id}', 'UserController@getEvent');
Route::get('eventNotCreator/{id}', 'UserController@getEventNotCreator');
Route::get('event/creator/{creator}', 'UserController@getEventByCreator');
Route::get('event/creator/{creator}/{count}', 'UserController@getEventByCreatorCount');
Route::get('eventRec/{creator}', 'UserController@getEventRec');
Route::get('joinedEvent/{attendees}', 'UserController@getJoinedEvent');
Route::post('event', 'UserController@createEvent');
Route::put('event/{id}', 'UserController@updateEvent');
Route::delete('event/{id}', 'UserController@deleteEvent');

// Event Detail

Route::post('joinEvent/{idEvent}/{attendees}', 'UserController@joinEvent');

// Community

Route::get('comm', 'UserController@getComms');
Route::get('comm/{id}', 'UserController@getComm');
Route::get('comm/creator/{creator}', 'UserController@getCommByCreator');
Route::get('comm/creator/{creator}', 'UserController@getCommByCreatorCount');
Route::get('comm/{creator}', 'UserController@getCommRec');
Route::get('joinedComm/{attendees}', 'UserController@getJoinedComm');
Route::post('comm', 'UserController@createComm');
Route::put('comm/{id}', 'UserController@updateComm');
Route::delete('comm/{id}', 'UserController@deleteComm');

// Hobby

Route::get('hobby', 'UserController@hobby');