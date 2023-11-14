// I signed up for Google WorkSpace before 2023
function googleMail(domain_name){

   ruaMail = ruaMail || "dmarc-rua@" + domainName;
   rufMail = rufMail || "dmarc-ruf@" + domainName ;
   caaMail = caaMail || "caa-rpt@" + domainName ;
   mtastsMail = mtastsMail || "mta-sts@" + domainName ;
   caaAuthWildCard= caaAuthWildCard || "none" ;

  return [
    MX('@', 1, 'aspmx.l.google.com.'),
    MX('@', 5, 'alt1.aspmx.l.google.com.'),
    MX('@', 5, 'alt2.aspmx.l.google.com.'),
    MX('@', 10, 'alt3.aspmx.l.google.com.'),
    MX('@', 10, 'alt4.aspmx.l.google.com.'),
    SPF_BUILDER({
        label: '@',
        parts: [
            'v=spf1',
            'include:_spf.google.com',            // Google App Suite
         // 'include:spf.protection.outlook.com', // Office 365
         // 'include:mailgun.org',                // Mailgun
         // 'include:servers.mcsv.net',           // MailChimp
         // 'include:sendgrid.net',               // SendGrid
            '~all' // Servers not compliant with SPF will fail and be rejected
        ]
    }),

    CNAME('fm1._domainkey', 'fm1.' + domain_name + '.dkim.google.com.'),
    CNAME('fm2._domainkey', 'fm2.' + domain_name + '.dkim.google.com.'),
    CNAME('fm3._domainkey', 'fm3.' + domain_name + '.dkim.google.com.'),

    DMARC_BUILDER({
      policy: 'reject',
      alignmentDKIM: 'strict',
      alignmentSPF: 'r',
      ruf: ['mailto:'+rufMail,],
      rua: ['mailto:'+ruaMail,],
    }),

/* Cloudflare has automatically added CAA records on my behalf, these records will not appear in the Cloudflare dashboard.
   https://developers.cloudflare.com/pages/platform/custom-domains/ & https://developers.cloudflare.com/ssl/edge-certificates/caa-records/#caa-records-added-by-cloudflare
   I can check them with dig bhdicaire.com caa +short

    CAA_BUILDER({
      label: "@",
      iodef: 'mailto:'+caaMail,
      iodef_critical: true,
      issue: caaAuth
      issuewild: caaAuthWildCard,
    }),
 */

    CNAME('admin', 'admin.google.com.'),
    CNAME('calendar', 'ghs.googlehosted.com.'),
    CNAME('drive', 'ghs.googlehosted.com.'),
    CNAME('groups', 'ghs.googlehosted.com.'),
    CNAME('mail', 'ghs.googlehosted.com.'),
    CNAME('sites', 'ghs.googlehosted.com.'),
    CNAME('start', 'ghs.googlehosted.com.'),

  ];
}


// DMARC_BUILDER({
//   policy: 'reject',
//   subdomainPolicy: 'quarantine',
//   percent: 50,
//   alignmentSPF: 'r',
//   alignmentDKIM: 'strict',
//   rua: [
//     'mailto:mailauth-reports@example.com',
//     'https://dmarc.example.com/submit',
//   ],
//   ruf: [
//     'mailto:mailauth-reports@example.com',
//   ],
//   failureOptions: '1',
//   reportInterval: '1h',
// });

// I signed up for Google WorkSpace in 2023 or later
function gWorkspace(domain_name){

   ruaMail = ruaMail || "dmarc-rua@" + domainName;
   rufMail = rufMail || "dmarc-ruf@" + domainName ;
   caaMail = caaMail || "caa-rpt@" + domainName ;
   mtastsMail = mtastsMail || "mta-sts@" + domainName ;
   caaAuthWildCard= caaAuthWildCard || "none" ;

  return [
    MX('@', 1, 'smtp.google.com.'),
    SPF_BUILDER({
        label: '@',
        parts: [
            'v=spf1',
            'include:_spf.google.com',            // Google App Suite
         // 'include:spf.protection.outlook.com', // Office 365
         // 'include:mailgun.org',                // Mailgun
         // 'include:servers.mcsv.net',           // MailChimp
         // 'include:sendgrid.net',               // SendGrid
            '~all' // Servers not compliant with SPF will fail and be rejected
        ]
    }),

    CNAME('fm1._domainkey', 'fm1.' + domain_name + '.dkim.google.com.'),
    CNAME('fm2._domainkey', 'fm2.' + domain_name + '.dkim.google.com.'),
    CNAME('fm3._domainkey', 'fm3.' + domain_name + '.dkim.google.com.'),

/*
    DMARC_BUILDER({
      policy: 'reject',
      alignmentDKIM: 'strict',
      alignmentSPF: 'r',
      ruf: ['mailto:'+rufMail,],
      rua: [ruaMail,],
    }),
 */

/* Cloudflare has automatically added CAA records on my behalf, these records will not appear in the Cloudflare dashboard.
   https://developers.cloudflare.com/pages/platform/custom-domains/
   https://developers.cloudflare.com/ssl/edge-certificates/caa-records/#caa-records-added-by-cloudflare
   I can check them with dig bhdicaire.com caa +short

    CAA_BUILDER({
      label: "@",
      iodef: 'mailto:'+caaMail,
      iodef_critical: true,
      issue: caaAuth
      issuewild: caaAuthWildCard,
    }),
 */

    CNAME('admin', 'admin.google.com.'),
    CNAME('calendar', 'ghs.googlehosted.com.'),
    CNAME('drive', 'ghs.googlehosted.com.'),
    CNAME('groups', 'ghs.googlehosted.com.'),
    CNAME('mail', 'ghs.googlehosted.com.'),
    CNAME('sites', 'ghs.googlehosted.com.'),
    CNAME('start', 'ghs.googlehosted.com.'),
  ];
}

var googleApps = [
    CNAME('calendar', 'ghs.googlehosted.com.', one_day),
    CNAME('drive', 'ghs.googlehosted.com.', one_day),
    CNAME('mail', 'ghs.googlehosted.com.', one_day),
    CNAME('groups', 'ghs.googlehosted.com.', one_day),
    CNAME('sites', 'ghs.googlehosted.com.', one_day),
    CNAME('start', 'ghs.googlehosted.com.', one_day),
    CNAME('admin', 'admin.google.com.', one_day),
]
