// Incrementing an IP

var berlinIP = IP("10.10.10.40");

var localDevices = [
    A("edge", berlinIP),
    A("robot", berlinIP + 1),
]


// Create 10 items with an IP addresses, use podDublin, in your config file

    var dublinSubnet  = IP("10.10.100.");
    var podDublin = [];

    for(var i=1;i<=10;++i){
      podDublin.push( A("dublin"+i+"", dublinSubnet +i));
      podDublin.push( A("*.dublin"+i+"", "192.0.2."+i));
    }


    var stage_subdomains = [];

    for(var i=100;i<=123;++i){
      stage_subdomains.push( A('s'+i+'', '192.0.2.'+i));
      stage_subdomains.push( A('*.s'+i+'', '192.0.2.'+i));
    }

// D_EXTEND adds records (and metadata) to a domain previously defined by D() OR add subdomain records (and metadata) to a previously defined domain

D("domain.tld", REG, DnsProvider(DNS),
  A("@", "127.0.0.1"), // domain.tld
  A("www", "127.0.0.2"), // www.domain.tld
  CNAME("a", "b") // a.domain.tld -> b.domain.tld
);

D_EXTEND("sub.domain.tld",
  A("bbb", "127.0.0.4"), // bbb.sub.domain.tld
  A("ccc", "127.0.0.5"), // ccc.sub.domain.tld
  CNAME("e", "f") // e.sub.domain.tld -> f.sub.domain.tld

// getConfiguredDomains is a helper function that returns all domain names to iterate over all of them at the end of your configuration file

var domains = getConfiguredDomains();
for(i = 0; i < domains.length; i++) {
  D_EXTEND(domains[i],
    TXT('_important', '43200')
  )
}

// Loop with multiple domain names

_.each(
  [
    "example1.tld",
    "example2.tld",
    "example3.tld",
  ],
  function (d) {
    D(d, REG_NONE, DnsProvider(cloudFlare),
       A("@", "10.2.3.4"),
       CNAME("www", "@"),
    END);
  }
);

// Loop differently with multiple domain names

var simpleDomainNames = [
    "example.name",
    "example.com",
    "example.uk",
]

for (var domain in simpleDomainNames){
        D(domains[domain].name, REG_NONE, DnsProvider(cloudFlare),
            A('@',ip,TTL(60))
);

// OR

_.each(simpleDomainNames,

  function (d) {
    D(d, REG_NONE, DnsProvider(cloudFlare),
       A("@", "10.2.3.4"),
       CNAME("www", "@"),
       TXT("houba", "whyNot"),
       CAA_BUILDER({
         label: "@",
         iodef: "mailto://cso@example.td",
         iodef_critical: true,
         issue: [
           "letsencrypt.org",
            "comodoca.com",
          ],
          issuewild: +caaAuthWildCard,
          ttl: '1h',
          }),
    END);
  }
);


// Parked domains with a nested function

var parkedDomainNames = [
    "dicaire.ch",
    "dicaire.fr",
]

_.each(parkedDomainNames,

  function (d) {
    parkDomain ( d )
    END
  }
);
