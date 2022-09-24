const { Model } = require("objection");

class MODEL_NAME extends Model {
    static get tableName() {
        return "TABLE_NAME";
    }
    static get idColumn() {
        return "TABLE_ID";
    }
}
module.exports = MODEL_NAME;