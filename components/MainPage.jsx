import { deleteRecord, getRecords } from "@/utils/recordsFunctions";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useRouter } from "next/router";

const MainPage = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRecords = async () => {
    try {
      const response = await getRecords();

      setData(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleDeleteRecord = async (id) => {
    try {
      const response = await deleteRecord(id);

      if (response?.acknowledged) {
        const newData = data.filter((el) => el._id !== id);

        setData(newData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditRecord = (id) => {
    router.push(`/edit?id=${id}`);
  }

  useEffect(() => {
    fetchRecords();
  }, []);

  if (isLoading) return <Spinner />;

  return (
    
   /* <div>
    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
      My Travel 
      <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">
        Checklist
      </mark>
    </h1>
    <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
      Keep Track of Your Destinations and Dream Getaways
    </p>
  </div>
>*/
<div className="p-4 flex flex-wrap gap-4">
      {data?.map((record) => (
        <div
          key={record._id}
          className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {record.name}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {record.description}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {record.place}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {record.visited}
          </p>

          <button
            type="button"
            onClick={() => handleEditRecord(record._id)}
            className="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => handleDeleteRecord(record._id)}
            className="button" class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default MainPage;
