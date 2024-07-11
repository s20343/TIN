const Customer = require("../../model/sequelize/customers");
const Rent = require("../../model/sequelize/rent");
const Car = require("../../model/sequelize/cars");
const authUtil = require("../../util/authUtil");

exports.getCustomers = () => {
    return Customer.findAll();
};

exports.getCustomerById = (customerId) => {
    return Customer.findByPk(customerId,
        {
            include: [
                {
                model: Rent,
                as: 'rents',
                include: [{
                    model: Car,
                    as: 'car'
                }]
            }]
        });
};

exports.createCustomer = (newCustomerData) => {

    return Customer.create({
        name: newCustomerData.name,
        surname: newCustomerData.surname,
        address: newCustomerData.address,
        phone_number: newCustomerData.phone_number,
        password: authUtil.hashPassword(newCustomerData.password)
    });
};

exports.updateCustomer = (customerId, customerData) => {

    customerData.password = authUtil.hashPassword(customerData.password)
    const name = customerData.name;
    const surname = customerData.surname;
    const address = customerData.address;
    const phone_number = customerData.phone_number;
    return Customer.update(customerData, {
        where: {_id: customerId }
    });
};

exports.deleteCustomer = (customerId) => {
    return Customer.destroy({
        where: { _id: customerId }
    });

};
exports.findByPhoneNumber = (phone_number) => {
    return Customer.findOne({
        where: {phone_number: phone_number}
    });
}