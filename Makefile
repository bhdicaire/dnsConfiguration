################################################
## Makefile :   dnsConfiguration
## Modified by: Benoît H. Dicaire
################################################

all :	preview 
build:	push
debug:  pull check preview 
test:   preview
update:	pull commit push

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

push:
	~/go/bin/dnscontrol push

commit:
	git add ${configFile}
	git commit -m"Update ${dateStamp} DNS configurations with ticket #${ticket}"
	git push

setup:
	mkdir -p ${build_dir}
	git clone${gitRepository} ${build_dir}
