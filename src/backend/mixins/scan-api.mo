import List "mo:core/List";
import Types "../types/scan";
import ScanLib "../lib/scan";
import Common "../types/common";

mixin (
  scans : List.List<Types.Scan>,
  scanNextIdCell : List.List<Nat>,
) {
  public func createScan(target : Text, scanMode : Text) : async Types.CreateScanResult {
    ScanLib.createScan(scans, scanNextIdCell, target, scanMode);
  };

  public query func getScan(id : Common.ScanId) : async ?Types.Scan {
    ScanLib.getScan(scans, id);
  };

  public query func listScans() : async [Types.Scan] {
    ScanLib.listScans(scans);
  };

  public func updateScanStatus(id : Common.ScanId, status : Text) : async Bool {
    ScanLib.updateScanStatus(scans, id, status);
  };
};
