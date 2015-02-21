<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function() {

	// Just a simple page to explain the API.
	return View::make('home');

});

Route::get('/test', function() {
	return "Test";
});

/* API Routes */
/* Format for all API URLs: /object/ (RESTFUL REQUESTS) */
Route::controller('request', 'APIController');