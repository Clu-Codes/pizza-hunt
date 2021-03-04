const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const replySchema = new Schema(
    {
        replyId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        replyBody: {
            type: String,
            required: true,
            trim: true
        },
        writtenBy: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const commentSchema = new Schema(
    {
        writtenBy: {
            type: String,
            required: 'This field cannot be blank.',
            trim: true
        },
        commentBody: {
            type: String,
            required: 'This field cannot be blank.',
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        replies: [replySchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

commentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;