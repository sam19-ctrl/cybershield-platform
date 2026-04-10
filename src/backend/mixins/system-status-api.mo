import List "mo:core/List";
import ScanTypes "../types/scan";
import StatusTypes "../types/system-status";
import StatusLib "../lib/system-status";

mixin (
  scans : List.List<ScanTypes.Scan>,
  queueSizeCell : List.List<Nat>,
) {
  public query func getSystemStatus() : async StatusTypes.SystemStatus {
    let queueSize = switch (queueSizeCell.first()) { case (?n) n; case null 0 };
    StatusLib.getSystemStatus(scans, queueSize);
  };
};
