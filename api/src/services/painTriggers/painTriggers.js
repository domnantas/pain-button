import { db } from 'src/lib/db'

export const painTriggers = () => {
  return db.painTrigger.findMany()
}

export const createPainTrigger = ({ input }) => {
  return db.painTrigger.create({
    data: {
      pain: {
        connect: {
          id: input.painTypeId,
        },
      },
    },
  })
}

export const PainTrigger = {
  pain: (_obj, { root }) =>
    db.painTrigger.findOne({ where: { id: root.id } }).pain(),
}
