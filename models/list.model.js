import mongoose, { Schema } from "mongoose";

const listSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        customProperties: [
            {
                title: {
                    type: String,
                    required: true,
                },
                defaultValue: {
                    type: String,
                    required: true,
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

listSchema.index({ title: 1 }, { unique: true });

const List = mongoose.model('List', listSchema);
export default List;