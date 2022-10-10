import React from "react";
import Joi from "joi-browser";
import { useState } from "react";
import {
  validateEmail,
  validateName,
  validateOnlyDigits,
  validateOnlyTenDigits,
} from "../../utils/validation";
import axios from "axios";
import "./form.css";

const Form = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",

    isValidName: true,
    isValidEmail: true,
    isValidPhoneNo: true,
    isValidAge: true,

    isValidForm: false,
  });

  const Schema = {
    name: Joi.string().min(2).required(),
    email: Joi.string()
      .min(3)
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    phone: Joi.string().min(6).max(10).required(),
    age: Joi.string().min(2).required(),
  };

  const handleChange = ({ currentTarget: input }) => {
    const FormData = { ...formData };
    FormData[input.name] = input.value;
    const Value = {
      name:FormData.name,
      email: FormData.email,
      phone: FormData.phone,
      age: FormData.age
    }
    const result = Joi.validate(Value, Schema, { abortEarly: false });
    if(!result.error){
      FormData.isValidForm = true;
    }else{
       FormData.isValidForm = false;
    }
    setFormData(FormData);
  };

  const handleBlur = ({ currentTarget: input }) => {
    const FormData = { ...formData };
    if (input.name === "name") {
      FormData.isValidName = validateName(input.value);
    } else if (input.name === "email") {
      FormData.isValidEmail = validateEmail(input.value);
    } else if (input.name === "phone") {
      FormData.isValidPhoneNo = validateOnlyDigits(input.value);
    } else if (input.name === "age") {
      FormData.isValidAge = validateOnlyDigits(input.value);
    }
    setFormData(FormData);
  };

  const handleSubmit = () => {
    console.log(formData, "form data")
    axios.post("http://localhost:5000/api/addData", formData).then((res)=>{
      console.lof(res, "res<<<")
    }).catch((error)=>{
      console.log(error, "error<<<")
    })
  }

  return (
    <div className="form-container">
      <div className="form">
        <h1 className="form-heading">-Personal Memoranda-</h1>
        <div>
          <p className="label">Name:</p>
          <input
            value={formData.name}
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter you value"
          />
          {!formData.isValidName && (
            <p className="error-message">Please enter valid name</p>
          )}
        </div>
        <div>
          <p className="label">email:</p>
          <input
            value={formData.email}
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter you value"
          />
          {!formData.isValidEmail && (
            <p className="error-message">Please enter valid email</p>
          )}
        </div>
        <div>
          <p className="label">phone:</p>
          <input
            value={formData.phone}
            type="number"
            name="phone"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter you value"
          />
          {!formData.isValidPhoneNo && (
            <p className="error-message">Please enter valid phone no</p>
          )}
        </div>
        <div>
          <p className="label">Age:</p>
          <input
            value={formData.age}
            type="number"
            name="age"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter you value"
          />
          {!formData.isValidAge && (
            <p className="error-message">Please enter valid age</p>
          )}
        </div>
        <button disabled={!formData.isValidForm} onClick={handleSubmit} className="submit-btn">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Form;
