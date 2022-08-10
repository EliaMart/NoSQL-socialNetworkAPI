const { Schema, model } = require('mongoose');
const validator = require('validator');

// Schema to create User model 
const userSchema = new Schema (
    {
        username: {
            type: String, 
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String, 
            required: true,
            unique: true,
            validate: (value) => {
                return validator.isEmail(value)
            }
        },

    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
)


const User = model('user', userSchema);

module.exports = User