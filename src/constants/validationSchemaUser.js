import * as Yup from "yup";

const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;

export const validationSchema = Yup.object({
  firstName: Yup.string()
    .trim("Champ obligatoire !")
    .required("Champ obligatoire !")
    .matches(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g, "Veuillez entrer un nom valide")
    .max(40, "Trop long ! maximum 40 caractères")
    .min(2, "Trop court! minimum 2 caractères"),
  lastName: Yup.string()
    .required("Champ obligatoire !")
    .trim("Champ obligatoire !")
    .matches(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g, "Veuillez entrer un prénom valide")
    .max(40, "Trop long ! maximum 40 caractères")
    .min(2, "Trop court! minimum 2 caractères"),
  gender: Yup.string().required("Champ obligatoire !"),

  dateBirth: Yup.date()
    .required("Champ obligatoire !")
    .max(new Date(), "Entrer une date valide"),

  email: Yup.string()
    .trim("Champ obligatoire !")
    .email("Veuillez entrer une adresse e-mail valide  ")
    .required("Champ obligatoire !")
    .max(40, "Trop long ! maximum 40 caractères")
    .min(3, "Trop court! minimum 3 caractères"),

  telephoneNumber: Yup.string()
    .trim("Champ obligatoire !")
    .required("Champ obligatoire !")
    .matches(phoneRegExp, "Veuillez entrer un numéro téléphone valide")
    .max(8, "Indiquer 8 chiffres ")
    .min(8, "Indiquer 8 chiffres"),

  cin: Yup.string()
    .trim("Champ obligatoire !")
    .required("Champ obligatoire !")
    .matches(phoneRegExp, "Veuillez entrer un numéro cin valide")
    .max(8, "Indiquer 8 chiffres ")
    .min(8, "Indiquer 8 chiffres"),
  country: Yup.string()
    .required("Champ obligatoire !")
    .trim("Champ obligatoire !")
    .matches(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g, "Entrer une pays valide"),

  address: Yup.string()
    .trim("Champ obligatoire !")
    .required("Champ obligatoire !")
    .matches(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g, "Entrer une adresse valide")
    .max(40, "Trop long ! maximum 40")
    .min(2, "Trop court! minimum 2"),
  postalCode: Yup.string()

    .matches(phoneRegExp, "Entrer un code valide")
    .max(20, "Trop long ! maximum 20 chiffres ")
    .min(4, "Trop court ! minimum 4 chiffres"),

  roleId: Yup.string().required("Champ obligatoire !"),
  identifier: Yup.string()
    .trim("Champ obligatoire !")

    .required("Champ obligatoire !"),
 });

  
