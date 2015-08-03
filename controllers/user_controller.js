var users = {
  admin: {id:1, username:"admin", password: "1234"},
  pepe: {id:2, username:"pepe", password: "5678"},
  q: {id:77, username:"q", password: "q"}
}

// Comprueba si el usuario está resgistrado en users
// Si la autenticación fallao hay errores se ejecuta el callback

exports.autenticar = function (login, password, callback) {
  if(users[login]) {
    if (password === users[login].password) {
      callback(null, users[login]);
    } else {callback (new Error('Password erróneo.'));}
  } else {callback (new Error('No existe el usuario.'));}
}
