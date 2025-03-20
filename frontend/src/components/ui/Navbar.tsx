import { useNavigate } from "react-router-dom"
import { useEffect,useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [elementId, setelementId] = useState("")
  useEffect(() => {
    if (!elementId) return;

    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, [elementId]);
  return (
    <nav className="flex justify-between items-center p-6 bg-gray-800 text-white shadow-md">
          <div className="flex items-center">
            <div className="text-2xl font-bold mr-4 text-yellow-300 cursor-pointer" onClick={()=>navigate("/")}>
              Founderly
            </div>
          </div>
          <div>
            <ul className="flex space-x-8">
              <li onClick={()=>{
              navigate(`api/auth`)
            }} className="cursor-pointer text-gray-400 hover:text-yellow-300 transition-colors duration-300">
                Get Started
              </li>
              <li onClick={()=>setelementId("service")} className="cursor-pointer text-gray-400 hover:text-yellow-300 transition-colors duration-300">
                Services
              </li>
              <li onClick={()=>setelementId("network")} className="cursor-pointer text-gray-400 hover:text-yellow-300 transition-colors duration-300">
                Our Network
              </li>
            </ul>
          </div>
        </nav>
  )
}

export default Navbar
