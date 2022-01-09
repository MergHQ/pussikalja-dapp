import React from 'react'
import { ethers, utils } from 'ethers'
import { Pussikalja } from '../../typechain/Pussikalja'
import pussikaljaContract from '../contracts/Pussikalja'
import * as DF from 'date-fns'

const contractDevAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

export const useSigner = () => {
  const [signer, setSigner] = React.useState<null | ethers.Signer>(null)

  React.useEffect(() => {
    const { ethereum } = window as any
    if (ethereum) {
      ethereum
        .request({ method: 'eth_accounts' })
        .then(accounts =>
          accounts.length === 0
            ? ethereum.request({ method: 'eth_requestAccounts' })[0]
            : accounts[0]
        )
        .then(() => {
          const provider = new ethers.providers.Web3Provider(ethereum)

          setSigner(provider.getSigner(0))
        })
    }
  }, [])
  return signer
}

export const useContract = (signer: ethers.Signer) => {
  const [contract, setContract] = React.useState<Pussikalja | null>(null)
  React.useEffect(() => {
    if (signer) {
      const contract = new ethers.Contract(
        contractDevAddress,
        pussikaljaContract.abi,
        signer
      ) as Pussikalja

      setContract(contract)
    }
  }, [signer])
  return contract
}

export const getRatingsFromBlockchain = (contract: Pussikalja | null) => {
  const [ratings, setRatings] = React.useState<
    { rating: number; timestamp: string }[]
  >([])
  React.useEffect(() => {
    if (contract) {
      contract
        .getRatings()
        .then(v => v.map(e => ({ rating: e.rating, timestamp: e.timestamp })))
        .then(ratings =>
          setRatings(
            ratings.filter(r => DF.isSameDay(new Date(r.timestamp), new Date()))
          )
        )
    }
  }, [contract])
  return [ratings, setRatings] as const
}

export const addRating = (contract: Pussikalja | null, rating: number) => {
  if (contract) {
    contract
      .addRating(rating, new Date().toJSON())
      .then(tx => tx.wait())
      .then(receipt => console.log('tx complete', receipt))
  }
}

export const listenToEvents = (
  contract: Pussikalja | null,
  setRatings: React.Dispatch<
    React.SetStateAction<
      {
        rating: number
        timestamp: string
      }[]
    >
  >
) => {
  React.useEffect(() => {
    if (contract) {
      contract.on(
        {
          address: contractDevAddress,
          topics: [
            contract.interface.getEventTopic(
              contract.interface.getEvent('NewRating')
            ),
          ],
        },
        (rating, timestamp) =>
          setRatings(ratings => [...ratings, { rating, timestamp }])
      )
    }
  }, [contract])
}
