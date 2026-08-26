# ColorExtract

A single-page Image Color Extractor that runs entirely in the browser. Upload any image and extract its dominant colors with HEX, RGB, and HSL values.

## Features

- Drag & drop or file picker upload (PNG, JPG, JPEG, WEBP)
- Extract 5-20 dominant colors using K-Means clustering
- HEX, RGB, HSL values with one-click copy
- Color usage percentage for each extracted color
- Dominant color highlight
- Download palette as JSON
- Fully client-side - no image is uploaded to the server

## Tech Stack

- Laravel 13
- Vue 3 + Inertia.js
- Tailwind CSS
- Canvas API

## Setup

```bash
composer setup
```

Or manually:

```bash
composer install
php artisan key:generate
npm install
npm run build
```

## Run

```bash
php artisan serve
```

Then open http://localhost:8000
