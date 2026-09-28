import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { username: 'maya.chen', email: 'maya.chen@example.com', firstName: 'Maya', lastName: 'Chen', grade: 10 },
      { username: 'leo.martinez', email: 'leo.martinez@example.com', firstName: 'Leo', lastName: 'Martinez', grade: 11 },
      { username: 'ava.johnson', email: 'ava.johnson@example.com', firstName: 'Ava', lastName: 'Johnson', grade: 9 },
      { username: 'noah.williams', email: 'noah.williams@example.com', firstName: 'Noah', lastName: 'Williams', grade: 12 },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Blue Comets',
        description: 'A steady crew building speed and consistency together.',
        members: [users[0]._id, users[1]._id],
        points: 285,
      },
      {
        name: 'Trail Blazers',
        description: 'Walkers, runners, and strength-training teammates.',
        members: [users[2]._id, users[3]._id],
        points: 240,
      },
    ]);

    const currentMonth = new Date().toISOString().slice(0, 7);
    await Activity.insertMany([
      {
        user: users[0]._id, team: teams[0]._id, type: 'running', durationMinutes: 32,
        distanceKm: 4.2, calories: 280, points: 75, date: new Date(),
      },
      {
        user: users[1]._id, team: teams[0]._id, type: 'strength', durationMinutes: 40,
        calories: 230, points: 65, date: new Date(Date.now() - 86_400_000),
      },
      {
        user: users[2]._id, team: teams[1]._id, type: 'walking', durationMinutes: 45,
        distanceKm: 3.6, calories: 190, points: 55, date: new Date(),
      },
      {
        user: users[3]._id, team: teams[1]._id, type: 'running', durationMinutes: 28,
        distanceKm: 3.8, calories: 255, points: 70, date: new Date(Date.now() - 172_800_000),
      },
    ]);

    await LeaderboardEntry.insertMany([
      { user: users[0]._id, team: teams[0]._id, period: currentMonth, points: 160, rank: 1 },
      { user: users[3]._id, team: teams[1]._id, period: currentMonth, points: 135, rank: 2 },
      { user: users[1]._id, team: teams[0]._id, period: currentMonth, points: 125, rank: 3 },
      { user: users[2]._id, team: teams[1]._id, period: currentMonth, points: 105, rank: 4 },
    ]);

    await Workout.insertMany([
      {
        title: 'Easy 5K Builder', type: 'running',
        description: 'A conversational-pace run with a gentle warm-up and cool-down.',
        durationMinutes: 35, difficulty: 'beginner', targetGrade: 9,
      },
      {
        title: 'Lunch Break Walk', type: 'walking',
        description: 'A brisk campus loop focused on keeping a comfortable, steady pace.',
        durationMinutes: 25, difficulty: 'beginner',
      },
      {
        title: 'Bodyweight Strength Circuit', type: 'strength',
        description: 'Three controlled rounds of squats, push-ups, lunges, and planks.',
        durationMinutes: 30, difficulty: 'intermediate', targetGrade: 11,
      },
    ]);

    console.log('Seeded users, teams, activities, leaderboard, and workouts');
    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
