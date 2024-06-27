const express = require('express');
const fs = require('fs').promises;
const app = express();

app.use(express.json());
app.use(express.static('public')); // La carpeta que contiene archivos estáticos

app.listen(3000, () => console.log("App escuchando puerto 3000"));

// Ruta raíz que servirá el index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Ruta para agregar nuevo deporte
app.get('/agregar', (req, res) => {
  const { nombre, precio } = req.query;

  fs.readFile('registro.json', 'utf-8')
    .then(data => {
      const registro = JSON.parse(data);

      const nuevoDeporte = {
        nombre,
        precio
      };

      // Agregar nuevo deporte al array de deportes
      registro.deportes.push(nuevoDeporte);

      // Escribe deportes actualizados en el archivo json
      return fs.writeFile('registro.json', JSON.stringify(registro));
    })
    .then(() => {
      res.send('Deporte agregado correctamente');
    })
    .catch(err => {
      console.error(err);
      res.send('Error al agregar el deporte');
    });
});

// Ruta para obtener todos los deportes en formato json
app.get('/deportes', (req, res) => {
  fs.readFile('registro.json', 'utf-8')
    .then(data => {
      res.json(JSON.parse(data));
    })
    .catch(err => {
      console.error(err);
      res.send('Error al obtener los deportes');
    });
});

// Ruta para editar precio
app.get('/editar', (req, res) => {
  const { nombre, nuevoPrecio } = req.query;

  fs.readFile('registro.json', 'utf-8')
    .then(data => {
      const registro = JSON.parse(data);

      // Buscar el deporte por su nombre y actualizar su precio
      const deporte = registro.deportes.find(d => d.nombre === nombre);
      if (deporte) {
        deporte.precio = nuevoPrecio;

        // Escribir los deportes actualizados en el archivo JSON
        return fs.writeFile('registro.json', JSON.stringify(registro));
      } else {
        console.error('Deporte no encontrado');
        res.send('Deporte no encontrado');
      }
    })
    .then(() => {
      res.send('Precio del deporte actualizado exitosamente');
    })
    .catch(err => {
      console.error(err);
      res.send('Error al editar el precio del deporte');
    });
});

// Ruta para eliminar un deporte registrado
app.get('/eliminar', (req, res) => {
  const { nombre } = req.query;

  fs.readFile('registro.json', 'utf-8')
    .then(data => {
      const registro = JSON.parse(data);


      const longitudOriginal = registro.deportes.length; // Guardar la longitud original del array de deportes

      registro.deportes = registro.deportes.filter(d => d.nombre !== nombre);  // Filtrar los deportes, excluyendo el deporte a eliminar

      // Verificar si se eliminó algún deporte
      if (registro.deportes.length !== longitudOriginal) {
        return fs.writeFile('registro.json', JSON.stringify(registro));
      }
    })
    .then(() => {
      res.send('Deporte eliminado correctamente');
    })
    .catch(err => {
      res.send('Error al eliminar el deporte');
    });
});


