import { db } from 'src/lib/db'

export const painTriggers = () => {
  return db.painTrigger.findMany()
}

export const painTrigger = ({ id }) => {
  return db.painTrigger.findOne({
    where: { id },
  })
}

export const createPainTrigger = ({ input }) => {
  return db.painTrigger.create({
    data: input,
  })
}

export const updatePainTrigger = ({ id, input }) => {
  return db.painTrigger.update({
    data: input,
    where: { id },
  })
}

export const deletePainTrigger = ({ id }) => {
  return db.painTrigger.delete({
    where: { id },
  })
}

export const PainTrigger = {
  pain: (_obj, { root }) =>
    db.painTrigger.findOne({ where: { id: root.id } }).pain(),
}
