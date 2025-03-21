const mongoose = require('mongoose');

async function connnectToMongoDB(url) {
    return mongoose.connect(url);
}

module.exports = {
    connnectToMongoDB,
}