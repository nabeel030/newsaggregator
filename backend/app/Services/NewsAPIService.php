<?php
namespace App\Services;

use App\Models\Article;
use App\Models\Source;
use Illuminate\Support\Facades\Http;
use Carbon\Carbon;

class NewsAPIService extends BaseArticleService
{
    public function __construct()
    {
        $this->apiKey = config('services.newsapis.news_api_key');
        $this->apiUrl = "https://newsapi.org/v2/top-headlines";
        $this->sourceName = 'Newsapi';
        $this->keyName = 'apiKey';
        $this->queryParams = ['language' => 'en'];
    }

    public function saveArticles($articles)
    {
        foreach ($articles as $article) {
            $data = $this->formatArticleData($article);
            if($data['title'] != '[Removed]') {
                Article::firstOrcreate(['url' => $data['url']], $data);
            }
        }
    }

    protected function formatArticleData($article)
    {
        $category = 'general';
        $source = Source::where('name', $article['source']['name'])->first();

        if($source) {
            $category = $source->category;
        }
    
        return [
            'title' => $article['title'] ?? '',
            'description' => $article['description'] ?? '',
            'url' => $article['url'] ?? '',
            'image_url' => $article['urlToImage'] ?? '',
            'published_at' => isset($article['publishedAt']) ? Carbon::parse($article['publishedAt']) : Carbon::parse('1970-01-01 00:00:00'),
            'source' => $article['source']['name'] ?? '',
            'category' => $category, 
            'author' => $article['author'] ?? 'Anonymous'
        ];
    }

    protected function getResultsKey()
    {
        return 'articles';
    }
}
