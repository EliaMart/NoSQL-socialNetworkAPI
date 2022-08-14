const { Schema, model, Types } = require('mongoose');
// import date from utils

// Schema to create reaction 
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String, 
            required: true, 
        }
    }
)


// Schema to create thought model 
const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp),
        },
        username: {
            type: String, 
            required: true, 
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true
        },
        id:false
    }
);

thoughtSchema
.virtual('reactionCount')
.get(function () {
    return this.reactions.length
});


const Thought = model('Thought', thoughtSchema);

module.exports = Thought; 
module.exports = reactionSchema;