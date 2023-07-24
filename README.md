# URL Shortener
Link=>https://url-shrinker-adnc.vercel.app/

This project is a URL shortener that closely resembles the approach utilized by renowned URL shortening platform, TinyURL. It incorporates Redis server for caching, which significantly enhances the request-response time.

![URL Shortener](url_shortener.png)
![New File at _ · Aman0246_UrlShrinker · GitHub - Brave 03-07-2023 16_54_02](https://github.com/Aman0246/UrlShrinker/assets/130737436/c7b8b882-b5f0-49e1-8b46-68aaf0f9f1b4)

![New File at _ · Aman0246_UrlShrinker · GitHub - Brave 03-07-2023 16_55_25](https://github.com/Aman0246/UrlShrinker/assets/130737436/d83d54c9-bf3f-4504-bc8d-b54c0e6016b1)

## Features

- Shorten long URLs into compact and easy-to-share short URLs.
- Redirect users from short URLs to their original long URLs.
- Caching with Redis server to improve request-response time.

## Prerequisites

- Node.js (v12 or above)
- Redis server (v4 or above)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/username/url-shortener.git
   ```

2. Install the dependencies:

   ```bash
   cd url-shortener
   npm install
   ```

3. Start the Redis server. Make sure it is running on `localhost` with the default port `6379`. If you have a different configuration, update the Redis connection details in `config.js`.

4. Start the application:

   ```bash
   npm start
   ```

5. Open your browser and visit `http://localhost:3000` to access the URL shortener.

## Usage

1. Enter a long URL in the provided input field.
2. Click the "Shorten" button.
3. A short URL will be generated and displayed.
4. Copy and share the short URL as desired.
5. When a user accesses the short URL, they will be redirected to the original long URL.

## Configuration

The configuration file `config.js` contains the following settings:

- `port` - The port on which the application will run (default: `3000`).
- `redisHost` - The Redis server host (default: `localhost`).
- `redisPort` - The Redis server port (default: `6379`).
- `redisTTL` - The time-to-live (TTL) for cached URLs in Redis (default: `3600` seconds).

You can modify these settings based on your requirements.

## Technologies Used

- Node.js - JavaScript runtime
- Express - Web framework for Node.js
- Redis - In-memory data store
- HTML/CSS - Front-end presentation

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

This project draws inspiration from the renowned URL shortening platform, TinyURL.

## Contact

If you have any questions, suggestions, or issues, feel free to contact me at [email protected]G
