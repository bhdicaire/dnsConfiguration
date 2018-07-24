all :	     help
build:	     banner updateDNS
push:	     banner pull gitCommit updateDNS
test:        banner preview

###############################################################################

programName       := dnsConfiguration
programVersion    := 0.4
programSource     := https://github.com/bhdicaire/dnsConfiguration
modifiedBy        := Benoît H. Dicaire — BH@Dicaire.com

SHELL             := /bin/bash
RM                := /bin/rm -f
makeLocation      := `which make`
makeVersion       := `make -v|grep GNU`
goLocation        := `which go`
goVersion         := `go version`
dnsControl        := ~/go/bin/dnscontrol
dnsControlVersion := `~/go/bin/dnscontrol version`
dateStamp         := $(shell date "+%Y%m%d")
 
normalText        := "\033[0m"
boldText          := "\033[1m"
italicText        := "\033[3m"
tab               := "\t"
2tab              := "\t\t"
tabNormal         := $(tab)$(normalText)
tabBold           := $(tab)$(boldText)

buildDir          := ~/Code/dnsConfiguration
gitRepository     := https://github.com/bhdicaire/dnsConfiguration
configFile        := dnsconfig.js

###############################################################################

clean: banner
	@echo -e  $(boldText)"\n##########" $(tab)Remove dnsConfig.json and archive subFolder"\n"$(normalText)
	@$(RM) dnsConfig.json
	@$(RM) -r archive
	@printf "\n\n"	

.PHONY: debug	
debug:
	@clear
	@$(MAKE) banner
	@$(MAKE) pull
	@echo -e $(tabNormal)GO Location:$(tabBold)$(2tab)$(goLocation)$(tabNormal)
	@echo -e $(tabNormal)GO version:$(tabBold)$(2tab)$(goVersion)$(tabNormal)
	@echo -e $(tabNormal)DNS Control version:$(tabBold)$(tab)$(dnsControlVersion)$(tabNormal)
	@echo -e  $(boldText)"\n##########" $(tab)DNS Control: check$(tabNormal)"\n"
	@$(dnsControl) check
	@echo -e  $(boldText)"\n##########" $(tab)Test creds.json$(tabNormal)"\n"
	@python -m json.tool creds.json
	@echo -e  $(boldText)"\n##########" $(tab)Generate JSON for debugging purpose:$(normalText)"\t"$(buildDir) "—>" dnsConfig.json$(tabNormal)
	@$(dnsControl) print-ir --out dnsConfig.json --pretty
	@echo -e  $(boldText)"\n##########" $(tab)Git status$(tabNormal)"\n"
	@git status
	@$(MAKE) preview

preview:
	@echo -e  $(boldText)"\n\n##########" $(tab)DNS Control: preview$(tabNormal)"\n"
	@$(dnsControl) preview
	@printf "\n\n"
    
updateDNS:
	@echo -e  $(boldText)"\n\n##########" $(tab)DNS Control: push$(tabNormal)"\n"
	@$(dnsControl) push
	@printf "\n\n"

gitCommit:
	$(MAKE) triage
	@echo -e  $(boldText)"\n\n##########" $(tab)Git add ${configFile}$(tabNormal)"\n"
	git add ${configFile}
	@echo -e  $(boldText)"\n\n##########" $(tab)Git commit: $(gitMsg)$(tabNormal)"\n"	
	git commit -m$(gitMsg)
	@echo -e  $(boldText)"\n\n##########" $(tab)Git push$(tabNormal)"\n"	
	git push
	@printf "\n\n"

.PHONY: gitArchive	
gitArchive:
	$(MAKE) banner
	$(MAKE) pull
	@echo -e  $(boldText)"\n\n##########" $(tab)Archive ${configFile}$(tabNormal)"\n"
	@mkdir -p archive
	@cp $(configFile) archive/$(dateStamp)" "$(configFile)
	@echo -e  $(boldText)"\n\n##########" $(tab)Git add archive$(tabNormal)"\n"	
	@git add archive
	@git commit -m"Update DNS configuration and archive — $(dateStamp)"
	@echo -e  $(boldText)"\n\n##########" $(tab)Git push$(tabNormal)"\n
	@git push
	@printf "\n\n"
	$(MAKE) updateDNS
	
banner:
	@printf "\n\n"
	@echo -e $(normalText)
	@printf "###################################################################################################\n\n"	
	@echo -e "\t$(programName) — v$(programVersion)" $(italicText)"with" $(normalText)"$(makeVersion) [$(makeLocation)]\n"
	@echo -e "\tsource:\t\t$(programSource)"
	@printf "\tmodified by:\t$(modifiedBy)\n\n"
	@printf "###################################################################################################\n\n"
		
help:
	@$(MAKE) banner
	@echo -e $(boldText)"\n\tTarget\t\tFunction\n"$(normalText)

	@printf "\ttest\t\tRead configuration and identify changes to be made, without applying them\n"
	@printf "\tdebug\t\tRun test above and check configuration\n"
	@printf "\tbuild\t\tDeploy configuration to DNS servers\n"
	@printf "\tpush\t\tBuild above and commit changes to Git, you may use msg=abc or ticket=123\n"
	@printf "\tarchive\t\tBuild above, copy configuration to archive subfolder, and commit to Git\n"
	@printf "\tclean\t\tDelete dnsConfig.json and archive subfolder\n"
	@printf "\thelp\t\tThis information\n"	
	@printf "\n\n"

triage:
ifdef ticket
gitMsg = "Update DNS configurations with ticket \#"$(ticket)
else ifdef msg
gitMsg = "Update "${dateStamp} ${configFile}" — "$(msg)
else
gitMsg = "Update DNS configuration — "$(dateStamp)
endif

setup:
	@mkdir -p ${buildDir}
	@git clone${gitRepository} ${buildDir}
	
pull:
	@printf "\n\n"
	@echo -e  $(boldText)"\n##########" $(tab)Git pull$(tabNormal)"\n"
	@git pull
	@echo -e  $(boldText)"\n##########" $(tab)Git status$(tabNormal)"\n"
	@git status
	