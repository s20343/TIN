const Customer = require("../../model/sequelize/customers");
const Rent = require("../../model/sequelize/rent");
const Car = require("../../model/sequelize/cars");

exports.getCars = () => {
    return Car.findAll();
};

exports.getCarById = (carId) => {
    return Car.findByPk(carId,
        {
            include: [{
                model: Rent,
                as: 'rents',
                include: [{
                    model: Customer,
                    as: 'customer'
                }]
            }]
        });
};

exports.createCar = (newCarData) => {
    return Car.create({
        make: newCarData.make,
        model: newCarData.model,
        year: newCarData.year,
        color: newCarData.color
    });
};

exports.updateCar = (carId, carData) => {
    const make = carData.make;
    const model = carData.model;
    const year = carData.year;
    const color = carData.color;
    return Car.update(carData, {where: {_id: carId }});
};

exports.deleteCar = (carId) => {
    return Car.destroy({
        where: { _id: carId }
    });
}; 