import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { checkLoggedIn, login, register } from "./service/api-service";

function App() {
  const [email, setEmail] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const f = await checkLoggedIn();
      return f;
    };
    getData().then((f) => {
      if (f.status === "ok") {
        sessionStorage.setItem("isLoggedIn", true);
        setIsLoggedIn(true);
        setHasAccount(true);
      } else {
        sessionStorage.clear();
        setIsLoggedIn(false);
        setHasAccount(false);
      }
      console.log(f);
    });
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Submitted");

    if (hasAccount) {
      login(email).then((f) => {
        sessionStorage.setItem("isLoggedIn", "true");
        console.log(f);
        setIsLoggedIn(true);
      });
    } else {
      // create account
      register(email).then((f) => {
        console.log(f);
        setIsLoggedIn(true);
        sessionStorage.setItem("isLoggedIn", "true");
      });
    }
  };

  return (
    <div className="text-bodyTextWhite dark:text-white flex flex-col justify-center overflow-x-hidden p-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="md:w-2/5">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-4 md:text-left text-balance">
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

            {!isLoggedIn && (
              <div className="mb-4 flex flex-col gap-2">
                <input
                  className="bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 px-4 py-2 rounded w-full"
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  value={email}
                  placeholder="Email Address"
                />
                <button
                  className="bg-blue-500 hover:bg-blue-700 dark:text-white font-semibold py-2 px-6 rounded mb-6 md:mb-0 md:mr-4 w-full"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Login
                </button>
                <hr className="border-gray-300 dark:border-gray-700 my-6 md:hidden" />
              </div>
            )}
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
