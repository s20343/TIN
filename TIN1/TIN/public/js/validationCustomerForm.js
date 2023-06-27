function validateForm()
{
    // input constants
    const nameInput = document.getElementById('name');
    const surnameInput = document.getElementById('surname');
    const addressInput = document.getElementById('address');
    const phoneNumberInput = document.getElementById('phone_number');
    const passwordInput = document.getElementById('password');

    // error constants
    const errorName = document.getElementById('errorName');
    const errorSurname = document.getElementById('errorSurname');
    const errorAddress = document.getElementById('errorAddress');
    const errorPhoneNumber = document.getElementById('errorPhoneNumber');
    const errorPassword = document.getElementById('errorPassword');

    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const lengthErrorMessage = document.getElementById('errorMessage-lengthError').innerText;
    const formErrorMessage = document.getElementById('errorMessage-formError').innerText;
    const PhonePatternError = document.getElementById('errorMessage-PhonePatternError').innerText;
    const lengthErrorMessage2 = document.getElementById('errorMessage-length2Error').innerText;


    // summary constant
    const errorsSummary = document.getElementById('errorsSummary')

    // reset errors
    resetErrors([nameInput, surnameInput, addressInput, phoneNumberInput,passwordInput],[errorName, errorSurname, errorAddress,errorPhoneNumber,errorPassword], errorsSummary);

    let valid = true;

    // validate name
    if (!checkRequired(nameInput.value))
    {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = reqMessage;
    }
    else if (!checkTextLengthRange(nameInput.value, 3, 60))
    {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = lengthErrorMessage;
    }

    // validate surname
    if (!checkRequired(surnameInput.value))
    {
        valid = false;
        surnameInput.classList.add("error-input");
        errorSurname.innerText = reqMessage;
    }
    else if (!checkTextLengthRange(surnameInput.value, 3, 60))
    {
        valid = false;
        surnameInput.classList.add("error-input");
        errorSurname.innerText = lengthErrorMessage;
    }

    // validate address
    if (!checkRequired(addressInput.value))
    {
        valid = false;
        addressInput.classList.add("error-input");
        errorAddress.innerText = reqMessage;
    }
    else if (!checkTextLengthRange(addressInput.value, 3, 60))
    {
        valid = false;
        addressInput.classList.add("error-input");
        errorAddress.innerText = lengthErrorMessage;
    }

    // validate phoneNumber
    if (!checkRequired(phoneNumberInput.value))
    {
        valid = false;
        phoneNumberInput.classList.add("error-input");
        errorPhoneNumber.innerText = reqMessage;
    }
    else if (!checkPhoneNumber(phoneNumberInput.value))
    {
        valid = false;
        phoneNumberInput.classList.add("error-input");
        errorPhoneNumber.innerText = PhonePatternError;
    }
    //Password
    if(!checkRequired(passwordInput.value)){
        valid = false;
        passwordInput.classList.add("error-input");
        errorPassword.innerText = reqMessage;
    } else if (!checkTextLengthRange(passwordInput.value, 2, 60)){
        valid = false;
        passwordInput.classList.add("error-input");
        errorPassword.innerText = lengthErrorMessage2;
    }

    // validate summary
    if (!valid)
        errorsSummary.innerText = formErrorMessage;

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

    if (value == "")
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

function checkPhoneNumber(value)
{
    if (!value)
        return false;

    value = value.toString().trim();
    const re = /[1-9]{3}\-[1-9]{3}\-[1-9]{3}/i;

    return re.test(value);
}

