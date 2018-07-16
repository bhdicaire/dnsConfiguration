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
date := `date +%Y%m%d`
gitRepository := https://github.com/bhdicaire/dnsConfiguration

preview:
	~/go/bin/dnscontrol preview

creds:
	python -m json.tool creds.json
    
pull:
	git pull

status:
	git status

push:
	~/go/bin/dnscontrol push

archive:
	/usr/bin/zip ${build_dir}/${date}-backup
	git add -A
	git commmit -m"${date} release"
	git push

clean :
	#rm -rf ${build_dir}
	rm *backup

setup:
	mkdir -p ${build_dir}
	git clone${gitRepository} ${build_dir}
