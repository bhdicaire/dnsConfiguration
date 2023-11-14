var cfProxy = {"cloudflare_proxy": "on"};                      // Proxy enabled per record
var cfProxy_off = {"cloudflare_proxy": "off"};                 // Proxy disabled per record
var cfProxy_full = {"cloudflare_proxy": "full"};               // Proxy+Raygun enabled per record
var cfProxyDomain = {"cloudflare_proxy_default": "on"};        // Proxy default on for entire domain
var cfProxyDomain_off = {"cloudflare_proxy_default": "off"};   // Proxy default off for entire domain
var cfUniversalSSL = { "cloudflare_universalssl": "on"};       // UniversalSSL on for entire domain
var cfUniversalSSL_off = { "cloudflare_universalssl": "off"};  // UniversalSSL off for entire domain

// TTL Shortcuts
var five_minutes = TTL(300);                                   // By default, all CF proxied records have a TTL of Auto, which is set to 300 seconds
var one_hour = TTL(3600);
var six_hours = TTL(21600);
var twelve_hours = TTL(43200);
var one_day = TTL(86400);

DEFAULTS(
    NAMESERVER_TTL('24h'),
      // By default, all CF proxied records have a TTL of Auto, which is set to 300 seconds
      // For DNS only records (e.g., Unproxied records), you can choose a TTL between 60 seconds (non-Enterprise) and 1 day
    DefaultTTL('1h'),
    cfProxyDomain_off
);
