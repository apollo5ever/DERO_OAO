
import DeroBridgeApi from './api.js'
import React from 'react'
import ReactDOM from 'react-dom'
import to from 'await-to-js'

export default function Appoint(){

    const deroBridgeApiRef = React.useRef()

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






    return(<div>
<h3> Appoint Five Board Members </h3>
    <form onSubmit={appoint}>
      <p>SCID </p>
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
    )




}