import React from 'react'
import {
  addRating,
  getRatingsFromBlockchain,
  listenToEvents,
  useContract,
  useSigner,
} from './helpers/web3'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Content = styled.div`
  font-family: monospace;
  width: 50%;
`

const TodaysRatingContainer = styled.div`
  width: 250px;
  padding: 20px;
  margin: 50px 0 50px;
  text-align: center;
  background-color: #ff9800ba;
  border-radius: 100%;
`

const TodayScoreCount = styled.h3`
  font-size: 72px;
  font-weight: 600;
`

export const App = () => {
  const signer = useSigner()
  const contract = useContract(signer)
  const [ratings, setRatings] = getRatingsFromBlockchain(contract)
  const [newRating, setNewRating] = React.useState(0)

  listenToEvents(contract, setRatings)

  const isReady = signer && contract

  return (
    <Wrapper>
      <Content>
        <h1>Pussikalja</h1>
        {isReady ? 'Ready to go ✅' : 'Something is missing ❌'}
        <TodaysRatingContainer>
          <p>Todays rating: </p>
          <TodayScoreCount>
            {ratings.reduce((p, c) => p + c.rating, 0)}
          </TodayScoreCount>
        </TodaysRatingContainer>
        <label>Give a rating to the pussikalja weather today (0-5):</label>
        <input
          value={newRating}
          onChange={e => setNewRating(Number(e.target.value))}
        />
        <button
          onClick={() => newRating <= 5 && addRating(contract, newRating)}
          disabled={newRating > 5}>
          Rate
        </button>
      </Content>
    </Wrapper>
  )
}
