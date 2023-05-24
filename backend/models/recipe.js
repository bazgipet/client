const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const validator = require('validator')

const recipeSchema = new mongoose.Schema({
    creater: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    prepare_time: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 1) {
                throw new Error('Preparation time is less or equal 0 which is forbidden - its a kinda magic.')
            }
        }
    },
    work: [{
        type: String,
        required: true,
        trim: true
    }],
    ingredients: [{
        ing_name: {
            type: String,
            required: true,
            trim: true
        },
        ing_amount: {
            type: Number,
            required: true,
            validate(value) {
                if (value < 1) {
                    throw new Error('Cannot have 0 or less amount in ingredient option.')
                }
            }
        }
    }],
    total_amount: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 1) {
                throw new Error('Cannot make 0 or less smoothie from recipe.')
            }
        }
    },
    img: {
        data: Buffer,
        contentType: String,
    }
}, {
    timestamps: true
})

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe