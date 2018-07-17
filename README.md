![alt text](https://github.com/bhdicaire/dnsConfiguration/raw/master/img/logo.png "Logo")

I was tired of handling zone files. DNS Management is hard, especially if you manage tons of records with several registrars and many DNS providers. I manage DNS configuration with [StackOverflow's DNSControl](https://stackexchange.github.io/dnscontrol/) and Git.

Your DNS configuration is unique as your ecosystem. These are mine. [Fork this repository](https://github.com/bhdicaire/dnsConfiguration/fork) and make it your own.

## Why would I want my DNS configuration on GitHub?

I don't believe in security by obscurity and I :heart: Github.

I can easily backup, and restore settings for my personal sites. Furthermore, I can share what I have learned and grab new tricks from the community. Don't expect too much, this is my opinionated DNS configuration for my own projects. 
## Installation

1. Install Golang with Homebrew: `brew update; brew install golang`
2. Validate GO version and location (DNSControl can be built with Go version 1.7 or higher): `which go;go version`
3. Ensure the environment variables are adequate (DNSControl will be installed in $GOPATH/bin):
```
	export GOPATH=$HOME/go
	export GOROOT=/usr/local/opt/go/libexec
	export PATH=$PATH:$GOPATH/bin
	export PATH=$PATH:$GOROOT/bin
```

4. Create your GO workspace: `mkdir -p $GOPATH $GOPATH/src $GOPATH/pkg $GOPATH/b`
5. Download the source, compile it, and install DNSControl: `go get github.com/StackExchange/dnscontrol`
6. Create your dnsControl repository: `mkdir -p ~/Code/dnsConfiguration`
6. Clone my repository: `git clone https://github.com/bhdicaire/dnsConfiguration ~/Code/dnsConfiguration`
7. Create your initial Router53 `creds.json` with your own credential:

```
  {
     "r53_main":{
     "KeyId": "abc123",
     "SecretKey": "abc123"
     }
  }
```
8. Modify the `dnsconfig.js` with your provider and DNS zones settings:
	* I'm currently using AWS Route53 and no registrar
	* Refer to the [Documentation](https://stackexchange.github.io/dnscontrol/), especially the [service providers list](https://stackexchange.github.io/dnscontrol/provider-list) 
9. You can use my Makefile to test and deploy the compiled configuration:
	* **make test**: Read live configuration and identify changes to be made, without applying them
	* *make debug*: git pull, check binary version and location, git status, and check dnsconfig.js & creds.json
	* *make build*: push update to providers
	* *make update ticket=abcdef*: git pull, git commit with ticket number, and push update to providers

## Licence

**dnsConfiguration** is [licensed by Benoît H. Dicaire under the MIT License](https://github.com/bhdicaire/dnsConfiguration/blob//master/LICENCE).

## Ressources

* [Introducing DNS Control](https://blog.serverfault.com/2017/04/11/introducing-dnscontrol-dns-as-code-has-arrived/) and the [USENIX presentation](https://www.usenix.org/conference/srecon17americas/program/presentation/peterson)
* [Source repository](https://github.com/StackExchange/dnscontrol)
* *Support*: [Gitter](https://gitter.im/dnscontrol/Lobby), and [Google Groups](https://groups.google.com/forum/#!forum/dnscontrol-discuss)