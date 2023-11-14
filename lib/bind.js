require("lib/cloudflare.js")

var REG_NONE = NewRegistrar("none");
var cFlare = NewDnsProvider('cloudflare.com','CLOUDFLAREAPI', {"manage_redirects": true});

var dnsBind = NewDnsProvider('bind', {
  'default_soa': {
    'master': 'ns1.dicaire.ch.',
    'mbox': 'hostmaster.dicaire.ch.',
    'refresh': 3600,
    'retry': 600,
    'expire': 604800,
    'minttl': 1440,
  },
  'default_ns': [
    'ns1.dicaire.ch.',
    'ns2.dicaire.ch.',
  ]
});

D("dicaire.ch", REG_NONE, DnsProvider(dnsBind),
  DefaultTTL("2h"),
  A("@", "192.0.2.34"), // TEST-NET-1
  CNAME("www","dicaire.ch."),
  CNAME("mail","dicaire.ch."),
  MX("@",10,"mail.dicaire.ch.")
)


// Two nameServers providers for ONE zone
var dicaireIP = "19.0.113.45";

D('dicaire.quebec', REG_NONE, DnsProvider(dnsBind), DnsProvider(cloudFlare),
    A("@", dicaireIP, cfProxy),
    A("*", dicaireIP, cfProxy_off),

 // Redirect 301 all subdomains *.Dicaire.Quebec --> to https://Dicaire.Quebec/
    CF_REDIRECT("*."+ "dicaire.quebec" +"/*", "https://dicaire.quebec/"),
 //  Redirect 301 all items  Dicaire.Quebec/* --> to https://Dicaire.Quebec/
    CF_REDIRECT("dicaire.quebec" +"/*", "https://dicaire.quebec/"),
    CF_REDIRECT("blog.dicaire.quebec/*", "https://dicaire.quebec/blog/$2")
);
