import { ResponsiveLine } from '@nivo/line'
import { TableTooltip } from '@nivo/tooltip'
import styled from 'styled-components'
import { format, eachDayOfInterval } from 'date-fns'

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
  console.log('painTriggers', painTriggers)

  const sortedTriggers = [...painTriggers].sort(
    (triggerA, triggerB) => triggerA.id - triggerB.id
  )
  console.log('sortedByIdTriggers', sortedTriggers)

  const startDate = new Date(sortedTriggers[0].triggeredAt)
  console.log('startDate', startDate)

  const endDate = new Date(sortedTriggers[painTriggers.length - 1].triggeredAt)
  console.log('endDate', endDate)

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

  const groupedByPainTriggers = sortedTriggers
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
  console.log('groupedByPainTriggers', groupedByPainTriggers)

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
    const allDays = eachDayOfInterval({
      start: startDate,
      end: endDate,
    }).map((date) => format(date, 'yyyy-MM-dd'))

    const triggerGroupFormattedDates = triggerGroup.data.map((trigger) =>
      format(new Date(trigger.triggeredAt), 'yyyy-MM-dd')
    )

    const groupedByDateTriggers = allDays
      .map((currentDay) => {
        const currentDayTriggerCount = triggerGroupFormattedDates.filter(
          (triggerDate) => triggerDate === currentDay
        ).length
        return { x: currentDay, y: currentDayTriggerCount }
      })
      .filter((trigger) => trigger.y)

    return { ...triggerGroup, data: groupedByDateTriggers }
  })

  console.log('sumByDayTriggers', sumByDayTriggers)

  // Sum output
  // [
  //   {
  //     id: 'pain1',
  //     data: [
  //       {
  //         x: '2020-12-11',
  //         y: 0
  //       },
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
  //         x: '2020-12-11',
  //         y: 0
  //       },
  //       {
  //         x: '2020-12-12',
  //         y: 0
  //       },
  //       {
  //         x: '2020-12-13',
  //         y: 1
  //       }
  //     ]
  //   }
  // ]

  const Chip = ({ color }) => (
    <span
      style={{
        display: 'block',
        width: '12px',
        height: '12px',
        background: color,
      }}
    />
  )

  return (
    <ChartWrapper>
      <ResponsiveLine
        margin={{ top: 50, right: 250, bottom: 50, left: 60 }}
        colors={{ scheme: 'category10' }}
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
        enablePoints={false}
        lineWidth={4}
        sliceTooltip={({ slice, axis }) => {
          const otherAxis = axis === 'x' ? 'y' : 'x'
          return (
            <TableTooltip
              title={slice.points[0].data.xFormatted}
              rows={slice.points.map((point) => [
                <Chip key="chip" color={point.serieColor} />,
                point.serieId,
                <strong key="value">
                  {point.data[`${otherAxis}Formatted`]}
                </strong>,
              ])}
            />
          )
        }}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 270,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 250,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </ChartWrapper>
  )
}
