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

Route::get('user', 'UserController@all');
Route::get('user/{email}', 'UserController@getData');
Route::post('user', 'UserController@create');
Route::put('user/{kodeuser}', 'UserController@update');
Route::delete('user/{kodeuser}', 'UserController@delete');