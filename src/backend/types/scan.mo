import Common "common";

module {
  public type Finding = {
    id : Nat;
    findingType : Text;
    severity : Text;
    title : Text;
    description : Text;
    cvssScore : Float;
    port : ?Nat;
    protocol : ?Text;
  };

  public type Scan = {
    id : Common.ScanId;
    target : Text;
    mode : Text;
    status : Text;
    progress : Nat;
    startedAt : Common.Timestamp;
    completedAt : ?Common.Timestamp;
    findings : [Finding];
  };

  public type CreateScanResult = {
    #ok : Scan;
    #err : Text;
  };
};
