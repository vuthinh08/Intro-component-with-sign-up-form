function Validator(options) {
  // function to validate
  function validate(inputElement, rule) {
    var errorMessage = rule.test(inputElement.value);
    var errorElement = inputElement.parentElement.querySelector(
      options.errorSelector
    );

    if (errorMessage) {
      errorElement.innerText = errorMessage;
      inputElement.parentElement.classList.add("invalid");
    }else {
        inputElement.parentElement.classList.remove("invalid");
    }
  }
  var formElement = document.querySelector(options.form);
  if (formElement) {
    // get rules from formelement: form-1
    options.rules.forEach(function (rule) {
      var inputElement = formElement.querySelector(rule.selector);
      if (inputElement) {
        // on blur event
        inputElement.onblur = function () {
          validate(inputElement, rule);
        };
        inputElement.oninput = function () {
            var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove("invalid");
        };
      }
    });
  }
}

// selector: is element we select
Validator.isRequired = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      return value.trim() ? undefined : "First Name cannot be empty";
    },
  };
};
Validator.isRequired = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      return value.trim() ? undefined : "Last Name cannot be empty";
    },
  };
};
Validator.isEmail = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value) ? undefined : "Looks like this is not an email";
    },
  };
};
Validator.minLength = function (selector, min) {
  return {
    selector: selector,
    test: function (value) {
      return value.length >= min ? undefined : "Password must be at least 6 characters";
    },
  };
};
