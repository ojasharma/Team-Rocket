import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <nav className="flex justify-between items-center p-6 bg-gray-800 text-white shadow-md">
        <div className="flex items-center">
          <div className="text-2xl font-bold mr-4 text-yellow-300">
            Founderly
          </div>
        </div>
        <div>
          <ul className="flex space-x-8">
            <li className="cursor-pointer text-gray-400 hover:text-yellow-300 transition-colors duration-300">
              Research
            </li>
            <li className="cursor-pointer text-gray-400 hover:text-yellow-300 transition-colors duration-300">
              Validate your Idea
            </li>
            <li className="cursor-pointer text-gray-400 hover:text-yellow-300 transition-colors duration-300">
              <Link to="/blogs" className="hover:text-yellow-300">
                Blog
              </Link>
            </li>
            <li className="cursor-pointer text-gray-400 hover:text-yellow-300 transition-colors duration-300">
              About Us
            </li>
          </ul>
        </div>
      </nav>

      <section
        id="research"
        className="flex justify-center items-center h-screen bg-white text-white"
      >
        <div className="flex flex-col gap-10 items-center w-[75%] h-[64%] bg-gray-800 p-8 rounded-lg shadow-lg">
          <div className="h-full w-full flex flex-col items-center justify-evenly">
            <div className="text-3xl font-bold text-yellow-300">
              Validate the potential of your idea with AI !!
            </div>
            <div className="text-lg text-white">
              Explain your idea in detail below.
            </div>
            <div>
              <input
                type="text"
                className="border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Search..."
              />
            </div>
            <button className="border-2 w-28 border-yellow-500 bg-yellow-400 cursor-pointer text-white font-bold py-2 px-4 rounded-md hover:bg-yellow-500">
              Validate
            </button>
          </div>
        </div>
      </section>

      <section id="howitworks" className="bg-gray-800 text-white py-16">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-500 mb-4">
            Validate your idea
          </h2>
          <p className="text-lg text-gray-300">
            <button className="border-2 border-yellow-500 bg-yellow-400 cursor-pointer text-white font-bold py-2 px-4 rounded-md hover:bg-yellow-500">
              Validate
            </button>
          </p>
        </div>
      </section>

      <section id="aboutus" className="bg-gray-900 text-white py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
            <div className="text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-yellow-300 mb-4">
                About Us
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                We are a team of passionate individuals driven by the mission to
                revolutionize board management for startups.
              </p>
            </div>
            <div className="relative">
              {/* Option 1: Image */}
              <img
                src="/your-image.jpg" // Replace with your actual image path
                alt="About Us Image"
                className="rounded-lg shadow-lg transform transition-transform hover:scale-105 duration-300"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
