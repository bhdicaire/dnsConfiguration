// Certificate Authority Authorization https://tools.ietf.org/html/rfc6844
var certificates= [
  CAA("@", "issue", "comodoca.com")
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
    CNAME("123.blog", "c123.comodoca.com.")
]
