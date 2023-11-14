![logo](./logo.png)

I was tired of handling zone files. DNS Management is hard, especially if you manage tons of records with several registrars and many DNS providers. I manage DNS configuration with [StackOverflow's DNSControl](https://stackexchange.github.io/dnscontrol/) and Git.

Your DNS configuration is unique as your ecosystem. These are mine. [Fork this repository](https://github.com/bhdicaire/dnsConfiguration/fork) and make it your own.

## Why would I want my DNS configuration on GitHub?

I don't believe in security by obscurity and I :heart: Github.

Don't expect too much, this is my [opinionated DNS configuration](https://stackexchange.github.io/dnscontrol/opinions) for my own projects.

I can easily backup, and restore settings for my personal sites. Furthermore, I can share what I have learned and grab new tricks from the community. Refer to my [documentation](https://github.com/bhdicaire/dnsConfiguration/blob/master/vanityNameServers.md), to setup vanity name servers on Route 53 — I spent more time than I'd like to admit on this topic.

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
7. Create your initial `creds.json` with your own credential, you can use `samples/creds.json` to accelerate your setup
8. Modify the `dnsconfig.js` with your provider and DNS zones settings:
	* I'm currently using [AWS Route53 as service provider](https://stackexchange.github.io/dnscontrol/provider-list) and no registrar
	* Refer to the [Documentation](https://stackexchange.github.io/dnscontrol/) for the language spec

- Get an api token or api key from your DNS provider or registrar, the currently supported providers all have their own ways of doing this but you should look at restricting the key/token to only make DNS changes.

- Fill out the `creds.json` file with your key/token, each provider requires a different name for their credentials so you should look at the [documentation provided.](https://stackexchange.github.io/dnscontrol/provider-list)
### Hints & tips

Refer to `lib/example.js`,

* [What is my IP](https://www.whatismyip.com/)
* [API to get your public IP in JSon](https://api.ipgeolocation.io/getip)

Check that your provider is supported!
Click on "Use this Template" to make a copy of this repository
Update dnscontrol.js to use your provider and include your domain records (using the migration guide linked below)
Rename creds.example.json to creds.json and update for your chosen provider (DON'T COMMIT THIS)
Use dnscontrol preview to check that everything is setup correctly - if you're simply migrating this shouldn't find any changes
Now you're ready to make changes via DNScontrol!
## Workflow

1. Modify the configuration file with your favorite text editor
2. Identify the next step with `make help`:
```
test		Read configuration and identify changes to be made, without applying them
debug		Run test above and check configuration
build		Deploy configuration to DNS servers
push		Build above and commit changes to Git, you may use msg=abc or ticket=123
archive		Build above, copy configuration to archive subfolder, and commit to Git
clean		Delete dnsConfig.json and archive subfolder
help		This information
```
3. Test your changes with `make test` or use `make debug` if you're stuck
4. Fix all all warnings/ errors with your favorite text editor
5. Deploy the compiled configuration to your dns servers with `make build`
6. When everything is *perfect*, deploy the change one more time and commit the change to Git:
	* `make push` or `make push msg="Add Dicaire.com"` or `make push ticket=A123456`
7. Close your change management ticket :grin:
## Licence
**DNS Control** is [Copyright 2015 Stack Overflow and licensed under the MIT licence](https://github.com/StackExchange/dnscontrol/blob/master/LICENSE).

**dnsConfiguration** is [Copyright 2018 Benoît H. Dicaire and licensed under the MIT licence](https://github.com/bhdicaire/dnsConfiguration/blob//master/LICENCE).

## DNS Control ressources
[![Gitter chat](https://badges.gitter.im/dnscontrol/Lobby.png)](https://gitter.im/dnscontrol/Lobby)
[![Google Group chat](https://img.shields.io/badge/google%20group-chat-green.svg)](https://groups.google.com/forum/#!forum/dnscontrol-discuss)

* [Introducing DNS Control](https://blog.serverfault.com/2017/04/11/introducing-dnscontrol-dns-as-code-has-arrived/) and the [USENIX presentation](https://www.usenix.org/conference/srecon17americas/program/presentation/peterson)
* Github source repository: [StackExchange/dnscontrol](https://github.com/StackExchange/dnscontrol)
