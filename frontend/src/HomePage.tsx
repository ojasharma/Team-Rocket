import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, ChevronRight, Users, Coffee, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full overflow-x-hidden font-sans bg-gradient-to-b from-gray-50 to-gray-100">      
      {/* Mobile menu toggle button */}
      <div className="md:hidden fixed top-5 right-5 z-50">
        <button onClick={toggleMenu} className="text-gray-800">
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 py-2 shadow-lg">
          <ul className="flex flex-col items-center space-y-4 pb-4">
            <li className="cursor-pointer text-gray-300 hover:text-yellow-400 transition-colors duration-300 w-full text-center py-2">
              Get Started
            </li>
            <li className="cursor-pointer text-gray-300 hover:text-yellow-400 transition-colors duration-300 w-full text-center py-2">
              Services
            </li>
            <li className="cursor-pointer text-gray-300 hover:text-yellow-400 transition-colors duration-300 w-full text-center py-2">
              Our Network
            </li>
            <li className="w-full px-8 py-2">
              <button className="w-full py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-md transition duration-200">
                Sign Up
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Hero Section */}
      <section className="pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse md:flex-row items-center">
            {/* Text content */}
            <div className="w-full md:w-1/2 flex flex-col gap-6 text-center md:text-left mt-8 md:mt-0">
              <span className="text-yellow-500 font-semibold">BUSINESS MENTORSHIP PLATFORM</span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-800">
                Grow your business with <span className="text-yellow-500">expert</span> mentors
              </h1>
              <p className="text-gray-600 text-lg max-w-lg mx-auto md:mx-0">
                An online community where visionary entrepreneurs connect with industry veterans for targeted guidance and support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button onClick={()=>{navigate(`api/auth`)}} className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-lg shadow-lg transform transition duration-300 hover:scale-105 flex items-center justify-center gap-2">
                  Get Started <ChevronRight size={20} />
                </button>
                <button className="px-8 py-3 border-2 border-gray-800 hover:bg-gray-800 hover:text-white text-gray-800 font-bold rounded-lg transition duration-300 flex items-center justify-center gap-2">
                  Learn More
                </button>
              </div>
            </div>
            
            {/* Image */}
            <div className="w-full md:w-1/2">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-400 rounded-full opacity-20"></div>
                <img 
                  src="/homePage.jpeg" 
                  alt="Connecting minds" 
                  className="rounded-lg shadow-xl max-w-full h-auto relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-800 py-16 md:py-24 rounded-t-3xl" id='service'>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            {/* Image */}
            <div className="w-full md:w-3/5 mb-8 md:mb-0 relative">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 rounded-full opacity-10"></div>
              <img
                src="/laptop.png"
                alt="Mentorship platform"
                className="max-w-full h-auto rounded-lg shadow-lg relative z-10"
              />
            </div>
            
            {/* Text content */}
            <div className="w-full md:w-2/5 flex flex-col gap-6 text-center md:text-left">
              <span className="text-yellow-400 font-semibold tracking-wider">TARGETED GUIDANCE</span>
              <h2 className="text-white text-3xl md:text-4xl font-bold">
                Align your goals with expert mentors
              </h2>
              <p className="text-gray-300 text-lg">
                This is not a random "pick your brain" call - this is specific
                advice from subject matter experts that will help you achieve your
                most strategic business objectives.
              </p>
              <ul className="text-gray-300 space-y-3">
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-gray-800">✓</div>
                  <span>Personalized 1:1 mentorship sessions</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-gray-800">✓</div>
                  <span>Goal-oriented actionable advice</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-gray-800">✓</div>
                  <span>Vetted industry experts and founders</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Network Section */}
      <section className="py-16 md:py-24 bg-white" id='network'>
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-yellow-500 font-semibold tracking-wider">OUR GLOBAL COMMUNITY</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 mt-2 text-gray-800">
              Join Our <span className="text-yellow-500">Worldwide</span> Network
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Founderly is on a mission to help entrepreneurs succeed. We connect you with the right people, resources, and knowledge to build thriving businesses.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl border border-gray-100">
              <div className="h-48 overflow-hidden bg-yellow-50 flex items-center justify-center">
                <Users size={80} className="text-yellow-400" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-gray-800">Mentors</h3>
                <p className="text-gray-600">
                  Guiding entrepreneurs with wisdom and experience, mentors
                  illuminate the path to growth and success in the business world.
                </p>
                <div className="mt-6 flex justify-end">
                  <button className="flex items-center text-yellow-500 font-semibold hover:text-yellow-600 transition-colors duration-200">
                    Meet our mentors <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl border border-gray-100">
              <div className="h-48 overflow-hidden bg-yellow-50 flex items-center justify-center">
                <Coffee size={80} className="text-yellow-400" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-gray-800">Partners</h3>
                <p className="text-gray-600">
                  Collaborating with like-minded organizations and brands to
                  deliver the best business solutions and opportunities.
                </p>
                <div className="mt-6 flex justify-end">
                  <button className="flex items-center text-yellow-500 font-semibold hover:text-yellow-600 transition-colors duration-200">
                    Our partners <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Card 3 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl border border-gray-100">
              <div className="h-48 overflow-hidden bg-yellow-50 flex items-center justify-center">
                <Briefcase size={80} className="text-yellow-400" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-gray-800">Investors</h3>
                <p className="text-gray-600">
                  Connecting founders to investors who are passionate about
                  fostering innovation and supporting growth.
                </p>
                <div className="mt-6 flex justify-end">
                  <button className="flex items-center text-yellow-500 font-semibold hover:text-yellow-600 transition-colors duration-200">
                    Connect with investors <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hear from some of the successful entrepreneurs who have experienced significant growth through our mentorship program.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-xl shadow-lg p-6 w-full md:w-1/3">
              <p className="text-gray-600 mb-6">
                "Thanks to Founderly, I found a mentor who helped me scale my business and avoid common mistakes. I couldn't have done it without their guidance."
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="/pic.webp"
                  alt="Client Avatar"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="text-gray-800 font-semibold">Ayush Kashyap</p>
                  <p className="text-gray-500">Founder of TechHub</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white rounded-xl shadow-lg p-6 w-full md:w-1/3">
              <p className="text-gray-600 mb-6">
                "The mentorship I received was invaluable. My business grew rapidly, and I gained the confidence to scale globally."
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="/pic.webp"
                  alt="Client Avatar"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="text-gray-800 font-semibold">Ojasvi Sharma</p>
                  <p className="text-gray-500">Founder of GreenTech</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 py-10">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-400">
            <p>&copy; 2025 Founderly. All Rights Reserved.</p>
          </div>
          <div className="flex justify-center gap-6 mt-6">
            <a href="#" className="text-gray-400 hover:text-white">
              LinkedIn
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Twitter
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Facebook
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
