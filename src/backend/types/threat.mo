import Common "common";

module {
  public type ThreatEntry = {
    id : Common.ThreatId;
    indicator : Text;
    indicatorType : Text;
    riskLevel : Text;
    description : Text;
    source : Text;
    detectedAt : Common.Timestamp;
  };

  public type ThreatEntryInput = {
    indicator : Text;
    indicatorType : Text;
    riskLevel : Text;
    description : Text;
    source : Text;
  };

  public type ThreatResult = {
    found : Bool;
    entry : ?ThreatEntry;
    relatedThreats : [ThreatEntry];
  };
};
