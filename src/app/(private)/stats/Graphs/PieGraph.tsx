import Chart from 'chart.js/auto'
import { Grid } from "@mui/material";
import { useEffect, useRef } from "react";
import { ChartConfiguration } from "chart.js";

export default function PieGraph({ data, columns = 6, title }) {
    const graphContainer = useRef<any>()

    const config: ChartConfiguration = {
        type: 'pie',
        options: {
            plugins: {
                title: {
                    display: true,
                    text: title
                },
                legend: {
                    display: true
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
    }
    console.log(title, config)

    useEffect(() => {
        if (!graphContainer.current) return
        console.log('montando el grafico', data)
        const chart =  new Chart(graphContainer.current, config)
        return () => chart.destroy()
    }, [data, title])

    return (
        <Grid item xs={columns}>
            <canvas width={400} height={400} ref={graphContainer}></canvas>
        </Grid>
    )
}