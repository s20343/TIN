function validateForm()
{
    // input constants
    const customerInput = document.getElementById('customer_id');
    const carInput = document.getElementById('car_id');
    const rentDateInput = document.getElementById('rent_date');
    const returnDateInput = document.getElementById('return_date');

    // error constants
    const errorCustomer = document.getElementById('errorCustomer_id');
    const errorCar = document.getElementById('errorCar_id');
    const errorRentDate = document.getElementById('errorRentDate');
    const errorReturnDate = document.getElementById('errorReturnDate');


    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const dateErrorMessage = document.getElementById('errorMessage-dateError').innerText;
    const dateFutureMessage = document.getElementById('errorMessage-dateFutureError').innerText;
    const CompareDate = document.getElementById('errorMessage-CompareDate').innerText;
    const formError = document.getElementById('errorMessage-formError').innerText;

    // summary constant
    const errorsSummary = document.getElementById('errorsSummary')

    // reset errors
    resetErrors([customerInput, carInput, rentDateInput, returnDateInput],[errorCustomer, errorCar,errorRentDate, errorReturnDate], errorsSummary);

    let valid = true;

    // current date
    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDate(),
        year = nowDate.getFullYear();

    if (month.length < 2)
        month = '0' + month;

    if (day.length < 2)
        day = '0' + day;
    const nowString = [year, month, day].join('-');




    // validate customer
    if (!checkRequired(customerInput.value) || customerInput.value == "--choose a customer--")
    {
        valid = false;
        customerInput.classList.add("error-input");
        errorCustomer.innerText = reqMessage;
    }

    // validate car
    if (!checkRequired(carInput.value) || carInput.value == "")
    {
        valid = false;
        carInput.classList.add("error-input");
        errorCar.innerText = reqMessage;
    }

    // validate rent date
    if (!checkRequired(rentDateInput.value))
    {
        valid = false;
        rentDateInput.classList.add("error-input");
        errorRentDate.innerText = reqMessage;
    }
    else if (!checkDate(rentDateInput.value))
    {
        valid = false;
        rentDateInput.classList.add("error-input");
        errorRentDate.innerText = dateErrorMessage;
    }
    else if (checkDateIfAfter(rentDateInput.value, nowString))
    {
        valid = false;
        rentDateInput.classList.add("error-input");
        errorRentDate.innerText = dateFutureMessage;
    }

    // validate return date
    if (returnDateInput.vaule != null && !checkDate(returnDateInput.value))
    {
        valid = false;
        returnDateInput.classList.add("error-input");
        errorReturnDate.innerText = dateErrorMessage;
    }
    //if the rental date and the return date are correct, we check the order of the dates
    else if (checkRequired(returnDateInput.value) && checkDate(returnDateInput.value)
        && !checkDateIfAfter(returnDateInput.value, rentDateInput.value))
    {
        valid = false;
        returnDateInput.classList.add("error-input");
        errorReturnDate.innerText = CompareDate;
    }

    // validate summary
    if (!valid)
        errorsSummary.innerText = formError;

    return valid;
}

function resetErrors(inputs, errorTexts, errorInfo)
{
    for(let i=0; i<inputs.length; i++)
        inputs[i].classList.remove("error-input");

    for(let i=0; i<errorTexts.length; i++)
        errorTexts[i].innerText = "";

    errorInfo.innerText = "";
}

function checkRequired(value)
{
    if (!value)
        return false;

    value = value.toString().trim();

    if (value === "")
        return false;

    return true;
}

function checkTextLengthRange(value, min, max)
{
    if (!value)
        return false;

    value = value.toString().trim();
    const length = value.length;

    if (max && length > max)
        return false;

    if (min && length < min)
        return false;

    return true;
}

function checkDate(value)
{
    if (!value)
        return false;

    const pattern = /(\d{4})-(\d{2})-(\d{2})/;

    return pattern.test(value);
}

function checkDateIfAfter(value, compareTo)
{
    if (!value)
        return false;

    if (!compareTo)
        return false;

    const pattern = /(\d{4})-(\d{2})-(\d{2})/;

    if (!pattern.test(value))
        return false;

    if (!pattern.test(compareTo))
        return false;

    const valueDate = new Date(value);
    const compareToDate = new Date(compareTo);

    if (valueDate.getTime() <= compareToDate.getTime())
        return false;

    return true;
}