const sequelize = require('./sequelize');

const Customer = require('../../model/sequelize/customers');
const Car = require('../../model/sequelize/cars');
const Rent = require('../../model/sequelize/rent');
const authUtil = require('../../util/authUtil');
const passHash = authUtil.hashPassword('12345');

module.exports = () => {
    Customer.hasMany(Rent, {as: 'rents', foreignKey: {name: 'customer_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Rent.belongsTo(Customer, {as: 'customer', foreignKey: {name: 'customer_id', allowNull: false} } );
    Car.hasMany(Rent, {as: 'rents', foreignKey: {name: 'car_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Rent.belongsTo(Car, {as: 'car', foreignKey: {name: 'car_id', allowNull: false} });

    let allCustomers, allCars;
    return sequelize
        .sync({force: true})
        .then( () => {
            return Customer.findAll();
        })
        .then(customers => {
            if( !customers || customers.length == 0 ) {
                return Customer.bulkCreate([
                    {name: 'Batuhan', surname: 'Seyhan', address: 'Polna 9',  phone_number: '511-132-228', password: passHash},
                    {name: 'Mateuz', surname: 'Aasdf', address: 'ŁASBASU8 12',  phone_number: '543-696-345', password: passHash}
                ])
                .then( () => {
                    return Customer.findAll();
                });
            } else {
                return customers;
            }
        })
        .then( customers => {
            allCustomers = customers;
            return Car.findAll();
        })
        .then( cars => {
            if( !cars || cars.length == 0 ) {
                return Car.bulkCreate([
                    { make: 'BWM', model: '1 series', year: '2013', color: 'Black'},
                    { make: 'Audi', model: '100', year: '2008', color: 'White'}
                ])
                .then( () => {
                    return Car.findAll();
                });
            } else {
                return cars;
            }
        })
        .then( cars => {
            allCars = cars;
            return Rent.findAll();
        })
        .then( rents => {
            if( !rents || rents.length == 0 ) {
                return Rent.bulkCreate([
                    {customer_id: allCustomers[0]._id, car_id: allCars[0]._id, rent_date: '2002-01-01', return_date: '2002-01-05'},
                    {customer_id: allCustomers[1]._id, car_id: allCars[1]._id, rent_date: '2001-02-01', return_date: '2009-02-01'}
                ]);
            } else {
                return rents;
            }
        });
};