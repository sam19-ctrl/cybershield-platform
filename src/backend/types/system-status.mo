import Common "common";

module {
  public type APIStatus = {
    name : Text;
    status : Text;
    lastChecked : Common.Timestamp;
    responseTime : Nat;
  };

  public type SystemStatus = {
    apiStatuses : [APIStatus];
    activeScans : Nat;
    aiEngineStatus : Text;
    queueSize : Nat;
    securityScore : Nat;
  };
};
