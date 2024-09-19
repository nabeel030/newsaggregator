<?php
namespace App\Services;
use Illuminate\Support\Facades\Http;
use Carbon\Carbon;


class SourceService 
{
    protected $apiKey;
    protected $apiUrl;
    protected $queryParams;

    public function __construct()
    {
        $this->apiKey = config('services.newsapis.news_api_key');
        $this->apiUrl = "https://newsapi.org/v2/top-headlines/sources";
        $this->queryParams = ['language' => 'en'];
    }

    public function fetchSources() {
        $response = Http::get($this->apiUrl, array_merge($this->queryParams, [
            "apiKey" => $this->apiKey
        ]));

        if ($response->successful()) {
            return $response->json('sources');
        } 

        return [];
    }
}
