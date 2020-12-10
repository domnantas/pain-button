import styled, { keyframes } from 'styled-components'

const colors = ['#c00', 'blue', 'white', 'orange']

const flash = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`

const wordArray = new Array(60).fill().map((_, index) => {
  return {
    color: colors[index % colors.length],
    x: Math.random() * 100,
    y: Math.random() * 100,
    rotate: Math.random() * 360,
    scale: 0.4 + Math.random() * 2,
    delay: Math.random() * 3,
    duration: 0.8 + Math.random() * 2,
  }
})

const WordsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  user-select: none;
`
const Word = styled.span`
  font-size: calc(64px * ${(props) => props.word.scale});
  color: ${(props) => props.word.color};
  position: absolute;
  top: ${(props) => props.word.y}%;
  left: ${(props) => props.word.x}%;
  opacity: 0;
  transform: rotate(${(props) => props.word.rotate}deg);
  animation: ${flash} ${(props) => props.word.duration}s
    ${(props) => props.word.delay}s ease-out infinite;
`

const Words = ({ children }) => {
  return (
    <WordsContainer>
      {wordArray.map((word, index) => {
        return (
          <Word key={index} word={word}>
            {children}
          </Word>
        )
      })}
    </WordsContainer>
  )
}

export default Words
