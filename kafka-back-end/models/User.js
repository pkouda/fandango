var bcrypt = require('bcryptjs');
const saltRounds = 10;

module.exports = function (sequelize, Sequelize) {

    var User = sequelize.define('user', {
        id: {autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
        firstname: {type: Sequelize.STRING, notEmpty: true},
        lastname: {type: Sequelize.STRING},
        displayname: {type: Sequelize.STRING},
        email: {type: Sequelize.STRING, validate: {isEmail: true},  primaryKey: true},
        password: {type: Sequelize.STRING, allowNull: false},
        mobile: {type: Sequelize.INTEGER},
        address: {type: Sequelize.STRING},
        cardnumber: {type: Sequelize.INTEGER},
        cardmonth: {type: Sequelize.INTEGER},
        cardyear: {type: Sequelize.INTEGER},
        zipcode: {type: Sequelize.INTEGER},
        last_login: {type: Sequelize.DATE},
        image: {type: Sequelize.STRING}
    });
    return User;
}