import { useState,useEffect } from "react"
import Alerta from "../components/Alerta";
import usePacientes from "../hooks/usePacientes";


const Formulario = () => {

  const [nombre,setNombre] = useState('')
  const [propietario,setPropietario] = useState('')
  const [email,setEmail] = useState('')
  const [fecha,setFecha] = useState('')
  const [sintomas,setSintomas] = useState('')
  const [alerta, setAlerta] = useState({})
  const [id,setId] = useState(null)

  const {guardarPaciente,paciente} = usePacientes();


  useEffect(() => {
    
    if(paciente?.nombre){
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha.split('T')[0])
      setSintomas(paciente.sintomas)
      setId(paciente._id)

    }

  },[paciente])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if([nombre,propietario,email,fecha,sintomas].includes('')){
      setAlerta({msg : "Todos los campos son obligatorios",error: true})
      return;
    }
    guardarPaciente({nombre,propietario,email,fecha,sintomas,id})
    setAlerta({msg : "Guardado correctamente"})
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
  
  }

  const {msg} = alerta;

  return (
    <>
    <h2 className="font-black text-3xl text-center ">Administrador de pacientes</h2>
     <p className="text-xl mb-10 mt-5 text-center">
              Agrega a tus pacientes y
              <span className="text-indigo-600 font-bold"> administralos</span>
            </p>


    <form onSubmit={handleSubmit}
     className="bg-white py-10 px-5 shadow-md rounded-md mb-10 lg:mb-5">
       
      <div className="mb-5">
          <label
          htmlFor="mascota"
          className="text-gray-700 uppercase font-bold">
            
            Nombre de la mascota</label>
          <input
            id="mascota"
            type="text"
            placeholder="Ingresa el nombre de la mascota"
            className="border-2 w-full p-2 rounded-md mt-2 outline-green-400 placeholder-gray-500"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
      </div>

      <div className="mb-5">
          <label
          htmlFor="propietario"
          className="text-gray-700 uppercase font-bold">
            
            Nombre del propietario</label>
          <input
            id="propietario"
            type="text"
            placeholder="Ingresa el nombre del propietario"
            className="border-2 w-full p-2 rounded-md mt-2 outline-green-400 placeholder-gray-500 "
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
      </div>
      
      <div className="mb-5">
          <label
          htmlFor="email"
          className="text-gray-700 uppercase font-bold">
            
            Email</label>
          <input
            id="email"
            type="email"
            placeholder="Ingresa el email del propietario"
            className="border-2 w-full p-2 rounded-md mt-2 outline-green-400 placeholder-gray-500 "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
      </div>

      <div className="mb-5">
          <label
          htmlFor="fecha"
          className="text-gray-700 uppercase font-bold">
            
            Fecha de alta</label>
          <input
            id="fecha"
            type="date"
            className="border-2 w-full p-2 rounded-md mt-2 outline-green-400 placeholder-gray-500 "
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
      </div>

      <div className="mb-5">
          <label
          htmlFor="sintomas"
          className="text-gray-700 uppercase font-bold">
            
            sintomas de la mascota</label>
          <textarea
            id="sintomas"
            placeholder="Describe los sintomas"
            className="border-2 w-full p-2 rounded-md mt-2 outline-green-400 placeholder-gray-500 "
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
      </div>

      <input
        type="submit"
        value={id ? "Guardar cambios":"Agregar paciente"}
        className="bg-indigo-600 p-3 w-full  text-white font-bold 
        uppercase hover:bg-indigo-700 cursor-pointer transition-colors"
      />

      
    </form>

    {msg && <Alerta alerta = {alerta} />}
    </>
  )
}

export default Formulario