import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/scan";
import Common "../types/common";

module {
  // Helper: get next id from id cell
  func nextId(cell : List.List<Nat>) : Nat {
    let current = switch (cell.first()) { case (?n) n; case null 0 };
    current;
  };

  func bumpId(cell : List.List<Nat>) {
    let current = switch (cell.first()) { case (?n) n; case null 0 };
    cell.put(0, current + 1);
  };

  // Realistic findings for a target
  func generateFindings(target : Text, mode : Text) : [Types.Finding] {
    let isDeep = mode == "deep" or mode == "full";
    let isBasic = mode == "quick" or mode == "basic";
    [
      {
        id = 1;
        findingType = "open_port";
        severity = "high";
        title = "SSH Port 22 Open";
        description = "Port 22 (SSH) is open on " # target # ". Exposed SSH service is susceptible to brute force attacks and CVE-2023-38408.";
        cvssScore = 7.5;
        port = ?22;
        protocol = ?"tcp";
      },
      {
        id = 2;
        findingType = "vulnerability";
        severity = "critical";
        title = "SQL Injection in Login Form";
        description = "The login endpoint at " # target # "/api/login is vulnerable to SQL injection (CVE-2023-1234). Attacker can bypass authentication or dump the database.";
        cvssScore = 9.8;
        port = ?443;
        protocol = ?"https";
      },
      {
        id = 3;
        findingType = "vulnerability";
        severity = if (isDeep) "high" else "medium";
        title = "Cross-Site Scripting (XSS)";
        description = "Reflected XSS found in search parameter of " # target # ". Malicious scripts can be injected and executed in victim browsers.";
        cvssScore = 6.1;
        port = ?80;
        protocol = ?"http";
      },
      {
        id = 4;
        findingType = "misconfiguration";
        severity = "medium";
        title = "HTTP Security Headers Missing";
        description = target # " is missing critical HTTP security headers: Content-Security-Policy, X-Frame-Options, X-Content-Type-Options. This exposes users to clickjacking and MIME sniffing attacks.";
        cvssScore = 5.3;
        port = ?80;
        protocol = ?"http";
      },
      {
        id = 5;
        findingType = "open_port";
        severity = if (isBasic) "low" else "medium";
        title = "FTP Port 21 Open";
        description = "FTP service detected on port 21 at " # target # ". FTP transmits data in cleartext. Recommend disabling or replacing with SFTP.";
        cvssScore = 5.0;
        port = ?21;
        protocol = ?"tcp";
      },
    ];
  };

  public func createScan(
    scans : List.List<Types.Scan>,
    nextIdCell : List.List<Nat>,
    target : Text,
    scanMode : Text,
  ) : Types.CreateScanResult {
    let id = nextId(nextIdCell);
    bumpId(nextIdCell);
    let scan : Types.Scan = {
      id;
      target;
      mode = scanMode;
      status = "queued";
      progress = 0;
      startedAt = Time.now();
      completedAt = null;
      findings = [];
    };
    scans.add(scan);
    #ok(scan);
  };

  public func getScan(
    scans : List.List<Types.Scan>,
    id : Common.ScanId,
  ) : ?Types.Scan {
    scans.find(func(s) { s.id == id });
  };

  public func listScans(
    scans : List.List<Types.Scan>
  ) : [Types.Scan] {
    scans.toArray();
  };

  public func updateScanStatus(
    scans : List.List<Types.Scan>,
    id : Common.ScanId,
    status : Text,
  ) : Bool {
    let found = scans.find(func(s) { s.id == id });
    switch (found) {
      case null false;
      case (?existing) {
        let isCompleting = status == "complete" or status == "completed";
        let progress : Nat = if (isCompleting) 100
          else if (status == "scanning") 60
          else if (status == "running") 45
          else if (status == "analyzing") 80
          else 10;
        let completedAt : ?Common.Timestamp = if (isCompleting) ?Time.now() else null;
        let findings = if (isCompleting) generateFindings(existing.target, existing.mode) else existing.findings;
        scans.mapInPlace(func(s) {
          if (s.id == id) {
            { s with status; progress; completedAt; findings }
          } else s
        });
        true;
      };
    };
  };
};
