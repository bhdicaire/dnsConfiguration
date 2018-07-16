################################################
## Makefile :   dnsConfiguration
## Modified by: Benoît H. Dicaire
################################################

all :	creds preview 
build:	push
update:	pull build archive

## Variables
SHELL := /bin/bash
build_dir := ~/Code/dnsConfiguration

gitRepository := https://github.com/bhdicaire/dnsConfiguration
configFile := dnsconfig.js

preview:
	~/go/bin/dnscontrol preview

qa:
	~/go/bin/dnscontrol version
	~/go/bin/dnscontrol check
	~/go/bin/dnscontrol printy-ir
	
creds:
	python -m json.tool creds.json
    
pull:
	git pull

status:
	git status

push:
	~/go/bin/dnscontrol push

archive:
	export archiveDate `date +%Y%m%d`
	/usr/bin/zip ${configFile} ${build_dir}/${archiveDate}-backup
	git add -A
	git commmit -m"${date} release"
	#git push

clean :
	#rm -rf ${build_dir}
	rm *backup

setup:
	mkdir -p ${build_dir}
	magit clone${gitRepository} ${build_dir}
