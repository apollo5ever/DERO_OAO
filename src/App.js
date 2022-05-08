import logo from './logo.svg';
import './App.css';

import DeroBridgeApi from './api.js'
import React from 'react'
import ReactDOM from 'react-dom'
import to from 'await-to-js'

const App = () => {

   const [firstMember, setFirstMember] = React.useState(null);
   const [secondMember, setSecondMember] = React.useState(null);
   const [thirdMember, setThirdMember] = React.useState(null);
   const [fourthMember, setFourthMember] = React.useState(null);
   const [fifthMember, setFifthMember] = React.useState(null);
   const [contract, setContract] = React.useState(null);
   
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

 
 
  const appoint = React.useCallback(async () => {
    const deroBridgeApi = deroBridgeApiRef.current
    const [err, res] = await to(deroBridgeApi.wallet('start-transfer', {
    	"scid": contract,
    	"ringsize": 2,
    	"sc_rpc": [{
    		"name": "entrypoint",
    		"datatype": "S",
    		"value": "AppointFiveMembers"
    	},
        {
            "name": "address0",
            "datatype": "S",
            "value": firstMember
        },
        {
            "name": "address1",
            "datatype": "S",
            "value": secondMember
        },
        {
            "name": "address2",
            "datatype": "S",
            "value": thirdMember
        },
        {
            "name": "address3",
            "datatype": "S",
            "value": fourthMember
        },
        {
            "name": "address4",
            "datatype": "S",
            "value": fifthMember
        }]
    }))

    console.log(err)
    console.log(res)
  }, [])
  
    const openVote = React.useCallback(async () => {
    const deroBridgeApi = deroBridgeApiRef.current
    const [err, res] = await to(deroBridgeApi.wallet('start-transfer', {
    	"scid": contract,
    	"ringsize": 2,
    	"sc_rpc": [{
    		"name": "entrypoint",
    		"datatype": "S",
    		"value": "OpenVote"
    	},
        {
    		"name": "motion",
    		"datatype": "U",
    		"value": 4
    	},
        {
    		"name": "address",
    		"datatype": "S",
    		"value": "DERO"
    	},
        {
    		"name": "amountOrSeat",
    		"datatype": "U",
    		"value": 100000
    	}]
    }))

    console.log(err)
    console.log(res)
  }, [])
  
  const setFiveMembers = (event) => {
  	event.preventDefault();
  	setFirstMember(event.target.m1.value);
  	console.log(firstMember);
  	setSecondMember(event.target.m2.value);
  	console.log(secondMember);
  	setThirdMember(event.target.m3.value);
  	console.log(thirdMember);
  	setFourthMember(event.target.m4.value);
  	console.log(fourthMember);
  	setFifthMember(event.target.m5.value);
  	console.log(fifthMember);
  	appoint();
  }
  
  const setSCID = (event) => {
  	event.preventDefault();
  	setContract(event.target.scid.value);
  	console.log(contract);
  }

  const getBalance = React.useCallback(async () => {
    const deroBridgeApi = deroBridgeApiRef.current
    const [err, res] = await to(deroBridgeApi.wallet('get-balance'))
    if (err) alert(err.message)
    else alert(JSON.stringify(res))
  })

  return <div>
    <div>{bridgeInitText}</div>
    <h3> Set Contract SCID </h3>
    <form onSubmit={setSCID}>
    	<p>SCID:</p>
    	<input id="scid" type="text" />
    	<button type={"submit"}> Set </button>
    </form>
    <h3> Appoint Five Board Members </h3>
    <form onSubmit={setFiveMembers}>
    	<p>Member 1 </p>
    	<input id="m1" type="text" />
    	<p>Member 2 </p>
    	<input id="m2" type="text" />
    	<p>Member 3 </p>
    	<input id="m3" type="text" />
    	<p>Member 4 </p>
    	<input id="m4" type="text" />
    	<p>Member 5 </p>
    	<input id="m5" type="text" />
    	<button type={"submit"}>Appoint</button>
    </form>
    <button onClick={getBalance}>Get balance</button>
  </div>
}



export default App;
