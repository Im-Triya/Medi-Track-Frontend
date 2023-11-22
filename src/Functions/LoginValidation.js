function Validation(values) {
  let error = {};
  const email_pattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
  const password_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  if (values.email === "") {
    error.email = "Email is required";
  } else if (!email_pattern.test(values.email)) {
    error.email = "Invalid email address";
  } else {
    error.email = "";
  }

  if (values.password === "") {
    error.password = "Password is required";
  } else if (!password_pattern.test(values.password)) {
    error.password =
      "Password must contain at least 6 characters, one letter and one number";
  } else {
    error.password = "";
  }

  return error;
}

export default Validation;
