D('example.net', REG_NONE, DnsProvider(cloudFlare),
    MX('@', 0, 'example-net.mail.protection.outlook.com.'),
    TXT('@','v=spf1 include:spf.protection.outlook.com ~all'),
    TXT('_smtp._tls','v=TLSRPTv1;'),
    TXT('_mta-sts','v=STSv1; id=202307050344;'),
    CNAME('mta-sts', 'mta-sts-example-net.pages.dev.',cfProxy, TTL(1)),
    TXT('*._domainkey', "v=DKIM1; p="),
    TXT('_dmarc', "v=DMARC1;p=reject;sp=reject;adkim=s;aspf=s;"),

    CNAME('selector1._domainkey', 'selector1-example-net._domainkey.dicaire.onmicrosoft.com.'),
    CNAME('selector2._domainkey', 'selector2-example-net._domainkey.dicaire.onmicrosoft.com.'),
    CNAME("enterpriseregistration", "enterpriseregistration.windows.net."),
    CNAME("enterpriseenrollment", "enterpriseenrollment.manage.microsoft.com."),
    CNAME("autodiscover", "autodiscover.outlook.com.")
);
