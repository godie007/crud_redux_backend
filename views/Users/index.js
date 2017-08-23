'use strict'
/**
* @autor:godie007
* @date: 2017/07/23 19:49
* Implementation of the POST method for the user collection
**/

exports.ingresar = (req, res) => {
  const item = req.body.user
  if (!item) res.send('Data Vacia')
  req.app.db.models.user.create(item, (err, resp) => {
    if (err) {
      console.log('fallo al ingresar! ' + err)
      res.send(['ERROR'])
    } else {
      const {_id, name, email, description} = resp
      res.send({_id, name, email, description})
    }
  })
}
/**
* @autor:godie007
* @date: 2017/07/23 19:55
* Implementation of the GET method for the user collection
**/
exports.mostrar = (req, res) => {
  res.render('Users/vista', {'params': {'title': 'Ejemplo', 'head': 'Cliente NodeJS'}})
}

exports.listar = (req, res) => {
  req.app.db.models.user.find({}, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      data = data.map(d => {
        const {_id, name, email, description} = d
        return {_id, name, email, description}
      })
      res.send(data)
    }
  })
}
exports.buscar = (req, res) => {
  const id = req.params.id
  req.app.db.models.user.findOne({'_id': id}, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
}

/**
* @autor: Group 1
* @date: 2017/08/08 15:02
* Implementation of the delete method for the users collection
**/
exports.borrar = (req, res) => {
  const id = req.body._id
  req.app.db.models.user.remove({'_id': id}, (err, resp) => {
    if (err) {
      res.send(['ERROR'])
    } else {
      res.send(['OK'])
    }
  })
}

/**
* @autor: Jhon
* @date: 2017/08/08 15:05
* Implementation of the PUT method for the user collection
**/
exports.update = (req, res) => {
  const item = req.body.user
  console.log(item)
  req.app.db.models.user.update(item, (err, data) => {
    if (err) {
      console.log('fallo al actualizar! ' + err)
      res.send(['ERROR'])
    } else {
      res.send(['OK'])
    }
  })
}
