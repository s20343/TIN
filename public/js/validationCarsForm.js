function validateForm()
{
    // input constants
    const makeInput = document.getElementById('make');
    const modelInput = document.getElementById('model');
    const yearInput = document.getElementById('year');
    const colorInput = document.getElementById('color');

    // error constants
    const errorMake = document.getElementById('errorMake');
    const errorModel = document.getElementById('errorModel');
    const errorYear = document.getElementById('errorYear');
    const errorColor = document.getElementById('errorColor');

    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const lengthErrorMessage = document.getElementById('errorMessage-lengthError').innerText;
    const formErrorMessage = document.getElementById('errorMessage-formError').innerText;
    const yearError = document.getElementById('errorMessage-yearError').innerText;


    // summary constant
    const errorsSummary = document.getElementById('errorsSummary')

    // reset errors
    resetErrors([makeInput, modelInput, yearInput, colorInput], [errorMake, errorModel, errorYear, errorColor], errorsSummary);

    let valid = true;

    // validate make
    if (!checkRequired(makeInput.value))
    {
        valid = false;
        makeInput.classList.add("error-input");
        errorMake.innerText = reqMessage;
    }
    else if (!checkTextLengthRange(makeInput.value, 3, 60))
    {
        valid = false;
        makeInput.classList.add("error-input");
        errorMake.innerText = lengthErrorMessage;
    }

    // validate model
    if (!checkRequired(modelInput.value))
    {
        valid = false;
        modelInput.classList.add("error-input");
        errorModel.innerText = reqMessage;
    }
    else if (!checkTextLengthRange(modelInput.value, 3, 60))
    {
        valid = false;
        modelInput.classList.add("error-input");
        errorModel.innerText = lengthErrorMessage;
    }

    // validate year
    if (!checkRequired(yearInput.value))
    {
        valid = false;
        yearInput.classList.add("error-input");
        errorYear.innerText = reqMessage;
    }
    else if ( (yearInput.value < 2000) || (yearInput.value > 2022) )
    {
        valid = false;
        yearInput.classList.add("error-input");
        errorYear.innerText = yearError;
    }


    // validate color
    if (!checkRequired(colorInput.value))
    {
        valid = false;
        colorInput.classList.add("error-input");
        errorColor.innerText = reqMessage;
    }
    else if (!checkTextLengthRange(colorInput.value, 3, 60))
    {
        valid = false;
        colorInput.classList.add("error-input");
        errorColor.innerText = lengthErrorMessage;
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