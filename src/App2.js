import DeroBridgeApi from './api.js'
import React from 'react'
import ReactDOM from 'react-dom'
import to from 'await-to-js'
import App from './App'

export default function App2() {

   /*  const [vacant, setVacant] = React.useState(null) 
    const [type, setType] = React.useState(null)
    const [AOS, setAOS] = React.useState(null)
    const [address, setAddress] = React.useState(null)
    const [status, setStatus] = React.useState(null)
    const [assetCheck, setAssetCheck] =React.useState(null)
    const [allowance, setAllowance] = React.useState(null)
    const [balance, setBalance] = React.useState(null)
    const [balanceAsset, setBalanceAsset] = React.useState(null) */
    const [view, changeView] =React.useState(null)
  
    const deroBridgeApiRef = React.useRef()
    const [bridgeInitText, setBridgeInitText] = React.useState('')
  
    React.useEffect(() => {
      const load = async () => {
        deroBridgeApiRef.current = new DeroBridgeApi()
        const deroBridgeApi = deroBridgeApiRef.current
        const [err] = await to(deroBridgeApi.init())
        if (err) {
          setBridgeInitText('failed to connect to extension')
        } else {
          setBridgeInitText('connected to extension')
        }
      }
  
      window.addEventListener('load', load)
      return () => window.removeEventListener('load', load)
    }, [])
  
  
    //------------------CEO Functions ---------------------------------
   
   
    const setView = React.useCallback(async (event) => {
      event.preventDefault();
      changeView(event.target.view.value)
      console.log(event.target.view.value)
    })










    return(
        <div>
            <div>{bridgeInitText}</div>
            <h1>Optimal Autonomous Organization</h1>
            <p>This is an interface for your OAO. What are you here to do?</p>
            <form onSubmit={setView}>
                <select id="view" name="view">
                    <option value="transferSeat"> Transfer Seat </option>
                </select>               
                <button type={"submit"}>Select</button>
            </form>

            {view === "transferSeat"? <App />: ""}










        </div>
    )
}