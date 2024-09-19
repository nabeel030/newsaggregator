<?php
namespace App\Services;

use App\Models\Article;
use App\Models\Author;
use Illuminate\Support\Facades\Http;
use Carbon\Carbon;

abstract class BaseArticleService
{
    protected $apiKey;
    protected $apiUrl;
    protected $sourceName;
    protected $queryParams;
    protected $keyName;

    abstract protected function formatArticleData($article);

    public function fetchArticles()
    {
        $response = Http::get($this->apiUrl, array_merge($this->queryParams, [
            "{$this->keyName}" => $this->apiKey
        ]));

        if ($response->successful()) {
            $articles = $response->json($this->getResultsKey());
            if($this->sourceName == 'The Guardian') {
                $this->saveArticles($articles['results']);
            } else {
                $this->saveArticles($articles);
            }
        } else {
            // handle failure (log, retry, etc.)
        }
    }

    protected function saveArticles($articles)
    {
        foreach ($articles as $article) {
            $data = $this->formatArticleData($article);
            Article::firstOrcreate(['url' => $data['url']], $data);
            $this->saveAuthor($data['author']);
        }
    }

    /**
     * Save authors in the database for filtering
     */
    protected function saveAuthor($name)
    {
        Author::firstOrCreate(
            [
                'name' => $name
            ],
            [
                'name' => $name
            ]
        );
    }

    protected function getResultsKey()
    {
        // Override in specific services if needed (default key is 'results')
        return 'results';
    }
}
