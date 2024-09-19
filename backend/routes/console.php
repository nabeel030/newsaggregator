<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Schedule;

// Fetch articles in every minute
Schedule::command('fetch-articles')->everyMinute();




