import { ResponsiveLine } from '@nivo/line'
import styled from 'styled-components'
import { format } from 'date-fns'

export const QUERY = gql`
  query PainTriggersQuery {
    painTriggers {
      id
      triggeredAt
      pain {
        id
        title
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

const ChartWrapper = styled.div`
  height: 400px;
`

export const Success = ({ painTriggers }) => {
  // Input
  // [
  //   {
  //     id: 20
  //     triggeredAt: '2020-12-12'
  //     pain: {
  //       id: 1
  //       title: 'pain1'
  //     }
  //   },
  //   {
  //     id: 21
  //     triggeredAt: '2020-12-13'
  //     pain: {
  //       id: 2
  //       title: 'pain2'
  //     }
  //   },
  //   {
  //     id: 22
  //     triggeredAt: '2020-12-12'
  //     pain: {
  //       id: 1
  //       title: 'pain1'
  //     }
  //   }
  // ]

  const groupedByPainTriggers = painTriggers
    .reduce((painGroups, trigger) => {
      // Probably could be refactored to use double reducer
      const painGroup = painGroups.find(
        (painGroup) => painGroup.id === trigger.pain.id
      )

      if (painGroup) {
        painGroup.data.push({ triggeredAt: trigger.triggeredAt })
        return painGroups
      }
      return [
        ...painGroups,
        {
          id: trigger.pain.id,
          painTitle: trigger.pain.title,
          data: [{ triggeredAt: trigger.triggeredAt }],
        },
      ]
    }, [])
    .map((painGroup) => {
      return { id: painGroup.painTitle, data: painGroup.data }
    })
  // Grouped output
  // [
  //   {
  //     id: 'pain1',
  //     data: [
  //       {
  //         triggeredAt: '2020-12-12'
  //       },
  //       {
  //         triggeredAt: '2020-12-12'
  //       }
  //     ]
  //   },
  //   {
  //     id: 'pain2',
  //     data: [
  //       {
  //         triggeredAt: '2020-12-13'
  //       }
  //     ]
  //   }
  // ]

  const sumByDayTriggers = groupedByPainTriggers.map((triggerGroup) => {
    const groupedByDateTriggers = triggerGroup.data
      .map((trigger) => ({
        ...trigger,
        triggeredAt: format(new Date(trigger.triggeredAt), 'yyyy-MM-dd'),
      }))
      .reduce((groups, trigger) => {
        const date = groups.find((group) => group.x === trigger.triggeredAt)

        if (date) {
          date.y += 1
          return groups
        }

        return [...groups, { x: trigger.triggeredAt, y: 1 }]
      }, [])
    return { ...triggerGroup, data: groupedByDateTriggers }
  })

  // Sum output
  // [
  //   {
  //     id: 'pain1',
  //     data: [
  //       {
  //         x: '2020-12-12',
  //         y: 2
  //       }
  //     ]
  //   },
  //   {
  //     id: 'pain2',
  //     data: [
  //       {
  //         x: '2020-12-13',
  //         y: 1
  //       }
  //     ]
  //   }
  // ]

  return (
    <ChartWrapper>
      <ResponsiveLine
        margin={{ top: 50, right: 20, bottom: 50, left: 60 }}
        animate={true}
        enableSlices="x"
        data={sumByDayTriggers}
        xScale={{
          type: 'time',
          format: '%Y-%m-%d',
          useUTC: false,
          precision: 'day',
        }}
        xFormat="time:%Y-%m-%d"
        yScale={{
          type: 'linear',
          stacked: false,
        }}
        axisBottom={{
          format: '%b %d',
        }}
        curve={'monotoneX'}
        useMesh={true}
        pointSize={10}
      />
    </ChartWrapper>
  )
}
