// global vars
var keyData = ''
var event
var formData = {}

// page ready
$(document).ready(function () {
  petition(null, 'POST', '/users/listar/', generarTabla)
  isKeyData()
  $('#limpiar').click(function () {
    clearFields()
  })
})

/**
* @autor: Group 1
* @date: 2017/08/08 15:03
* Generate the table of registered users
**/
function generarTabla (salida) {
  if (salida !== 'ERROR') {
  // clear table
    $('table>tbody').find('tr').remove()
    // show array
    for (var i = 0; i < salida.length; i++) {
      if (salida[i] !== null && salida[i].name !== undefined) {
        var eliminar = '<button type="button" onClick="eventDelete(&#39;' + salida[i]._id + '&#39;)" class="btn btn-danger">Eliminar</button>'
        var modificar = '<button type="button" onClick="eventEdit(&#39;' + salida[i]._id + '&#39;)" class="btn btn btn-success">Modificar</button>'
        var filas = /**
                    * @autor: Jhon
                    * @date: 2017/08/08 15:00
                    * The user id is hidden, so that the fields are matched accordingly
                    **/
                        '<td>' + salida[i].name + '</td>' +
                        '<td>' + salida[i].email + '</td>' +
                        '<td>' + salida[i].gender + '</td>' +
                        '<td>' + salida[i].age + '</td>' +
                        '<td>' + modificar + '</td>' +
                        '<td>' + eliminar + '</td>'
        var html = '<tr>' + filas + '</tr>'
        // write html
        $('table>tbody').append(html)
      }
    }
  }
}

function petition (info, metod, ruta, callback) {
  $.ajax({
    url: ruta,
    type: metod,
    data: info
  }).done(callback)
}

/**
* @autor: Group 1
* @date: 2017/08/08 15:28
* Function for event delete user
**/
function eventDelete (id) {
  console.log(id)
  petition({
    'id': id
  }, 'DELETE', '/users/',
  respuestaCallback)
}

/**
* @autor: Group 1
* @date: 2017/08/08 15:31
* Function for event edit user
**/
function eventEdit (id) {
  petition(null, 'POST', '/users/' + id, mostrarData)
}

/**
* @autor: Group 1
* @date: 2017/08/08 15:32
* Function to display user edit fields
**/

function mostrarData (salida) {
  keyData = salida._id
  isKeyData()
  $('#name').val(salida.name)
  $('#email').val(salida.email)
  $('#gender').val(salida.gender)
  $('#age').val(salida.age)
}
function respuestaCallback (salida) {
  petition(null, 'POST', '/users/listar/', generarTabla)
  clearFields()
}

/**
* @autors: Diego and Jhon
* @date: 2017/08/08 15:42
* Function to clean the registry text boxes
**/
function clearFields () {
  keyData = ''
  $('input,select').val('')
  isKeyData()
}

/**
* @autor: Diego and Jhon
* @date: 2017/08/08 15:10
* Function to determine if the user is new or is to update
**/
function isKeyData () {
  $('#boton').off('click')
  console.log(keyData)
  getData()
  if (keyData !== '') {
    // if is update
    $('#boton').text('Actualizar')
    event = function () {
      getData()
      formData.id = keyData
      petition(formData, 'PUT', '/users/', respuestaCallback)
    }
  } else {
    // if is insert
    event = function () {
      getData()
      petition(formData, 'POST', '/users/', respuestaCallback)
    }
    $('#boton').text('Guardar')
  }
  $('#boton').click(event)
}
function getData(){
  formData = {
    'name': $('#name').val(),
    'email': $('#email').val(),
    'gender': $('#gender').val(),
    'age': $('#age').val()
  }
}
