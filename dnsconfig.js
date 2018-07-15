/*
   dnscontrol configuration file for DICAIRE.com
*/

// Providers:

var REG_NONE = NewRegistrar('none', 'NONE');    // No registrar.
var R53 = NewDnsProvider('r53_main', 'ROUTE53');
var addrA = IP('10.10.10.40')
// Domains:

var stage_subdomains = [];

for(var i=100;i<=123;++i){
    stage_subdomains.push( A('s'+i+'', '192.0.2.'+i));
    stage_subdomains.push( A('*.s'+i+'', '192.0.2.'+i));
}

D('dicairestrategies.com', REG_NONE, DnsProvider(R53),
    DefaultTTL('10m'), // Default for a domain
    A('@', '1.2.3.4'),
    CNAME('www', '@'), // 1.2.3.5
    A('server1', '2.3.4.5'),
    A('robot', addrA + 1), // 1.2.3.5
    stage_subdomains
);
