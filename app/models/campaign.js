/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;

/**
 * Campaign Schema
 */
var CampaignSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true
    },
    content: {
        type: String,
        default: '',
        trim: true
    },
    _creator: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    _followers: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],
    short_desc: {
        type: String,
        default: '',
    },
    full_desc: {
        type: String,
        default: '',
        trim: true
    }
});

/**
 * Validations
 */
CampaignSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');

/**
 * Statics
 */
CampaignSchema.statics.load = function(id, callback) {
    this.findOne({
        _id: id
    }).
    populate('_creator', 'name ').
    populate('_followers','name').
    exec(callback);
};

mongoose.model('Campaign', CampaignSchema);
