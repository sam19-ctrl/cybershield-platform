import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/contact";
import Common "../types/common";

module {
  // nextIdCell is a single-element List used as a mutable Nat counter cell.
  public func submit(
    submissions : List.List<Types.ContactSubmission>,
    nextIdCell : List.List<Nat>,
    input : Types.SubmitContactInput,
  ) : Types.SubmitContactResult {
    let id : Common.SubmissionId = nextIdCell.at(0);
    let submission : Types.ContactSubmission = {
      id;
      name = input.name;
      email = input.email;
      company = input.company;
      message = input.message;
      submittedAt = Time.now();
    };
    submissions.add(submission);
    nextIdCell.mapInPlace(func(_n) { id + 1 });
    #ok id;
  };

  public func listAll(
    submissions : List.List<Types.ContactSubmission>
  ) : [Types.ContactSubmission] {
    submissions.toArray();
  };
};
