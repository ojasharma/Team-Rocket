import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <div className="w-full overflow-x-hidden nunito">
        {/* <nav className="flex justify-between items-center p-6 bg-gray-800 text-white shadow-md">
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
        </nav> */}

        <section className="w-screen h-[80vh]">
          <div className="flex w-full h-full">
            {/* text */}
            <div className="w-[45%] flex p-6 gap-10 justify-center flex-col">
              <h1 className="text-6xl font-bold">
                Grow your small business with advice from <span className='text-yellow-300'>expert</span> mentors
              </h1>
              <h3>
                An online community where visionary entrepreneurs and mentoring
                champions unite
              </h3>
              <button className="border-black border-2 rounded-md h-10 cursor-pointer hover:bg-yellow-300 transition-all duration-200">
                Get Started
              </button>
            </div>
            {/* image */}
            <div className="w-[55%] flex items-center p-8">
              <img src="/homePage.jpeg" alt="coonecting minds" className='rounded-md'/>
            </div>
          </div>
        </section>

        <section className="bg-gray-800 h-screen flex">
          <div className="w-[60%] flex items-center h-full">
            <img
              src="/laptop.png"
              alt="ui ux"
              className="ml-20 w-[80%]"
            />
          </div>
          <div className="w-[40%] flex flex-col justify-center px-4 gap-5">
            <h2 className="text-gray-300 text-2xl font-semibold">
              <span className="text-yellow-300">Results-driven</span> mentorship
            </h2>
            <h1 className="text-gray-300 text-5xl font-bold">
              Align your goals with your mentors.
            </h1>
            <h3 className="text-gray-300 font-semibold">
              This is not a random "pick your brain" call - this is specific
              advice from subject matter experts that will help you with your
              most strategic business objectives.
            </h3>
          </div>
        </section>

        <section className="w-full h-screen flex flex-col items-center gap-10">
          <div className="mt-12 text-6xl font-bold">
            Join Our <span className='text-yellow-300'>Worldwide</span> Network
          </div>
          <div className="text-xl font-semibold w-[50%] text-center">
            Founderly is on a mission to help entrepreneurs succeed. We do this
            by operating accelerator programs and venture capital funds, and by
            helping build thriving startup communities around the world.
          </div>
          <div className="w-[80vw] h-[60vh] flex justify-between ">
            <div className="w-[25vw] gap-5 h-full flex items-center flex-col bg-gray-300 p-4 rounded-md">
              <img src="/homepagecard1.webp" alt="" />
              <h2 className="text-3xl font-bold">Mentors</h2>
              <h3 className="text-xl text-center">
                Guiding entrepreneurs with wisdom and experience, mentors
                illuminate the path to growth and success in the business world.
              </h3>
            </div>
            <div className="gap-5 w-[25vw] h-full flex items-center flex-col bg-gray-300 p-4 rounded-md">
              <img src="/homepagecard2.webp" alt="" />
              <h2 className="text-3xl font-bold">Partners</h2>
              <h3 className="text-xl text-center">
                Strengthening ventures through collaboration, partners bring
                diverse expertise and build the foundation for lasting success.
              </h3>
            </div>
            <div className="gap-5 w-[25vw] h-full flex items-center flex-col bg-gray-300 p-4 rounded-md">
              <img src="/homepagecard3.webp" alt="" />
              <h2 className="text-3xl font-bold">Investors</h2>
              <h3 className="text-xl text-center">
                Fueling ideas with resources, investors turn entrepreneurial
                visions into reality and drive innovation.
              </h3>
            </div>
          </div>
        </section>

        <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        <nav className="flex space-x-4 mt-2 md:mt-0">
          <Link to="/about" className="hover:text-gray-400">About</Link>
          <Link to="/contact" className="hover:text-gray-400">Contact</Link>
          <Link to="/privacy" className="hover:text-gray-400">Privacy Policy</Link>
        </nav>
      </div>
    </footer>
      </div>
    </>
  );
};

export default HomePage;
