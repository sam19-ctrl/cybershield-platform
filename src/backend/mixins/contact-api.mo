import List "mo:core/List";
import Types "../types/contact";
import ContactLib "../lib/contact";

mixin (
  submissions : List.List<Types.ContactSubmission>,
  nextIdCell : List.List<Nat>,
) {
  public func submitContact(input : Types.SubmitContactInput) : async Types.SubmitContactResult {
    ContactLib.submit(submissions, nextIdCell, input);
  };

  public query func listContactSubmissions() : async [Types.ContactSubmission] {
    ContactLib.listAll(submissions);
  };
};
