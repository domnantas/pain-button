import { ResponsiveLine } from '@nivo/line'
import { ResponsiveHeatMap } from '@nivo/heatmap'
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

const LineWrapper = styled.div`
  height: 400px;
`

const HeatmapWrapper = styled.div`
  height: 2500px;
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

  const groupedByPainTriggers = sortedTriggers
    .reduce((painGroups, trigger) => {
      // Probably could be refactored to use double reducer
      const painGroup = painGroups.find(
        (painGroup) => painGroup.id === trigger.pain.id
      )

      if (painGroup) {
        painGroup.data.push({
          triggeredAt: format(new Date(trigger.triggeredAt), 'yyyy-MM-dd'),
        })
        return painGroups
      }
      return [
        ...painGroups,
        {
          id: trigger.pain.id,
          painTitle: trigger.pain.title,
          data: [
            {
              triggeredAt: format(new Date(trigger.triggeredAt), 'yyyy-MM-dd'),
            },
          ],
        },
      ]
    }, [])
    .map((painGroup) => {
      return { id: painGroup.painTitle, data: painGroup.data }
    })
  console.log('groupedByPainTriggers', groupedByPainTriggers)

  const allDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  }).map((date) => format(date, 'yyyy-MM-dd'))

  const sumByPainTriggers = allDays.map((currentDay) => {
    const currentDayTriggers = groupedByPainTriggers.reduce(
      (allTriggers, triggerGroup) => {
        const currentDayTriggerCount = triggerGroup.data.filter(
          ({ triggeredAt }) => triggeredAt === currentDay
        ).length

        return { ...allTriggers, [triggerGroup.id]: currentDayTriggerCount }
      },
      {}
    )

    return { date: currentDay, ...currentDayTriggers }
  })
  console.log('sumByPainTriggers', sumByPainTriggers)

  const sumByDayTriggers = groupedByPainTriggers.map((triggerGroup) => {
    const groupedByDateTriggers = allDays
      .map((currentDay) => {
        const currentDayTriggerCount = triggerGroup.data.filter(
          ({ triggeredAt }) => triggeredAt === currentDay
        ).length
        return { x: currentDay, y: currentDayTriggerCount }
      })
      .filter((trigger) => trigger.y)

    return { ...triggerGroup, data: groupedByDateTriggers }
  })
  console.log('sumByDayTriggers', sumByDayTriggers)

  // const sumByDayTriggers = allDays.map((currentDay) => {
  //   const currentDayTriggers = groupedByPainTriggers.reduce(
  //     (allTriggers, triggerGroup) => {
  //       const currentDayTriggerCount = triggerGroup.data.filter(
  //         ({ triggeredAt }) => triggeredAt === currentDay
  //       ).length

  //       return { ...allTriggers, [triggerGroup.id]: currentDayTriggerCount }
  //     },
  //     {}
  //   )

  //   return { date: currentDay, ...currentDayTriggers }
  // })
  // console.log('sumByPainTriggers', sumByPainTriggers)

  const painIds = groupedByPainTriggers.map((triggerGroup) => triggerGroup.id)

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
    <>
      <LineWrapper>
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
      </LineWrapper>
      <HeatmapWrapper>
        <ResponsiveHeatMap
          data={sumByPainTriggers}
          keys={painIds}
          indexBy="date"
          colors="reds"
          maxValue={50}
          margin={{ top: 200, right: 30, bottom: 30, left: 30 }}
          forceSquare={true}
          axisTop={{
            orient: 'top',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45,
          }}
          axisRight={null}
          axisBottom={null}
          axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
          }}
          labelTextColor="#fff"
          cellOpacity={1}
          animate={true}
          motionConfig="wobbly"
          motionStiffness={80}
          motionDamping={9}
          hoverTarget="cell"
          cellHoverOthersOpacity={0.25}
        />
      </HeatmapWrapper>
    </>
  )
}
