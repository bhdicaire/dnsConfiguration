![alt text](https://github.com/bhdicaire/dnsConfiguration/raw/master/img/logo.png "Logo")

I was tired of handling hand crafted zone files. DNS Management is hard, especially if you manage thousands of records with several registrars and many DNS providers. I manage DNS configuration with [StackOverflow's DNSControl](https://stackexchange.github.io/dnscontrol/) and [store releases with Git](https://stackexchange.github.io/dnscontrol/release-engineering).

Your DNS configuration is unique as your ecosystem. These are mine. [Fork this repository](https://github.com/bhdicaire/dnsConfiguration/fork) and make it your own.

## Why would I want my DNS configuration on GitHub?

I don't believe in security by obscurity and I :heart: Github.

I can easily backup, and restore settings for my personal sites. Furthermore, I can share what I have learned and grab new tricks from the community. Don't expect too much, this is my opinionated [domain specific language](https://stackexchange.github.io/dnscontrol/js) DNS configuration for my own projects. 
## Installation

1. Install Golang with Homebrew:

`brew update`
`brew install golang`
2. Validate GO version and location (DNSControl can be built with Go version 1.7 or higher):

```go version```

```which go```
3. Ensure the environment variables are adequate:
```
export GOPATH=$HOME/go
export GOROOT=/usr/local/opt/go/libexec
export PATH=$PATH:$GOPATH/bin
export PATH=$PATH:$GOROOT/bin```
```
DNSControl will be installed in $GOPATH/bin :grin:
4. Create your GO workspace:

```mkdir -p $GOPATH $GOPATH/src $GOPATH/pkg $GOPATH/b```
5. Download the source, compile and install DNSControl:

```go get github.com/StackExchange/dnscontrol```
6. Clone my repository

```git clone https://github.com/bhdicaire/dnsConfiguration ~/Code/dnsConfiguration```
7. Create your initial ```creds.json``` with your credentials:

```{
 "r53_main":{
      "KeyId": "abc123",
      "SecretKey": "abc123"
 }
}```
8. Modify the ```dnsconfig.js``` with your providers and DNS zones settings.
 * Refer to the [service providers list](https://stackexchange.github.io/dnscontrol/provider-list) for more information
 * I use the makefile to test and deploy the compiled configurations (e.g. make test or make deploy)

## Licence

**dnsConfiguration** is licensed by [Benoît H. Dicaire under the MIT License)(https://github.com/bhdicaire/dnsConfiguration/blob//master/LICENCE).

## Ressources

* [Introducing DNSControl](https://blog.serverfault.com/2017/04/11/introducing-dnscontrol-dns-as-code-has-arrived/)
* [Documentation](https://stackexchange.github.io/dnscontrol/)
* [Repository](https://github.com/StackExchange/dnscontrol)
* [Presentation](https://www.usenix.org/conference/srecon17americas/program/presentation/peterson)


 * [DNSControl: DNS as Code from StackOverflow.com](https://www.usenix.org/conference/srecon17americas/program/presentation/peterson)
 * [DNSControl source](https://github.com/StackExchange/dnscontrol)
 * Support: 
   *  [Google](https://groups.google.com/forum/#!forum/dnscontrol-discuss)
   * [Gitter](https://gitter.im/dnscontrol/Lobby)
