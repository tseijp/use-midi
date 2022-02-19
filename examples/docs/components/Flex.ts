import styled from 'styled-components'

type FlexProps = Partial<{
  pad: boolean
  row: boolean
}>

export const Flex = styled.div<FlexProps>`
    display: flex;
    width: 100%;
    margin: auto;
    ${({pad}) => pad && `padding: 2rem;`};
    ${({row}) => !row && `flex-direction: column;`}
    align-items: center;
    justify-content: center;
`
