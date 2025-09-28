const {mongoose} = require('mongoose');


const infoSchema = new mongoose.Schema({
    userId: { 
        type: String,
        unique: true,
    },
    photo: {
        url: String,
        public_id: String,
    }
})

module.exports = mongoose.model("Info", infoSchema);
