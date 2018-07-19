Vanity Name Servers - Route 53

I want to follow Amazon's suggested config to create ns1.mydomain.com,ns2.mydomain.com that ultimately resolves to the same IPs that Amazon's default name servers have.

I'm concerned though, about how often Amazon's name servers' IPs will change. Are creating vanity name servers like this considered a good practice? I'll be using this with paying hosting customers so availability/reliability are extremely important to me.

Configuring White Label Name Servers
https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/white-label-name-servers.html

If a domain does not exist in your Route53 account, DNSControl will not automatically add it with the `create-domains command. You can do that either manually via the control panel, or via the command dnscontrol create-domains command.
Ref https://stackexchange.github.io/dnscontrol/providers/route53
I prefer ...

Now most of my domains use these four nameservers.

https://glenc.co/essay/2015/12/aws-vanity-nameservers.html
Step 1: Create a Route 53 reusable delegation set

Step 2: Create or recreate Amazon Route 53 hosted zones, and change the TTL for NS and SOA records

You cannot change the name servers that are associated with an existing hosted zone. You can associate a reusable delegation set with a hosted zone only when you create the hosted zone.


            "ns-1151.awsdns-15.org",
            "ns-629.awsdns-14.net",
            "ns-192.awsdns-24.com",
           "ns-1927.awsdns-48.co.uk"
            
            
dig a ns-1151.awsdns-15.org ns-629.awsdns-14.net ns-192.awsdns-24.com ns-1927.awsdns-48.co.uk +short

dig aaaa ns-1151.awsdns-15.org ns-629.awsdns-14.net ns-192.awsdns-24.com ns-1927.awsdns-48.co.uk +short

dig A ns-648.awsdns-17.net ns-114.awsdns-14.com  ns-1140.awsdns-14.org  ns-1857.awsdns-40.co.uk +short
dig AAAA ns-648.awsdns-17.net ns-114.awsdns-14.com  ns-1140.awsdns-14.org  ns-1857.awsdns-40.co.uk +short


ns-1151.awsdns-15.org ns-629.awsdns-14.net ns-192.awsdns-24.com ns-1927.awsdns-48.co.uk
205.251.196.127
205.251.194.117
205.251.192.192
205.251.199.135

2600:9000:5304:7f00::1
2600:9000:5302:7500::1
2600:9000:5300:c000::1
2600:9000:5307:8700::1


SOA: ns1.coteleblanc.com. hostmaster.dicaire.com 2 7200 900 1209600 86400

AAAA




dogbert:dnsConfiguration bhdicaire$ aws route53 list-reusable-delegation-sets --profile aws-dns
{
    "DelegationSets": [
        {
            "Id": "/delegationset/NJ43142QU43FF",
            "CallerReference": "ABC.01",
            "NameServers": [
                "ns-648.awsdns-17.net",
                "ns-1140.awsdns-14.org",
                "ns-114.awsdns-14.com",
                "ns-1857.awsdns-40.co.uk"
            ]
        }
    ],
    "IsTruncated": false,
    "MaxItems": "100"
}

----

dogbert:~ bhdicaire$ aws route53 create-reusable-delegation-set --caller-reference dicaire.01 --profile aws-dns

{
    "Location": "https://route53.amazonaws.com/2013-04-01/delegationset/N1B5ZMA0BN541U",
    "DelegationSet": {
        "Id": "/delegationset/N1B5ZMA0BN541U",
        "CallerReference": "dicaire.01",
        "NameServers": [
            "ns-1151.awsdns-15.org",
            "ns-629.awsdns-14.net",
            "ns-192.awsdns-24.com",
            "ns-1927.awsdns-48.co.uk"
        ]
    }
}



----
aws route53 create-reusable-delegation-set --caller-reference dicaire.01 --profile aws-dns

aws route53 create-hosted-zone --caller-reference dicaire.02 --name dicaire.com --delegation-set-id "/delegationset/N1B5ZMA0BN541U" --profile aws-dns
aws route53 list-hosted-zones --delegation-set-id "/delegationset/N1B5ZMA0BN541U" --profile aws



aws route53 --profile aws-dns change-resource-record-sets --hosted-zone-id "/hostedzone/Z1O9YE22CGVCBB" --change-batch '{
    "Changes": [{
        "Action": "UPSERT",
        "ResourceRecordSet": {
            "Name": "dicai.re",
            "Type": "SOA",
            "ResourceRecords": [
                {"Value": "ns1.dicai.re. CSO@Dicaire.com. 5 7200 900 1209600 60"}
            ],
            "TTL": 60
        }
    }]
}'