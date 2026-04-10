import List "mo:core/List";
import Types "../types/threat";
import ThreatLib "../lib/threat";
import Common "../types/common";

mixin (
  threats : List.List<Types.ThreatEntry>,
  threatNextIdCell : List.List<Nat>,
) {
  public query func lookupThreat(indicator : Text, indicatorType : Text) : async Types.ThreatResult {
    ThreatLib.lookupThreat(threats, indicator, indicatorType);
  };

  public query func listThreats() : async [Types.ThreatEntry] {
    ThreatLib.listThreats(threats);
  };

  public func addThreatEntry(entry : Types.ThreatEntryInput) : async Types.ThreatEntry {
    ThreatLib.addThreatEntry(threats, threatNextIdCell, entry);
  };
};
