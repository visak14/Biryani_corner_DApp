import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for React Toastify

const Buy = ({ state }) => {
    console.log(state);

    const buyBiryani = async (e) => {
        e.preventDefault();
        try {
            const { contract } = state;
        
            const name = document.querySelector("#name").value;
            const message = document.querySelector("#message").value;

            console.log("Name:", name);
            console.log("Message:", message);
            console.log("Contract:", contract); 
            const amount = { value: ethers.utils.parseEther("0.001") };
            const transaction = await contract.orderBiryani(name, message, amount);
            await transaction.wait();
            console.log("Transaction");
            toast.success("Transaction occurred successfully");

            // Auto-refresh the page
            setTimeout(() => {
                window.location.reload();
            }, 2000); // Wait for 2 seconds before reloading
        } catch (error) {
            console.error("Error in buyBiryani:", error);
            toast.error("Transaction failed");
        }
    };

    return (
        <div className="flex justify-center items-center bg-gray-100 py-4">
            <form
                onSubmit={buyBiryani}
                className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full"
            >
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-xl font-medium text-gray-700"
                    >
                        Name:
                    </label>
                    <input
                        className="border-2 rounded-xl w-full h-10 mt-2 p-2"
                        type="text"
                        id="name"
                        placeholder="Enter your Name"
                    />
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="message"
                        className="block text-xl font-medium text-gray-700"
                    >
                        Message:
                    </label>
                    <input
                        className="border-2 rounded-xl w-full h-10 mt-2 p-2"
                        type="text"
                        id="message"
                        placeholder="Enter your message"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full h-10 border-2 border-black rounded-2xl bg-red-300 hover:bg-red-200 text-xl font-semibold"
                    disabled={!state.contract}
                >
                    Pay
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Buy;
