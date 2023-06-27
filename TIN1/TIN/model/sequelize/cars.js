const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Car = sequelize.define('Cars', {
   _id: {
       type: Sequelize.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true
   },
   make: {
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
   model: {
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

    year: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "The field is required"
            },
            isNumeric: {
                msg: "The field should contain a number"
            },
            max: {
                args: 2022,
                msg: "Year must be less than or equal to 2022"
            },
            min: {
                args: 2000,
                msg: "Year must be greater than or equal to 2000"
            }
        }
    },
   color: {
       type: Sequelize.STRING,
       allowNull: false,
       validate: {
           notEmpty: {
               msg: "The field is required"
           },
           len: {
               args: [3, 60],
               msg: "The field should contain from 3 to 60 characters"
           }
       }
   },
});

module.exports = Car;