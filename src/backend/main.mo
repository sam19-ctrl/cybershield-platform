import List "mo:core/List";
import ContactTypes "types/contact";
import ScanTypes "types/scan";
import ThreatTypes "types/threat";
import AITypes "types/ai-analysis";
import ActivityTypes "types/activity";
import ThreatLib "lib/threat";
import ActivityLib "lib/activity";
import ContactMixin "mixins/contact-api";
import ScanMixin "mixins/scan-api";
import ThreatMixin "mixins/threat-api";
import AIAnalysisMixin "mixins/ai-analysis-api";
import ActivityMixin "mixins/activity-api";
import SystemStatusMixin "mixins/system-status-api";
import Migration "migration";

(with migration = Migration.run)
actor {
  // Contact domain state
  let submissions = List.empty<ContactTypes.ContactSubmission>();
  let contactNextIdCell : List.List<Nat> = List.singleton(0);

  // Scan domain state
  let scans = List.empty<ScanTypes.Scan>();
  let scanNextIdCell : List.List<Nat> = List.singleton(0);

  // Threat intel domain state
  let threats = List.empty<ThreatTypes.ThreatEntry>();
  let threatNextIdCell : List.List<Nat> = List.singleton(0);

  // AI analysis domain state
  let analyses = List.empty<AITypes.AIAnalysis>();
  let analysisNextIdCell : List.List<Nat> = List.singleton(0);

  // Activity feed domain state
  let activities = List.empty<ActivityTypes.ActivityEntry>();
  let activityNextIdCell : List.List<Nat> = List.singleton(0);

  // System status queue size cell (shared with scans)
  let queueSizeCell : List.List<Nat> = List.singleton(0);

  // Seed initial data (idempotent — checks if already seeded)
  ThreatLib.seedThreats(threats, threatNextIdCell);
  ActivityLib.seedActivities(activities, activityNextIdCell);

  include ContactMixin(submissions, contactNextIdCell);
  include ScanMixin(scans, scanNextIdCell);
  include ThreatMixin(threats, threatNextIdCell);
  include AIAnalysisMixin(analyses, analysisNextIdCell);
  include ActivityMixin(activities, activityNextIdCell);
  include SystemStatusMixin(scans, queueSizeCell);
};
