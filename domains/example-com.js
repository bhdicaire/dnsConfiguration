D('example.com', REG_NONE, DnsProvider(cloudFlare),
    MX('@', 1, 'smtp.google.com.'),
    TXT('@','v=spf1 include:_spf.google.com -all'), // SPF with hard fail
    TXT('_dmarc', "v=DMARC1;p=reject;sp=reject;adkim=s;aspf=s;"),

    CNAME('fm1._domainkey', 'fm1.example.com.dkim.google.com.'), // DKIM item #1
    CNAME('fm2._domainkey', 'fm2.example.com.dkim.google.com.'), // DKIM item #2
    CNAME('fm3._domainkey', 'fm3.example.com.dkim.google.com.'), // DKIM item #3
    TXT('google._domainkey','v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgy4kjfwHxW2/zL/PIycQ2Nh0o+SDG512sbPrzSqn01v/Cty9Ds54AAHS3LKpwboYL23ysviLsGnWqQ1Eyi4AF/KUEKt0pS7Q0w/2qJAnrdYRml5PQmZETZqqFF+GpZUODmOfJWOj0EcOIDn4fq/bQbxWHmgS6SCQaAYG9z5ra9z0ppnDKWf+SaeT40Meh2rSf2NIm1Gqh7DapKtEUWE7YsTdaLKXTWAOd8hqc6Q1fNiDcCdMOa4g8ZgBFHkZmp9PS6xpLL/e6HHzbRprE7C1bxaSDQuReEHpldJmhspOKfu9TvgeBEEbS7IWZ0Ua1pek9cu7TchkfiuvbsxZshwdpQIDAQAB'),  // DKIM key rotation

    TXT('_smtp._tls','v=TLSRPTv1;'), // TLS Reporting
    TXT('_mta-sts','v=STSv1; id=202310191122;'),
    CNAME('mta-sts', 'mta-sts-example.com.pages.dev.',cfProxy, TTL(1)),
    TXT("@", "google-site-verification=KKilX4ruQDSCL_EiehtaqeOXcBQYXDGYioQA-2UnC2A"),

    ALIAS('@','example.com.pages.dev.', cfProxy, TTL(1)),

    AAAA("blog", '2001:DB8::1', cfProxy),
    CF_TEMP_REDIRECT("blog.example.com/*", "https://example.com/blog/$1")

);
