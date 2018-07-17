################################################
## Makefile :   dnsConfiguration
## Modified by: Benoît H. Dicaire
################################################

all :	     preview 
build:	     updateDNS
debug:       pull check preview 
test:        preview
push:	     pull commit updateDNS
push-ticket: pull commitTicket updateDNS

## Variables
SHELL := /bin/bash
build_dir := ~/Code/dnsConfiguration
gitRepository := https://github.com/bhdicaire/dnsConfiguration
configFile := dnsconfig.js
dateStamp := $(shell date "+%Y%m%d")

check:
	which go
	go version
	~/go/bin/dnscontrol version
	~/go/bin/dnscontrol check
	python -m json.tool creds.json
	git status
	
preview:
	~/go/bin/dnscontrol preview
    
pull:
	git pull
	git status

updateDNS:
	~/go/bin/dnscontrol push

commit:
	git add ${configFile}
	git commit -m"Update #${dateStamp} ${configFile} — ${msg}"
	git push

commitTicket:
	git add ${configFile}
	git commit -m"Update DNS configurations with ticket #${ticket}"
	git push
	
setup:
	mkdir -p ${build_dir}
	git clone${gitRepository} ${build_dir}
