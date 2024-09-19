<?php

namespace App\Http\Controllers\API;

use App\Models\Author;
use App\Models\Category;
use App\Models\Source;
use App\Models\User;
use App\Models\UserPreference;
use Illuminate\Http\Request;

class UserPreferenceController
{
    public function getPreferencesData(Request $request) {
        try {
            $userCategories = [];
            $userSources = [];
            $userAuthors = [];

            $categories = Category::pluck('name')->toArray();
            $sources = Source::pluck('name')->toArray();
            $author = Author::pluck('name')->toArray();

            $user = $request->user();

            if($user && $user->preferences) {
                $preferences = $user->preferences->getDecodedPreferences();
                $userCategories = $preferences['categories'];
                $userSources = $preferences['sources'];
                $userAuthors = $preferences['authors'];
            }
    
            return response()->json([
                'categories' => $categories,
                'sources' => $sources,
                'author' => $author,
                'userCategories' => $userCategories,
                'userSources' => $userSources,
                'userAuthors' => $userAuthors
            ], 200);
        } catch(\Exception $er) {
            return response()->json([
                'error' => 'Something went wrong! Try again.' . $er
            ]);
        }
    }

    public function savePreferences(Request $request) {
        try {
            $user = $request->user();
            $categories = json_encode($request->input('categories'));
            $sources = json_encode($request->input('sources'));
            $authors = json_encode($request->input('authors'));

            // return response()->json($categories);

            // Save preferences in the user_preferences table
            $userPreferences = UserPreference::updateOrCreate(
                ['user_id' => $user->id],
                [
                    'category' => $categories,
                    'source' => $sources,
                    'author' => $authors
                ]
            );

            return response()->json(['msg' => 'Preferences saved successfully!']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e]);
        }
    }
}
