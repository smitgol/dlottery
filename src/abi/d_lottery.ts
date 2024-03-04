export const abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_adminAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "LotteryIndex",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "declareWinnerDate",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "participateFee",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "minimumParticipant",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "imageUrl",
				"type": "string"
			}
		],
		"name": "lotteryEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "lotteryIndex",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "rank",
				"type": "uint256"
			}
		],
		"name": "winnerPriceEvent",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "adminAddress",
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
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "rank",
						"type": "uint256"
					}
				],
				"internalType": "struct lotteryContract.WinnerPrice[]",
				"name": "_winnerPrice",
				"type": "tuple[]"
			},
			{
				"internalType": "address",
				"name": "_adminAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_declareWinnerDate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_participateFee",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_minimumParticipant",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_imageUrl",
				"type": "string"
			}
		],
		"name": "createLottery",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_lotteryIndex",
				"type": "uint256"
			}
		],
		"name": "declareWinner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "getLotteryWinnerPrice",
		"outputs": [
			{
				"components": [
					{
						"components": [
							{
								"internalType": "address",
								"name": "winnerAddress",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "rank",
								"type": "uint256"
							}
						],
						"internalType": "struct lotteryContract.Winner[]",
						"name": "winner",
						"type": "tuple[]"
					},
					{
						"internalType": "address[]",
						"name": "participates",
						"type": "address[]"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "price",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "rank",
								"type": "uint256"
							}
						],
						"internalType": "struct lotteryContract.WinnerPrice[]",
						"name": "winnerPrices",
						"type": "tuple[]"
					},
					{
						"internalType": "address",
						"name": "lotteryDeployer",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "declareWinnerDate",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "participateFee",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "minimumParticipant",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "imageUrl",
						"type": "string"
					}
				],
				"internalType": "struct lotteryContract.Lottery",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lotteryIndex",
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
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "lotteryList",
		"outputs": [
			{
				"internalType": "address",
				"name": "lotteryDeployer",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "declareWinnerDate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "participateFee",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "minimumParticipant",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "imageUrl",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_lotteryIndex",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_lotteryParticipant",
				"type": "address"
			}
		],
		"name": "participate",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	}
] as const