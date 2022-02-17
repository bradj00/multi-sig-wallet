import React, {useState} from 'react'
import { useMoralis, useMoralisQuery, useMoralisSubscription } from 'react-moralis';

const Custodians = () => {
  const [updatedProposals, setUpdatedProposals] = useState('...');

  useMoralisSubscription("MultiSigAlertNewApprovalX", q => q, [], {
    onUpdate: data => cool(data),
  });


  function cool(data){
    console.log('adding new proposal:');
    console.log(data);
    let newProposalsArr = [...updatedProposals];
    newProposalsArr.push(data);
    setUpdatedProposals(newProposalsArr);
  }

  return (
    <div style={{overflow:'hidden', width:'80%'}}>
      {
        JSON.stringify(updatedProposals)
      }
    </div>
  );


  // const { data, error, isLoading } = 
  // useMoralisQuery("MultiSigAlertNewApprovalX",
  //     query => query 
  //       .descending("createdAt").limit(15),
      
  //     { 
  //       live: true,
  //       onLiveCreate: (data)=> {setAlert(data)},
  //       onLiveDelete: (data)=> {setAlert(data)},
  //       onLiveUpdate: (data)=> {setAlert(data)},
      
  //     } 
  // );


  // if (data) {
  //   return <span>{data.length}</span>;
  // }
  // if (error) {
  //   return <span>🤯</span>;
  // }
  
  // if (isLoading) {
  //   return <span>🙄</span>;
  // }
  
  // return <pre>{JSON.stringify(data, null, 2)}</pre>;
    
}

export default Custodians