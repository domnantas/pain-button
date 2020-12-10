import { motion } from 'framer-motion'
import styled from 'styled-components'

const Button = styled(motion.button)`
  font-family: Creepster, sans-serif;
  background-color: #111;
  color: #ddd;
  font-size: 36px;
  border: 4px solid #ddd;
  padding: 16px 24px;
  letter-spacing: 4px;
  outline: none;
  cursor: pointer;
  user-select: none;
`

const PainButton = ({ children, ...props }) => {
  return (
    <>
      <Button
        whileHover={{ backgroundColor: '#c00', scale: 1.1 }}
        whileTap={{ scale: 5 }}
        transition={{
          type: 'spring',
          duration: 0.4,
          bounce: 0.4,
          backgroundColor: { duration: 0 },
        }}
        {...props}
      >
        {children}
      </Button>
    </>
  )
}

export default PainButton
