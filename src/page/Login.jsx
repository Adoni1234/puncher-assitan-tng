import { useEffect, useState } from "react";
import { Input, Ripple, initTWE } from "tw-elements";
import { LoginAuth } from "../services/Autheticantions";
import { Link } from "react-router-dom";
import { setSessionStore } from "../util/utils";
import { ToastContainer, toast } from "react-toastify";
import { GetUser } from "../services/BackOffice";

initTWE({ Input, Ripple });

export function Login() {
  const [user, setUser] = useState([]);
  const [status, setStatus] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    error: {},
  });

  useEffect(() => {
    const FetchData = async () => {
      try {
        const userData = await GetUser();
        setUser(userData);
      } catch (error) {
        console.error("Error al obtener los Empleados:", error);
      }
    };
    FetchData();
  }, []);

  const validate_Status = () => {
    const verifications_User = user.filter(
      (u) =>
        u.username === formData.username && u.password === formData.password
    );
    const verifications_status = verifications_User
      .filter((u) => u.status === "Activo")
      .map((a) => a.status);
    setStatus(verifications_status);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      error: {
        ...prevData.error,
        [name]: "",
      },
    }));
  };

  const validatorForm = () => {
    const error = {};

    if (!formData.username.trim()) {
      error.username = "Username Required";
    }

    if (!formData.password.trim()) {
      error.password = "Password Required";
    }

    setFormData((prevData) => ({
      ...prevData,
      error,
    }));

    return Object.keys(error).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    validate_Status();
    if (validatorForm()) {
      const response = await LoginAuth(formData);
      try {
        if (response.usernames) {
          debugger
          if (status === "" || (Array.isArray(status) && status.length === 0)) {
            toast.error("No puedes acceder, ya que tu usuario esta inactivo");
          } else {
            setSessionStore(formData, "login");
            window.location.href = "homen";
            toast(response.message);
          }
        } else {
          toast.error("Invalid username or password");
        }
      } catch (error) {
        console.log(error);
        toast.error("There was an error during authentication");
      }
    } else {
      toast.error("Invalid data");
    }
  };

  return (
    <section className="h-screen">
      <ToastContainer />
      <div className="container h-full px-6 py-6">
        <div className="flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <img
               src={require('../Img/llegar2.jpg')}
              classNameName="w-full"
              alt="Login illustration"
            />
          </div>

          <div className="md:w-8/12 lg:ms-6 lg:w-5/12">
            <h1 classNameName="text-center font-bold text-3xl">Conéctese</h1>
            <form onSubmit={handleSubmit}>
              <div className="relative mb-6" data-twe-input-wrapper-init>
                <input
                  value={formData.username}
                  onChange={handleChange}
                  type="text"
                  name="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  id="exampleFormControlInput3"
                  placeholder="Username"
                />
              </div>

              <div className="relative mb-6" data-twe-input-wrapper-init>
                <input
                  value={formData.password}
                  onChange={handleChange}
                  type="password"
                  name="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  id="exampleFormControlInput33"
                  placeholder="Password"
                />
              </div>

              <div className="mb-6 flex items-center justify-between">
                <div className="mb-[0.125rem] block min-h-[1.5rem] ps-[1.5rem]">
                  <input
                    className="relative float-left -ms-[1.5rem] me-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-secondary-500 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ms-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ms-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent rtl:float-right dark:border-neutral-400 dark:checked:border-primary dark:checked:bg-primary"
                    type="checkbox"
                    value=""
                    id="exampleCheck3"
                    checked
                  />
                  <label
                    className="inline-block ps-[0.15rem] hover:cursor-pointer"
                    for="exampleCheck3"
                  >
                    Recuérdame
                  </label>
                </div>

                <a
                  href="#!"
                  className="text-primary focus:outline-none dark:text-primary-400"
                >
                  ¿Ha olvidado su contraseña?
                </a>
              </div>

              <button
                type="submit"
                className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                data-twe-ripple-init
                data-twe-ripple-color="light"
              >
                Iniciar Sesión
              </button>

              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500">
                <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                  {" "}
                  <Link to="/signUp" classNameName="text-blue-500">
                    Registrate aqui
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
