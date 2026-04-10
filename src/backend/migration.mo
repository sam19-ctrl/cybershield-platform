import List "mo:core/List";

module {
  // Old actor stable state (from backend.most snapshot)
  type OldTimestamp = Int;
  type OldSubmissionId = Nat;
  type OldContactSubmission = {
    id : OldSubmissionId;
    name : Text;
    email : Text;
    company : Text;
    message : Text;
    submittedAt : OldTimestamp;
  };

  type OldActor = {
    nextIdCell : List.List<Nat>;
    submissions : List.List<OldContactSubmission>;
  };

  // New actor stable state (fields produced by migration; all other new fields
  // get their default initializer values on upgrade)
  type NewActor = {
    contactNextIdCell : List.List<Nat>;
    submissions : List.List<OldContactSubmission>;
  };

  public func run(old : OldActor) : NewActor {
    {
      contactNextIdCell = old.nextIdCell;
      submissions = old.submissions;
    };
  };
};
