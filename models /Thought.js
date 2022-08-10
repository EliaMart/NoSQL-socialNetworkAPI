const { Schema, model } = require('mongoose');

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
        },
        username: {
            type: String, 
            required: true, 
        }
    },
    {
        toJSON: {
            virtuals: true
        },
    }
)


const Thought = model('thought', thoughtSchema);

module.exports = Thought 