import * as Yup from "yup";

const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;
export const initialValues = {
  nameEntreprise: "",
  serialNumberEntreprise: "",
  addressEntreprise: "",
  postalCodeEntreprise: "",
  governorateEntreprise: "",
  countryEntreprise: "",
  telephoneNumberEntreprise: "",
  emailEntreprise: "",
  choiceCurrencyEntreprise: "",
  lastNameUser: "",
  firstNameUser: "",
  genderUser: "",
  dateBirthUser: "",
  addressUser: "",
  telephoneNumberUser: "",
  emailUser: "",
};
export const validationSchema = Yup.object().shape({
    nameEntreprise: Yup.string()
      .trim("Champ obligatoire !")
      .required("Champ obligatoire !")
      .matches(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g, "Entrer un nom valide")
      .max(40, "Trop long ! maximum 40")

      .min(2, "Trop court! minimum 2"),
    serialNumberEntreprise: Yup.string()
      .required("Champ obligatoire !")
      .matches(phoneRegExp, "Entrer un numéro valide")
      .max(20, "Trop long ! maximum 20 chiffres ")
      .min(4, "Trop court ! minimum 4 chiffres"),
    addressEntreprise: Yup.string()
      .required("Champ obligatoire !")
      .matches(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g, "Entrer une adresse valide")
      .max(40, "Trop long ! maximum 40")
      .min(2, "Trop court! minimum 2"),
    postalCodeEntreprise: Yup.string()
      .trim("Champ obligatoire !")
      .required("Champ obligatoire !")
      .matches(phoneRegExp, "Entrer un code valide")
      .max(20, "Trop long ! maximum 20 chiffres ")
      .min(4, "Trop court ! minimum 4 chiffres"),
    governorateEntreprise: Yup.string()
      .matches(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g, "Entrer un gouvernorat valide")
      .max(40, "Trop long ! maximum 40")
      .min(2, "Trop court! minimum 2"),
    countryEntreprise: Yup.string()
      .matches(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g, "Entrer une pays valide")
      .max(40, "Trop long ! maximum 40")
      .min(2, "Trop court! minimum 2"),
    telephoneNumberEntreprise: Yup.string()
      .matches(phoneRegExp, "Entrer un numéro valide")
      .max(40, "Trop long ! maximum 40 chiffres ")
      .min(6, "Trop court ! minimum 6 chiffres"),
    emailEntreprise: Yup.string()
      .trim("Champ obligatoire !")
      .email("Entrer une adresse e-mail valide  ")
      .required("Champ obligatoire !")
      .max(40, "Trop long ! maximum 40")
      .min(3, "Trop court! minimum 3"),
    choiceCurrencyEntreprise: Yup.string()
      .trim("Champ obligatoire !")
      .required("Champ obligatoire !")
      .matches(
        /^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g,
        "Entrer un Choix de la devise valide"
      )
      .max(40, "Trop long !")
      .min(2, "Trop court!"),
    lastNameUser: Yup.string()
      .trim("Champ obligatoire !")
      .required("Champ obligatoire !")
      .matches(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g, "Entrer un nom valide")
      .max(40, "Trop long !")
      .min(2, "Trop court!"),
    firstNameUser: Yup.string()
      .trim("Champ obligatoire !")
      .required("Champ obligatoire !")
      .matches(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g, "Entrer un prénom valide")
      .max(40, "Trop long !")
      .min(2, "Trop court!"),
    dateBirthUser: Yup.date().max(new Date(), "Entrer une date valide"),
    addressUser: Yup.string()
      .matches(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g, "Entrer une adresse valide")
      .max(40, "Trop long !")
      .min(2, "Trop court!"),
    telephoneNumberUser: Yup.string()
      .matches(phoneRegExp, "Entrer un numéro valide")
      .max(40, "Trop long !")
      .min(2, "Trop court!"),
    emailUser: Yup.string()
      .trim("Champ obligatoire !")
      .email("Entrer une adresse e-mail valide  ")
      .required("Champ obligatoire !")
      .max(40, "Trop long ! maximum 40")
      .min(3, "Trop court! minimum 3"),



      
  });