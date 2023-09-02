import { Link } from "react-router-dom";

function App() {
  return (
    <div className="text-bodyTextWhite dark:text-white flex flex-col justify-center overflow-x-hidden p-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="md:w-2/5">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-4 md:text-left">
              Unlock a Secure Digital Experience with Sentinel Hub
            </h1>
            <p className="dark:text-gray-300 text-bodyTextWhite text-center mb-8 md:text-left">
              Your Ultimate Cybersecurity Companion
            </p>

            <p className="dark:text-gray-300 text-bodyTextWhite mb-6 md:text-left">
              Experience digital freedom with confidence. Whether you're an
              individual or a business, Sentinel Hub empowers you to navigate
              the digital landscape securely. Our comprehensive suite of tools
              and expert insights ensures your online presence is protected.
            </p>

            <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
              <Link to="/add-report">
                <button className="bg-blue-500 hover:bg-blue-700 dark:text-white font-semibold py-2 px-6 rounded">
                  Report Suspicious Emails
                </button>
              </Link>
              <Link to="/browse">
                <button className="bg-blue-500 hover:bg-blue-700 dark:text-white font-semibold py-2 px-6 rounded">
                  Explore Threat Database
                </button>
              </Link>
            </div>
          </div>
          <div className="w-full md:w-3/5 flex justify-center md:justify-end">
            <img
              src="https://via.placeholder.com/300"
              alt="logo"
              className="md:block hidden"
            />
          </div>
        </div>

        {/* Make a why use us section */}
        <div className="mt-12">
          <h2 className="text-xl md:text-3xl font-semibold text-center mb-4">
            Why Use Sentinel Hub?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="dark:bg-card p-6 rounded-lg shadow-lg">
              <h3 className="text-lg md:text-xl font-semibold mb-3 dark:text-gray-200 text-bodyTextWhite">
                Comprehensive Protection
              </h3>
              <p className="dark:text-gray-300 text-bodyTextWhite">
                Our advanced tools and strategies offer comprehensive protection
                against the latest cyber threats. Safeguard your digital assets
                with confidence.
              </p>
            </div>
            <div className="dark:bg-card p-6 rounded-lg shadow-lg">
              <h3 className="text-lg md:text-xl font-semibold mb-3 dark:text-gray-200 text-bodyTextWhite">
                Expert Insights
              </h3>
              <p className="dark:text-gray-300 text-bodyTextWhite">
                Gain access to expert insights and analyses from the
                cybersecurity industry. Stay informed about emerging threats and
                best practices.
              </p>
            </div>
            {/* Add more reasons */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
