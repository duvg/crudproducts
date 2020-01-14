import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Producto from './components/Producto';
import Productos from './components/Productos';
import NuevoProducto from './components/NuevoProducto';
import EditarProducto from './components/EditarProducto';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/productos/nuevo" component={ NuevoProducto } />
          <Route exact path="/productos" component={ Productos } />
          <Route exact path="/productos/:id" component={ Producto } />
          <Route exact path="/productos/editar/:id" component={ EditarProducto } />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
