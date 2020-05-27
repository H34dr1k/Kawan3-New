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
Route::get('getEvent/{id}/{kodeuser}', 'UserController@getEvent');
Route::get('eventNotCreator/{id}', 'UserController@getEventNotCreator');
Route::get('event/creator/{creator}', 'UserController@getEventByCreator');
Route::get('event/creator/{creator}/{count}', 'UserController@getEventByCreatorCount');
Route::get('eventRec/{creator}', 'UserController@getEventRec');
Route::get('joinedEvent/{attendees}', 'UserController@getJoinedEvent');
Route::get('eventHistory/{kodeuser}', 'UserController@getHistoryEvent');
Route::post('event', 'UserController@createEvent');
Route::put('event/{id}', 'UserController@updateEvent');
Route::delete('event/{id}', 'UserController@deleteEvent');

// Event Detail

Route::post('joinEvent/{idEvent}/{attendees}', 'UserController@joinEvent');
Route::delete('leaveEvent/{idEvent}/{attendees}', 'UserController@leaveEvent');

// Community

Route::get('getComm', 'UserController@getComms');
Route::get('comm/{id}', 'UserController@getComm');
Route::get('comm/creator/{creator}', 'UserController@getCommByCreator');
Route::get('commNotCreator/{creator}', 'UserController@getCommsNotCreator');
// Route::get('comm/creator/{creator}', 'UserController@getCommByCreatorCount');
// Route::get('comm/{creator}', 'UserController@getCommRec');
Route::get('joinedComm/{attendees}', 'UserController@getJoinedComm');
Route::post('createCommunity/{kodeuser}', 'UserController@createComm');
Route::put('comm/{id}', 'UserController@updateComm');
Route::delete('comm/{id}', 'UserController@deleteComm');

// Community Detail
Route::post('joinComm/{idCommunity}/{member}', 'UserController@joinComm');
Route::delete('leaveEvent/{idCommunity}/{member}', 'UserController@leaveCommunity');

// Hobby

Route::get('hobby', 'UserController@hobby');

// Friend

Route::get('r/{kodeuser}', 'UserController@request');
Route::get('getFriends/{kodeuser}', 'UserController@getFriends');
Route::post('rf/{user1}/{user2}', 'UserController@req');
Route::put('rblock/{user1}/{user2}', 'UserController@rblock');
Route::put('raccept/{user1}/{user2}', 'UserController@raccept');
Route::delete('rdelete/{user1}/{user2}', 'UserController@rdelete');