import Common "common";

module {
  public type AIVulnerability = {
    title : Text;
    severity : Text;
    description : Text;
    recommendation : Text;
  };

  public type AIAnalysis = {
    id : Common.AnalysisId;
    target : Text;
    thinking : Text;
    vulnerabilities : [AIVulnerability];
    riskScore : Nat;
    suggestions : [Text];
    completedAt : Common.Timestamp;
  };

  public type AIAnalysisResult = {
    #ok : AIAnalysis;
    #err : Text;
  };
};
