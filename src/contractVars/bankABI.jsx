export const contractAddress = '0x1Ea7C8284419204D9D58e0A76ea22d21e68A15aa';
 

export const contractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "fromThisGuy",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "valueGuy",
				"type": "uint256"
			}
		],
		"name": "Deposit",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "fromGuy",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "sendToGuy",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "reasonGuy",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amountGuy",
				"type": "uint256"
			}
		],
		"name": "alertNewApproval",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_requestId",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "approval",
				"type": "bool"
			}
		],
		"name": "approveRequest",
		"outputs": [
			{
				"internalType": "bool",
				"name": "succeeds",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "approvers",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "depositEth",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "firstRun",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllApprovalRequests",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "receipient",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "_reason",
						"type": "string"
					}
				],
				"internalType": "struct MultiSig.Requests[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getContractBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getContractOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCustodians",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "thisAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "voteWeight",
						"type": "uint256"
					}
				],
				"internalType": "struct MultiSig.Custodian[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_sendTo",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_reason",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "newApproval",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];