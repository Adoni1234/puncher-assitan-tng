const Modal = ({ isOpen, onClose, onSubmit, formData, handleChange, type, origins }) => {

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
              </>
            ) :
            (
            <>
              <div className="mb-4">
                  <label htmlFor="anotherField" className="block text-sm font-medium">
                    Otro Campo
                  </label>
                  <input
                    type="text"
                    id="anotherField"
                    name="anotherField"
                    value={formData.anotherField || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {formData.error && formData.error.anotherField && (
                    <p className="text-sm text-red-500">{formData.error.anotherField}</p>
                  )}
                </div>
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
