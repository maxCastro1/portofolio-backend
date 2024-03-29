import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    email: number;
    password: string;
  
  }

const UserSchema: Schema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
  });

  export default mongoose.model<IUser>('User', UserSchema);