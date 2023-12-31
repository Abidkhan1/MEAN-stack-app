const mongoose = require('mongoose');

const blackListSchema = mongoose.Schema(
    {
        token: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const BlackList = mongoose.model('BlackList',blackListSchema);

module.exports = BlackList;