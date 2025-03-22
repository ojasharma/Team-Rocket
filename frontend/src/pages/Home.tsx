const Home = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <section
        id="research"
        className="flex items-center justsify-center h-screen bg-gradient-to-br from-yellow-100 to-yellow-300 text-black"
      >
        <div className="w-11/12 max-w-xl p-10 rounded-2xl shadow-xl text-center bg-white transform hover:scale-105 transition duration-300 ease-in-out">
          <div className="text-3xl font-extrabold mb-5 text-yellow-600 animate-pulse">
            🚀 Validate Your Idea with AI!
          </div>
          <div className="text-lg mb-6 text-gray-700">
            Explain your idea in detail below.
          </div>
          <input
            type="text"
            placeholder="Describe your amazing idea..."
            className="w-full p-4 mb-6 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-yellow-500 shadow-sm hover:shadow-md transition"
          />
          <button className="bg-yellow-500 text-black font-bold py-3 px-8 rounded-lg text-lg transition hover:bg-yellow-600 hover:scale-110 transform duration-200">
            🎯 Validate Now
          </button>
        </div>
      </section>

      <section id="howitworks" className="bg-gray-800 text-white py-16">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-500 mb-4">
            Validate your idea
          </h2>
          <p className="text-lg text-gray-300">
            <button
              onClick={() => {}}
              className="border-2 border-yellow-500 cursor-pointer bg-yellow-400 cursor-pointer text-white font-bold py-2 px-4 rounded-md hover:bg-yellow-500"
            >
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
