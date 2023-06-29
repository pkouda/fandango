
module.exports = function (sequelize, Sequelize) {

    var Admin = sequelize.define('admin', {
        id: {autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
        firstname: {type: Sequelize.STRING, notEmpty: true},
        lastname: {type: Sequelize.STRING},
        email: {type: Sequelize.STRING, validate: {isEmail: true}, unique: true},
        password: {type: Sequelize.STRING, allowNull: false},
        mobile: {type: Sequelize.STRING},
        address: {type: Sequelize.STRING},
        city: {type: Sequelize.STRING},
        State:{type: Sequelize.STRING},
        zipcode: {type: Sequelize.INTEGER},
        last_login: {type: Sequelize.DATE}
    });
    return Admin;
}