import { Grid } from "@mui/material";
import { useEffect, useRef } from "react";
import Chart from 'chart.js/auto'

export default function BarGraph({data, columns = 6, title}) {
    const graphContainer = useRef<any>()
    
    useEffect(() => {
        if (!graphContainer.current) return
        console.log('montando el grafico', data)
        const chart =  new Chart(graphContainer.current, {
            type: 'bar',
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: title
                    },
                    legend: {
                        display: false
                    }
                }
            },
            data: {
                labels: Object.keys(data),
                datasets: [{
                    label: title,
                    data: Object.values(data),
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)'
                    ]
                }]
            }
        })
        return () => chart.destroy()
    }, [data, title])

    return (
        <Grid item xs={columns}>
            <canvas width={'100%'} height={100} ref={graphContainer}></canvas>
        </Grid>
    )
}