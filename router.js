exports = module.exports = function (app) {
  app.get('/users/', require('./views/Users/index').mostrar)
  app.post('/users/', require('./views/Users/index').ingresar)
  app.get('/users/listar/', require('./views/Users/index').listar)
  app.put('/users/', require('./views/Users/index').update)
  app.delete('/users/', require('./views/Users/index').borrar)
  app.post('/users/:id', require('./views/Users/index').buscar)
}
