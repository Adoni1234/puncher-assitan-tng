const Modal = ({ isOpen, onClose, onSubmit, formData, handleChange, type, origins, dataSelect }) => {

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded shadow-lg w-96">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">{(type === 'creating') ? 'Crear Elemento' : 'Editar Elemento'}</h2>
            <button
              onClick={onClose}
              className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <form onSubmit={onSubmit}>
            {origins === 'user' ? (
              <>
                <div className="mb-4">
                  <label htmlFor="username" className="block text-sm font-medium">
                    Usuario
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {formData.error && formData.error.username && (
                    <p className="text-sm text-red-500">{formData.error.username}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {formData.error && formData.error.email && (
                    <p className="text-sm text-red-500">{formData.error.email}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="cedula" className="block text-sm font-medium">
                    Cedula
                  </label>
                  <input
                    type="text"
                    id="cedula"
                    name="cedula"
                    value={formData.cedula}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {formData.error && formData.error.cedula && (
                    <p className="text-sm text-red-500">{formData.error.cedula}</p>
                  )}
                </div>
              </>
            ) : origins === 'employee' ?  (
              <>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {formData.error && formData.error.name && (
                    <p className="text-sm text-red-500">{formData.error.name}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="lastName" className="block text-sm font-medium">
                    apellido
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  /> 
                  {formData.error && formData.error.lastName && (
                    <p className="text-sm text-red-500">{formData.error.lastName}</p>
                  )}
                </div>
                <div className="mb-4">
                <label for="countries" className="block  text-sm font-medium text-gray-900 dark:text-white">Empresa</label>
                  <select id="id_companie" name='id_companie' value={formData.id_companie} onChange={handleChange}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="employee" selected>(seleccionar)</option>
                    { dataSelect.map((c) => (
                    <option  value={c.id}>{c.name}</option>
                    ))}
                  </select>
                
                  {formData.error && formData.error.id_companie && (
                    <p className="text-sm text-red-500">{formData.error.id_companie}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="correo" className="block text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="text"
                    id="correo"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {formData.error && formData.error.correo && (
                    <p className="text-sm text-red-500">{formData.error.correo}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="cedula" className="block text-sm font-medium">
                    Cedula
                  </label>
                  <input
                    type="text"
                    id="cedula"
                    name="cedula"
                    value={formData.cedula}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {formData.error && formData.error.cedula && (
                    <p className="text-sm text-red-500">{formData.error.cedula}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="designation" className="block text-sm font-medium">
                  Designacion
                  </label>
                  <input
                    type="text"
                    id="designation"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {formData.error && formData.error.designation && (
                    <p className="text-sm text-red-500">{formData.error.designation}</p>
                  )}
                </div>
              </>
            ) : origins === 'companie' ?
            (
            <>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {formData.error && formData.error.name && (
                    <p className="text-sm text-red-500">{formData.error.name}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="code_identification" className="block text-sm font-medium">
                  Codigo identificacion
                  </label>
                  <input
                    type="text"
                    id="code_identification"
                    name="code_identification"
                    value={formData.code_identification}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  /> 
                  {formData.error && formData.error.code_identification && (
                    <p className="text-sm text-red-500">{formData.error.code_identification}</p>
                  )}
                </div>
              </>
            ) : (
              <>
              </>
            )}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
