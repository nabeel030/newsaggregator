<?php
namespace App\Http\Controllers\API;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::controller(AuthController::class)->group(function() {
    Route::post('login', 'login');
    Route::post('register', 'register');
});

// Route::middleware(['auth:sanctum'])->get('/personalised-articles', [ArticleController::class, 'getPersonalizedArticles']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/personalised-articles', [ArticleController::class, 'getPersonalizedArticles']);
    Route::post('/preferences/save', [UserPreferenceController::class, 'savePreferences']);
    Route::get('/preferences-data', [UserPreferenceController::class, 'getPreferencesData']);
});

Route::get('articles',[ArticleController::class, 'getArticles']);
Route::get('/articles/filters',[UserPreferenceController::class, 'getPreferencesData']);


