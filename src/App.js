import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Header from './components/common/Header';
import Producto from './components/Producto';
import Productos from './components/Productos';
import NuevoProducto from './components/NuevoProducto';
import EditarProducto from './components/EditarProducto';

function App() {

  // State
  const [ productos, setProductos ] = useState([]);
  const [ recargarProductos, setRecargarProductos ] = useState(true);

  useEffect(
    () => {
      if(recargarProductos) {
          const consultarApi = async () => {
          // Consulta api de json-server
          const resultado = await axios.get('http://localhost:4000/restaurante');

          setProductos(resultado.data);
        }

        consultarApi();
          
      }
      

      // Recarga delos productos a false
      setRecargarProductos(false);
    }, [recargarProductos]
  );

  return (
    <div className="App">
      <Router>
        
        <Header />
        <main className="container mt-5">
          <Switch>
            <Route exact path="/productos/nuevo" 
                   render={ () => (
                      <NuevoProducto
                        setRecargarProductos={setRecargarProductos}
                      />
                   ) } />
            <Route exact path="/productos" 
                   render={ () => (
                      <Productos 
                        productos={productos}
                      />
                   ) }/>
            <Route exact path="/productos/:id" component={ Producto } />
            <Route exact path="/productos/editar/:id" 
                   render={ props => {
                      // Leer el id del producto
                      const idProducto = parseInt(props.match.params.id);

                      // El producto que se pasa al state
                      const producto = productos.filter(producto => producto.id === idProducto);
                      return(
                        <EditarProducto
                          setRecargarProductos={setRecargarProductos}
                          producto={producto[0]}
                        />
                      )
                    }}
            />
          </Switch>
        </main>

        <p className="mt-4 p2 text-center">Todos los derechos reservados</p>
      </Router>
    </div>
  );
}

export default App;
