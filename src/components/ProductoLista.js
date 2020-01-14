import React from 'react';
import { Link } from 'react-router-dom';

function ProductoLista({producto}) {

    const eliminarProducto = id => {
        console.log("Eliminando", id);
        // TODO: Elminar los registros
    }

    return (
        <li data-categoria={producto.categoria} className="list-group-item d-flex justify-content-between align-items-center">
            <p >
                {producto.nombre}
                <span className="font-weight-bold"> $ {producto.precio}</span>
            </p>
            <div>
                <Link 
                    to={`/productos/editar/${producto.id}`} 
                    className="btn btn-success btn-sm mr-2">
                        <i className="fa fa-edit"></i> Editar
                    </Link>
                <button 
                    type="button"
                    onClick={() => eliminarProducto(producto.id)}
                    className="btn btn-danger btn-sm">
                    <i className="fa fa-trash"></i> Eliminar
                </button>
            </div>

        </li>
    );
}

export default ProductoLista