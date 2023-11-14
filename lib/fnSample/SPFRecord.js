// Source: https://github.com/gbe0/dnscontrol-office365

/**
 * Generate SPF record
 *
 * @param records {array} The list of records for the policy
 * @param policy {string=} The policy of the record
 * @param subdomain {string=} The subdomain of the record
 * @param ttl {integer=} The TTL of the record
 * @returns {TXT(...)} The SPF record returned as a TXT object
 * @example
 *  - SPFRecord(["include:_spf.example-saas.com","ipv4:192.0.2.1"])
 *  - SPFRecord(["include:_spf.example-saas.com","ipv4:192.0.2.1"], "~all")
 */
function SPFRecord(records, policy, subdomain, ttl) {
  // If no records were provided, throw an error
  if (!records) {
    throw new Error("SPFRecord: Records are required");
  }

  // Join the records
  var record = records.join(" ");

  // Set the policy if provided
  policy = policy || "-all";

  // Set the subdomain to @ if not provided (the root of the domain)
  subdomain = subdomain || "@";

  // Set the TTL if not defined
  ttl = ttl || TTL_DEFAULT;

  // Generate the record content
  var content = "v=spf1 " + record + " " + policy;

  // Return the generated record
  return TXT(subdomain, content, ttl);
}
