import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './componentes/Formulario'
import Cita from './componentes/Cita'

function App() {

  //Citas en localstorage 
  let citasIniciales = JSON.parse( localStorage.getItem('citas') )
  console.log(`Citas inciciales: ${citasIniciales.id}`)
  if(!citasIniciales){
    console.log("aqui")
    citasIniciales =[]
  }

  //arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales)

  //UseEffect para ciertas operacioens cuando el state cambia 
  useEffect(()=>{ // se ejecuta cuando el componente esta listo o cuando tiene cambios
    let citasIniciales = JSON.parse( localStorage.getItem('citas') )
    if(citasIniciales){
      console.log("aqui")
      localStorage.setItem('citas', JSON.stringify(citas))
    }else{
      console.log("aqui")
      localStorage.setItem('citas', JSON.stringify([]))
    }
  }, [citas]) // cada vez que las citas cambies se va a ejecutar lo que esta adentro

  //funcion que tome las citas actuales y agregue la nueva
  const crearCita = (cita) =>{
    guardarCitas([
      ...citas,
      cita
    ])
  }

  //funcion que elimina una cita por su id
  const eliminarCita=(id) => {
    const nuevasCitas = citas.filter(cita => cita.id !== id)
    guardarCitas(nuevasCitas)
  }

  //Mensaje condicional
  const titulo = citas.length === 0 ?'No hay citas' : 'Administra tus citas'


  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
              <Formulario
                crearCita ={crearCita}
              />

          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita =>(
              <Cita
                key={cita.id}
                cita={cita}
                eliminarCita= {eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>

    </Fragment>
    
  );
}

export default App;
