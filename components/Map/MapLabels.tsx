import styled from 'styled-components'
import { devices } from '../../utils/devices'

import Icon from '../../public/icons/arrow.svg'
import { Paragraph } from '../Typography'
import { Square, mapColors } from '../shared'

const Container = styled.div`
  background: ${({ theme }) => `${theme.lightBlack}99`};
  pointer-events: none;
  z-index: 40;
  border-radius: 8px;
  padding: 8px;
  height: min-content;
  position: absolute;
  top: 56px;
  left: 8px;
`

const LabelBox = styled.div`
  flex-shrink: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const ArrowIcon = styled(Icon)<{ $rotateUp?: boolean }>`
  color: ${({ theme }) => theme.newColors.black3};
  position: absolute;
  z-index: 1;
  margin: auto;
  left: 0;
  ${(props) => props.$rotateUp && 'transform: rotate(-90deg)'};
  right: 0;
  top: 0;
  bottom: 0;
`

const StyledParagraph = styled(Paragraph)`
  z-index: 1;
  font-size: 0.7em;
  margin: 0;
  line-height: 0;

  @media only screen and (${devices.tablet}) {
    font-size: 0.9em;
  }
`

type LabelProps = {
  color: string
  text: string
  rotateUp?: boolean
}

function Label({ color, text, rotateUp }: LabelProps) {
  return (
    <LabelBox>
      <Square color={color}>
        {rotateUp !== undefined && <ArrowIcon $rotateUp={rotateUp} />}
      </Square>
      <StyledParagraph>{text}</StyledParagraph>
    </LabelBox>
  )
}

type MapLabelsProps = {
  labels: string[]
  rotations: boolean[]
}

function MapLabels({ labels, rotations }: MapLabelsProps) {
  let labelColors = mapColors

  // Special cases for binary KPIs and KPIs with three cases
  if (labels.length === 2) {
    labelColors = [mapColors[0], mapColors[mapColors.length - 1]]
  }
  if (labels.length === 3) {
    labelColors = [mapColors[0], mapColors[4], mapColors[mapColors.length - 1]]
  }

  return (
    <Container>
      {Array.isArray(labels) ? labels.map((label, i) => (
        <Label key={label} color={labelColors[i]} text={label} rotateUp={rotations[i]} />
      )) : labels}
    </Container>
  )
}

export default MapLabels
