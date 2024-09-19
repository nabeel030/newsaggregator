<?php
namespace App\Services;
use Carbon\Carbon;

class GuardianService extends BaseArticleService
{
    public function __construct()
    {
        $this->apiKey = config('services.newsapis.guardian_api_key');
        $this->apiUrl = "https://content.guardianapis.com/search?";
        $this->sourceName = 'The Guardian';
        $this->keyName = 'api-key';
        $this->queryParams = ['show-fields' => 'byline,trailText,thumbnail'];
    }

    protected function formatArticleData($article)
    {
        return [
            'title' => $article['webTitle'] ?? '',
            'description' => $article['fields']['trailText'] ?? '',
            'url' => $article['webUrl'] ?? '',
            'image_url' => $article['fields']['thumbnail'] ?? '',
            'published_at' => isset($article['webPublicationDate']) ? Carbon::parse($article['webPublicationDate']) : Carbon::parse('2024-09-14T17:00:33Z'),
            'source' => $this->sourceName,
            'category' => $article['sectionName'] ?? '',
            'author' => $article['fields']['byline'] ?? 'Anonymous'
        ];
    }

    protected function getResultsKey()
    {
        return 'response';
    }
}
