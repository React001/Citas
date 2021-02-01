import React, {Fragment, useState } from 'react';
import uuid from 'uuid/dist/v4'
import PropTypes from 'prop-types'

const Formulario = ({crearCita}) => {

    //Crear state de las citas
    const [cita, actualizarCita] = useState({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
    })

    const [error, actualizarError] = useState(false)

    //Esta funcion se va a ejecutar cada vez que escriba en algun input
    const actualizarState = e =>{
        actualizarCita({
            ...cita,
            [e.target.name] : e.target.value
        })
    }

    //cuando el usuario presiona agregar cita
    const submitCita =(e) =>{
        e.preventDefault();

        //validamos
        if(mascota.trim() ==='' || fecha.trim() ==='' || propietario.trim() ==='' || hora.trim() ==='' ||
         sintomas.trim() ===''){ //trim elimina los espacion en blanco
           actualizarError(true)
            return;
        } 
        //Eliminar el mensaje de que hubo un error
        actualizarError(false)
        
        //asignar id
        cita.id = uuid()
        //Crear cita
        crearCita(cita)
        //reiniciar el form
        actualizarCita({
            mascota:'',
            propietario:'',
            fecha:'',
            hora:'',
            sintomas:''
        })
    }

    //Extraer los valores
    const {mascota, propietario, fecha, hora, sintomas} = cita


    return ( 
        <Fragment>
            <h2>Crear cita</h2>
            {error
            ?<p className="alerta-error">Tienes que llenar todos los campos</p>
            :null
            }
            <form
            onSubmit={submitCita}
            >
                <label>Nombre mascota</label>
                <input 
                type="text"
                name="mascota"
                className="u-full-width"
                placeholder="Nombre mascota"
                value={mascota}
                onChange={actualizarState}/>
                <label>Nombre del dueno</label>
                <input 
                type="text"
                name="propietario"
                className="u-full-width"
                placeholder="Nombre dueno de la mascota"
                value={propietario}
                onChange={actualizarState}/>
                <label>Fecha </label>
                <input 
                type="date"
                name="fecha"
                className="u-full-width"
                value={fecha}
                onChange={actualizarState}
                />
                <label>Hora</label>
                <input 
                type="time"
                name="hora"
                className="u-full-width"
                value={hora}
                onChange={actualizarState}
                />
                <label>Sintomas</label>
                <textarea
                className="u-full-width"
                name="sintomas"
                value={sintomas}
                onChange={actualizarState}
                >
                </textarea>
                <button 
                type="submit"
                className="u-full-width button-primary"
                >Agregar cita</button>
            </form>
        </Fragment>
     );
}


//Esto es para documentar el tipo de lo que recibe y si es obligatorio o no 
Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}
 
export default Formulario;