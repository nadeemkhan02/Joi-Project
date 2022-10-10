import { REGEX } from "../constants";

export const validateEmail = (email) => {
  return REGEX.EMAIL.test(email);
};

export const validatePassword = (password) => {
  return REGEX.PASSWORD.test(password);
};

export const validateConfirmPassword = (password, confirmPassword) => {
  return password === confirmPassword && confirmPassword.length > 0;
};

export const validateContact = (contact) => {
  return REGEX.CONTACT.test(contact);
};

export const validateName = (name) => {
  return REGEX.NAME.test(name);
};

export const validateFax = (fax) => {
  return REGEX.FAX.test(fax);
};

export const validateUserName = (name) => {
  if (name === "") {
    return false;
  } else {
    return REGEX.USERNAME.test(name);
  }
};

export const validateBlankSpace = (name) => {
  return REGEX.NOT_BLANK_SPACE.test(name);
};

export const validateOnlyChar = (value) => {
  return REGEX.ONLY_CHAR.test(value);
};

export const validateOnlyDigits = (value) => {
  return REGEX.ONLY_NO.test(value);
};

export const validateNote = (value) => {
   return value?.length > 3 && validateField(value);
}

export const validatePinCode = (value) => {
  return REGEX.PINCODE.test(value);
};

export const validateURLAddress = (value) => {
  return REGEX.URL.test(value);
};

export const validateOnlyTenDigits = (value) => {
  return REGEX.ONLY_TEN_DIGIT.test(value);
};

export const validateHospitalName = (value) => {
  const hospitalName = value.trim();
  return (
    REGEX.ALPHA_NUMERIC.test(hospitalName) &&
    !REGEX.ONLY_NO.test(hospitalName) &&
    !REGEX.SPECIAL_CHAR.test(hospitalName)
  );
};

export const validateInput = (value) => {
  return value?.toString()?.length > 0;
};

export const validateField = (value) => {
  return /\b.*[a-zA-Z]+.*\b/.test(value);
};

