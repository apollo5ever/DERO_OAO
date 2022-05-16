/* Optimal Autonomous Organization

Written by Apollo

*/


    Function InitializePrivate() Uint64
    10 STORE("CEO", SIGNER())
    20 STORE("vacantSeats", 12)
    30 STORE("voteIndex", 0)
    35 STORE("weeklyAllowance_DERO", 0)
    37 STORE("lastWithdrawl_DERO", BLOCK_TIMESTAMP() - 604800)
    40 RETURN 0
    End Function
    
    
    Function AppointFiveMembers(address0 String, address1 String, address2 String, address3 String, address4 String) Uint64
    10 IF SIGNER() == LOAD("CEO") THEN GOTO 20
    15 RETURN 1
    20 IF LOAD("vacantSeats") == 12 THEN GOTO 41
    25 RETURN 1
    //30 DIM i as Uint64
    //40 LET i = 0
    41 STORE("member_0", ADDRESS_RAW(address0))
    42 STORE("member_1", ADDRESS_RAW(address1))
    43 STORE("member_2", ADDRESS_RAW(address2))
    44 STORE("member_3", ADDRESS_RAW(address3))
    45 STORE("member_4", ADDRESS_RAW(address4))
    46 STORE("vacantSeats", 7)
    //50 STORE("member_" + i, ADDRESS_RAW(MAPGET("address" + i)))
    //55 LET i = i + 1
    //60 IF i == 5 GOTO 70 ELSE GOTO 50
    70 RETURN 0
    End Function
    
    function IsBoardMember(address String) Uint64
    10 DIM i as Uint64
    20 LET i = 0
    30 IF LOAD("member_" + i) == address THEN GOTO 40 ELSE GOTO 50
    40 RETURN 0
    50 LET i = i + 1
    60 IF i == 13 THEN GOTO 70 ELSE GOTO 30	
    70 RETURN 1
    End Function
    
    
    Function OpenVote(motion Uint64, address String, amountOrSeat Uint64) Uint64
    10 IF IsBoardMember(SIGNER()) == 0 THEN GOTO 20
    15 RETURN 1
    20 DIM index as Uint64
    30 LET index = LOAD("voteIndex")
    40 STORE("vote_" + index + "_tally", 0)
    50 DIM i as Uint64
    60 LET i = 0
    70 STORE("vote_" + index + "_member_" +i,0)
    80 LET i = i + 1
    90 IF i == 12 - LOAD("vacantSeats") THEN GOTO 100 ELSE GOTO 70
    100 STORE("vote_" + index + "_status",0)
    110 STORE("vote_"+ index + "_type", motion)
    120 STORE("vote_" + index + "_address", address)
    130 STORE("vote_" + index + "_amountOrSeat", amountOrSeat)
    140 STORE("voteIndex", index + 1)
    200 RETURN 0
    End Function
    
    Function CastVote(voteIndex Uint64, voterID Uint64, opinion Uint64) Uint64
    05 IF LOAD("vote_" + voteIndex + "_status") == 0 THEN GOTO 10 ELSE GOTO 40
    10 IF CheckID(SIGNER(), voterID) == 1 THEN GOTO 40
    15 IF opinion > 1 THEN GOTO 40
    20 STORE("vote_" + voteIndex + "_member_" + voterID, opinion)
    30 RETURN 0
    40 RETURN 1
    End Function
    
    Function CloseVote(voteIndex Uint64) Uint64
    10 IF IsBoardMember(SIGNER()) == 0 THEN GOTO 20 ELSE GOTO 40
    20 IF VotePassed(voteIndex) == 0 THEN GOTO 25 ELSE GOTO 30
    25 STORE("vote_" + voteIndex + "_status", 1)
    26 RETURN 0
    30 STORE("vote_" + voteIndex + "_status", 2)
    35 RETURN 0
    40 RETURN 1
    End Function
    
    function VotePassed(index Uint64) Uint64
    10 DIM threshold as Uint64
    20 LET threshold = (12 - LOAD("vacantSeats") )* 8 / 10
    30 DIM i as Uint64
    40 LET i = 0
    50 DIM tally as Uint64
    60 LET tally = 0
    70 LET tally = tally + LOAD("vote_" + index + "_member_" + i)
    80 LET i = i + 1
    90 IF i +1 > 12 - LOAD("vacantSeats") THEN GOTO 110 ELSE GOTO 70
    100 STORE("vote_" + index + "_tally", tally)
    110 IF tally < threshold THEN GOTO 140
    120 Execute(index)
    130 RETURN 0
    140 RETURN 1
    End Function
    
    function Execute(index Uint64) Uint64
    10 DIM address as String
    20 LET address = LOAD("vote_" +index + "_address")
    30 MAPSTORE("address", address)
    40 DIM motion as Uint64
    50 LET motion = LOAD("vote_" + index + "_type")
    60 DIM amountOrSeat as Uint64
    70 LET amountOrSeat = LOAD("vote_" + index + "_amountOrSeat")
    80 MAPSTORE("amountOrSeat", amountOrSeat)
    90 IF motion == 0 THEN GOTO 100 ELSE GOTO 110
    100 HireCEO()
    105 RETURN 0
    110 IF motion == 1 THEN GOTO 120 ELSE GOTO 130
    120 FireCEO()
    125 RETURN 0
    130 IF motion == 2 THEN GOTO 140 ELSE GOTO 150
    140 AddMember()
    145 RETURN 0
    150 IF motion == 3 THEN GOTO 160 ELSE GOTO 170
    160 KickMember()
    165 RETURN 0
    170 IF motion == 4 THEN GOTO 180 ELSE GOTO 190
    180 SetWeeklyAllowance()
    185 RETURN 0
    190 RETURN 1
    End Function
    
    
    function CheckID(address String, id Uint64) Uint64
    10 IF LOAD("member_" + id) == address THEN GOTO 20
    15 RETURN 1
    20 RETURN 0
    End Function
    
    
    function AddMember() Uint64
    10 STORE("member_"+ MAPGET("amountOrSeat"),MAPGET("address"))
    20 RETURN 0
    End Function
    
    function KickMember() Uint64
    10 STORE("member_" + MAPGET("amountOrSeat"),"")
    20 RETURN 0
    End Function
    
    function HireCEO() Uint64
    10 STORE("CEO",ADDRESS_RAW(MAPGET("address")))
    20 RETURN 0
    End Function
    
    function FireCEO() Uint64
    10 STORE("CEO","")
    20 RETURN 0
    End Function
    
    function SetWeeklyAllowance() Uint64
    10 STORE("weeklyAllowance_" + MAPGET("address"), MAPGET("amountOrSeat"))
    20 RETURN 0
    End Function
    
    Function Deposit() Uint64
    10 RETURN 0
    End Function
    
    Function AddAsset(scid String, name String) Uint64
    10 IF SIGNER() == LOAD("CEO") THEN GOTO 30
    20 RETURN 1
    30 STORE("asset_" + name,scid)
    40 RETURN 0
    End Function
    
    
    
    Function Withdraw(asset String, amount Uint64) Uint64
    10 IF SIGNER() != LOAD("CEO") THEN GOTO 100
    20 IF amount > LOAD("weeklyAllowance_" + asset) THEN GOTO 100
    25 IF BLOCK_TIMESTAMP() - 604800 < LOAD("lastWithdrawl_" + asset) THEN GOTO 100 
    30 IF asset == "DERO" THEN GOTO 40 ELSE GOTO 50
    40 SEND_DERO_TO_ADDRESS(SIGNER(), amount)
    41 STORE("lastWithdrawl_" + asset, BLOCK_TIMESTAMP())
    45 RETURN 0
    50 SEND_ASSET_TO_ADDRESS(SIGNER(), amount, LOAD("asset_" + asset))
    51 STORE("lastWithdrawl_" + asset, BLOCK_TIMESTAMP())
    55 RETURN 0
    100 RETURN 1
    End Function
    
    Function CheckAsset(name String) String
    10 RETURN LOAD("asset_" + name) // this is dangerous right? could be abused to load any variable? will change so variables are ("asset_"+name,scid)
    End Function
    
    Function TransferSeat(id Uint64, address String) Uint64
    10 IF CheckID(SIGNER(), id) == 1 THEN GOTO 99
    20 STORE("member_" + id, ADDRESS_RAW(address))
    30 RETURN 0
    99 RETURN 1
    End Function
