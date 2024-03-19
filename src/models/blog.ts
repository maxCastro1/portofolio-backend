import mongoose, { Document, Schema } from 'mongoose';

interface IBlog extends Document {
  title: string;
  readingDuration: number;
  description: string;
  image: string;
  authorName: string;
  createdAt: Date;
  likes: number;
  views: number;
  commentsIds: string[];
}

const BlogSchema: Schema = new Schema({
  title: { type: String, required: true },
  readingDuration: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  authorName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  commentsIds: { type: [String], default: [] },
});

export default mongoose.model<IBlog>('Blog', BlogSchema);
