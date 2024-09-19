FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    curl \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy existing application
COPY . /var/www

# Install Laravel dependencies
RUN composer install

# Expose port 9000 and start PHP-FPM server
EXPOSE 9000

CMD bash -c " \
    if [ ! -f /var/www/.env ]; then \
        cp /var/www/.env.example /var/www/.env; \
    fi; \
    composer install; \
    php-fpm"

# CMD ["php-fpm"]
