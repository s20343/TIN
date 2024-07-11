const CarRepository = require('../repository/sequelize/carRepository');

exports.showCarsList = (req, res, next) => {
    CarRepository.getCars()
        .then(cars => {
            res.render('pages/cars/cars-list', {
                cars: cars,
                navLocation: 'cars'
            });
        });
}

exports.showCarsFormNew = (req, res, next) => {
    res.render('pages/cars/cars-form', {
        car: {},
        carBefore: {},
        pageTitle: 'New Car',
        formMode: 'createNew',
        btnLabel: 'Add car',
        formAction: '/cars/add',
        navLocation: 'cars',
        validationErrors: []
    });
}

exports.showCarsFormEdit = (req, res, next) => {
    const carId = req.params.carId;
    
    CarRepository.getCarById(carId)
        .then(car => {
            res.render('pages/cars/cars-form', {
                car: car,
                carBefore: car,
                formMode: 'edit',
                pageTitle: 'Editing a car',
                btnLabel: 'Editing a car',
                formAction: '/cars/edit',
                navLocation: 'cars',
                validationErrors: []
            });
        });
}

exports.showCarsDetails = (req, res, next) => {
    const carId = req.params.carId;
    
    CarRepository.getCarById(carId)
        .then(car => {
            res.render('pages/cars/cars-form', {
                car: car,
                carBefore: car,
                formMode: 'showDetails',
                pageTitle: 'Car details',
                formAction: '',
                navLocation: 'cars',
                validationErrors: []
            });
        });
}

exports.addCar = (req, res, next) => {
    const carData = { ...req.body };
    
    CarRepository.createCar(carData)
        .then( result => {
            res.redirect('/cars');
        })
        .catch(err => {
            res.render('pages/cars/cars-form', {
                car: carData,
                carBefore: carData,
                formMode: 'createNew',
                pageTitle: 'New car',
                btnLabel: 'Add car',
                formAction: '/cars/add',
                navLocation: 'cars',
                validationErrors: err.errors
            })
        });
};

exports.updateCar = (req, res, next) => {
    const carId = req.body._id;
    const carData = { ...req.body };
    
    CarRepository.updateCar(carId, carData)
        .then(result => {
            res.redirect('/cars');
        })
        .catch(err => {
            CarRepository.getCarById(carId)
                .then(car=>{
            res.render('pages/cars/cars-form', {
                car: carData,
                carBefore: car,
                formMode: 'edit',
                pageTitle: 'Edit Car',
                btnLabel: 'Edit Car',
                formAction: '/cars/edit',
                navLocation: 'cars',
                validationErrors: err.errors
            })
        })
        });
};

exports.deleteCar = (req, res, next) => {
    const carId = req.params.carId;
    const carData = { ...req.body };
    
    CarRepository.deleteCar(carId)
        .then( () => {
            res.redirect('/cars');
        })
        .catch(err => {
            res.render('pages/cars/cars-form', {
                car: carData,
                formMode: 'delete',
                pageTitle: 'Deleting a car',
                btnLabel: 'Delete the car',
                formAction: '/cars/delete',
                navLocation: 'cars',
                validationErrors: []
            })
        });
};