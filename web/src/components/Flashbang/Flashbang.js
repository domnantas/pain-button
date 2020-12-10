import { motion, useAnimation } from 'framer-motion'
import { forwardRef, useImperativeHandle } from 'react'
import styled from 'styled-components'

const Flash = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: -1;
  opacity: 0;
`

const Flashbang = (props, ref) => {
  const flashbangControls = useAnimation()

  useImperativeHandle(ref, () => ({
    flash: () => {
      flashbangControls.start({ opacity: [1, 0] })
    },
  }))

  return (
    <Flash
      animate={flashbangControls}
      transition={{ duration: 1, ease: 'easeOut' }}
    />
  )
}

export default forwardRef(Flashbang)
