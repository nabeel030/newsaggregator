<?php

namespace App\Console\Commands;

use App\Services\GuardianService;
use App\Services\NewsAPIService;
use App\Services\NYTimesService;
use Illuminate\Console\Command;

class FetchArticlesCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fetch-articles';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command to fetch articles from different sources';

    protected $newsAPIService;
    protected $nytimesService;
    protected $guardianService;

    public function __construct(NewsAPIService $newsAPIService, NYTimesService $nytimesService, GuardianService $guardianService)
    {
        parent::__construct();
        $this->newsAPIService = $newsAPIService;
        $this->nytimesService = $nytimesService;
        $this->guardianService = $guardianService;
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->newsAPIService->fetchArticles();
        $this->nytimesService->fetchArticles();
        $this->guardianService->fetchArticles();
    }
}
