import mongoose, { Model } from 'mongoose';
import { userAnalysisSchema, IUserAnalysis } from '../schemas/userAnalysis.schema';

const UserAnalysisModel: Model<IUserAnalysis> = mongoose.model<IUserAnalysis>('UserAnalysis', userAnalysisSchema);

export default UserAnalysisModel; 