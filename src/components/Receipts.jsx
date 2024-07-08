import { useEffect, useState } from "react";

const Receipts = ({ state }) => {
  const [receipts, setReceipts] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const receipts = await contract.getReceipts();
        setReceipts(receipts);
      } catch (error) {
        console.error("Error fetching receipts:", error);
      }
    };

    if (contract) {
      fetchReceipts();
    }
  }, [contract]);

  return (
    
    <div className="flex justify-center w-full p-2  bg-gray-100">
      <div className="w-full overflow-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200 border-b-2 border-gray-800">
            <tr>
              <th className="p-3 text-sm font-semibold tracking-wide text-left w-1/4">
                Name
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left w-1/4">
                Time
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left w-1/4">
                Message
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left w-1/4">
                Customer Address
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {receipts.map((receipt, index) => (
              <tr
                key={index}
                className="bg-green-300 hover:bg-red-300"
              >
                <td className="p-3 text-sm">{receipt.name}</td>
                <td className="p-3 text-sm">
                  {new Date(receipt.timestamp * 1000).toLocaleString()}
                </td>
                <td className="p-3 text-sm">{receipt.message}</td>
                <td className="p-3 text-sm">{receipt.customer_address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Receipts;
