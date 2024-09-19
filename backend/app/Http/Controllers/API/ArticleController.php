<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Category;
use App\Models\User;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Auth;
use DB;

class ArticleController
{
    public function getArticles(Request $request)
    {

        $articles = DB::table('articles');
        
        $articles->when($request->keyword, function ($query, $keyword) {
            $query->where(function ($query) use ($keyword) {
                $query->where('title', 'like', '%' . $keyword . '%')
                    ->orWhere('description', 'like', '%' . $keyword . '%');
            });
        });

        $articles->when($request->date, function ($query, $date) {
            $startOfDay = Carbon::parse($date)->startOfDay();
            $endOfDay = Carbon::parse($date)->endOfDay();

            return $query->whereBetween('published_at', [$startOfDay, $endOfDay]);
        });

        $articles->when($request->category, function ($query, $category) {
            return $query->where('category', $category);
        });

        $articles->when($request->source, function ($query, $source) {
            return $query->where('source', $source);
        });

        $articles = $articles->orderBy('published_at', 'desc')->paginate(12);

        return response()->json($articles);
    }

    public function getPersonalizedArticles(Request $request)
    {
        $user = $request->user(); 
        $preferences = $user->preferences;

        $articles = [];

        if ($preferences) {
            $categories = json_decode($preferences->category, true) ?: [];
            $sources = json_decode($preferences->source, true) ?: [];
            $authors = json_decode($preferences->author, true) ?: [];

            $articlesQuery = DB::table('articles');

            if (!empty($categories) || !empty($sources) || !empty($authors)) {
                $articlesQuery->where(function ($query) use ($categories, $sources, $authors) {
                    if (!empty($authors)) {
                        $query->whereIn('author', $authors);
                    }
                    if (!empty($categories)) {
                        $query->whereIn('category', $categories);
                    }
                    if (!empty($sources)) {
                        $query->whereIn('source', $sources);
                    }
                });
            }

            $articlesQuery->when($request->keyword, function ($query, $keyword) {
                $query->where(function ($query) use ($keyword) {
                    $query->where('title', 'like', '%' . $keyword . '%')
                        ->orWhere('description', 'like', '%' . $keyword . '%');
                });
            });

            // Fetch articles with sorting and pagination
            $articles = $articlesQuery->orderBy('published_at', 'desc')->paginate(12);
        }

        return response()->json($articles);
    }
}
