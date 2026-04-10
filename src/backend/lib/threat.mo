import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/threat";
import Common "../types/common";

module {
  func nextId(cell : List.List<Nat>) : Nat {
    switch (cell.first()) { case (?n) n; case null 0 };
  };

  func bumpId(cell : List.List<Nat>) {
    let current = switch (cell.first()) { case (?n) n; case null 0 };
    cell.put(0, current + 1);
  };

  // Seed with realistic threat intel entries
  public func seedThreats(
    threats : List.List<Types.ThreatEntry>,
    nextIdCell : List.List<Nat>,
  ) {
    if (threats.size() > 0) return; // already seeded
    let now = Time.now();
    let hour : Int = 3_600_000_000_000;
    let entries : [Types.ThreatEntry] = [
      { id = 0; indicator = "185.220.101.47"; indicatorType = "ip"; riskLevel = "critical"; description = "Known Tor exit node used in ransomware C2 communications. Associated with LockBit 3.0 campaign."; source = "ThreatFox"; detectedAt = now - hour * 2 },
      { id = 1; indicator = "malware.badactor.xyz"; indicatorType = "domain"; riskLevel = "critical"; description = "Active malware distribution domain serving Emotet payloads. Observed in phishing campaigns targeting financial sector."; source = "VirusTotal"; detectedAt = now - hour * 5 },
      { id = 2; indicator = "45.142.212.100"; indicatorType = "ip"; riskLevel = "high"; description = "Brute force attack source — over 50,000 SSH login attempts in last 24h. Blacklisted by AbuseIPDB."; source = "AbuseIPDB"; detectedAt = now - hour * 1 },
      { id = 3; indicator = "d41d8cd98f00b204e9800998ecf8427e"; indicatorType = "hash"; riskLevel = "critical"; description = "MD5 hash of Mirai botnet loader. Targets IoT devices via default credentials. CVE-2016-10401."; source = "MalwareBazaar"; detectedAt = now - hour * 12 },
      { id = 4; indicator = "http://phish.evil-login.ru/update"; indicatorType = "url"; riskLevel = "high"; description = "Active phishing URL mimicking Microsoft 365 login page. Harvests credentials via HTTPS form submission."; source = "PhishTank"; detectedAt = now - hour * 3 },
      { id = 5; indicator = "194.165.16.77"; indicatorType = "ip"; riskLevel = "high"; description = "RDP scanning host probing port 3389 across /16 subnet. Part of automated credential stuffing infrastructure."; source = "Shodan"; detectedAt = now - hour * 6 },
      { id = 6; indicator = "ransom-decrypt.onion.to"; indicatorType = "domain"; riskLevel = "critical"; description = "Ransomware payment portal for BlackCat/ALPHV group. Domain used for victim communication and payment processing."; source = "CERTlv"; detectedAt = now - hour * 18 },
      { id = 7; indicator = "a3f5c2d8e1b4967f0e2a5c8b3d6e1f4a"; indicatorType = "hash"; riskLevel = "high"; description = "SHA256 of CobaltStrike beacon payload. Observed in targeted APT29 intrusion. Evades most AV via custom packer."; source = "Mandiant"; detectedAt = now - hour * 8 },
      { id = 8; indicator = "91.242.217.46"; indicatorType = "ip"; riskLevel = "medium"; description = "Command and control server for AsyncRAT. Active trojan C2 infrastructure confirmed by sandbox analysis."; source = "Censys"; detectedAt = now - hour * 14 },
      { id = 9; indicator = "updates.evil-cdn.net"; indicatorType = "domain"; riskLevel = "high"; description = "Fake software update domain serving trojanized installer packages. Targets developers via typosquatting npm packages."; source = "URLhaus"; detectedAt = now - hour * 22 },
      { id = 10; indicator = "5.188.206.14"; indicatorType = "ip"; riskLevel = "medium"; description = "Known spam sending IP. Responsible for large-scale spear-phishing campaigns. Flagged by SpamHaus SBL."; source = "SpamHaus"; detectedAt = now - hour * 36 },
    ];
    for (entry in entries.values()) {
      threats.add(entry);
    };
    nextIdCell.put(0, entries.size());
  };

  public func lookupThreat(
    threats : List.List<Types.ThreatEntry>,
    indicator : Text,
    _indicatorType : Text,
  ) : Types.ThreatResult {
    let lower = indicator.toLower();
    let found = threats.find(func(t) {
      t.indicator.toLower() == lower
    });
    let related = switch (found) {
      case null [];
      case (?entry) {
        let relatedList = threats.filter(func(t) {
          t.id != entry.id and t.riskLevel == entry.riskLevel and t.indicatorType == entry.indicatorType
        });
        let arr = relatedList.toArray();
        if (arr.size() > 3) [arr[0], arr[1], arr[2]] else arr;
      };
    };
    { found = found != null; entry = found; relatedThreats = related };
  };

  public func listThreats(
    threats : List.List<Types.ThreatEntry>
  ) : [Types.ThreatEntry] {
    threats.toArray();
  };

  public func addThreatEntry(
    threats : List.List<Types.ThreatEntry>,
    nextIdCell : List.List<Nat>,
    entry : Types.ThreatEntryInput,
  ) : Types.ThreatEntry {
    let id = nextId(nextIdCell);
    bumpId(nextIdCell);
    let newEntry : Types.ThreatEntry = {
      id;
      indicator = entry.indicator;
      indicatorType = entry.indicatorType;
      riskLevel = entry.riskLevel;
      description = entry.description;
      source = entry.source;
      detectedAt = Time.now();
    };
    threats.add(newEntry);
    newEntry;
  };
};
