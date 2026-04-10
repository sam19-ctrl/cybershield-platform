import List "mo:core/List";
import Types "../types/ai-analysis";
import AILib "../lib/ai-analysis";
import Common "../types/common";

mixin (
  analyses : List.List<Types.AIAnalysis>,
  analysisNextIdCell : List.List<Nat>,
) {
  public func analyzeTarget(target : Text, context : Text) : async Types.AIAnalysisResult {
    AILib.analyzeTarget(analyses, analysisNextIdCell, target, context);
  };

  public query func getAnalysis(id : Common.AnalysisId) : async ?Types.AIAnalysis {
    AILib.getAnalysis(analyses, id);
  };

  public query func listAnalyses() : async [Types.AIAnalysis] {
    AILib.listAnalyses(analyses);
  };
};
