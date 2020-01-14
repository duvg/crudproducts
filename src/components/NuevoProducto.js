import React, { useState } from 'react';
import axios from 'axios';
import Error from './common/Error';
import Swal from 'sweetalert2';

import { withRouter } from 'react-router-dom';


function NuevoProducto ({history, setRecargarProductos}) {

    // state
    const [ nombre, setNombre ] = useState('');
    const [ precio, setPrecio ] = useState('');
    const [ categoria, setCategoria ] = useState('');
    const [ error, setError ] = useState(false);

    // Obtener la categoria de los radiobutton del formilario
    const valorCategoria = e => {
        setCategoria(e.target.value);
    }

    // Agregar el producto
    const agregarProducto = async e => {
        e.preventDefault();

        // Validar el producto
        if(nombre === '' || precio === '' || categoria === '') {
            setError(true);
            return;
        }


        setError(false);

        //  Crear el nuevo producto
        try {
            const resultado = await axios.post('http://localhost:4000/restaurante', {
                nombre,
                precio,
                categoria
            });

            
            if(resultado.status === 201) {
                Swal.fire(
                    'Producto Creado',
                    'El producto se creo correctamente',
                    'success'
                );
            }


        } catch (error) {
            Swal.fire({
                type: 'error',
                title: 'Error',
                text: 'Hubo un error, intentalo nuevamente'
            });
            console.log(error);
        }

        // Redirigir al listado de productos
        setRecargarProductos(true);
        history.push('/productos');
    }

    return (
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Agregar Nuevo Producto</h1>
            { (error) ? <Error mensaje="Todos los campos son requeridos"/> : null }
            <form
                className="mt-5"
                onSubmit={agregarProducto}
            >
                <div className="form-group">
                    <label>Nombre Platillo</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="nombre" 
                        placeholder="Nombre Platillo"
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Precio Platillo</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        name="precio"
                        placeholder="Precio Platillo"
                        onChange={e => setPrecio(e.target.value)}
                    />
                </div>

                <legend className="text-center">Categoría:</legend>
                <div className="text-center">
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="postre"
                        onChange={valorCategoria}
                    />
                    <label className="form-check-label">
                        Postre
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="bebida"
                        onChange={valorCategoria}
                    />
                    <label className="form-check-label">
                        Bebida
                    </label>
                </div>

                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="asados"
                        onChange={valorCategoria}
                    />
                    <label className="form-check-label">
                        Asados
                    </label>
                </div>

                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="ensalada"
                        onChange={valorCategoria}
                    />
                    <label className="form-check-label">
                        Ensalada
                    </label>
                </div>
                </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Agregar Producto" />
            </form>
        </div>
        
        
    );
}

export default withRouter(NuevoProducto);