import {} from "react-icons/fa";

export default function Profile() {
  return (
    <div className="dark:text-white text-bodyTextWhite">
      <header className="p-4 flex justify-between items-center flex-col border border-gray-400 rounded-sm">
        <h1 className="text-3xl font-semibold text-center">User Profile</h1>
        <div className="flex flex-row w-44">
          <h4 className="text-sm">Username: </h4>
          <h4 className="text-sm font-semibold">VipeL#2502</h4>
        </div>
      </header>
      <main className="p-4 flex flex-row">
        <div className="flex flex-col w-1/3">
          <h3 className="text-xl font-semibold">YARA Rules</h3>
          <div className="flex flex-col">
            <div className="flex flex-row justify-between items-center">
              <p className="text-sm">Rule Name</p>
              <p className="text-sm">Date</p>
            </div>
            <div className="flex flex-row justify-between items-center">
              <p className="text-sm">Rule Name</p>
              <p className="text-sm">Date</p>
            </div>
            <div className="flex flex-row justify-between items-center">
              <p className="text-sm">Rule Name</p>
              <p className="text-sm">Date</p>
            </div>
            <div className="flex flex-row justify-between items-center">
              <p className="text-sm">Rule Name</p>
              <p className="text-sm">Date</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-1/3"></div>
      </main>
    </div>
  );
}
