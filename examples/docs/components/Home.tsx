import React from 'react'
import styled from 'styled-components'

const blmGrey = 'rgb(33, 33, 33)';
const blmMetal = 'rgb(66, 66, 66)';


const Home: any = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  background: linear-gradient(20deg, ${blmGrey}, ${blmMetal});
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.17);
  box-sizing: border-box;
  min-height: 100vh;
  padding-top: 160px;
  padding-bottom: 160px;
`

Home.Header = styled.header`
    padding: 2rem 0;
    border: solid white;
    flex-direction: column;
    > p {
        padding: 0 4rem;
        text-align: left;
        font-size: 2rem;
    }
`

Home.Section = styled.section`
    display: flex;
    align-items: center;
    padding: 2rem 0;
    width: 100%;
`

Home.Feature = styled.header.attrs({className: 'col col--4'})`
    height: 200px;
    width: 200px;
`

export {Home}
