import abi from "../../artifacts/contracts/Biryani.sol/Biryani.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Buy from "./components/Buy";
import Receipts from "./components/Receipts";



function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [accounts , setAccounts] = useState("None")
  useEffect(() => {
    const connectWallet = async () => {
      const contactAddress = "0x76e5d0e45FfF137082f87Bb578439BE551932Fc3";
      const contractABI = abi.abi;
      
      try {
        const { ethereum } = window;

        if (ethereum) {
      const account  =    await ethereum.request({ method: "eth_requestAccounts" });

      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      })


      window.ethereum.on("aChanged", () => {
        window.location.reload();
      })
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(contactAddress, contractABI, signer);
          setAccounts(account)
          setState({ provider, signer, contract });
      
        } else {
          console.error("MetaMask or Web3 provider not detected.");
          alert("please install metamask")
        }
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    };

    connectWallet();
  }, []);

  console.log(state);

 



  return (
    <div className="App bg-gray-100">
        <img
            src="https://img.lovepik.com/desgin_photo/45012/6375_list.jpg!/fw/431"
            alt="Slide 2"
            className=" h-96 w-full"
        />
        <p>Connected Account: {accounts}</p>
        <Buy state={state} />
        <Receipts state={state} />
    </div>
  );
}

export default App;
