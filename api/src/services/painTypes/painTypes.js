import { db } from 'src/lib/db'

export const painTypes = () => {
  return db.painType.findMany()
}

export const painType = ({ id }) => {
  return db.painType.findOne({
    where: { id },
  })
}

export const createPainType = ({ input }) => {
  return db.painType.create({
    data: input,
  })
}

export const updatePainType = ({ id, input }) => {
  return db.painType.update({
    data: input,
    where: { id },
  })
}

export const PainType = {
  triggers: (_obj, { root }) =>
    db.painType.findOne({ where: { id: root.id } }).triggers(),
}
