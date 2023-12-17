// backend/models/User.js
import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'instructor'], default: 'student' }, // Add role for user (student or instructor)
  courses: [{ type: _Schema.Types.ObjectId, ref: 'Course' }], // Reference to enrolled courses
});

const User = model('User', userSchema);

export default User;
