import {useState} from 'react'
import AdminNav from "../components/AdminNav"
import Alerta from "../components/Alerta";
import useAuth from '../hooks/useAuth';
const CambiarPassword = () => {

  const {guardarPassword} = useAuth()
  const [alerta,setAlerta] = useState({})
  const [password,setPassword] = useState({
    pwd_actual: '',
    pwd_nuevo: ''
  })


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(Object.values(password).some(campo => campo === '')){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return;
    }
    if(password.pwd_nuevo.length < 6){
      setAlerta({msg : "La contraseña debe tener mas de 6 caracteres",error: true})
      return;
    }
    const passwordActualizado = await guardarPassword(password)
    setAlerta(passwordActualizado)
  }

  const {msg} = alerta

  return (
    <>
        <AdminNav/>
        <h2 className="font-bold text-3xl text-center">Cambiar contraseña</h2>
        <p className="text-xl text-center mt-5 mb-10">Modifica tu contraseña
        <span className="font-bold text-indigo-600"> aquí</span></p>

 
        <div className="flex justify-center">
          <div className="w-full md:w-1/2 bg-white rounded-lg p-5 shadow-md">

          {msg && <Alerta alerta = {alerta} />}
              <form onSubmit={handleSubmit}>
                  <div className="mb-5">
                      <label className="uppercase font-bold text-gray-600">Contraseña actual</label>
                      <input
                        type="password"
                        className='border bg-gray-50 w-full p-2 mt-2 outline-green-400 rounded-lg'
                        name="pwd_actual"
                        placeholder='Escribe tu contraseña actual'
                        onChange={e => setPassword({
                          ...password,
                          [e.target.name] : e.target.value
                        })}
                      />
                  </div>
                  <div className="mb-5">
                      <label className="uppercase font-bold text-gray-600">Nueva contraseña</label>
                      <input
                        type="password"
                        className='border bg-gray-50 w-full p-2 mt-2 outline-green-400 rounded-lg'
                        name="pwd_nuevo"
                        placeholder='Escribe tu nueva contraseña'
                        onChange={e => setPassword({
                          ...password,
                          [e.target.name] : e.target.value
                        })}
                        
                      />
                  </div>
                  <input
                    type="submit"
                    value="Actualizar contraseña"
                    className="bg-indigo-600 px-10 w-full rounded-lg py-3 mt-2 text-white font-bold 
                    uppercase hover:bg-indigo-700 cursor-pointer transition-colors"
                  />
              </form>
          </div>
        </div>
    </>
  )
}

export default CambiarPassword