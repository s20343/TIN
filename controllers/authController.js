const CustomerRepository = require('../repository/sequelize/customerRepository');

const authUtil = require('../util/authUtil');

exports.login = (req, res, next) => {
    const phone = req.body.phone_number;
    const password = req.body.password;
    CustomerRepository.findByPhoneNumber(phone)
        .then(customer => {
            if(!customer){
                res.render('index', {
                    navLocation: '',
                    loginError: "Invalid phone number or password"
                })
            }else if(authUtil.comparePasswords(password, customer.password) === true){
                req.session.loggedUser = customer;
                res.redirect('/');
            }else{
                res.render('index', {
                    navLocation: '',
                    loginError: "Invalid phone number or password"
                })
            }
        }).catch(err => {
            console.log(err);
    });
}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect('/');
}