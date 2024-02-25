const cloudinary = require('./cloudinaryconfig');
const path = require('path');

// Asegúrate de que la ruta sea correcta respecto a la estructura de tu proyecto
const imagePath = path.resolve(__dirname, 'assets/logo_2.png');

cloudinary.uploader.upload(imagePath, 
  { public_id: "Logo_Glotón" }, 
  function(error, result) {
    if (error) {
      console.error("Error al subir:", error);
    } else {
      console.log("Resultado de la subida:", result);
      console.log("URL de la imagen:", result.url);
    }
});
