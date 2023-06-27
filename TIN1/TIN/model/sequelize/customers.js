const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Customer = sequelize.define('Customers', {
   _id: {
       type: Sequelize.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true
   },
   name: {
       type: Sequelize.STRING,
       allowNull: false,
       validate: {
           notEmpty: {
               msg: "The field is required"
           },
           len: {
               args: [3, 60],
               msg: "The field should contain from 3 to 60 characters"
           },
       }
   },
   surname: {
       type: Sequelize.STRING,
       allowNull: false,
       validate: {
           notEmpty: {
               msg: "The field is required"
           },
           len: {
               args: [3, 60],
               msg: "The field should contain from 3 to 60 characters"
           },
       }
   },
   address: {
       type: Sequelize.STRING,
       allowNull: false,
       validate: {
           notEmpty: {
               msg: "The field is required"
           },
           len: {
               args: [3, 60],
               msg: "The field should contain from 3 to 60 characters"
           },
       }
   },
   phone_number: {
       type: Sequelize.STRING,
       allowNull: false,
       unique: true,
       validate: {
           notEmpty: {
               msg: "The field is required"
           },
           len: {
               args: [3, 60],
               msg: "The field should contain from 3 to 60 characters"
           },
           is: /[1-9]{3}\-[1-9]{3}\-[1-9]{3}/i
       }
   },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "The field is required"
            },
            len: {
                args: [2, 60],
                msg: "The field should contain from 2 to 60 characters"
            },
        }
    }

});



module.exports = Customer;