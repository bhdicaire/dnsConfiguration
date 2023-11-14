D('example.org', REG_NONE, DnsProvider(cloudFlare),     // domains that do not send email
    MX('@', 0, '.'), // RFC 7505
    TXT('@','v=spf1 -all'),
    TXT('*._domainkey', "v=DKIM1; p="), // absence of a selector / public key (e.g. as a result of deleting the entire DKIM resource record) is semantically equal to a resource record with an empty public key
    TXT('_dmarc', "v=DMARC1;p=reject;sp=reject;adkim=s;aspf=s;"),

    AAAA("@", '2001:DB8::1', cfProxy),
    CF_TEMP_REDIRECT("example.org/*", "https://example.com/$1")

);
