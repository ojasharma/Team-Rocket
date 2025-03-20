
const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-6 bg-gray-800 text-white shadow-md">
          <div className="flex items-center">
            <div className="text-2xl font-bold mr-4 text-yellow-300">
              Founderly
            </div>
          </div>
          <div>
            <ul className="flex space-x-8">
              <li className="cursor-pointer text-gray-400 hover:text-yellow-300 transition-colors duration-300">
                Get Started
              </li>
              <li className="cursor-pointer text-gray-400 hover:text-yellow-300 transition-colors duration-300">
                Services
              </li>
              <li className="cursor-pointer text-gray-400 hover:text-yellow-300 transition-colors duration-300">
                Our Network
              </li>
            </ul>
          </div>
        </nav>
  )
}

export default Navbar
