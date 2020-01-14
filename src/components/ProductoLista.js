import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function ProductoLista({producto, setRecargarProductos}) {

    const eliminarProducto = id => {
        console.log("Eliminando", id);
        // TODO: Elminar los registros

        Swal.fire({
            title: 'Estas Seguro?',
            text: "Un platillo eliminado no se puede recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'Cancelar'
          }).then(async (result) => {
            if (result.value) {

                try {
                    // Petición para eliminar con axios
                    const url = `http://localhost:4000/restaurante/${id}`;

                    const resultado = await axios.delete(url);

                    if (resultado.status === 200) {
                        Swal.fire(
                            'Eliminado!',
                            'Platillo eliminado',
                            'success'
                        )

                        // Consultar API y refrescar el listado
                        setRecargarProductos(true);
                    }
                    
                } catch (error) {
                    Swal.fire({
                        type: 'error',
                        title: 'Error',
                        text: 'Hubo un error, intentalo nuevamente'
                    });
                    console.log(error);
                }
            }
          })
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