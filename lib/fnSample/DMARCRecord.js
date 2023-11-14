/**
 * Generate DMARC record
 *
 * @param domain {string} The domain name
 * @param rua {string=} The RUA email address
 * @param ruf {string=} The RUF email address
 * @param ttl {integer=} The TTL of the record
 * @returns {TXT(...)} The DMARC record returned as a TXT record object
 * @example
 *  - DMARCRecord("example.com")
 *  - DMARCRecord("example.com", "reports@example.com")
 *  - DMARCRecord("example.com", "reports-rua@example.com", "reports-ruf@example.com")
 */
function DMARCRecord(domain, rua, ruf, ttl) {
  // Set required variables
  if (!domain) {
    throw new Error("DMARCRecord: Domain name is required");
  }

  // Generate RUA record if not refined
  rua = rua || "dmarc-rua@" + domain;

  // If no policy was provided, set the default to strict
  ruf = ruf || "dmarc-ruf@" + domain;

  // Set the TTL if not defined
  ttl = ttl || TTL_DEFAULT;

  // Create the record
  var record = "v=DMARC1; p=reject; adkim=s; aspf=s; rua=mailto:" + rua + "; ruf=mailto:" + ruf + "; rf=afrf; pct=100; ri=86400; fo=1;";

  // Return the generated record
  return TXT("_dmarc", record, ttl);
}
