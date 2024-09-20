import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/.+\@.+\..+/, 'Please enter a valid email address'],
        },
        unsubscribed: {
            type: Boolean,
            default: false
        },
        listId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "List",
            required: [true, 'List ID is required'],
        },
        properties: {
            type: Map,
            of: String,
            default: {},
        }
    },
    {
        timestamps: true
    }
);

// Ensure unique index
userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);
export default User;