import React, { useState, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

import Error from './common/Error';
import Producto from './Producto';


function EditarProducto (props) {
    
    // Destructurin de props
    const { history, producto, setRecargarProductos } = props;
    

    // Generar refs
    const precioRef = useRef('');
    const nombreRef = useRef('');


    // State
    const [ categoria, setCategoria ] = useState('');
    const [ error, setError ] = useState();
    

    // Obtener la categoria de los radiobutton del formilario
    const valorCategoria = e => {
        setCategoria(e.target.value);
    }

    const editarProducto = async e => {
        e.preventDefault();

        // Revisar si ha cambiado la categoria de no ser asi se retorna el mismo valor
        let categoriaPlatillo = (categoria === '') ? producto.categoria : categoria;


        // Validación del formulario
        const nuevoNombre = nombreRef.current.value,
              nuevoPrecio = precioRef.current.value;

              console.log(nuevoNombre, nuevoPrecio, categoria);
              console.log(nuevoPrecio);
              console.log(categoriaPlatillo);


        if(nuevoNombre === '' || nuevoPrecio === '' || categoriaPlatillo === '') {
            setError(true);
            return;
        }

        setError(false);

        
        // Obtener los valores del formulario
        const editarPlatillo = {
            precio : nuevoPrecio,
            nombre : nuevoNombre,
            categoria : categoriaPlatillo
        };

        // Enviar los datos a la api
        const url = `http://localhost:4000/restaurante/${producto.id}`;

        try {
            const resultado = await axios.put(url, editarPlatillo);
            

            if(resultado.status === 201) {
                Swal.fire(
                    'Producto Editado',
                    'El producto se edito correctamente',
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

        // Redirigir y consulta la api para refrescar la lista
        setRecargarProductos(true);
        history.push('/productos');
    }

    return(
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Editar Producto</h1>
            { (error) ? <Error mensaje="Todos los campos son requeridos"/> : null }
            <form
                className="mt-5"
                onSubmit={editarProducto}
            >
                <div className="form-group">
                    <label>Nombre Platillo</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="nombre" 
                        placeholder="Nombre Platillo"
                        ref={nombreRef}
                        defaultValue={producto.nombre}
                    />
                </div>

                <div className="form-group">
                    <label>Precio Platillo</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        name="precio"
                        placeholder="Precio Platillo"
                        ref={precioRef}
                        defaultValue={producto.precio}
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
                        defaultChecked={(producto.categoria === 'postre')}
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
                        defaultChecked={(producto.categoria === 'bebida')}
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
                        defaultChecked={producto.categoria === 'asados'}
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
                        defaultChecked={producto.categoria === 'ensalada'}
                    />
                    <label className="form-check-label">
                        Ensalada
                    </label>
                </div>
                </div>

                <input 
                    type="submit" 
                    className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" 
                    value="Editar Producto" />
            </form>
        </div>
    );
}


export default withRouter(EditarProducto);