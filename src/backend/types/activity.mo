import Common "common";

module {
  public type ActivityEventType = {
    #ScanStarted;
    #VulnFound;
    #APIHit;
    #ThreatDetected;
    #ScanComplete;
  };

  public type ActivityEntry = {
    id : Common.ActivityId;
    eventType : ActivityEventType;
    message : Text;
    severity : Text;
    timestamp : Common.Timestamp;
  };
};
