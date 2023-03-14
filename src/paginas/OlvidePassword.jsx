import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const OlvidePassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});
  const [emailCorrecto,setEmailCorrecto] = useState(false);

  const {auth} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      setAlerta({ msg: "El email es obligatorio", error: true });
      return;
    }

    try {
      const { data } = await clienteAxios.post(
        "/veterinarios/olvide-password",
        { email }
      );
      setAlerta({
        msg: data.msg,
      });
      setEmailCorrecto(true);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Recupera el acceso y no pierdas tus
          <span className="text-black "> pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-5 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}

        {!emailCorrecto && (
        <form onSubmit={handleSubmit}>
          <div className="mt-5">
            <label
              className="uppercase text-gray-500 block text-xl font-bold my-3
                           outline-green-400"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Ingresa tu email"
              className="border w-full p-3 bg-gray-50 rounded-xl
                             outline-green-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

      
          <input
            type="submit"
            value="Siguiente"
            className="bg-indigo-700 mt-7 py-3 px-10 rounded-xl
                             text-white w-full uppercase font-bold hover:cursor-pointer
                             hover:bg-indigo-800 md:w-auto "
          />
          
        </form>
        )}
        <nav className="mt-3 lg:flex lg:justify-between">
          <Link
            to="/"
            className="block text-center my-5 text-gray-500 hover:underline"
          >
            ¿Ya tienes una cuenta?{" "}
            <span className="text-indigo-600">Inicia sesión!</span>
          </Link>
          <Link
            to="/registrar"
            className="block text-center my-5 text-gray-500 hover:underline"
          >
            ¿No tienes una cuenta?{" "}
            <span className="text-indigo-600">Regístrate!</span>
          </Link>
        </nav>
      </div>
    </>
  );
};

export default OlvidePassword;
