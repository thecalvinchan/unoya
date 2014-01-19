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
    _creator: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        default: '',
        trim: true
    },
    diagnosis: {
        type: String,
        default: '',
        trim: true
    },
    content: {
        type: String,
        default: '',
        trim: true
    },
    _followers: [{
        type: Schema.ObjectId,
        unique: true,
        ref: 'User'
    }],
    short_desc: {
        type: String,
        default: '',
        trim: true
    },
    full_desc: {
        type: String,
        default: '',
        trim: true
    },
    donations: {
        type: Number,
        default: 0,
    },
    feature: {}
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
    populate('_creator', 'f_name l_name username picture').
    populate('_followers','f_name l_name username').
    exec(callback);
};

mongoose.model('Campaign', CampaignSchema);
