import mongoose, { Document, Schema } from 'mongoose';

// Define the Comment document interface
interface IComment extends Document {
  blogId: Schema.Types.ObjectId;
  authorName: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Comment schema
const CommentSchema = new Schema<IComment>({
  blogId: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
  authorName: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Define the Comment model
const Comment = mongoose.model<IComment>('Comment', CommentSchema);

export { IComment, Comment };
