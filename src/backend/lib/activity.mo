import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/activity";
import Common "../types/common";

module {
  func nextId(cell : List.List<Nat>) : Nat {
    switch (cell.first()) { case (?n) n; case null 0 };
  };

  func bumpId(cell : List.List<Nat>) {
    let current = switch (cell.first()) { case (?n) n; case null 0 };
    cell.put(0, current + 1);
  };

  // Pre-populate with realistic activity entries spanning last 24 hours
  public func seedActivities(
    activities : List.List<Types.ActivityEntry>,
    nextIdCell : List.List<Nat>,
  ) {
    if (activities.size() > 0) return; // already seeded
    let now = Time.now();
    let min : Int = 60_000_000_000;
    let entries : [Types.ActivityEntry] = [
      { id = 0; eventType = #APIHit; message = "Shodan API queried for target 192.168.1.1 — 47 open ports discovered"; severity = "info"; timestamp = now - min * 5 },
      { id = 1; eventType = #ScanStarted; message = "Deep scan initiated on target api.enterprise-corp.com by admin"; severity = "info"; timestamp = now - min * 12 },
      { id = 2; eventType = #VulnFound; message = "Critical: SQL Injection detected at api.enterprise-corp.com/api/login — CVSS 9.8"; severity = "critical"; timestamp = now - min * 18 },
      { id = 3; eventType = #ThreatDetected; message = "Malicious IP 185.220.101.47 matched ThreatFox IOC database — Tor exit node"; severity = "critical"; timestamp = now - min * 25 },
      { id = 4; eventType = #VulnFound; message = "High: Reflected XSS found in search endpoint at corp-portal.io — session hijack risk"; severity = "warning"; timestamp = now - min * 35 },
      { id = 5; eventType = #APIHit; message = "VirusTotal file hash lookup completed — 12/72 AV engines flagged payload as malicious"; severity = "warning"; timestamp = now - min * 48 },
      { id = 6; eventType = #ScanComplete; message = "Scan completed for target 10.0.0.0/24 — 5 critical, 3 high vulnerabilities found"; severity = "critical"; timestamp = now - min * 62 },
      { id = 7; eventType = #ScanStarted; message = "Quick scan started for target shopify-store.myshopify.com"; severity = "info"; timestamp = now - min * 95 },
      { id = 8; eventType = #APIHit; message = "Censys IPv4 scan data fetched — ASN analysis complete for target subnet"; severity = "info"; timestamp = now - min * 130 },
      { id = 9; eventType = #ThreatDetected; message = "Domain malware.badactor.xyz blacklisted — active Emotet distribution confirmed by VirusTotal"; severity = "critical"; timestamp = now - min * 180 },
      { id = 10; eventType = #VulnFound; message = "Medium: Missing security headers on 3 endpoints — clickjacking exposure"; severity = "warning"; timestamp = now - min * 220 },
      { id = 11; eventType = #ScanComplete; message = "AI analysis complete for api.enterprise-corp.com — risk score 78/100, 6 vulnerabilities identified"; severity = "warning"; timestamp = now - min * 300 },
    ];
    for (entry in entries.values()) {
      activities.add(entry);
    };
    nextIdCell.put(0, entries.size());
  };

  public func listActivities(
    activities : List.List<Types.ActivityEntry>,
    limit : Nat,
  ) : [Types.ActivityEntry] {
    let all = activities.toArray();
    let total = all.size();
    if (limit == 0 or limit >= total) return all;
    // Return the most recent `limit` entries (from the end)
    let start : Int = total - limit;
    all.sliceToArray(start, total);
  };

  public func addActivity(
    activities : List.List<Types.ActivityEntry>,
    nextIdCell : List.List<Nat>,
    eventType : Types.ActivityEventType,
    message : Text,
    severity : Text,
  ) : Types.ActivityEntry {
    let id = nextId(nextIdCell);
    bumpId(nextIdCell);
    let entry : Types.ActivityEntry = {
      id;
      eventType;
      message;
      severity;
      timestamp = Time.now();
    };
    activities.add(entry);
    entry;
  };
};
