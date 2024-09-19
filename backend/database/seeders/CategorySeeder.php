<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Source;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'business'],
            ['name' => 'entertainment'],
            ['name' => 'general'],
            ['name' => 'health'],
            ['name' => 'science'],
            ['name' => 'sports'],
            ['name' => 'technology'],
            ['name' => 'arts'],
            ['name' => 'opinion'],
            ['name' => 'world'],
            ['name' => 'theater'],
            ['name' => 'life and style'],
            ['name' => 'culture'],
            ['name' => 'fasion'],
            ['name' => 'politics'],
            ['name' => 'us'],
            ['name' => 'upshot'],
            ['name' => 'movies']
        ];

        foreach($categories as $category) {
            Category::firstOrcreate(
                [
                    'name' => $category['name']
                ],
                [
                    'name' => $category['name'],
                ]
            );
        }
    }
}
