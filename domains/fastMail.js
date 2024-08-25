// Template for a Fastmail customer

D('fastmail.com', REG_NONE, DnsProvider(cloudFlare), // Change the domain name
    MX('@', 10, 'in1-smtp.messagingengine.com.'), 
    MX('@', 20, 'in2-smtp.messagingengine.com.'),
    TXT('@','v=spf1 include:spf.messagingengine.com -all'),

    //  Allows you to receive email at subdomain addresses, e.g. foo@user.c13l.org
    MX('*', 10, 'in1-smtp.messagingengine.com.'), 
    MX('*', 20, 'in2-smtp.messagingengine.com.'),
    MX('mail', 10, 'in1-smtp.messagingengine.com.'), 
    MX('mail', 20, 'in2-smtp.messagingengine.com.'),

    // DKIM
    CNAME("fm1._domainkey", "fm1.c13l.org.dkim.fmhosted.com."),
    CNAME("fm2._domainkey", "fm2.c13l.org.dkim.fmhosted.com."),
    CNAME("fm3._domainkey", "fm3.c13l.org.dkim.fmhosted.com."),
    CNAME("mesmtp._domainkey", "mesmtp.c13l.org.dkim.fmhosted.com."),

    // DMARC
    TXT('_dmarc', "v=DMARC1;p=reject;sp=reject;adkim=s;aspf=s;"),

/*  MTA-STS
    TXT('_mta-sts','v=STSv1; id=202310191122;'),
    CNAME('mta-sts', 'mta-sts-server.com.',cfProxy, TTL(1)),    
    TXT('_smtp._tls','v=TLSRPTv1; rua=mailto:you@server.com'), // TLS Reporting
 */

// FastMail

    A("mail", "103.168.172.47"),
    A("mail", "103.168.172.62"),

    // Allows email clients to automatically find the correct settings for your account.
    SRV('_submission._tcp',0,0,0,"."),
    SRV('_submissions._tcp',0,1,465, "smtp.fastmail.com."),
    SRV('_imap._tcp',0,0,0,"."),
    SRV('_imaps._tcp',0,1,993,"imap.fastmail.com."),
    SRV('_pop3._tcp',0,0,0,"."),
    SRV('_pop3s._tcp',10,1,995,"pop.fastmail.com."),
    SRV('_jmap._tcp',0,1,443,"api.fastmail.com."),
    SRV('_autodiscover._tcp',0,1,443,"autodiscover.fastmail.com."),
    SRV('_carddav._tcp',0,0,0,"."),
    SRV('_carddavs._tcp',0,1,443,"carddav.fastmail.com."),
    SRV('_caldav._tcp',0,0,0,"."),
    SRV('_caldavs._tcp',0,1,443,"caldav.fastmail.com."),

    // allows you to host websites at from your Fastmail file storage
    A("@", "103.168.172.37"),
    A("@", "103.168.172.52"),

END);