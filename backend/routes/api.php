<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\HeroImageController;
use App\Http\Controllers\Api\ServiceImageController;

// Public routes
Route::post('/login', [AuthController::class, 'login']);

// Public read-only routes for main website
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/categories', [ProjectController::class, 'categories']);
Route::get('/projects/{id}', [ProjectController::class, 'show']);
Route::get('/hero-images', [HeroImageController::class, 'index']);
Route::get('/service-images', [ServiceImageController::class, 'index']);

// Protected admin routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Projects
    Route::post('/projects', [ProjectController::class, 'store']);
    Route::post('/projects/{id}', [ProjectController::class, 'update']);
    Route::delete('/projects/{id}', [ProjectController::class, 'destroy']);

    // Hero Images
    Route::post('/hero-images', [HeroImageController::class, 'store']);
    Route::post('/hero-images/{id}', [HeroImageController::class, 'update']);
    Route::delete('/hero-images/{id}', [HeroImageController::class, 'destroy']);
    Route::post('/hero-images/reorder', [HeroImageController::class, 'reorder']);

    // Service Images
    Route::post('/service-images', [ServiceImageController::class, 'store']);
    Route::post('/service-images/{id}', [ServiceImageController::class, 'update']);
    Route::delete('/service-images/{id}', [ServiceImageController::class, 'destroy']);
    Route::post('/service-images/reorder', [ServiceImageController::class, 'reorder']);
});
