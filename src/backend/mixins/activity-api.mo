import List "mo:core/List";
import Types "../types/activity";
import ActivityLib "../lib/activity";

mixin (
  activities : List.List<Types.ActivityEntry>,
  activityNextIdCell : List.List<Nat>,
) {
  public query func listActivities(limit : Nat) : async [Types.ActivityEntry] {
    ActivityLib.listActivities(activities, limit);
  };

  public func addActivity(eventType : Types.ActivityEventType, message : Text, severity : Text) : async Types.ActivityEntry {
    ActivityLib.addActivity(activities, activityNextIdCell, eventType, message, severity);
  };
};
