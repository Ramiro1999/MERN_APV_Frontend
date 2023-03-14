import { useEffect,useState } from "react";
import AdminNav from "../components/AdminNav"
import useAuth from "../hooks/useAuth"
import Alerta from '../components/Alerta'

const EditarPerfil = () => {

  const {auth} = useAuth();
  const [perfil,setPerfil] = useState({})
  const [alerta, setAlerta] = useState({})
  const {actualizarPaciente} = useAuth();

  useEffect(() => {
    setPerfil(auth)
  },[auth])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if([perfil.nombre,perfil.email].includes('')){
        setAlerta({
          msg: "El email y el nombre son obligatorios",
          error: true
        })
        return;
    }
    const resultado = await actualizarPaciente(perfil);
    setAlerta(resultado)

  }

  const {msg} = alerta

  return (
    <>
        <AdminNav/>
        <h2 className="font-bold text-3xl text-center">Editar perfil</h2>
        <p className="text-xl text-center mt-5 mb-10">Modifica tu información
        <span className="font-bold text-indigo-600"> aquí</span></p>

        
        <div className="flex justify-center">
          <div className="w-full md:w-1/2 bg-white rounded-lg p-5 shadow-md">

          {msg && <Alerta alerta = {alerta} />}
              <form onSubmit={handleSubmit}>
                  <div className="mb-5">
                      <label className="uppercase font-bold text-gray-600">Nombre</label>
                      <input
                        type="text"
                        className='border bg-gray-50 w-full p-2 mt-2 outline-green-400 rounded-lg'
                        name="nombre"
                        value={perfil.nombre || ''}
                        onChange={e => setPerfil({
                          ...perfil, 
                          [e.target.name] : e.target.value
                        })}
                      />
                  </div>
                  <div className="mb-5">
                      <label className="uppercase font-bold text-gray-600">Sitio web</label>
                      <input
                        type="text"
                        className='border bg-gray-50 w-full p-2 mt-2 outline-green-400 rounded-lg'
                        name="web"
                        value={perfil.web || ''}
                        onChange={e => setPerfil({
                          ...perfil, 
                          [e.target.name] : e.target.value
                        })}
                      />
                  </div>
                  <div className="mb-5">
                      <label className="uppercase font-bold text-gray-600">Telefono</label>
                      <input
                        type="text"
                        className='border bg-gray-50 w-full p-2 mt-2 outline-green-400 rounded-lg'
                        name="telefono"
                        value={perfil.telefono || ''}
                        onChange={e => setPerfil({
                          ...perfil, 
                          [e.target.name] : e.target.value
                        })}
                      />
                  </div>
                  <div className="mb-5">
                      <label className="uppercase font-bold text-gray-600">Email</label>
                      <input
                        type="email"
                        className='border bg-gray-50 w-full p-2 mt-2 outline-green-400 rounded-lg'
                        name="email"
                        value={perfil.email || ''}
                        onChange={e => setPerfil({
                          ...perfil, 
                          [e.target.name] : e.target.value
                        })}
                      />
                  </div>

                  <input
                    type="submit"
                    value="Guardar cambios"
                    className="bg-indigo-600 px-10 w-full rounded-lg py-3 mt-2 text-white font-bold 
                    uppercase hover:bg-indigo-700 cursor-pointer transition-colors"
                  />
              </form>
          </div>
        </div>
    </>
  )
}

export default EditarPerfil