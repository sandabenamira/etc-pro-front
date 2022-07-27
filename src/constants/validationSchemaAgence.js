import * as Yup from "yup";

const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;
export   const validationSchema = Yup.object({
    name: Yup.string()
      .trim("Champ obligatoire !")
      .required("Champ obligatoire !")
      .matches(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g, "Veuillez entrer un name valide")
      .max(40, "Trop long ! maximum 40 caractères")
      .min(2, "Trop court! minimum 2 caractères"),
    type: Yup.string()
      .required("Champ obligatoire !"),
      
    governorate: Yup.string()
      .required("Champ obligatoire !")
      .matches(
        /^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g,
        "Veuillez entrer un governorate valide"
      )
      .max(40, "Trop long ! maximum 40 caractères")
      .min(2, "Trop court! minimum 2 caractères"),
    fax: Yup.string()
      .trim("Champ obligatoire !")
      .required("Champ obligatoire !")
      .matches(phoneRegExp, "Veuillez entrer un fax valide")
      .max(40, "Trop long ! maximum 40 chiffres ")
      .min(6, "Trop court ! minimum 6 chiffres"),
    telephoneNumber: Yup.string()
      .trim("Champ obligatoire !")
      .required("Champ obligatoire !")
      .matches(phoneRegExp, "Veuillez entrer un numéro du tel valide")
      .max(40, "Trop long ! maximum 40 chiffres ")
      .min(6, "Trop court ! minimum 6 chiffres"),
    address: Yup.string()
      .trim("Champ obligatoire !")
      .required("Champ obligatoire !")
      .matches(
        /^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g,
        "Veuillez entrer un adresse valide"
      )
      .max(40, "Trop long ! maximum 40 caractères")
      .min(2, "Trop court! minimum 2 caractères"),
    email: Yup.string()
      .trim("Champ obligatoire !")
      .email("Veuillez entrer une adresse e-mail valide  ")
      .required("Champ obligatoire !")
      .max(40, "Trop long ! maximum 40 caractères")
      .min(3, "Trop court! minimum 3 caractères"),
  });

  export   const initialValues = {
    name: "",
    type: "",
    governorate: "",
    fax: "",
    telephoneNumber: "",
    address: "",
    email: "",
  };