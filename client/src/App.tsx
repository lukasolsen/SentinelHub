import { Link } from "react-router-dom";

function App() {
  return (
    <div className="text-white h-screen flex flex-col justify-center overflow-x-hidden">
      <div className="container mx-auto">
        <div className="flex flex-row justify-between">
          <div className="w-2/5">
            <h1 className="text-4xl font-bold text-center mb-4">
              Sentinel Hub
            </h1>
            <p className="text-gray-300 text-center mb-8">
              Empowering Your Security
            </p>

            <div className="flex flex-col space-y-4">
              <Link to="/add-report">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded">
                  Add Report
                </button>
              </Link>
              <Link to="/database">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded">
                  View Database
                </button>
              </Link>
            </div>
          </div>
          <div className="w-3/5 flex justify-end">
            <img
              src="https://via.placeholder.com/300"
              alt="logo"
              className="animate-bounceIn"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
