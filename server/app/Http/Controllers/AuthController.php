<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Config;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\JWTAuth;

class AuthController extends Controller
{
    public function __construct(){
        $this->user = new User;
        $this->student = new Student;
        $this->middleware('auth:api', ['except'=>['login']]);

    }

    /*public function userLogin(Request $request){
        Config::set('jwt.user', 'App\Models\User');
        Config::set('auth.providers.users.model', \App\Models\User::class);
        $credentials = $request->only('email', 'password');
        $token = null;
        try{
            if(!$token = JWTAuth::attempt($credentials)){
                return response()->json([
                    'response' => 'error',
                    'message' => 'invalid_email_or_password',
                ]);
            }
        }catch(JWTException $e){
            return response()->json([
                'repsonse' => 'error',
                'message' => 'failed_to_create_token',
            ]);
        }
        return response()->json([
            'response'=>'success',
            'result' => [
                'token' => $token,
                'message' =>'I am front user',
            ],
        ]);
    }*/

    /*public function studentLogin(Request $request){
        Config::set('jwt.user', 'App\Models\Student');
        Config::set('auth.providers.users.model', \App\Models\Student::class);
        $credentials = $request->only('email', 'password');
        $token = null;
        try{
            if(!$token = JWTAuth::attempt($credentials)){
                return response()->json([
                    'response' => 'error',
                    'message' => 'invalid_email_or_password',
                ]);
            }
        }catch (JWTException $e){
            return response()->json([
                'response' => 'error',
                'message' => 'failed_to_create_token',
            ]);
        }
        return response()->json([
            'response' => 'success',
            'result' => [
                'token' => $token,
                'message' => 'I am Student',
            ],
        ]);
    }*/

    public function login(){
        $credentials = \request(['email', 'password']);
        if(! $token=\auth()->attempt($credentials)){
            return response()->json(['error'=>'Unauthorized'], 401);
        }
        return $this->respondWithToken($token);
    }

    public function me(){
        return response()->json(\auth()->user());
    }

    /*public function student(){
        $credentials = \request(['email', 'password']);
        if(! $token=\auth()->attempt($credentials)){
            return response()->json(['error'=>'Unauthorized'], 401);
        }
        return $this->respondWithToken($token);
    }*/


    public function logout(){
        \auth()->logout();
        return response()->json(['message'=>'Successfully logged out!']);
    }

    public function refresh(){
        return $this->respondWithToken(auth()->refresh());
    }



    protected function respondWithToken($token){
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in'=> \auth()->factory()->getTTL()*60
        ]);
    }
}
