const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const jwtMiddleware = (req, res, next) => {
    // Recogemos el header "Authorization". Sabemos que viene en formato "Bearer XXXXX...",
    // así que nos quedamos solo con el token y obviamos "Bearer "s
    console.log(req.headers)
    const authHeader = req.headers.authorization;
    console.log("Token" , authHeader)
    if (!authHeader) return res.status(401).json({error: "Unauthorized MISSING HEADER"});
    
    if(authHeader){
      const token = authHeader.split(" ")[1];
      console.log(token)
        jwt.verify(token, jwtSecret, (error, payload) =>{
          if(error){
            return res.status(403).json({message: "Invalid token"})
          }else{
            req.jwtPayload = payload
            next();
          }
        })}else{
          Response.status(401).json({message: "Token not provided"})
        }
    // Si no hubiera token, respondemos con un 401
    // if (!token) return res.status(401).json({error: "Unauthorized"});
  
    // let tokenPayload;
  
    // try {
    //   // Si la función verify() funciona, devolverá el payload del token
    //   tokenPayload = jwt.verify(token, jwtSecret);
    //   console.log("tokenPayload", tokenPayload)
    // } catch (error) {
    //   // Si falla, será porque el token es inválido, por lo que devolvemo error 401
    //   return res.status(401).json({error: "Unauthorized"});
    // }

  
    // Guardamos los datos del token dentro de req.jwtPayload, para que esté accesible en los próximos objetos req
    // req.jwtPayload = tokenPayload;
    // console.log(tokenPayload);
    // next();
  };
  


module.exports = {
    jwtMiddleware
}
