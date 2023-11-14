require("lib/utility.js")
require("lib/aws.js")
require("lib/azure.js")
require("lib/cloudflare.js")
require("lib/google.js")

// var DNS_AZURE = NewDnsProvider("Azure");
// var DNS_AWS = NewDnsProvider("awsR53");
// var DNS_GOOGLE = NewDnsProvider("google");
var cloudFlare = NewDnsProvider("cloudFlare");
var REG_NONE = NewRegistrar("none");

DEFAULTS(
    NAMESERVER_TTL('24h'),
      // By default, all CF proxied records have a TTL of Auto, which is set to 300 seconds
      // For DNS only records (e.g., Unproxied records), you can choose a TTL between 60 seconds (non-Enterprise) and 1 day
    DefaultTTL('1h'),
    cfProxyDomain_off
);

var caaMail = 'CSO+CAA@Dicaire.tld' // certificateAuthority * parkDomain --> lib/Security.js
var mtastsMail = 'CSO+mtasts@Dicaire.tld' // forceMailEncryption --> lib/Security.js
var rufMail = 'CSO+ruf@Dicaire.tld' // DMARC --> lib/google.js &
var ruaMail = 'CSO+rua@Dicaire.tld'
var onMicrosoft  = "initialdomainname.onmicrosoft.com";

var caaAuth = [
    "letsencrypt.org",
    "comodoca.com",
]

var caaAuthWildCard = "none";


