<?php

namespace Database\Seeders;

use App\Models\Source;
use App\Services\SourceService;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SourceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sourcesService = new SourceService;
        $sources = $sourcesService->fetchSources();
        $sources[] = [
            'slug' => 'the-guardian',
            'name' => 'The Guardian'
        ];

        $sources [] = [
            'slug' => 'new-york-times',
            'name' => 'New York Times'
        ];

        foreach($sources as $source) {
            Source::firstOrcreate(
                [
                    'name' => $source['name']
                ],
                [
                    'slug' => $source['id'] ?? $source['slug'],
                    'name' => $source['name'],
                    'category' => $source['category'] ?? ''
                ]
            );
        }

        
    }
}
