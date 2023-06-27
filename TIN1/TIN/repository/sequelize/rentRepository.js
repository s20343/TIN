const Sequelize = require('sequelize');

const Rent = require('../../model/sequelize/rent');
const Customer = require('../../model/sequelize/customers');
const Car = require("../../model/sequelize/cars");

exports.getRents = () => {
    return Rent.findAll({
        include: [
        {
            model: Customer,
            as: 'customer'
        },
        {
            model: Car,
            as: 'car'
        }]
    });
};


exports.getRentById = (rentId) => {
    return Rent.findByPk(rentId, {
        include: [
            {
                model: Customer,
                as: 'customer'
            },
            {
                model: Car,
                as: 'car'
            }]
    });
};

exports.createRent = (data) => {
    console.log(JSON.stringify(data));
    data.return_date= data.return_date== ""? null : data.return_date;

    return Rent.create({
        customer_id: data.customer_id,
        car_id: data.car_id,
        rent_date: data.rent_date,
        return_date: data.return_date
    });
};

exports.updateRent = (rentId, data) => {
    data.return_date= data.return_date== ""? null : data.return_date;
    return Rent.update(data, {
        where: {_id: rentId }
    });
}

exports.deleteRent = (rentId) => {
    return Rent.destroy({
        where: { _id: rentId }
    });
}

exports.deleteManyRents = (rentIds) => {
    return Rent.find({ _id: { [Sequelize.Op.in]: rentIds }})
}