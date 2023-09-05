import { useEffect, useState } from "react";
import { getEmails } from "../../service/api-service";
import { FaCheck, FaExclamationTriangle } from "react-icons/fa";
import Statistics from "./scenes/Statistics";
import { RiSearch2Line, RiFilter3Line } from "react-icons/ri";
import Table from "../../components/Tabel";

export default function Requests() {
  const [data, setData] = useState<IDataOutput[]>([]);
  const getData = async () => {
    try {
      const emails = await getEmails();
      setData(emails);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-11/12 mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Public Requests
      </h1>
      <Statistics />
      <div className="mb-6" /> {/* Add some margin bottom */}
      <Table data={data} />
    </div>
  );
}
