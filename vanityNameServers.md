Vanity Name Servers - Route 53

I want to follow Amazon's suggested config to create ns1.mydomain.com,ns2.mydomain.com that ultimately resolves to the same IPs that Amazon's default name servers have.

Vanity Nameservers with AWS Route53

I'm concerned though, about how often Amazon's name servers' IPs will change. Are creating vanity name servers like this considered a good practice? I'll be using this with paying hosting customers so availability/reliability are extremely important to me.
I would use vanity nameservers for two reasons: First, ns1.yourbrand.com will make alot more sense to the client than ns-2048.awsdns-64.com. Second, if you ever decide to move your DNS setup away from Route 53 you have the freedom to do so without having to notify your clients and have them change their NS records again
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

https://glenc.co/essay/2015/12/aws-vanity-nameservers.html
https://www.plesk.com/blog/business-industry/white-label-dns-with-amazon-route53/

-query id

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

----
# AWS Route 53 white label nameserver setup

Also see: [AWS CLI Setup](https://gist.github.com/davejamesmiller/7b68c65497fd18af4d20d7dd3e6c925f)


## Links

- [Route 53 introduction](https://aws.amazon.com/route53/)
- [Official white label documentation](http://docs.aws.amazon.com/Route53/latest/DeveloperGuide/white-label-name-servers.html)
- [CLI documentation](http://docs.aws.amazon.com/cli/latest/reference/route53/index.html#cli-aws-route53)

---
 the glue didn't exist in the org parent zone, then you would not have been able to delegate the domain to the name servers. i

dig +short com. NS
dig +norec @l.gtld-servers.net. dicaire.com NS

dig +trace +additional @l.gtld-servers.net ns1.bhdicaire.com

The Registry database contains ONLY .COM, .NET, .EDU domains and
Registrars. 

whois bhdicaire.com
https://help.hover.com/hc/en-us/articles/217282437
https://www.liquidweb.com/kb/what-is-a-glue-record/

https://toolbox.googleapps.com/apps/dig/#MX/

---


## Check the registrar supports glue records

I think this is standard, but make sure your domain registrar supports configuring glue records. If you want to use IPv6, make sure it supports IPv6 glue records too.

[LCN](https://www.lcn.com/) does not support IPv6 glue records, so I transferred my domain to Route 53 instead.

**Warning:** Transferring a domain can take 5-10 days, and during the transfer you can't change the nameservers - so either do this in advance, or use IPv4 initially and transfer it once it's all working.


## Create a delegation set (reusable group of nameservers)

```bash
aws route53 create-reusable-delegation-set --caller-reference $(date +%s%N)
```

Example output:

```
{
    "Location": "https://route53.amazonaws.com/2013-04-01/delegationset/N244H6F5LUSLJ8",
    "DelegationSet": {
        "NameServers": [
            "ns-39.awsdns-04.com",
            "ns-523.awsdns-01.net",
            "ns-1129.awsdns-13.org",
            "ns-1612.awsdns-09.co.uk"
        ],
        "CallerReference": "1512169214076311809",
        "Id": "/delegationset/N244H6F5LUSLJ8"
    }
}
```

Make a note of the `Id` and `NameServers`.

In case you need to see it again:

```bash
aws route53 list-reusable-delegation-sets
```


## Get the IPv4 and IPv6 addresses

```bash
$ host ns-39.awsdns-04.com
ns-39.awsdns-04.com has address 205.251.192.39
ns-39.awsdns-04.com has IPv6 address 2600:9000:5300:2700::1

$ host ns-523.awsdns-01.net
ns-523.awsdns-01.net has address 205.251.194.11
ns-523.awsdns-01.net has IPv6 address 2600:9000:5302:b00::1

$ host ns-1129.awsdns-13.org
ns-1129.awsdns-13.org has address 205.251.196.105
ns-1129.awsdns-13.org has IPv6 address 2600:9000:5304:6900::1

$ host ns-1612.awsdns-09.co.uk
ns-1612.awsdns-09.co.uk has address 205.251.198.76
ns-1612.awsdns-09.co.uk has IPv6 address 2600:9000:5306:4c00::1
```

Make a note of these - you will need them later.


## Create a hosted zone for the domain

```bash
aws route53 create-hosted-zone --caller-reference $(date +%s%N) --delegation-set-id /delegationset/N244H6F5LUSLJ8 --name davejamesmiller.com
```

Make a note of the `HostedZone > Id`.

(Note: The rest of this can be done via the Console if you prefer.)


## Change the NS records

Change the nameservers to the custom ones and, as recommended in the documentation, also reduce the TTL until we're sure it's working.

```bash
aws route53 change-resource-record-sets --hosted-zone-id /hostedzone/Z2QRBSITGQ197P --change-batch '{
    "Changes": [{
        "Action": "UPSERT",
        "ResourceRecordSet": {
            "Name": "davejamesmiller.com",
            "Type": "NS",
            "ResourceRecords": [
                {"Value": "ns1.davejamesmiller.com."},
                {"Value": "ns2.davejamesmiller.com."},
                {"Value": "ns3.davejamesmiller.com."},
                {"Value": "ns4.davejamesmiller.com."}
            ],
            "TTL": 60
        }
    }]
}'
```


## Change the SOA record

The format of an [SOA record](https://en.wikipedia.org/wiki/SOA_Resource_Record) is:

```
[primary-nameserver] [admin-email] [serial-number] [refresh-time] [retry-time] [expire-time] [negative-cache-ttl]
```

The default is something like this:

```
ns-81.awsdns-10.com. awsdns-hostmaster.amazon.com. 1 7200 900 1209600 86400
```

We will change the primary nameserver, admin email and negative cache TTL:

```bash
aws route53 change-resource-record-sets --hosted-zone-id /hostedzone/Z2QRBSITGQ197P --change-batch '{
    "Changes": [{
        "Action": "UPSERT",
        "ResourceRecordSet": {
            "Name": "davejamesmiller.com",
            "Type": "SOA",
            "ResourceRecords": [
                {"Value": "ns1.davejamesmiller.com. dave.davejamesmiller.com. 1 7200 900 1209600 60"}
            ],
            "TTL": 60
        }
    }]
}'
```


## Create other resource records

I did this by writing zone files and importing them [via the AWS Console](https://console.aws.amazon.com/route53/home#hosted-zones:), to avoid writing lots of JSON in the CLI or manually entering each record in the Console:

```zone
; davejamesmiller.com

; Nameservers - use the IP addresses you found above
ns1 60 IN A    205.251.192.39
ns1 60 IN AAAA 2600:9000:5300:2700::1
ns2 60 IN A    205.251.194.11
ns2 60 IN AAAA 2600:9000:5302:b00::1
ns3 60 IN A    205.251.196.105
ns3 60 IN AAAA 2600:9000:5304:6900::1
ns4 60 IN A    205.251.198.76
ns4 60 IN AAAA 2600:9000:5306:4c00::1

; Other records to import
@   1800 IN MX   10 aspmx.l.google.com.
@   1800 IN MX   20 alt1.aspmx.l.google.com.
@   1800 IN MX   20 alt2.aspmx.l.google.com.
@   1800 IN MX   30 aspmx2.googlemail.com.
@   1800 IN MX   30 aspmx3.googlemail.com.
@   1800 IN MX   30 aspmx4.googlemail.com.
@   1800 IN MX   30 aspmx5.googlemail.com.
@   1800 IN SPF  "v=spf1 include:_spf.google.com ~all"
@   1800 IN A    31.25.184.158
@   1800 IN AAAA 2a02:24e0:eda1:14:dbcd:fe82:1721:6e9d
www 1800 IN A    31.25.184.158
www 1800 IN AAAA 2a02:24e0:eda1:14:dbcd:fe82:1721:6e9d
```

If you prefer to do this via the command line, you may find [cli53](https://github.com/barnybug/cli53) simpler than AWS CLI - but I don't think it works with [MFA enabled](https://gist.github.com/davejamesmiller/90f292d2d9a21bac5f6116296fa64657#enforce-multi-factor-authentication) so I couldn't use it.


## Change nameservers & create glue records for the primary domain

This will vary depending on your domain registrar.

Change the nameservers to the new white label ones (`ns1.davejamesmiller.com`, etc.) **and** enter the IP addresses discovered above where prompted (both IPv4 and IPv6 if supported) to create [glue records](https://wiki.gandi.net/en/glossary/glue-record). e.g.

| Nameserver              | IPv4 (A)        | IPv6 (AAAA)            |
|-------------------------|-----------------|------------------------|
| ns1.davejamesmiller.com | 205.251.192.39  | 2600:9000:5300:2700::1 |
| ns2.davejamesmiller.com | 205.251.194.11  | 2600:9000:5302:b00::1  |
| ns3.davejamesmiller.com | 205.251.196.105 | 2600:9000:5304:6900::1 |
| ns4.davejamesmiller.com | 205.251.198.76  | 2600:9000:5306:4c00::1 |

If the domain is registered with Route 53 you can do this via the CLI:

```bash
aws route53domains --region us-east-1 update-domain-nameservers --domain-name davejamesmiller.com --nameservers Name=ns1.davejamesmiller.com,GlueIps=205.251.192.39,2600:9000:5300:2700::1 Name=ns2.davejamesmiller.com,GlueIps=205.251.194.11,2600:9000:5302:b00::1 Name=ns3.davejamesmiller.com,GlueIps=205.251.196.105,2600:9000:5304:6900::1 Name=ns4.davejamesmiller.com,GlueIps=205.251.198.76,2600:9000:5306:4c00::1
```

Then check it worked:

```bash
whois davejamesmiller.com

dig ns com
dig ns davejamesmiller.com @a.gtld-servers.net
dig a davejamesmiller.com @ns1.davejamesmiller.com
```

You should also use a tool like [Pingdom DNS check](http://dnscheck.pingdom.com/) to verify everything is configured correctly.


## Change the TTLs to their normal values

Next we want to change all of the 60 second TTLs back to more reasonable values.

The default values in AWS are:

- **NS record TTL:** 172800 (48 hours)
- **SOA record TTL:** 900 (15 minutes)
- **Negative cache TTL:** 86400 (24 hours) *(this is the last value in the SOA record)*
- **A record TTL:** 300 (5 minutes)
- **Nameserver A record TTL:** 172800 (48 hours)

While my [previous DNS provider](https://www.memset.com/) used these values:

- **NS record TTL:** 7200 (2 hours)
- **SOA record TTL:** 2560 (43 minutes)
- **Negative cache TTL:** 2560 (43 minutes)
- **A record TTL:** 1800 (30 minutes)
- **Nameserver A record TTL:** 1800 (30 minutes)

I decided to use these values:

- **NS record TTL:** 7200 (2 hours)
- **SOA record TTL:** 7200 (2 hours)
- **Negative cache TTL:** 300 (5 minutes)
- **A record TTL:** 1800 (30 minutes)
- **Nameserver A record TTL:** 86400 (24 hours)

Again I did this manually in the console, to avoid writing lots of JSON in the CLI.


## Update the other domains

Finally, start using the nameservers for other domains too:

```bash
# Create hosted zone using the same delegation set
aws route53 create-hosted-zone --caller-reference $(date +%s%N) --delegation-set-id /delegationset/N244H6F5LUSLJ8 --name djm.me

# Change the NS records
aws route53 change-resource-record-sets --hosted-zone-id /hostedzone/Z1CFBKQ43TFSS9 --change-batch '{
    "Changes": [{
        "Action": "UPSERT",
        "ResourceRecordSet": {
            "Name": "djm.me",
            "Type": "NS",
            "ResourceRecords": [
                {"Value": "ns1.davejamesmiller.com."},
                {"Value": "ns2.davejamesmiller.com."},
                {"Value": "ns3.davejamesmiller.com."},
                {"Value": "ns4.davejamesmiller.com."}
            ],
            "TTL": 7200
        }
    }]
}'

# Change the SOA record
aws route53 change-resource-record-sets --hosted-zone-id /hostedzone/Z1CFBKQ43TFSS9 --change-batch '{
    "Changes": [{
        "Action": "UPSERT",
        "ResourceRecordSet": {
            "Name": "djm.me",
            "Type": "SOA",
            "ResourceRecords": [
                {"Value": "ns1.davejamesmiller.com. dave.davejamesmiller.com. 1 7200 900 1209600 300"}
            ],
            "TTL": 7200
        }
    }]
}'

# Create other resource records as needed...

# Set the nameservers with the registrar (no glue records this time)
aws route53domains --region us-east-1 update-domain-nameservers --domain-name djm.me --nameservers Name=ns1.davejamesmiller.com Name=ns2.davejamesmiller.com Name=ns3.davejamesmiller.com Name=ns4.davejamesmiller.com
```