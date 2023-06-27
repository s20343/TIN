const RentRepository = require('../repository/sequelize/rentRepository');
const CustomerRepository = require('../repository/sequelize/customerRepository');
const CarRepository = require('../repository/sequelize/carRepository');

exports.showRentList = (req, res, next) => {
    RentRepository.getRents()
        .then(rents => {
            res.render('pages/rent/rent-list', {
                rents: rents,
                pageTitle: 'List of rentals',
                navLocation: 'rent'
            });
        });
}

exports.showRentFormNew = (req, res, next) => {
    let allCustomers, allCars ,allRents;

    RentRepository.getRents()
        .then(rents => {
            allRents = rents;
            return CustomerRepository.getCustomers();
        })
        .then(customers => {
            allCustomers = customers;
            return CarRepository.getCars();
        })
        .then(cars => {
            allCars = cars;
            res.render('pages/rent/rent-form', {
                rent: {},
                rentBefore: {},
                allCustomers: allCustomers,
                allCars: allCars,
                formMode: 'createNew',
                pageTitle: 'new rental',
                btnLabel: 'Add a rental',
                formAction: '/rent/add',
                navLocation: 'rent',
                validationErrors: []
            });
        });
}

exports.showRentFormEdit = (req, res, next) => {
    const rentId = req.params.rentId;
    let allCustomers, allCars, allRents;

    RentRepository.getRents()
        .then(rents => {
            allRents = rents;
            return CustomerRepository.getCustomers();
        })
        .then(customers => {
            allCustomers = customers;
            return CarRepository.getCars();
        })
        .then(cars => {
            allCars = cars;
            return RentRepository.getRentById(rentId);
        })
        .then(rent => {
            res.render('pages/rent/rent-form', {
                rent: rent,
                rentBefore: rent,
                allCustomers: allCustomers,
                allCars: allCars,
                allRents: allRents,
                formMode: 'edit',
                pageTitle: 'Editing a rental',
                btnLabel: 'Edit rental',
                formAction: '/rent/edit',
                navLocation: 'rent',
                validationErrors: []
            });
        });
}

exports.showRentDetails = (req, res, next) => {
    const rentId = req.params.rentId;
    let allCustomers, allCars;
    
    CustomerRepository.getCustomers()
        .then(customers => {
            allCustomers = customers;
            return CarRepository.getCars();
        })
        .then(cars => {
            allCars = cars;
            return RentRepository.getRentById(rentId);
        })
        .then(rent => {
            res.render('pages/rent/rent-form', {
                rent: rent,
                rentBefore: rent,
                allCustomers: allCustomers,
                allCars: allCars,
                formMode: 'showDetails',
                pageTitle: 'Rental details',
                formAction: '',
                navLocation: 'rent',
                validationErrors: []
            });
        });     
}

exports.addRent = (req, res, next) => {
    let allCustomers, allCars, error;
    const rentData = { ...req.body };

    RentRepository.createRent(rentData)
        .then(result => {
            res.redirect('/rent');
        })
        .catch(err => {
            CarRepository.getCars()
                .then(cars =>{
                allCars=cars;
                return CustomerRepository.getCustomers();
                })
                .then(customers => {
                allCustomers = customers;
                res.render('pages/rent/rent-form', {
                    rent: rentData,
                    rentBefore: rentData,
                    allCustomers: allCustomers,
                    allCars: allCars,
                    formMode: 'createNew',
                    pageTitle: 'Adding a rental',
                    btnLabel: 'Add a rental',
                    formAction: '/rent/add',
                    navLocation: 'rent',
                    validationErrors: err.errors
                });
            });
        });
};



exports.updateRent = (req, res, next) => {
    let allCustomers, allCars;
    const rentId = req.body._id;
    const rentData = { ...req.body };

    RentRepository.updateRent(rentId, rentData)
        .then(result => {
            res.redirect('/rent');
        })
        .catch(err => {
            CustomerRepository.getCustomers()
                .then(customers =>{
                    allCustomers = customers;
                    return CarRepository.getCars();
                 })
                .then(cars => {
                    allCars = cars;
                    return RentRepository.getRentById(rentId);
                })
                .then(rent => {
                    res.render('pages/rent/rent-form', {
                        rent: rentData,
                        rentBefore: rent,
                        allCustomers: allCustomers,
                        allCars: allCars,
                        formMode: 'edit',
                        pageTitle: 'Editing a rental',
                        btnLabel: 'Edit rental',
                        formAction: '/rent/edit',
                        navLocation: 'rent',
                        validationErrors: err.errors
                    });
                });
        });
}
exports.deleteRent = (req, res, next) => {
    const rentId = req.params.rentId;
    
    RentRepository.deleteRent(rentId)
        .then(() => {
            res.redirect('/rent');
        })
        .catch(err => {
            res.render('pages/rent/rent-form', {
                rent: rentData,
                pageTitle: 'Delete a rental',
                formMode: 'delete',
                btnLabel: 'Delete the rental',
                formAction: '/rent/delete',
                navLocation: 'rent',
                validationErrors: []
            })
        });
};