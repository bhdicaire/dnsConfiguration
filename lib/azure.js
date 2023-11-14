// o365Mail('example','com')
function o365Mail(domainPrefix, domainSuffix){
   if (!domainPrefix) {
     throw new Error("o365: domainPrix is required");
   }

   var domainName = domainPrefix.concat('.').concat(domainSuffix);
   var domainNameDashed = domainPrefix.concat('-').concat(domainSuffix);

   ruaMail = ruaMail || "dmarc-rua@" + domainName;
   rufMail = rufMail || "dmarc-ruf@" + domainName ;
   caaMail = caaMail || "caa-rpt@" + domainName ;
   mtastsMail = mtastsMail || "mta-sts@" + domainName ;
   onMicrosoft = onMicrosoft || domainPrefix + ".onmicrosoft.com" ;
   caaAuthWildCard= caaAuthWildCard || "none" ;

  return [
    MX('@', 0, domainNameDashed.concat('.mail.protection.outlook.com.')),
    CNAME("autodiscover", "autodiscover.outlook.com."),
    SPF_BUILDER({
        label: '@',
        parts: [
            'v=spf1',
            'include:spf.protection.outlook.com', // Office 365
         // 'include:mailgun.org',                // Mailgun
         // 'include:servers.mcsv.net',           // MailChimp
         // 'include:sendgrid.net',               // SendGrid
            '~all' // Servers not compliant with SPF will fail and be rejected
        ]
    }),



    DMARC_BUILDER({
      policy: 'reject',
      alignmentDKIM: 'strict',
      alignmentSPF: 'r',
      ruf: ['mailto:'+rufMail,],
      rua: [ruaMail,],
    }),

/* Cloudflare has automatically added CAA records on my behalf, these records will not appear in the Cloudflare dashboard.
   I can check them with dig bhdicaire.com caa +short

    CAA_BUILDER({
      label: "@",
      iodef: 'mailto:'+caaMail,
      iodef_critical: true,
      issue: caaAuth
      issuewild: caaAuthWildCard,
    }),
 */

 // DKIM
    CNAME('selector1._domainkey', 'selector1-' + domainNameDashed + '._domainkey.' + onMicrosoft + '.'),
    CNAME('selector2._domainkey', 'selector2-' + domainNameDashed + '._domainkey.' + onMicrosoft + '.'),

 // Skype for Business
 // CNAME("sip","sipdir.online.lync.com."),
 // CNAME("lyncdiscover", "webdir.online.lync.com."),
 // SRV  ("_sip._tls", 100, 1, 443, "sipdir.online.lync.com."),
 // SRV  ("_sipfederationtls._tcp",100, 1, 5061, "sipfed.online.lync.com."),

 // inTune and Mobile Device Management for MS 365
    CNAME("enterpriseregistration", "enterpriseregistration.windows.net."),
    CNAME("enterpriseenrollment", "enterpriseenrollment.manage.microsoft.com."),

 // Personal favorites
    CNAME("files", domainPrefix + "-files.sharepoint.com."),
    CNAME("mail", "outlook.office365.com."),
    CNAME("my-files", domainPrefix + "-myfiles.sharepoint.com."),
    CNAME("my-sharepoint", domainPrefix + "-my.sharepoint.com."),
    CNAME("sharepoint", domainPrefix + ".sharepoint.com."),
    CNAME("teams", "teams.microsoft.com.")
  ];
}

function o365Apps() {
    return [
    CNAME("delve", "can.delve.office.com."),
    CNAME("delve-us", "delve.office.com."),
    CNAME("excel", "excel.officeapps.live.com."),
    CNAME("m", "outlook.office365.com."),
    CNAME("office", "office.live.com."),
    CNAME("oneDrive", "skydrive.wns.windows.com."),
    CNAME("oneNote", "www.onenote.com."),
    CNAME("outlook", "outlook.office365.com."),
    CNAME("powerpoint", "powerpoint.officeapps.live.com."),
    CNAME("Tasks", "tasks.office.com."),
    CNAME("visio", "visio.officeapps.live.com."),
    CNAME("word", "word-edit.officeapps.live.com.")
    ];
}

function o365Admin() {
    return [
    CNAME("autologon", "autologon.microsoftazuread-sso.com."),
    CNAME("clientconfig", "clientconfig.microsoftonline-p.net."),
    CNAME("companymanager", "companymanager.microsoftonline.com."),
    CNAME("device", "device.login.microsoftonline.com."),
    CNAME("login-API", "api.login.microsoftonline.com."),
    CNAME("login-p", "login.microsoftonline-p.com."),
    CNAME("login-us", "login-us.microsoftonline.com."),
    CNAME("login", "login.microsoftonline.com."),
    CNAME("loginCERT", "logincert.microsoftonline.com."),
    CNAME("loginEX", "loginex.microsoftonline.com."),
    CNAME("loginMS", "login.microsoft.com."),
    CNAME("loginO365", "login.microsoftonline.com."),
    CNAME("loginWin", "login.windows.net."),
    CNAME("officeclient", "officeclient.microsoft.com."),
    CNAME("oneDrive-admin", "admin.onedrive.com."),
    CNAME("passwordReset-API", "api.passwordreset.microsoftonline.com."),
    CNAME("passwordReset", "passwordreset.microsoftonline.com."),
    CNAME("test", "testConnectivity.microsoft.com."),
    CNAME("webshell", "webshell.suite.office.com.")
    ];
}

function o365More() {
    return [
    CNAME("agent", "agent.office.net."),
    CNAME("becws", "becws.microsoftonline.com."),
    CNAME("broadcast-skype", "broadcast.skype.com."),
    CNAME("broadcast", "broadcast.officeapps.live.com."),
    CNAME("graph", "graph.microsoft.com."),
    CNAME("hip", "hip.microsoftonline-p.net."),
    CNAME("hipservice", "hipservice.microsoftonline.com."),
    CNAME("imap", "outlook.office365.com."),
    CNAME("nexus", "nexus.microsoftonline-p.com."),
    CNAME("oneDriveMS", "www.onedrive.com."),
    CNAME("pop3", "outlook.office365.com."),
    CNAME("quicktips", "quicktips.skypeforbusiness.com."),
    CNAME("smtp", "smtp.office365.com."),
    CNAME("static-sharepoint", "static.sharepointonline.com."),
    CNAME("suite", "suite.office.net."),
    CNAME("Sway", "sway.com."),
    CNAME("view", "view.officeapps.live.com.")
    ];
}

/*
KNOWLEDGE BASE

 * [SMTP MTA Strict Transport Security standard (MTA-STS)](https://datatracker.ietf.org/doc/html/rfc8461)
   * All outbound Exchange Online email traffic respects the wishes of the recipient domain owners via their MTA-STS policy
   * Inbound Protection require a [DNS TXT Setup](https://techcommunity.microsoft.com/t5/exchange-team-blog/introducing-mta-sts-for-exchange-online/ba-p/3106386)
    * The [TLS-RPT standard](https://datatracker.ietf.org/doc/html/rfc8460) provides reporting for MTA-STS (and [DANE for SMTP](https://techcommunity.microsoft.com/t5/exchange-team-blog/coming-soon-outbound-smtp-dane-with-dnssec/ba-p/3100920)) with a single daily report from each email service that supports it.
    * [CheckTLS – Test Receiver](https://www.checktls.com/TestReceiver) &  [CheckTLS – Test Sender](https://www.checktls.com/TestSender)
    * [MTA-STS validator](https://aykevl.nl/apps/mta-sts/?ref=blog.jonsdocs.org.uk)
    https://www.hardenize.com/
 * DKIM: https://security.microsoft.com/dkimv2

 */
