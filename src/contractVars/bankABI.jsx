export const contractAddress = '0x60Dd84E255E97680E69b521ADD32Ef5683e64D9E';
 

export const contractABI = [
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
