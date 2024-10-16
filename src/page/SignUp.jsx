import { useState } from "react";
import { RegisterAuth } from "../services/Autheticantions";

export function SignUp(){

    const [formData, setFormData] = useState({
        username : '',
        email : '',
        password : '',
        error : {}
    })

    const handleChange = (event) =>{
       const {name, value} = event.target;

       setFormData((prevData) => ({
        ...prevData,
        [name] : value,
         error : {
            ...prevData.error,
            [name] : "",
         }
       }))
    }

    const validatorForm = () => {
        const error = {}

        if(!formData.username){
            error.username = "Username Requiered"
        }
        if(!formData.email){
            error.username = "Email Requiered"
        }
        if(!formData.password){
            error.username = "Password Requiered"
        }

        setFormData((prevData) => ({
            ...prevData,
            error,
        }))

        return Object.keys(error).length === 0
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        if(validatorForm()){
            const response = await RegisterAuth(formData);
            try{
                if(response.message){
                  alert(response.message)
                  window.location.href = '/';
                }else{
                  alert(response.message)
                }
            }
            catch (error) {
              console.log(error);
              alert("There was an error during authentication");
            }
        }
        else{
          alert("Invalid Data")
        }
    }

    return (
        <section class="h-screen">
        <div class="container h-full px-6 py-24">
          <div class="flex h-full flex-wrap items-center justify-center lg:justify-between">
            <div class="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
              <img
                src={require('../Img/llegar.jpg')}
                className="w-full"
                alt="Login illustration"
              />
            </div>
  
            <div class="md:w-8/12 lg:ms-6 lg:w-5/12">
              <h1 className="text-center font-bold text-3xl">Login</h1>
              <form onSubmit={handleSubmit} >
                <div class="relative mb-6" data-twe-input-wrapper-init>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    name="username" // Add name attribute
                    class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleFormControlInput3"
                    placeholder="Username"
                  />
                  <label
                    for="exampleFormControlInput3"
                    class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                  >
                    Username
                  </label>
                </div>

                <div class="relative mb-6" data-twe-input-wrapper-init>
                  <input
                    type="text"
                    value={formData.email}
                    onChange={handleChange}
                    name="email" // Add name attribute
                    class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleFormControlInput3"
                    placeholder="email"
                  />
                  <label
                    for="exampleFormControlInput3"
                    class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                  >
                    Email
                  </label>
                </div>
  
                <div class="relative mb-6" data-twe-input-wrapper-init>
                  <input
                    type="password"
                    name="password" 
                    value={formData.password}
                    onChange={handleChange}
                    class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleFormControlInput33"
                    placeholder="Password"
                  />
                  <label
                    for="exampleFormControlInput33"
                    class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                  >
                    Password
                  </label>
                </div>
  
                <div class="mb-6 flex items-center justify-between">
                  <div class="mb-[0.125rem] block min-h-[1.5rem] ps-[1.5rem]">
                    <input
                      class="relative float-left -ms-[1.5rem] me-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-secondary-500 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ms-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ms-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent rtl:float-right dark:border-neutral-400 dark:checked:border-primary dark:checked:bg-primary"
                      type="checkbox"
                      value=""
                      id="exampleCheck3"
                      checked
                    />
                    <label
                      class="inline-block ps-[0.15rem] hover:cursor-pointer"
                      for="exampleCheck3"
                    >
                      Remember me
                    </label>
                  </div>
  
                  <a
                    href="#!"
                    class="text-primary focus:outline-none dark:text-primary-400"
                  >
                    Forgot password?
                  </a>
                </div>
  
                <button
                  type="submit"
                  class="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                  data-twe-ripple-init
                  data-twe-ripple-color="light"
                >
                  Sign in
                </button>
  
                <div
                  class="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500"
                >
                  <p
                    class="mx-4 mb-0 text-center font-semibold dark:text-neutral-200"
                  ></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
}