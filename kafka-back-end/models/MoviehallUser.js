var bcrypt = require('bcryptjs');
const saltRounds = 10;

module.exports = function (sequelize, Sequelize) {

    var MoviehallUser = sequelize.define('moviehalluser', {
        id: {autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
        firstname: {type: Sequelize.STRING, notEmpty: true},
        lastname: {type: Sequelize.STRING},
        displayname: {type: Sequelize.STRING},
        email: {type: Sequelize.STRING, validate: {isEmail: true}, unique: true},
        password: {type: Sequelize.STRING, allowNull: false},
        mobile: {type: Sequelize.INTEGER},
        address: {type: Sequelize.STRING},
        last_login: {type: Sequelize.DATE},
        image: {type: Sequelize.STRING}
    });
    return MoviehallUser;
}