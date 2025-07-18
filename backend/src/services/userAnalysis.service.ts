import UserAnalysisModel from '../models/userAnalysis.model';

export async function getUserAnalysisService(userId: string) {
  return UserAnalysisModel.findOne({ userId });
} 