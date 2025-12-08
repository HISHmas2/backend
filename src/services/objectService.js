const ObjectModel = require('../models/objectModel');

const ObjectService = {
    async create({ name, user_id, position_x, position_y }) {
        return await ObjectModel.createObject({
            name,
            user_id,
            position_x,
            position_y
        });
    },

    async findAllByUserId(user_id) {
        return await ObjectModel.findObjectsByUserId(user_id);
    }
};

module.exports = ObjectService;
