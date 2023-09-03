function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold dark:text-white">Not Found</h1>
      <p className="dark:text-gray-400 mb-4">
        Looks like this page doesn't exist.
      </p>
      <div className="flex flex-row">
        <a
          className="bg-card hover:bg-slate-800 text-white font-semibold py-2 px-4 rounded mr-2 h-36 w-44  shadow-sm cursor-pointer"
          href="/"
        >
          Back to Home
        </a>
        <a
          className="bg-card hover:bg-slate-800 text-white font-semibold py-2 px-4 rounded mr-2 h-36 w-44 shadow-sm cursor-pointer"
          href="/browse"
        >
          Browse Reports
        </a>
      </div>
    </div>
  );
}

export default NotFound;
