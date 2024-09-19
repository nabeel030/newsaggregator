<?php
namespace App\Services;
use Carbon\Carbon;

class NYTimesService extends BaseArticleService
{
    public function __construct()
    {
        $this->apiKey = config('services.newsapis.nyt_api_key');
        $this->apiUrl = "https://api.nytimes.com/svc/topstories/v2/home.json";
        $this->sourceName = 'New York Times';
        $this->keyName = 'api-key';
        $this->queryParams = [];
    }

    protected function formatArticleData($article)
    {
        return [
            'title' => $article['title'] ?? '',
            'description' => $article['abstract'] ?? '',
            'url' => $article['url'] ?? '',
            'image_url' => $article['multimedia'][0]['url'] ?? '',
            'published_at' => isset($article['published_date']) ? Carbon::parse($article['published_date']) : null,
            'source' => $this->sourceName,
            'category' => $article['section'] ?? 'general',
            'author' => $article['byline'] ?? 'Anonymous'
        ];
    }
}
