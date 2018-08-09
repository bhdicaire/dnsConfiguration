/*
   dnscontrol configuration file for DICAIRE.com
*/

var REG_NONE = NewRegistrar("none", "NONE");    // No registrar are currently automated
var r53 = NewDnsProvider("r53_main", "ROUTE53");

var O365Tenant    = "DicaireStrategies-com";
var berlinIP      = IP("10.10.10.40");
var dublinSubnet  = IP("10.10.100.");
var s3Location    = "ca-central-1";

var s3Location    = "ca-central-1";

var nameServers = [

  NAMESERVER("ns1"),
  NAMESERVER("ns2"),
  NAMESERVER("ns3"),
  NAMESERVER("ns4"),

  A("ns1", "205.251.196.127"), // ns-1151.awsdns-15.org
  AAAA("ns1", "2600:9000:5304:7f00::1"),

  A("ns2", "205.251.194.117"), // ns-629.awsdns-14.net
  AAAA("ns2", "2600:9000:5302:7500::1"),

  A("ns3", "205.251.192.192"), // ns-192.awsdns-24.com
  AAAA("ns3", "2600:9000:5300:c000::1"),

  A("ns4", "205.251.199.135"), // ns-1927.awsdns-48.co.uk
  AAAA("ns4", "2600:9000:5307:8700::1"),
  {'ns_ttl': '600'} // On domain apex NS RRs
]

var stageDublin = [];

for(var i=1;i<=10;++i){
    stageDublin.push( A("dublin"+i+"", dublinSubnet +i));
    stageDublin.push( A("*.dublin"+i+"", "192.0.2."+i));
}

// Certificate Authority Authorization https://tools.ietf.org/html/rfc6844
var certificates= [
  CAA("@", "issue", "globalsign.com"),
  CAA("@", "issuewild", ";")
]

var office365Core = [
    CNAME("autodiscover", "autodiscover.outlook.com."),
    CNAME("sip","sipdir.online.lync.com."),
    SRV  ("_sip._tls", 100, 1, 443, "sipdir.online.lync.com."),
    SRV  ("_sipfederationtls._tcp",100, 1, 5061, "sipfed.online.lync.com."),
    CNAME("lyncdiscover", "webdir.online.lync.com."),
    CNAME("enterpriseregistration", "enterpriseregistration.windows.net."),
    CNAME("enterpriseenrollment", "enterpriseenrollment.manage.microsoft.com.")
]

var office365SPF = SPF_BUILDER({
    label: "@",
    overflow: "_spf%d",
    raw: "_rawspf",
    parts: [
      "v=spf1",
      "include:spf.protection.outlook.com",
      "include:sendgrid.net",
      "~all"
    ],
    flatten: [   // fill in any domains to inline.
    ]
    }
)

var office365Services = [
    CNAME("smtp", "smtp.office365.com."),
    CNAME("mail", "outlook.office365.com."),
    CNAME("imap", "outlook.office365.com."),
    CNAME("pop3", "outlook.office365.com."),

    CNAME("m", "outlook.office365.com."),
    CNAME("outlook", "outlook.office365.com."),

    CNAME("delve", "can.delve.office.com."),
    CNAME("excel", "excel.officeapps.live.com."),
    CNAME("graph", "graph.microsoft.com."),
    CNAME("office", "office.live.com."),
    CNAME("oneDrive", "skydrive.wns.windows.com."),
    CNAME("powerpoint", "powerpoint.officeapps.live.com."),
    CNAME("teams", "teams.microsoft.com."),
    CNAME("view", "view.officeapps.live.com."),
    CNAME("visio", "visio.officeapps.live.com."),
    CNAME("word", "word-edit.officeapps.live.com."),
    CNAME("oneNote", "www.onenote.com."),
    CNAME("Tasks", "tasks.office.com."),
    CNAME("Sway", "sway.com."),

    CNAME("agent", "agent.office.net."),
    CNAME("becws", "becws.microsoftonline.com."),
    CNAME("broadcast", "broadcast.officeapps.live.com."),
    CNAME("broadcast-skype", "broadcast.skype.com."),
    CNAME("delve-apc", "apc.delve.office.com."),
    CNAME("delve-aus", "aus.delve.office.com."),
    CNAME("delve-ca", "can.delve.office.com."),
    CNAME("delve-eur", "eur.delve.office.com."),
    CNAME("delve-gbr", "gbr.delve.office.com."),
    CNAME("delve-ind", "ind.delve.office.com."),
    CNAME("delve-jpn", "jpn.delve.office.com."),
    CNAME("delve-kor", "kor.delve.office.com."),
    CNAME("delve-lam", "lam.delve.office.com."),
    CNAME("delve-nam", "nam.delve.office.com."),
    CNAME("delve-us", "delve.office.com."),
    CNAME("hip", "hip.microsoftonline-p.net."),
    CNAME("hipservice", "hipservice.microsoftonline.com."),
    CNAME("nexus", "nexus.microsoftonline-p.com."),
    CNAME("officeclient", "officeclient.microsoft.com."),
    CNAME("oneDrive-admin", "admin.onedrive.com."),
    CNAME("oneDriveMS", "www.onedrive.com."),
    CNAME("quicktips", "quicktips.skypeforbusiness.com."),
    CNAME("static-sharepoint", "static.sharepointonline.com."),
    CNAME("suite", "suite.office.net."),
    CNAME("test", "testConnectivity.microsoft.com."),
    CNAME("webshell", "webshell.suite.office.com."),

    CNAME("clientconfig", "clientconfig.microsoftonline-p.net."),
    CNAME("companymanager", "companymanager.microsoftonline.com."),
    CNAME("device", "device.login.microsoftonline.com."),
    CNAME("files", O365Tenant + "-files.sharepoint.com."),
    CNAME("my-files", O365Tenant + "-myfiles.sharepoint.com."),
    CNAME("my-sharepoint", O365Tenant + "-my.sharepoint.com."),
    CNAME("sharepoint", O365Tenant + ".sharepoint.com."),

    CNAME("autologon", "autologon.microsoftazuread-sso.com."),
    CNAME("login-API", "api.login.microsoftonline.com."),
    CNAME("login-p", "login.microsoftonline-p.com."),
    CNAME("login-us", "login-us.microsoftonline.com."),
    CNAME("login", "login.microsoftonline.com."),
    CNAME("loginCERT", "logincert.microsoftonline.com."),
    CNAME("loginEX", "loginex.microsoftonline.com."),
    CNAME("loginMS", "login.microsoft.com."),
    CNAME("loginO365", "login.microsoftonline.com."),
    CNAME("loginWin", "login.windows.net."),
    CNAME("passwordReset-API", "api.passwordreset.microsoftonline.com."),
    CNAME("passwordReset", "passwordreset.microsoftonline.com.")
]

var gMX= [
    MX("@", 1, "aspmx.l.google.com."),
    MX("@", 5, "alt1.aspmx.l.google.com."),
    MX("@", 5, "alt2.aspmx.l.google.com."),
    MX("@", 10, "alt3.aspmx.l.google.com."),
    MX("@", 10, "alt4.aspmx.l.google.com.")
]

var gServices = [
    CNAME("gCalendar", "calendar.google.com."),
    CNAME("gDrive", "drive.google.com."),
    CNAME("gMail", "mail.google.com."),
    CNAME("gGroups", "groups.google.com.")
]

var awsRegions = [
    CNAME("aws-ap-northeast-2","ap-northeast-2.amazonaws.com."),
    CNAME("aws-ap-northeast-3","ap-northeast-3.amazonaws.com."),
    CNAME("aws-ap-northeast","ap-northeast-1.amazonaws.com."),
    CNAME("aws-osaka","ap-northeast-3.amazonaws.com."),
    CNAME("aws-ap-south","ap-south-1.amazonaws.com."),
    CNAME("aws-ap-southeast-2","ap-southeast-2.amazonaws.com."),
    CNAME("aws-ap-southeast","ap-southeast-1.amazonaws.com."),
    CNAME("aws-beijing","cn-north-1.amazonaws.com.cn."),
    CNAME("aws-ca","ca-central-1.amazonaws.com."),
    CNAME("aws-california","us-west-1.amazonaws.com."),
    CNAME("aws-cn-north","cn-north-1.amazonaws.com.cn."),
    CNAME("aws-china","cn-north-1.amazonaws.com.cn."),
    CNAME("aws-cn-northwest","cn-northwest-1.amazonaws.com.cn."),
    CNAME("aws-eu-central","eu-central-1.amazonaws.com."),
    CNAME("aws-eu-west-2","eu-west-2.amazonaws.com."),
    CNAME("aws-eu-west-3","eu-west-3.amazonaws.com."),
    CNAME("aws-eu-west","eu-west-1.amazonaws.com."),
    CNAME("aws-ireland","eu-west-1.amazonaws.com."),
    CNAME("aws-london","eu-west-2.amazonaws.com."),
    CNAME("aws-mtl","ca-central-1.amazonaws.com."),
    CNAME("aws-mumbai","ap-south-1.amazonaws.com."),
    CNAME("aws-ningxia","cn-northwest-1.amazonaws.com.cn."),
    CNAME("aws-ohio","us-east-2.amazonaws.com."),
    CNAME("aws-paris","eu-west-3.amazonaws.com."),
    CNAME("aws-sa-east","sa-east-1.amazonaws.com."),
    CNAME("aws-saopaulo","sa-east-1.amazonaws.com."),
    CNAME("aws-seoul","ap-northeast-2.amazonaws.com."),
    CNAME("aws-singapore","ap-southeast-1.amazonaws.com."),
    CNAME("aws-sydney","ap-southeast-2.amazonaws.com."),
    CNAME("aws-tokyo","ap-northeast-1.amazonaws.com."),
    CNAME("aws-us-east-2","us-east-2.amazonaws.com."),
    CNAME("aws-us-east","us-east-1.amazonaws.com."),
    CNAME("aws-us-west-2","us-west-2.amazonaws.com."),
    CNAME("aws-oregon","us-west-2.amazonaws.com."),
    CNAME("aws-us-west","us-west-1.amazonaws.com."),
    CNAME("aws-us","us-east-1.amazonaws.com."),
    CNAME("aws-virginia","us-east-1.amazonaws.com."),
    CNAME("aws","ca-central-1.amazonaws.com.")
]

var mediumCustomDomain = [
    A("blog", "52.5.181.79"),
    A("blog", "52.6.3.192"),
    A("blog", "52.4.38.70"),
    A("blog", "52.4.240.221"),
    A("blog", "52.4.225.124"),
    A("blog", "52.4.175.111"),
    A("blog", "52.4.145.119"),
    A("blog", "52.1.173.203"),
    A("blog", "52.1.147.205"),
    A("blog", "52.1.119.170"),
    A("blog", "52.0.16.118"),
    A("blog", "52.6.46.142"),
    CNAME("6b05fafa072b4760f19c659737547f2f.blog", "C70B252B0828913873E9D2FA4A427C28B1AAC5FD.comodoca.com.")
]

var corporate = [
    CNAME("psa","psa-hub.ent.cgi.com."),
    CNAME("workspace","qcap.ent.cginet."),
    CNAME("webm","mail1.cgiclients.com."),
    CNAME("sync","ActiveSync.CGI.com."),
    CNAME("gw","Sera.CGI.com."),
    CNAME("intranet","portal.ent.cgi.com."),
    CNAME("2fa","Member2FA.UA.CGI.com.")
]

var localDevices = [
    A("edge", berlinIP),
    A("fw","172.16.16.1"),
    A("hplaser","172.16.16.100"),
    A("mediaz","172.16.16.216"),
    A("phone","172.16.16.172"),
    A("robot", berlinIP + 1),
    A("w3","127.0.0.1")
]

var defaultDomainName = [
    "coteleblanc",
    "coteleblanc",
    "dicai",
    "dicairestrategies"
]

var defaultDomainExtension = [
    "com",
    "name",
    "re",
    "com"
]

for (index in defaultDomainName) {

    D( defaultDomainName[index] + "." + defaultDomainExtension[index], REG_NONE, DnsProvider(r53,0),
    DefaultTTL("5d"),
    nameServers,
    MX("@", 5, defaultDomainName[index] + "-" + defaultDomainExtension[index] + ".mail.protection.outlook.com."),
    certificates,
    CAA("@", "iodef", "mailto:CSO@" + defaultDomainName[index] + "." + defaultDomainExtension[index], CAA_CRITICAL),
    office365SPF,
    office365Core
    );
}

D("infrax.com", REG_NONE, DnsProvider(r53,0),
    DefaultTTL("5d"),
    nameServers,
    MX("@", 5, "infrax-com" + ".mail.protection.outlook.com."),
    certificates,
    CAA("@", "iodef", "mailto:CSO@" + "Infrax.com", CAA_CRITICAL),
    CAA("@", "issue", "letsencrypt.org"),
    office365SPF,
    office365Core,
    corporate,
    localDevices,
    stageDublin
);

D("dstrategies.com", REG_NONE, DnsProvider(r53,0),
    DefaultTTL("10m"), //
    nameServers,
    MX("@", 5, "dstrategies-com" + ".mail.protection.outlook.com."),
    certificates,
    CAA("@", "iodef", "mailto:CSO@" + "dStrategies.com", CAA_CRITICAL),
    office365SPF,
    office365Core,
    office365Services,
    gServices,
    A("@", "1.2.3.4"),
    CNAME("www", "@")
);

D("4lcatraz.com", REG_NONE, DnsProvider(r53,0),
    DefaultTTL("60m"),
    nameServers,
    MX("@", 5, "4lcatraz-com" + ".mail.protection.outlook.com."),
    certificates,
    CAA("@", "iodef", "mailto:CSO@" + "4lcatraz.com", CAA_CRITICAL),
    office365SPF,
    office365Core,
    A("@", "1.2.3.4"),
    CNAME("www", "@")
);

D("bhdicaire.com", REG_NONE, DnsProvider(r53,0),
    DefaultTTL("10m"),
    nameServers,
    MX("@", 5, "bhdicaire-com" + ".mail.protection.outlook.com."),
    certificates,
    CAA("@", "iodef", "mailto:CSO@" + "BHDicaire.com", CAA_CRITICAL),
    CAA("@", "issue", "comodoca.com"),
    office365SPF,
    office365Core,
    mediumCustomDomain,
    A("brand", "1.2.3.4"),
    CNAME("code", "bhdicaire.github.com."),
    A("@", "1.2.3.4"),
    CNAME("www", "@")
);

D("dicaire.com", REG_NONE, DnsProvider(r53,0),
    DefaultTTL("60m"),
    nameServers,
    MX("@", 5, "dicaire-com" + ".mail.protection.outlook.com."),
    certificates,
    CAA("@", "iodef", "mailto:CSO@" + "Dicaire.com", CAA_CRITICAL),
    office365SPF,
    office365Core,
    office365Services,
    gServices,
    awsRegions,
    CNAME("s3", "bucket.s3-" + s3Location + ".amazonaws.com."),
    TXT("_amazonses","AjQmDhp6xsdy+D+8v2ruK9cDXwxIPlUz5gKejYUwwGs=")
);
