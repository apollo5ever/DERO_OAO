

import DeroBridgeApi from './api.js'
import React from 'react'
import ReactDOM from 'react-dom'
import to from 'await-to-js'
import './app.css'

const App = () => {

  const [vacant, setVacant] = React.useState(null) 
  const [type, setType] = React.useState(null)
  const [AOS, setAOS] = React.useState(null)
  const [address, setAddress] = React.useState(null)
  const [status, setStatus] = React.useState(null)
  const [assetCheck, setAssetCheck] =React.useState(null)
  const [allowance, setAllowance] = React.useState(null)
  const [balance, setBalance] = React.useState(null)
  const [balanceAsset, setBalanceAsset] = React.useState(null)
  const [view, changeView] =React.useState(null)
  

  const deroBridgeApiRef = React.useRef()
  const [bridgeInitText, setBridgeInitText] = React.useState('Not connected to extension')

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
 
 
  const appoint = React.useCallback(async (event) => {
    event.preventDefault();
    const deroBridgeApi = deroBridgeApiRef.current
    const [err, res] = await to(deroBridgeApi.wallet('start-transfer', {
    	"scid": event.target.scid.value,
    	"ringsize": 2,
    	"sc_rpc": [{
    		"name": "entrypoint",
    		"datatype": "S",
    		"value": "AppointFiveMembers"
    	},
        {
            "name": "address0",
            "datatype": "S",
            "value": event.target.m1.value
        },
        {
            "name": "address1",
            "datatype": "S",
            "value": event.target.m2.value
        },
        {
            "name": "address2",
            "datatype": "S",
            "value": event.target.m3.value
        },
        {
            "name": "address3",
            "datatype": "S",
            "value": event.target.m4.value
        },
        {
            "name": "address4",
            "datatype": "S",
            "value": event.target.m5.value
        }]
    }))

    console.log(err)
    console.log(res)
  }, [])

  const withdraw = React.useCallback(async (event) => {
    event.preventDefault();
    const deroBridgeApi = deroBridgeApiRef.current
    const [err, res] = await to(deroBridgeApi.wallet('start-transfer', {
    	"scid": event.target.scid.value,
    	"ringsize": 2,
    	"sc_rpc": [{
    		"name": "entrypoint",
    		"datatype": "S",
    		"value": "Withdraw"
    	},
        {
    		"name": "asset",
    		"datatype": "S",
    		"value": event.target.asset.value
    	},
      {
    		"name": "amount",
    		"datatype": "U",
    		"value": parseInt(event.target.amount.value)
    	}]
    }))

    console.log(err)
    console.log(res)
  }, [])

  //--------------BOARD FUNCTIONS----------------------------------

  const transferSeat = React.useCallback(async (event) => {
    event.preventDefault();
    const deroBridgeApi = deroBridgeApiRef.current
    const [err, res] = await to(deroBridgeApi.wallet('start-transfer', {
    	"scid": event.target.scid.value,
    	"ringsize": 2,
    	"sc_rpc": [{
    		"name": "entrypoint",
    		"datatype": "S",
    		"value": "TransferSeat"
    	},
        {
    		"name": "id",
    		"datatype": "U",
    		"value": parseInt(event.target.id.value)
    	},
      {
    		"name": "address",
    		"datatype": "S",
    		"value": event.target.address.value
    	}]
    }))

    console.log(err)
    console.log(res)
  }, [])
  
    const openVote = React.useCallback(async (event) => {
      event.preventDefault();
    const deroBridgeApi = deroBridgeApiRef.current
    const [err, res] = await to(deroBridgeApi.wallet('start-transfer', {
    	"scid": event.target.scid.value,
    	"ringsize": 2,
    	"sc_rpc": [{
    		"name": "entrypoint",
    		"datatype": "S",
    		"value": "OpenVote"
    	},
        {
    		"name": "motion",
    		"datatype": "U",
    		"value": parseInt(event.target.motion.value)
    	},
        {
    		"name": "address",
    		"datatype": "S",
    		"value": event.target.address.value
    	},
        {
    		"name": "amountOrSeat",
    		"datatype": "U",
    		"value": parseInt(event.target.aos.value)
    	}]
    }))

    console.log(err)
    console.log(res)
  }, [])


  const castVote = React.useCallback(async (event) => {
    event.preventDefault();
    const deroBridgeApi = deroBridgeApiRef.current
    const [err, res] = await to(deroBridgeApi.wallet('start-transfer', {
    	"scid": event.target.scid.value,
    	"ringsize": 2,
    	"sc_rpc": [{
    		"name": "entrypoint",
    		"datatype": "S",
    		"value": "CastVote"
    	},
        {
    		"name": "voteIndex",
    		"datatype": "U",
    		"value": parseInt(event.target.voteIndex.value)
    	},
        {
    		"name": "voterID",
    		"datatype": "U",
    		"value": parseInt(event.target.voterID.value)
    	},
        {
    		"name": "opinion",
    		"datatype": "U",
    		"value": parseInt(event.target.opinion.value)
    	}]
    }))

    console.log(err)
    console.log(res)
  }, [])


  const closeVote = React.useCallback(async (event) => {
    event.preventDefault();
    const deroBridgeApi = deroBridgeApiRef.current
    const [err, res] = await to(deroBridgeApi.wallet('start-transfer', {
    	"scid": event.target.scid.value,
    	"ringsize": 2,
    	"sc_rpc": [{
    		"name": "entrypoint",
    		"datatype": "S",
    		"value": "CloseVote"
    	},
        {
    		"name": "voteIndex",
    		"datatype": "U",
    		"value": parseInt(event.target.voteIndex.value)
    	}]
    }))

    console.log(err)
    console.log(res)
  }, [])


  



  const deposit = React.useCallback(async (event) => {
    event.preventDefault();
    const deroBridgeApi = deroBridgeApiRef.current
    const [err, res] = await to(deroBridgeApi.wallet('start-transfer', {
      scid: event.target.scid.value,
      ringsize: 2,
      sc_rpc: [{
        name: "entrypoint",
        datatype: "S",
        value: "Deposit"
      }],
      transfers: [{
          burn:parseInt(event.target.amount.value),
          destination:"deto1qy24vt8y4uujxq5jm0q2wkzrdl3hwuphun9n66tgkpm6n6rn2ps9cqqnr800x"
      }]
    }))

    console.log(err)
    console.log(res)
  }, [])

  //--------------------DAEMON FUNCTIONS----------------------------------
  

   const checkVacancy = React.useCallback(async (event) => {
     event.preventDefault();
    const deroBridgeApi = deroBridgeApiRef.current
    const [err, res] = await to(deroBridgeApi.daemon('get-sc', {
    	    	scid:event.target.scid.value,
            code:false,
            variables:true
    }))

    let emptySeats=res.data.result.stringkeys.vacantSeats;
    console.log(err)
    console.log(res)
    console.log(emptySeats)
    
    setVacant(emptySeats)
    return(emptySeats)

    
  }, []) 


  const checkVote = React.useCallback(async (event) => {
    event.preventDefault();
   const deroBridgeApi = deroBridgeApiRef.current
   const [err, res] = await to(deroBridgeApi.daemon('get-sc', {
           scid:event.target.scid.value,
           code:false,
           variables:true
   }))
   /* let test= `data`
   let voteStatus=res */
   let index = event.target.index.value

   let type = "vote_" +index+"_type"
   let voteType=res.data.result.stringkeys[type]

   let status= "vote_"+event.target.index.value+"_status"
   let voteStatus=res.data.result.stringkeys[status]

   let amountOrSeat = "vote_"+index+"_amountOrSeat"
   let voteAOS = res.data.result.stringkeys[amountOrSeat]

   let address = "vote_"+index+"_address"
   let voteAddress = res.data.result.stringkeys[address]


   console.log(err)
   console.log(res)
   console.log(voteStatus)
   console.log(voteType)
   console.log(voteAOS)
   console.log(voteAddress)
   setStatus(voteStatus)
   setType(voteType)
   setAOS(voteAOS)
   setAddress(voteAddress)

   
 }, []) 

 const checkAllowance = React.useCallback(async (event) => {
  event.preventDefault();
 const deroBridgeApi = deroBridgeApiRef.current
 const [err, res] = await to(deroBridgeApi.daemon('get-sc', {
         scid:event.target.scid.value,
         code:false,
         variables:true
 }))
 /* let test= `data`
 let voteStatus=res */
 let asset = event.target.asset.value

 let allowance = "weeklyAllowance_" +asset
 let assetAllowance=res.data.result.stringkeys[allowance]/100000

 setAssetCheck(asset)
 setAllowance(assetAllowance)

 
}, []) 


const checkBalance = React.useCallback(async (event) => {
  event.preventDefault();
 const deroBridgeApi = deroBridgeApiRef.current
 const [err, res] = await to(deroBridgeApi.daemon('get-sc', {
         scid:event.target.scid.value,
         code:false,
         variables:true
 }))
 /* let test= `data`
 let voteStatus=res */
 let asset = event.target.asset.value
 let id =0
 asset === "DERO" ? id = "0000000000000000000000000000000000000000000000000000000000000000" : id = asset

 
 let assetBalance=res.data.result.balances[id]/100000
 

 setBalance(assetBalance)
 setBalanceAsset(asset)

 
}, []) 


const setView = React.useCallback(async (event) => {
  event.preventDefault();
  changeView(event.target.view.value)
  console.log(event.target.view.value)
})

  
//----------------------------USER INTERFACE-----------------------------------------------------------------------------------


  return <div>
    
    <div>{bridgeInitText}</div>
    <h1>Optimal Autonomous Organization</h1>
            <p>This is an interface for your OAO. What are you here to do?</p>
            <form onSubmit={setView}>
                <select id="view" name="view">
                    <option value="generalInformation"> General Information & Deposit </option>
                    <option value="CEO"> CEO Functions</option>
                    <option value="Board"> Board Member Functions </option>
                </select>           
                <button type={"submit"}>Select</button>
            </form>

            {view === "generalInformation"?<div className="main">
            
            <h1> General Information & Deposit </h1>

            <div className="function">
    <h3>Check Contract Balance</h3>
    <h4>Balance is {balance} {balanceAsset}</h4>
    <form onSubmit={checkBalance}>
      <p>Your OAO Contract's SCID</p>
      <input id="scid" type="text"/>
      <p>Asset</p>
      <input id="asset" type="text"/>
      <button type={"submit"}>Check Balance</button>
    </form>
    </div>

    <div className="function">
    <h3>Vacant Seats</h3>
    <h4>{vacant}</h4>
  <form onSubmit={checkVacancy}>
    <p>Your OAO Contract's SCID</p>
    <input id="scid" type="text" />
    <button type={"submit"}>Check Vacancy</button>
  </form>
    
    </div>

    <div className="function">
    <h3> Check Vote</h3>
  <p> Motion to {type === 0 ? "hire "+ address +" as new CEO": type === 1 ? "fire CEO": type === 2 ? "add "+ address +" as board member "+ AOS : type === 3? "remove " +address +" from seat " +AOS : "set weekly allowance of " +address +" to "+ AOS}
{status === 0? ": Open" : status === 1 ? ": Passed" : status === 2? ": Rejected": ""}</p>
  <form onSubmit={checkVote}>
    <p>Your OAO Contract's SCID</p>
    <input id="scid" type="text" />
    <p>Vote Index</p>
    <input id="index" type="text" />
    <button type={"submit"}>Check Vote</button>
  </form>
  </div>

  <div className="function">
  <h3> Check Weekly Allowance</h3>
  <p>Allowance for {assetCheck} is {allowance}</p>
  <form onSubmit={checkAllowance}>
    <p>Your OAO Contract's SCID</p>
    <input id="scid" type="text" />
    <p>Asset</p>
    <input id="asset" type="text" />
    <button type={"submit"}>Check Allowance</button>
  </form>
  </div>

<div className="function">
  <h3>Deposit</h3>
  <form onSubmit={deposit}>
    <p>Your OAO Contract's SCID</p>
    <input id="scid" type="text"/>
    <p>Amount</p>
    <input id="amount" type="text"/>
    <button type={"submit"}>Deposit</button>
  </form>
  </div>

  </div>
            
            
            
            
            
            
            
            : view==="CEO"? 
            <div>
            
            <h1> CEO Functions </h1>
            <div className="function">
    <h3> Appoint Five Board Members </h3>
    <form onSubmit={appoint}>
      <p>Your OAO Contract's SCID </p>
      <input id="scid" type="text" />
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
    </div>

    <div className="function">
    <h3> Withdraw Funds </h3> 
    <form onSubmit={withdraw}>
      <p>Your OAO Contract's SCID</p>
      <input id="scid" type="text" />
      <p>Asset</p>
      <input id="asset" type="text" />
      <p>Amount</p>
      <input id="amount" type="text" />
      <button type={"submit"}>Withdraw</button>
    </form>
  </div>

    </div>
    : view === "Board"? 
    
    <div>

    
    <h1> Board Functions </h1>
    <div className="function">
    <h3> Open Vote </h3>
    <form onSubmit={openVote}>
      <p>Your OAO Contract's SCID </p>
      <input id="scid" type="text" />
    	<p>Motion </p>
      <select id="motion" name="motion">
        <option value="0">Hire CEO</option>
        <option value="1">Fire CEO</option>
        <option value="2">Add Board Member</option>
        <option value="3">Remove Board Member</option>
        <option value="4">Set CEO's Weekly Allowance</option>
        </select>
    	<p>Asset SCID or CEO Address </p>
    	<input id="address" type="text" />
    	<p>Allowance Amount or Board Seat ID </p>
    	<input id="aos" type="text" />
    	<button type={"submit"}>Open Vote</button>
    </form>
    </div>

    <div className="function">
    <h3> Cast Vote</h3>
    <form onSubmit={castVote}>
      <p>Your OAO Contract's SCID</p>
      <input id="scid" type="text" />
      <p>Vote Index</p>
      <input id="voteIndex" type="text"/>
      <p>Voter ID </p>
      <input id="voterID" type="text"/>
      <select id="opinion" name="opinion">
        <option value="0"> no </option>
        <option value="1"> yes</option>
      </select>
      <button type={"submit"}>Cast Vote</button>
    </form>
    </div>

  <div className="function">
    <h3> Close Vote</h3>
    <form onSubmit={closeVote}>
      <p>Your OAO Contract's SCID</p>
      <input id="scid" type="text" />
      <p>Vote Index</p>
      <input id="voteIndex" type="text"/>
      <button type={"submit"}>Close Vote</button>
    </form>
    
  </div>

 


  
<div className="function">
<h3> Transfer Seat</h3>
  <form onSubmit={transferSeat}>
    <p>Your OAO Contract's SCID</p>
    <input id="scid" type="text" />

    <p>Seat ID</p>
    <input id="id" type="text" />

    <p>Address</p>
    <input id="address" type="text" />

    <button type={"submit"}>Transfer Seat</button>
  </form>
  </div>

  </div>
    
    
    :""}
    

 



  
  

  <footer>Support by sending dero to "apollo"</footer>
  <a href="https://chrome.google.com/webstore/detail/dero-rpc-bridge/nmofcfcaegdplgbjnadipebgfbodplpd">Download DERO RPC Bridge Extension</a><a href="https://github.com/apollo5ever/DERO_OAO">Github (smart contract found here)</a> <a href="https://graymirror.substack.com/p/optimal-autonomous-organizations?s=r">What is an Optimal Autonomous Organization?</a>

  </div>
}



export default App;