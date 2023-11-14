// TTL Shortcuts
var five_minutes = TTL(300);
var one_hour = TTL(3600);
var six_hours = TTL(21600);
var twelve_hours = TTL(43200);
var one_day = TTL(86400);

// Certificate Authority Authorization https://tools.ietf.org/html/rfc6844
// Refuse all CA for this domain
function certificateAuthority_off () {
    return [
    CAA_BUILDER({
      label: "@",
      iodef: 'mailto:'+caaMail,
      iodef_critical: true,
      issue: "none",
      issuewild: "none",
      ttl: '1h',
    })
];
}

function certificateAuthority () {
    return [
    CAA_BUILDER({
      label: "@",
      iodef: 'mailto:'+caaMail,
      iodef_critical: true,
      issue: caaAuth
      issuewild: caaAuthWildCard,
      ttl: '1h',
    })
];
}

// MTA-STS makes encryption mandatory in SMTP
// https://tools.ietf.org/html/rfc8461
// https://scotthelme.co.uk/improving-email-security-with-mta-sts/


function emailEncryption() {
    return [
    TXT('_mta-sts', 'v=STSv1; id=202112041647'), // The id value is simply the date and time that I make the change, so that ID was set on 4th December 2021 at 16:47.
    TXT('_smtp._tls', 'v=TLSRPTv1;rua=mailto:'+mtastsMail),
    ];
}

// You can specify GPS coordinates (latitude / longitude) for your domain name using a DNS LOC-record ([RFC1876](http://www.rfc-editor.org/rfc/rfc1876.txt)).


function parkDomain(Name) {
  return D(Name, REG_NONE, DnsProvider(cloudFlare),

 // SPF specifies no allowed servers
    SPF_BUILDER({
      label: '@',
      parts: [
        'v=spf1',
        '-all'
      ],
      ttl: '24h',
    }),

    CAA_BUILDER({
      label: "@",
      iodef: "mailto:"+caaMail,
      iodef_critical: true,
      issue: "none",
      issuewild: "none",
      ttl: '24h',
    }),

 // Wildcard DKIM to fail all
    TXT('*._domainkey', 'v=DKIM1; p=', one_day),

    DMARC_BUILDER({
      policy: 'reject',
      alignmentDKIM: 'strict',
      alignmentSPF: 'r'
    })

  );
}

function setupDomain(Name) {
  return D(Name, REG_NONE, DnsProvider(cloudFlare),
//    Office365('dicaire.dev', 'ms123456', 'gologic'),
//    o365,
    certificateAuthority,
    TXT('_mta-sts', 'v=STSv1; id=1565808194', one_hour),
    A('Red', 'xxx.page.dev.', one_hour, cfProxy)
);
}

// CloudFlare specific information:
//  * https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/setup/
//  * https://developers.cloudflare.com/dns/manage-dns-records/how-to/subdomains-outside-cloudflare/

function delegateZone(zone, NS1, NS2, IP1, IP2 ) {
  return [

    NS( zone, NS1 +".",one_day),
    NS( zone, NS2 +".",one_day),
    A(NS1, IP1, one_day), // Glue records
    A(NS2, IP2, one_day), // Glue records
];
}

