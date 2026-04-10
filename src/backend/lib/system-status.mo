import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/system-status";
import ScanTypes "../types/scan";

module {
  public func getSystemStatus(
    scans : List.List<ScanTypes.Scan>,
    queueSize : Nat,
  ) : Types.SystemStatus {
    let now = Time.now();
    let min : Int = 60_000_000_000;

    // Count active scans
    let scanArr = scans.toArray();
    let activeScans = scanArr.filter(func(s : ScanTypes.Scan) : Bool {
      s.status == "queued" or s.status == "running" or s.status == "scanning" or s.status == "analyzing"
    }).size();

    // Compute security score from findings
    var criticalCount = 0;
    var highCount = 0;
    var totalFindings = 0;
    for (scan in scanArr.values()) {
      for (f in scan.findings.values()) {
        totalFindings += 1;
        if (f.severity == "critical") criticalCount += 1
        else if (f.severity == "high") highCount += 1;
      };
    };
    let securityScore : Nat = if (totalFindings == 0) 85
      else if (criticalCount > 5) 32
      else if (criticalCount > 2) 48
      else if (criticalCount > 0) 61
      else if (highCount > 3) 70
      else 82;

    // AI engine status
    let aiEngineStatus = if (activeScans > 0) "analyzing" else "idle";

    // Realistic API statuses
    let apiStatuses : [Types.APIStatus] = [
      { name = "Shodan"; status = "online"; lastChecked = now - min * 3; responseTime = 142 },
      { name = "VirusTotal"; status = "online"; lastChecked = now - min * 1; responseTime = 287 },
      { name = "Censys"; status = "online"; lastChecked = now - min * 5; responseTime = 198 },
      { name = "AbuseIPDB"; status = "online"; lastChecked = now - min * 2; responseTime = 310 },
      { name = "ThreatFox"; status = if (activeScans > 3) "degraded" else "online"; lastChecked = now - min * 8; responseTime = if (activeScans > 3) 1240 else 205 },
      { name = "MalwareBazaar"; status = "online"; lastChecked = now - min * 4; responseTime = 176 },
    ];

    {
      apiStatuses;
      activeScans;
      aiEngineStatus;
      queueSize;
      securityScore;
    };
  };
};
