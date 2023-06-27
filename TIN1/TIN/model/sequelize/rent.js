const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Rent = sequelize.define('Rent', {
   _id: {
       type: Sequelize.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true
   },
    customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "The field is required"
            },
        }
    },
    car_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "The field is required"
            },
        }
    },
   rent_date: {
       type: Sequelize.DATE,
       allowNull: false,
       validate: {
           isDate: {
               args: false,
               msg: "date is required."
           },
            notEmpty: {
                msg: "The field is required"
            },
           rentDateIsNotInFuture() {
               if (this.rent_date > new Date()) {
                   throw new Error('Rent date must not be in the future');
               }
           }
       }
   },
   return_date: {
       type: Sequelize.DATE,
       allowNull: true,
       validate:{
           compareDates() {
               if (this.return_date && this.return_date < this.rent_date) {
                   throw new Error('Return date must be after rent date');
               }
           }
       }
   },
});

module.exports = Rent;