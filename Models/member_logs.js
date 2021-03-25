const {
    Schema,
    model
} = require("mongoose")

module.exports = model("member_logs", new Schema({
    Guild: String,
    channel: String
}))