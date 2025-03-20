export default function Home() {
  return (
    <>
      <div className="w-screen overflow-hidden bg-gray-900">
        <nav className="flex justify-between items-center p-6 bg-black text-white shadow-md">
          <div className="flex items-center">
            <div className="text-2xl font-bold mr-4 text-blue-500">Logo</div>
            <div className="text-xl">Startup Name</div>
          </div>
          <div>
            <ul className="flex space-x-8">
              <li className="cursor-pointer text-gray-400 hover:text-blue-500 transition-colors duration-300">Research</li>
              <li className="cursor-pointer text-gray-400 hover:text-blue-500 transition-colors duration-300">How we work</li>
              <li className="cursor-pointer text-gray-400 hover:text-blue-500 transition-colors duration-300">About Us</li>
            </ul>
          </div>
        </nav>
        
        <section
          id="research"
          className="flex justify-center items-center h-screen bg-blue-900 text-white"
        >
          <div className="flex flex-col gap-10 text-center w-[50%] h-[50%] bg-white p-8 rounded-lg shadow-lg">
            <div className="text-3xl font-bold text-blue-700">
              Learn about Board Management from YC
            </div>
            <div className="text-lg text-gray-700">
              Search Engine for research
            </div>
            <div>
              <input
                type="text"
                className="border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search..."
              />
            </div>
          </div>
        </section>

        <section
          id="howitworks"
          className="bg-gray-800 text-white py-16"
        >
          <div className="max-w-screen-xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-blue-500 mb-4">Validate your idea</h2>
            <p className="text-lg text-gray-300">
              <button className="border-2 bg-gray-400">Validate</button>
            </p>
          </div>
        </section>

        <section
          id="aboutus"
          className="bg-blue-900 text-white py-16"
        >
          <div className="max-w-screen-xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">About Us</h2>
            <p className="text-lg text-gray-300">
              We are a team of professionals dedicated to making board management easy and efficient.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
