/*
   dnscontrol configuration file for DICAIRE.com
*/

var REG_NONE = NewRegistrar('none', 'NONE');    // No registrar.
var R53 = NewDnsProvider('r53_main', 'ROUTE53');
var O365Tenant = "DicaireStrategies-com"

var berlinIP = IP('10.10.10.40')
var s3Location = "ca-central-1"; 

var stage_subdomains = [];

for(var i=100;i<=110;++i){
    stage_subdomains.push( A('s'+i+'', '192.0.2.'+i));
    stage_subdomains.push( A('*.s'+i+'', '192.0.2.'+i));
}

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
    flatten: [
      // fill in any domains to inline.
    ]
}
)
  // 
var gHost= [
    MX('@', 1, 'aspmx.l.google.com.'),
    MX('@', 5, 'alt1.aspmx.l.google.com.'),
    MX('@', 5, 'alt2.aspmx.l.google.com.'),
    MX('@', 10, 'alt3.aspmx.l.google.com.'),
    MX('@', 10, 'alt4.aspmx.l.google.com.'),
    CNAME('calendar', 'ghs.googlehosted.com.'),
    CNAME('drive', 'ghs.googlehosted.com.'),
    CNAME('mail', 'ghs.googlehosted.com.'),
    CNAME('groups', 'ghs.googlehosted.com.'),
    CNAME('sites', 'ghs.googlehosted.com.'),
    CNAME('start', 'ghs.googlehosted.com.')
]

var gServices = [
    CNAME('gCalendar', 'calendar.google.com.'),
    CNAME('gDrive', 'drive.google.com.'),
    CNAME('gMail', 'mail.google.com.'),
    CNAME('gGroups', 'groups.google.com.'),
]

var office365Core = [

    CNAME('autodiscover', 'autodiscover.outlook.com.'),
    CNAME('sip','sipdir.online.lync.com.'),
    SRV  ('_sip._tls', 100, 1, 443, 'sipdir.online.lync.com.'),
    SRV  ('_sipfederationtls._tcp',100, 1, 5061, 'sipfed.online.lync.com.'),
    CNAME('lyncdiscover', 'webdir.online.lync.com.'),
    CNAME('enterpriseregistration', 'enterpriseregistration.windows.net.'),
    CNAME('enterpriseenrollment', 'enterpriseenrollment.manage.microsoft.com.'), 
]

var office365Services = [
    CNAME('smtp', 'smtp.office365.com.'),
    CNAME('mail', 'outlook.office365.com.'),
    CNAME('imap', 'outlook.office365.com.'),
    CNAME('pop3', 'outlook.office365.com.'),
    
    CNAME('m', 'outlook.office365.com.'),
    CNAME('outlook', 'outlook.office365.com.'),

    CNAME('delve', 'can.delve.office.com.'),
    CNAME('excel', 'excel.officeapps.live.com.'),
    CNAME('graph', 'graph.microsoft.com.'),
    CNAME('office', 'office.live.com.'),
    CNAME('oneDrive', 'skydrive.wns.windows.com.'),
    CNAME('powerpoint', 'powerpoint.officeapps.live.com.'),
    CNAME('teams', 'teams.microsoft.com.'),
    CNAME('view', 'view.officeapps.live.com.'),
    CNAME('visio', 'visio.officeapps.live.com.'),
    CNAME('word', 'word-edit.officeapps.live.com.'),        
    CNAME('oneNote', 'www.onenote.com.'),
    CNAME('Tasks', 'tasks.office.com.'),
    CNAME('Sway', 'sway.com.'),
    
    CNAME('agent', 'agent.office.net.'),
    CNAME('becws', 'becws.microsoftonline.com.'),
    CNAME('broadcast', 'broadcast.officeapps.live.com.'),
    CNAME('broadcast-skype', 'broadcast.skype.com.'),
    CNAME('delve-apc', 'apc.delve.office.com.'),
    CNAME('delve-aus', 'aus.delve.office.com.'),
    CNAME('delve-ca', 'can.delve.office.com.'),
    CNAME('delve-eur', 'eur.delve.office.com.'),
    CNAME('delve-gbr', 'gbr.delve.office.com.'),
    CNAME('delve-ind', 'ind.delve.office.com.'),
    CNAME('delve-jpn', 'jpn.delve.office.com.'),
    CNAME('delve-kor', 'kor.delve.office.com.'),
    CNAME('delve-lam', 'lam.delve.office.com.'),
    CNAME('delve-nam', 'nam.delve.office.com.'),
    CNAME('delve-us', 'delve.office.com.'),
    CNAME('hip', 'hip.microsoftonline-p.net.'),
    CNAME('hipservice', 'hipservice.microsoftonline.com.'),
    CNAME('nexus', 'nexus.microsoftonline-p.com.'),
    CNAME('officeclient', 'officeclient.microsoft.com.'),
    CNAME('oneDrive-admin', 'admin.onedrive.com.'),
    CNAME('oneDriveMS', 'www.onedrive.com.'),
    CNAME('quicktips', 'quicktips.skypeforbusiness.com.'),
    CNAME('static-sharepoint', 'static.sharepointonline.com.'),
    CNAME('suite', 'suite.office.net.'),
    CNAME('test', 'testConnectivity.microsoft.com.'),
    CNAME('webshell', 'webshell.suite.office.com.'),

    CNAME('clientconfig', 'clientconfig.microsoftonline-p.net.'),
    CNAME('companymanager', 'companymanager.microsoftonline.com.'),
    CNAME('device', 'device.login.microsoftonline.com.'),
    CNAME('files', O365Tenant + '-files.sharepoint.com.'),
    CNAME('my-files', O365Tenant + '-myfiles.sharepoint.com.'),
    CNAME('my-sharepoint', O365Tenant + '-my.sharepoint.com.'),
    CNAME('sharepoint', O365Tenant + '.sharepoint.com.'),
        
    CNAME('autologon', 'autologon.microsoftazuread-sso.com.'),
    CNAME('login-API', 'api.login.microsoftonline.com.'),
    CNAME('login-p', 'login.microsoftonline-p.com.'),
    CNAME('login-us', 'login-us.microsoftonline.com.'),
    CNAME('login', 'login.microsoftonline.com.'),
    CNAME('loginCERT', 'logincert.microsoftonline.com.'),
    CNAME('loginEX', 'loginex.microsoftonline.com.'),
    CNAME('loginMS', 'login.microsoft.com.'),    
    CNAME('loginO365', 'login.microsoftonline.com.'),
    CNAME('loginWin', 'login.windows.net.'),
    CNAME('passwordReset-API', 'api.passwordreset.microsoftonline.com.'),
    CNAME('passwordReset', 'passwordreset.microsoftonline.com.')
]

D('infrax.com', REG_NONE, DnsProvider(R53),
    DefaultTTL('5d'), 
    MX("@", 5, "infrax-com.mail.protection.outlook.com."),
    office365SPF,
    office365Core,
    A("hplaser","172.16.16.100"),
    A("mediaz","172.16.16.216"),
    A("fw","172.16.16.1"),
    A("edge", berlinIP),
    A('robot', berlinIP + 1), 
    CNAME("f", "bucket.s3-" + s3Location + ".amazonaws.com."),
    stage_subdomains
);

D('dicairestrategies.com', REG_NONE, DnsProvider(R53),
    DefaultTTL('60m'), 
    MX("@", 5, O365Tenant + ".mail.protection.outlook.com."),
    office365SPF,
    office365Core
);

D('dstrategies.com', REG_NONE, DnsProvider(R53),
    DefaultTTL('10m'), 
    MX("@", 5, O365Tenant + ".mail.protection.outlook.com."),
    office365SPF,
    office365Core,
    office365Services,
    gServices,
    A('@', '1.2.3.4'),
    CNAME('www', '@')
);

D('bhdicaire.com', REG_NONE, DnsProvider(R53),
    DefaultTTL('10m'), 
    MX("@", 5, "bhdicaire-com.mail.protection.outlook.com."),
    office365SPF,
    office365Core,
    A('@', '1.2.3.4'),
    CNAME('www', '@'),
    CNAME("blog", "gracious-varahamihira-35ff13.netlify.com.")
);

D('dicaire.com', REG_NONE, DnsProvider(R53),
    DefaultTTL('60m'), 
    MX("@", 5, "dicaire-com.mail.protection.outlook.com."),
    office365SPF,
    office365Core,
    office365Services,
    gServices
);


D('dicai.re', REG_NONE, DnsProvider(R53),
    DefaultTTL('60m'), 
    MX("@", 5, "dicai-re.mail.protection.outlook.com."),
    office365SPF,
    office365Core
);

D('coteleblanc.com', REG_NONE, DnsProvider(R53),
    DefaultTTL('5d'), 
    MX("@", 5, "coteleblanc-com.mail.protection.outlook.com."),
    office365SPF,
    office365Core
);