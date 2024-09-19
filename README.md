
# QuickNews

A news aggregator application that fetches and displays news articles from various sources, including NewsAPI, The Guardian, and The New York Times. The project consists of a Laravel backend and a React frontend, both of which are set up and managed using Docker for easy deployment and development.

## Table of Contents
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Usage](#usage)

## Tech Stack
- **Backend**: Laravel 11, PHP 8.2, MySQL 8
- **Frontend**: React, Node.js 20
- **APIs**: [NewsAPI](https://newsapi.org/), [The Guardian API](https://open-platform.theguardian.com/), [New York Times API](https://developer.nytimes.com/)
- **Containerization**: Docker, Docker Compose

## Features
- Fetches news and articles from multiple APIs
- Displays aggregated news in a user-friendly interface
- Accessible via `http://localhost:3000`

## Installation
Follow these instructions to get the project up and running on your local machine.

### Prerequisites
- [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your system.

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/news-aggregator.git
    cd news-aggregator
    ```
2. Run the application using Docker Compose:
    ```bash
    docker-compose up --build
    ```
3. After a few minutes, the app will be running and accessible at:
    ```
    http://localhost:3000
    ```

## Project Structure
The repository is organized into two main folders:
- `backend/`: The Laravel application that fetches news from the APIs and serves it to the frontend.
- `frontend/`: The React application that displays the news articles.

## Environment Variables
The application requires certain environment variables to function correctly, particularly for API keys. Create an `.env` file in both the `backend` and `frontend` directories with the required variables.

For testing purposes I have used my own api keys.

### Backend (.env)
```env
NEWS_API_KEY=your_newsapi_key
GUARDIAN_API_KEY=your_guardian_api_key
NYTIMES_API_KEY=your_nytimes_api_key
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password
```

### Frontend (.env)
```env
REACT_APP_API_BASE_URL=http://localhost:8000/api
```

## Usage
- The backend fetches news articles from the configured APIs.
- The frontend displays the aggregated news in a clean, user-friendly interface.
- Access the application in your browser at [http://localhost:3000](http://localhost:3000).
