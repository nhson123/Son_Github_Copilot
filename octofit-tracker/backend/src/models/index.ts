import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  grade: { type: Number, required: true, min: 9, max: 12 },
}, { timestamps: true });

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String, required: true, trim: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  points: { type: Number, required: true, min: 0, default: 0 },
}, { timestamps: true });

const activitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  type: { type: String, enum: ['running', 'walking', 'strength'], required: true },
  durationMinutes: { type: Number, required: true, min: 1 },
  distanceKm: { type: Number, min: 0 },
  calories: { type: Number, required: true, min: 0 },
  points: { type: Number, required: true, min: 0 },
  date: { type: Date, required: true },
}, { timestamps: true });

const leaderboardSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  period: { type: String, required: true },
  points: { type: Number, required: true, min: 0 },
  rank: { type: Number, required: true, min: 1 },
}, { timestamps: true });

const workoutSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  type: { type: String, enum: ['running', 'walking', 'strength'], required: true },
  description: { type: String, required: true, trim: true },
  durationMinutes: { type: Number, required: true, min: 1 },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  targetGrade: { type: Number, min: 9, max: 12 },
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model('User', userSchema, 'users');
export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema, 'teams');
export const Activity = mongoose.models.Activity
  || mongoose.model('Activity', activitySchema, 'activities');
export const LeaderboardEntry = mongoose.models.LeaderboardEntry
  || mongoose.model('LeaderboardEntry', leaderboardSchema, 'leaderboard');
export const Workout = mongoose.models.Workout
  || mongoose.model('Workout', workoutSchema, 'workouts');