<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\AuthController;

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



Route::middleware('auth:api')->get('/users', function (Request $request) {
    return $request->user();
});



//Route::middleware('auth:student')->get('/students', function (Request $request) {
  //  return $request->student();
//});

/*-------------- SUBJECTS ----------------------*/

Route::get('subjects', [SubjectController::class, 'index']);

Route::get('subjects/{id}', [SubjectController::class, 'findById']);

Route::get('subjects/checkId/{id}', [SubjectController::class, 'checkId']);

Route::get('subjects/search/{searchTerm}',
[SubjectController::class, 'findBySearchTerm']);

Route::group(['middleware' => ['api', 'auth.jwt']], function(){
    Route::post('subjects', [SubjectController::class, 'save']);
    Route::put('subjects/{id}', [SubjectController::class, 'update']);
    route::delete('subjects/{id}', [SubjectController::class, 'delete']);
    Route::post('auth/logout', [\App\Http\Controllers\AuthController::class, 'logout']);
});


/*---------------------- USERS -----------------------------------*/

Route::get('users', [\App\Http\Controllers\UserController::class, 'index']);


Route::get('users/{id}', [\App\Http\Controllers\UserController::class, 'findById']);


Route::get('users/checkId/{id}', [\App\Http\Controllers\UserController::class], 'checkId');


Route::get('users/search/{searchTerm}', [\App\Http\Controllers\UserController::class, 'findBySearchTerm']);



Route::group(['middleware' => ['api', 'auth.jwt']], function(){
    Route::post('users', [\App\Http\Controllers\UserController::class, 'save']);
    Route::put('users/{id}', [\App\Http\Controllers\UserController::class, 'update']);
    Route::delete('users/{id}', [\App\Http\Controllers\UserController::class, 'delete']);
    Route::post('auth/logout', [\App\Http\Controllers\AuthController::class, 'logout']);
});


/*---------------------- STUDENTS ----------------------------------------*/

Route::get('students', [\App\Http\Controllers\StudentController::class, 'index']);

Route::get('students/{id}', [\App\Http\Controllers\StudentController::class, 'findById']);

Route::get('students/checkId/{id}', [\App\Http\Controllers\StudentController::class, 'checkId']);


Route::get('students/search/{searchTerm}', [\App\Http\Controllers\StudentController::class, 'findBySearchTerm']);

Route::group(['middleware' => ['api', 'auth.jwt']], function(){
    Route::post('students', [\App\Http\Controllers\StudentController::class, 'save']);
    Route::put('students/{id}', [\App\Http\Controllers\StudentController::class, 'update']);
    Route::delete('students/{id}', [\App\Http\Controllers\StudentController::class, 'delete']);
    Route::post('auth/logout', [\App\Http\Controllers\AuthController::class, 'logout']);
});




/*------------------------- CATEGORIES -------------------*/

Route::get('categories', [\App\Http\Controllers\CategoryController::class, 'index']);

Route::get('categories/{id}', [\App\Http\Controllers\CategoryController::class, 'findById']);

Route::get('categories/checkId/{id}', [\App\Http\Controllers\CategoryController::class, 'checkId']);

Route::get('categories/search/{searchTerm}', [\App\Http\Controllers\CategoryController::class, 'findBySearchTerm']);


Route::group(['middleware' => ['api', 'auth.jwt']], function(){
    Route::post('categories', [\App\Http\Controllers\CategoryController::class, 'save']);
    Route::put('categories/{id}', [\App\Http\Controllers\CategoryController::class, 'update']);
    Route::delete('categories/{id}', [\App\Http\Controllers\CategoryController::class, 'delete']);
    Route::post('auth/logout', [\App\Http\Controllers\AuthController::class, 'logout']);
});


/*------------------------------ LEVELS ---------------------------*/

Route::get('levels', [\App\Http\Controllers\LevelController::class, 'index']);

Route::get('levels/{id}',[\App\Http\Controllers\LevelController::class, 'findById']);

Route::get('levels/checkId/{id}', [\App\Http\Controllers\LevelController::class, 'checkId']);

Route::get('levels/search/{searchTerm}', [\App\Http\Controllers\LevelController::class, 'findBySearchTerm']);


Route::group(['middleware' => ['api', 'auth.jwt']], function(){
    Route::post('levels', [\App\Http\Controllers\LevelController::class, 'save']);
    Route::put('levels/{id}', [\App\Http\Controllers\LevelController::class, 'update']);
    Route::delete('levels/{id}', [\App\Http\Controllers\LevelController::class, 'delete']);
    Route::post('auth/login', [\App\Http\Controllers\AuthController::class, 'logout']);
});


/*------------------------------- APPOINTMENTS -----------------------------*/

Route::get('appointments', [\App\Http\Controllers\AppointmentController::class, 'index']);

Route::get('appointments/{id}', [\App\Http\Controllers\AppointmentController::class, 'findById']);

Route::get('appointmens/checkId/{id}', [\App\Http\Controllers\AppointmentController::class, 'checkId']);

Route::group(['middleware' => ['api', 'auth.jwt']], function(){
    Route::post('appointments', [\App\Http\Controllers\AppointmentController::class, 'save']);
    Route::put('appointments/{id}', [\App\Http\Controllers\AppointmentController::class, 'update']);
    Route::delete('appointments/{id}', [\App\Http\Controllers\AppointmentController::class, 'delete']);
    Route::post('auth/logout', [\App\Http\Controllers\AuthController::class, 'logout']);

});


/*--------------------------------- MESSAGES ----------------------------------*/

Route::get('messages', [\App\Http\Controllers\MessageController::class, 'index']);

Route::get('messages/{id}', [\App\Http\Controllers\MessageController::class, 'findById']);

Route::get('messages/checkId/{id}', [\App\Http\Controllers\MessageController::class, 'checkId']);


Route::group(['middleware' => ['api', 'auth.jwt']], function(){
    Route::post('messages', [\App\Http\Controllers\MessageController::class, 'save']);
    Route::put('messages/{id}', [\App\Http\Controllers\MessageController::class, 'update']);
    Route::delete('messages/{id}', [\App\Http\Controllers\MessageController::class, 'delete']);
    Route::post('auth/logout', [\App\Http\Controllers\AuthController::class, 'logout']);
});



//login with authentication User (Teacher)
Route::post('auth/login', [AuthController::class, 'login']);

//Route::post('auth/studentLogin', [AuthController::class, 'student']);

//Route::post('auth/login', [\App\Http\Controllers\AuthController::class, 'studentLogin']);

