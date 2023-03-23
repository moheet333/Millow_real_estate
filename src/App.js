import { useEffect, useState } from "react";
import { ethers } from "ethers";

// Components
import Navigation from "./components/Navigation";
import Search from "./components/Search";
import Home from "./components/Home";
// This is test commit
// ABIs
import RealEstate from "./abis/RealEstate.json";
import Escrow from "./abis/Escrow.json";

// Config
import config from "./config.json";
const getEthereumObject = () => window.ethereum;

function App() {
  const [account, setAccount] = useState(null);
  const findMetaMaskAccount = async () => {
    try {
      const ethereum = getEthereumObject();
      if (!ethereum) {
        console.log("Make sure you have Metamask installed");
        return null;
      }
      console.log("We have ethereum object: ", ethereum);
      const accounts = await ethereum.request({ method: "eth_accounts" });
      ethereum.on("accountsChanged", async () => {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = ethers.utils.getAddress(accounts[0]);
        setAccount(account);
      });
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Authorized account found! ", account);
        return account;
      } else {
        console.log("No authorized account found!");
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    async function loadData() {
      const account = await findMetaMaskAccount();
      if (account !== null) {
        setAccount(account);
      }
    }

    loadData();
  }, []);

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />
      <div className="cards__section"></div>
    </div>
  );
}

export default App;
