import React, { Fragment } from 'react';
import ProductoLista from './ProductoLista';

function Productos ({productos, setRecargarProductos}) {
    return(
        <Fragment>
            <h1 className="text-center">Listado de productos</h1>
            <ul className="list-group mt-5">
                {productos.map(producto => (
                    <ProductoLista
                        key={producto.id}
                        producto={producto}
                        setRecargarProductos={setRecargarProductos}
                    />
                ))}
            </ul>
        </Fragment>
        
    );
}

export default Productos;