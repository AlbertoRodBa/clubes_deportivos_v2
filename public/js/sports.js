$(document).ready(function () {
    getData()
  })
  
  function getData() {
    $('#cuerpo').html('')
    axios.get('/deportes').then((data) => {
      let deportes = data.data.deportes
      deportes.forEach((d, i) => {
        $('#cuerpo').append(`
        <tr>
          <th scope="row">${i + 1}</th>
          <td>${d.nombre}</td>
          <td>${d.precio}</td>
          <td>
            <button class="btn btn-warning" onclick='preEdit("${d.nombre}","${d.precio}")' data-toggle="modal" data-target="#exampleModal">Editar</button>
            <button class="btn btn-dark" onclick='preEliminar("${d.nombre}")' data-toggle="modal" data-target="#exampleModal">Eliminar</button>
          </td>
        </tr>
        `)
      })
    })
  }
  
  function preEdit(nombre, precio) {
    $('#nombreModal').val(nombre)
    $('#precioModal').val(precio)
  }
  
  function agregar() {
    let nombre = $('#nombre').val().trim()
    let precio = $('#precio').val().trim()
  
    if (nombre === '' || precio === '') {
      alert('Por favor, complete todos los campos.')
      return
    }
  
    axios.get(`/agregar?nombre=${nombre}&precio=${precio}`).then((data) => {
      alert(data.data)
      getData()
    })
    $('#exampleModal').modal('hide')
  }
  
  function edit() {
    let nuevoNombre = $('#nombreModal').val().trim()
    let nuevoPrecio = $('#precioModal').val().trim()
  
    if (nuevoPrecio === '') {
      alert('Por favor, ingrese un precio válido.')
      return
    }
  
    axios.get(`/editar?nombre=${nuevoNombre}&nuevoPrecio=${nuevoPrecio}`).then(response => {
      alert(response.data)
      getData()
    }).catch(error => {
      console.error(error)
      alert('Error al intentar editar el deporte')
    })
  
    $('#exampleModal').modal('hide')
  }
  
  function preEliminar(nombre) {
    $('#nombreModal').val(nombre)
    $('#precioModal').val('')
  }
  
  function eliminar() {
    let nombre = $('#nombreModal').val()
    axios.get(`/eliminar?nombre=${nombre}`).then((data) => {
      alert(data.data)
      getData()
    })
    $('#exampleModal').modal('hide')
  }
  
  // Animaciones y otros comportamientos de UI
  document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar')
    navbar.classList.add('navbar-visible')
  })
  
  document.addEventListener('DOMContentLoaded', function() {
    const footer = document.querySelector('.footer')
    footer.classList.add('footer-visible')
  })
  
  document.addEventListener('DOMContentLoaded', function() {
    const tituloAnimado = document.getElementById('tituloAnimado')
    tituloAnimado.classList.add('fade-up')
  })
  