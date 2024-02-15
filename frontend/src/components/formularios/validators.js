// todo---------------------Validators para E-mail
export const emailValidator = (email) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email) || "Invalid email format";
};

// ?-------------------Validator para Telefonos
export const phoneValidator = (phone) => {
  const regex = /^[0-9]{9}$/;
  return regex.test(phone) || "Invalid phone number format";
};

// !---------------------Ciudades donde trabaja Gloton
const spanishCities = [
  "Madrid",
  "Barcelona",
  "Valencia",
  "Sevilla",
  "Zaragoza",
];
const frenchCities = ["Paris", "Marseille", "Lyon", "Toulouse", "Nice"];
const georgianCities = ["Tbilisi", "Batumi", "Kutaisi", "Rustavi", "Sukhumi"];
const venezuelanCities = [
  "Caracas",
  "Maracaibo",
  "Valencia",
  "Barquisimeto",
  "Maracay",
];

// !--------------------Validators para cudades
export const validateCity = (city) => {
  if (spanishCities.includes(city)) return true;
  if (frenchCities.includes(city)) return true;
  if (georgianCities.includes(city)) return true;
  if (venezuelanCities.includes(city)) return true;
  return regex.test(phone) || "Invalid city. Please select a valid city.";
};

export default { emailValidator, validateCity, phoneValidator };
