<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SubjectController;

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

/*-------------- SUBJECTS ----------------------*/

Route::get('subjects', [SubjectController::class, 'index']);

Route::get('subjects/{id}', [SubjectController::class, 'findById']);

Route::get('subjects/checkId/{id}', [SubjectController::class, 'checkId']);

Route::get('subjects/search/{searchTerm}',
[SubjectController::class, 'findBySearchTerm']);

/*--------------- Post Routes ----------------------*/

Route::post('subjects', [SubjectController::class, 'save']);

/*---------------- PUT Routes -----------------------*/
Route::put('subjects/{id}', [SubjectController::class, 'update']);

/*------------------ Delete Routes ----------------------*/

Route::delete('subjects/{id}', [SubjectController::class, 'delete']);


/*---------------------- USERS -----------------------------------*/

Route::get('users', [\App\Http\Controllers\UserController::class, 'index']);


Route::get('users/{id}', [\App\Http\Controllers\UserController::class, 'findById']);


Route::get('users/checkId/{id}', [\App\Http\Controllers\UserController::class], 'checkId');


Route::get('users/search/{searchTerm}', [\App\Http\Controllers\UserController::class, 'findBySearchTerm']);


/*------------------- Post Routes ---------------------------------*/

Route::post('users', [\App\Http\Controllers\UserController::class, 'save']);

/*-------------------- Put Routes ------------------------------*/

Route::put('users/{id}', [\App\Http\Controllers\UserController::class, 'update']);


/*---------------------- Delete Routes ----------------------------------*/

Route::delete('users/{id}', [\App\Http\Controllers\UserController::class, 'delete']);



/*---------------------- STUDENTS ----------------------------------------*/

Route::get('students', [\App\Http\Controllers\StudentController::class, 'index']);

Route::get('students/{id}', [\App\Http\Controllers\StudentController::class, 'findById']);

Route::get('students/checkId/{id}', [\App\Http\Controllers\StudentController::class, 'checkId']);


Route::get('students/search/{searchTerm}', [\App\Http\Controllers\StudentController::class, 'findBySearchTerm']);

Route::post('students', [\App\Http\Controllers\StudentController::class, 'save']);

Route::put('students/{id}', [\App\Http\Controllers\StudentController::class, 'update']);

Route::delete('students/{id}', [\App\Http\Controllers\StudentController::class, 'delete']);



/*------------------------- CATEGORIES -------------------*/

Route::get('categories', [\App\Http\Controllers\CategoryController::class, 'index']);

Route::get('categories/{id}', [\App\Http\Controllers\CategoryController::class, 'findById']);

Route::get('categories/checkId/{id}', [\App\Http\Controllers\CategoryController::class, 'checkId']);

Route::get('categories/search/{searchTerm}', [\App\Http\Controllers\CategoryController::class, 'findBySearchTerm']);

Route::post('categories', [\App\Http\Controllers\CategoryController::class, 'save']);

Route::put('categories/{id}', [\App\Http\Controllers\CategoryController::class, 'update']);

Route::delete('categories/{id}', [\App\Http\Controllers\CategoryController::class, 'delete']);


/*------------------------------ LEVELS ---------------------------*/

Route::get('levels', [\App\Http\Controllers\LevelController::class, 'index']);

Route::get('levels/{id}',[\App\Http\Controllers\LevelController::class, 'findById']);

Route::get('levels/checkId/{id}', [\App\Http\Controllers\LevelController::class, 'checkId']);

Route::get('levels/search/{searchTerm}', [\App\Http\Controllers\LevelController::class, 'findBySearchTerm']);

Route::post('levels', [\App\Http\Controllers\LevelController::class, 'save']);

Route::put('levels/{id}', [\App\Http\Controllers\LevelController::class, 'update']);

Route::delete('levels/{id}', [\App\Http\Controllers\LevelController::class, 'delete']);
