<?php

use Illuminate\Support\Facades\Route;
use App\Models\Subject;
use App\Http\Controllers\SubjectController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [SubjectController::class, 'index']);
Route::get('/subjects', [SubjectController::class, 'index']);
Route::get('/subjects/{subject}', [SubjectController::class, 'show']);


