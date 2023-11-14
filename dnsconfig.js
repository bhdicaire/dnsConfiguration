require("cloudFlare.js")
var cloudFlare = NewDnsProvider("cloudFlare", {"manage_redirects": true}); // enable manage_redirects

var REG_NONE = NewRegistrar("none");

require_glob("./domains/");
