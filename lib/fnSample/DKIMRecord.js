// Source: https://github.com/gbe0/dnscontrol-office365

/**
 * Generate DKIM TXT record
 *
 * @param name {string} The name of the public key
 * @param key {string} The public key
 * @param subdomain {string=} The optional subdomain to set the record for
 * @param ttl {integer=} The TTL of the record
 * @returns {TXT(...)} The DKIM style TXT record
 * @example
 *  - DKIM("default", "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8....")
 *  - DKIM("default", "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8....", "subdomain")
 */
function DKIMRecord(name, key, subdomain, ttl) {
  // Make sure name was provided
  if (!name) {
    throw new Error("DKIMRecord: Name is required");
  }

  // Make sure key was provided
  if (!key) {
    throw new Error("DKIMRecord: Key is required");
  }

  // Set the TTL if not defined
  ttl = ttl || TTL_DEFAULT;

  // Create the label the DKIM record will be created on
  var label = name + "._domainkey";

  // If there was a subdomain specified, add to label
  if (subdomain) {
    label += "." + subdomain;
  }

  // Create the record
  var record = "v=DKIM1; k=rsa; p=" + key + ";";

  // Return the generated record
  return TXT(label, record, ttl);
}
