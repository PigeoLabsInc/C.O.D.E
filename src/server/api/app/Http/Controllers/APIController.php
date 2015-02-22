<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;

class APIController extends Controller {

	public function generateRandomString($length = 10) {
	    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	    $charactersLength = strlen($characters);
	    $randomString = '';
	    for ($i = 0; $i < $length; $i++) {
	        $randomString .= $characters[rand(0, $charactersLength - 1)];
	    }
	    return $randomString;
	}

	private function generateToken($username) {
		$random_string = $this->generateRandomString(10);
		$user = User::where('email', '=', $username);
		$user->token = $random_string;
		$user->save();
		return $random_string; // return token.
	}

	public function getLogin(Request $request) {
		$username = $request->input('username');
		$password = $request->input('password');

		$errors = array(); // by default, no errors.
		if(!(isset($username))) {
			$errors['username'] = 'not_set';
		}
		if(!(isset($password))) {
			$errors['password'] = 'not_set';
		}

		$status_code;
		$json;
		if(count($errors) === 0) {
			$user = User::where('username', '=', $username);
			if($user !== null) {
				// user exists, check password.
				$db_password = $user->password;
				if(Hash::check($password, $db_password)) {
					// password correct. generate provide token.
					$token = $this->generateToken($username);
					$status_code = 200;
					$json = array(
						'success' => true,
						'token' => $token, // this will provide data access for the user.
					);
				}
				else {
					// auth failed. provide json error.
					$status_code = 401;
					$json = array(
						'errors' => array(
							'password' => 'not_correct',
						),
						'failed' => true,
					);
				}
			}
		}
		else {
			// there were errors.
			$status_code = 400; // error with request. malformed.
			$json = array(
				'errors' => $errors,
				'failed' => true,
			);
		}

		return (new Response($json, $status_code))
              ->header('Content-Type', 'application/json');


		return Response::make(json_encode($data, $status_code));
	}

	public function postRegister(Request $request) {
		$username = $request->input('username');
		$password = $request->input('password');

		$user = new User;
		$user->username = $username;
		$user->password = $password;

		$user->save();
	}

}