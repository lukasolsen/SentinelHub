import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <div className="container mx-auto">
        <div className="flex flex-row justify-between w-screen">
          <div className="w-2/12">
            <h1 className="text-4xl text-center">Sentinel Hub</h1>
            <p className="text-gray-400 text-center mb-20">
              This is a example description..
            </p>

            <div className="flex flex-row justify-evenly ">
              <Link to="/report">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-10">
                  Report
                </button>
              </Link>
              <Link to="/database">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-10">
                  Database
                </button>
              </Link>
            </div>
          </div>
          <div className="w-6/12">
            <img src="https://via.placeholder.com/150" alt="logo" />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
