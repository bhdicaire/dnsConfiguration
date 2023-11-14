// Source: https://github.com/gbe0/dnscontrol-office365

/**
 * Generate MX record for Office 365
 *
 * @param guid {string} The domain GUID
 * @param ttl {integer=} The TTL of the record
 * @returns {MX(...)} The MX record object containing the MX record
 * @example
 *  - Office365MX("example-com")
 *  - Office365MX("example-com", 300)
 */
function Office365MX(guid, ttl) {
  // Ensure the domain GUID was provided
  if (!guid) {
    throw new Error("Office365MX: Domain GUID is required");
  }

  // Generate MX target
  var target = guid + "." + OFFICE365_MX + ".";

  // Set default TTL if not provided
  ttl = ttl || TTL_DEFAULT;

  // Return the generated MX record
  return MX("@",  OFFICE365_MX_PRIORITY,  target, ttl);
}

/**
 * Generate DKIM CNAME records for Office 365
 *
 * @param guid {string} The domain GUID
 * @param tenant {string} The office 365 tenant name
 * @param ttl {integer=} The TTL of the records
 * @returns {array[CNAME(...),CNAME(...)]} The array of CNAME's containing the DKIM records
 * @example
 *  - Office365DKIM("example-com")
 *  - Office365DKIM("example-com", "example")
 */
function Office365DKIM(guid, tenant, ttl) {
  // Ensure the domain GUID was provided
  if (!guid) {
    throw new Error("Office365DKIM: Domain GUID is required");
  }

  // Ensure the tenant was provided
  tenant = tenant || OFFICE365_TENANT;

  // Set the TTL if not defined
  ttl = ttl || TTL_DEFAULT;

  // Create array of empty records to return
  var records = [];

  // Generate 2 DKIM CNAME records (selector 1 and selector 2)
  for (var i = 1; i < 3; i++) {
    // Generate record
    var label = "selector" + i + "._domainkey";
    var target = "selector" + i + "-" + guid + "._domainkey." + tenant + ".onmicrosoft.com.";
    var record = CNAME(label, target, ttl, CF_PROXY_OFF);

    // Add record to list of records to return
    records.push(record);
  }

  // Return the generated records
  return records;
}

/**
 * Generate Outlook autodiscover record for Office 365
 *
 * @param ttl {integer} The TTL of the record
 * @returns {CNAME(...)} The CNAME record
 * @example
 *  - Office365AutoDiscoverOutlook(3600)
 */
function Office365AutoDiscoverOutlook(ttl) {
  // Set the TTL if not defined
  ttl = ttl || TTL_DEFAULT;

  // Return the generated record
  return CNAME("autodiscover",  "autodiscover.outlook.com.",  ttl,  CF_PROXY_OFF);
}

/**
 * Generate Lync autodiscover records for Office 365
 *
 * @param ttl {integer} The TTL of the records
 * @returns {array[CNAME(...),CNAME(...),SRV(...)]} The array of CNAME and SRV records
 * @example
 *  - Office365AutoDiscoverLync(3600)
 */
function Office365AutoDiscoverLync(ttl) {
  // Set the TTL if not defined
  ttl = ttl || TTL_DEFAULT;

  // Create array of empty records to return
  var records = [];

  // Generate the discover CNAME record
  records.push(
    CNAME("lyncdiscover",   "webdir.online.lync.com.",   ttl,   CF_PROXY_OFF)
  );

  // Generate the SIP directory CNAME record
  records.push(
    CNAME("sip",            "sipdir.online.lync.com.",   ttl,   CF_PROXY_OFF)
  );

  // Generate the SIP federation SRV record
  records.push(
    SRV("_sipfederationtls._tcp",   100,    1,    5061,   "sipfed.online.lync.com.",  ttl)
  );

  // Generate the SIP SRV record
  records.push(
    SRV("_sip._tls",                100,    1,    443,    "sipdir.online.lync.com.",  ttl)
  );

  // Return the generated records
  return records;
}

/**
 * Generate Azure AD records for Office 365
 *
 * @param ttl {integer} The TTL of the records
 * @returns {array[CNAME(...),CNAME(...)]} The array of CNAME records
 * @example
 *  - Office365AutoDiscoverAzure(3600)
 */
 function Office365AutoDiscoverAzure(ttl) {
  // Set the TTL if not defined
  ttl = ttl || TTL_DEFAULT;

  // Create array of empty records to return
  var records = [];

  // Generate the enrollment CNAME record
  records.push(
    CNAME("enterpriseenrollment",     "enterpriseenrollment.manage.microsoft.com.",   ttl,   CF_PROXY_OFF)
  );

  // Generate the registration CNAME record
  records.push(
    CNAME("enterpriseregistration",   "enterpriseregistration.windows.net.",          ttl,   CF_PROXY_OFF)
  );

  // Return the generated records
  return records;
}

/**
 * Generate autodiscover records for Office 365 (Outlook, Azure AD, Lync)
 *
 * @param outlook {boolean=} Add Outlook autodiscover record
 * @param azure {boolean=} Add Azure AD device enrollment autodiscover records
 * @param lync {boolean=} Add Lync autodiscover records
 * @param ttl {integer=} The TTL of the records
 * @returns {array[CNAME(...),CNAME(...)]} The array of CNAME's containing the autodiscover records
 * @example
 *  - Office365AutoDiscover()
 */
function Office365AutoDiscover(outlook, azure, lync, ttl) {
  // Set defaults for Outlook/Azure/Lync
  outlook = outlook === false ? outlook : true;
  azure = azure === false ? azure : true;
  lync = lync === false ? lync : true;

  // Set the TTL if not defined
  ttl = ttl || TTL_DEFAULT;

  // Create array of empty records to return
  var records = [];

  // Add Outlook autodiscover record if enabled
  if (outlook) {
    records.push(Office365AutoDiscoverOutlook(ttl));
  }

  // Add Azure autodiscover records if enabled
  if (azure) {
    records = records.concat(Office365AutoDiscoverAzure(ttl));
  }

  // Add Lync autodiscover records if enabled
  if (lync) {
    records = records.concat(Office365AutoDiscoverLync(ttl));
  }

  // Return list of built records
  return records;
}

/**
 * Generate validation TXT record for Office 365
 *
 * @param validation {string} The validation TXT record
 * @param ttl {integer=} The TTL of the record
 * @returns {TXT(...)} The TXT record object containing the validation TXT record
 * @example
 *  - Office365Validation("ms123456789")
 *  - Office365Validation("MS=ms123456789")
 */
function Office365Validation(validation, ttl) {
  // Ensure the validation record was provided
  if (!validation) {
    throw new Error("Office365Validation: Validation record content is required");
  }

  // Check if "MS=" needs to be appended
  var content;
  if (validation.indexOf("MS=") === -1) {
    content = "MS=" + validation;
  } else {
    content = validation;
  }

  // Set the TTL if not defined
  ttl = ttl || TTL_DEFAULT;

  // Return the generated record
  return TXT("@",   content,   ttl);
}

/**
 * Generate automatic domain GUID for Office 365
 *
 * @param domain {string} The domain name
 * @returns {string} The generated GUID
 * @example
 *  - Office365GUID("example.com")
 */
function Office365GUID(domain) {
  // If domain not set, throw error
  if (!domain) {
    throw new Error("Office365GUID: Domain name is required");
  }

  // If the domain contains a hyphen the GUID cannot be auto generated
  // The GUID will be generated using a proprietary method from MS so it needs to be manually set
  if (domain.indexOf("-") !== -1) {
    throw new Error("Office365GUID: Domain GUID cannot be generated automatically as the domain contains a hyphen.");
  }

  // Generate the GUID and return
  return domain.replace(/\./g, "-");
}
