
 const errorList = [
  {
    id: 1,
    message: "Le jeton est invalide",
    status: 401
  }, {
    id: 2,
    message: "Besoin de connexion",
    status: 511
  }, {
    id: 3,
    message: "Ressource non trouvée 404",
    status: 404
  }, {
    id: 4,
    message:  "La ressource demandée ne pas disponible",
    status: 406
  }, {
    id: 5,
    message: "serveur na retourné aucune information",
    status: 444
  }, {
    id: 6,
    message: "Le jeton a expiré ou est invalide",
    status: 498
  }, {
    id: 7,
    message: "Temps attente d’une requête du client, écoulé côté serveur",
    status: 408
  }, {
    id: 8,
    message: "Email existe déjà",
    status: 422
  }
];

export function getError( status) {
  let error = errorList.find(element => (element.status === status))
 return error.message
}