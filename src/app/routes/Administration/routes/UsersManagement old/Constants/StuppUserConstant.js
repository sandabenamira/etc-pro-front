import * as Yup from "yup";
import React from "react";
import IntlMessages from "../../../../../../util/IntlMessages";

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Must have a 3 character ")
    .max(15, "Max 15 character")
    .required("Name is required"),
  surname: Yup.string()
    .min(3, "Must have a 3 character ")
    .max(15, "Max 15 character")
    .required("Surname is required"),
  email: Yup.string()
    .email("Must have a email  ")
    .max(55, "Max 55 character")
    .required("Email is required"),
  zip_code: Yup.string()
    .matches(/^[1-9]\d{3}$/, "Invalid code nunber")
    .required("Zip Code is required"),
  phone: Yup.string()
    .matches(/^[2-9]\d{7}$/, "use 8 phone nunber")
    .required("Phone Number is required"),
  cin: Yup.string()
    .matches(/^[0-9]\d{7}$/, "use 8 cin nunber")
    .required("CIN is required"),
  address: Yup.string()
    .min(3, "Must have a 3 character ")
    .required("Address is required"),
  date_of_birth: Yup.date()
    .max(new Date("12-12-2010"), "Birth day max 2010")
    .required("Birth day is required"),
  gender: Yup.string().required("Gender is required")
  //   nameParent: Yup.string()
  //     .min(3, "Must have a 3 character ")
  //     .max(15, "Max 15 character")
  //     .required("Name is required"),
  //   surnameParent: Yup.string()
  //     .min(3, "Must have a 3 character ")
  //     .max(15, "Max 10 character")
  //     .required("Surname is required"),
  //   emailParent: Yup.string()
  //     .email("Must have a email  ")
  //     .max(30, "Max 30 character")
  //     .required("Email is required"),
  //   zip_codeParent: Yup.string()
  //     .matches(/^[1-9]\d{3}$/, "Invalid code nunber")
  //     .required("Zip Code is required"),
  //   phoneParent: Yup.string()
  //     .matches(/^[2-9]\d{7}$/, "Invalid phone nunber")
  //     .required("Phone Number is required"),
  //   cinParent: Yup.string()
  //     .matches(/^[0-9]\d{7}$/, "Invalid cin nunber")
  //     .required("CIN is required"),
  //   addressParent: Yup.string()
  //     .min(3, "Must have a 3 character ")
  //     .required("Address is required"),
  //   date_of_birthParent: Yup.date().required("Birth day is required"),
  //   genderParent: Yup.string().required("Gender is required")
});

export const gender = [
  {
    value: "Masculin",
    label: <IntlMessages id="gender.male" />
  },
  {
    value: "Féminin",
    label: <IntlMessages id="gender.female" />
  }
];
