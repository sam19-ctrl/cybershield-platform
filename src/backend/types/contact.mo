import Common "common";

module {
  public type ContactSubmission = {
    id : Common.SubmissionId;
    name : Text;
    email : Text;
    company : Text;
    message : Text;
    submittedAt : Common.Timestamp;
  };

  public type SubmitContactInput = {
    name : Text;
    email : Text;
    company : Text;
    message : Text;
  };

  public type SubmitContactResult = {
    #ok : Common.SubmissionId;
    #err : Text;
  };
};
