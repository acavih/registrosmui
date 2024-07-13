import { Grid } from "@mui/material";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export default function BarGraph({data, columns = 6, title}) {
    console.log(data)
    const options: Highcharts.Options = {
        chart: {
            type: 'columnBar'
        },
        title: {
            text: title
        },
        xAxis: {
            categories: Object.keys(data),
            crosshair: true,
        },
        series: [
            {type: 'bar', name: 'cantidad', data: Object.values(data)}
        ]
    }
    console.log(options)
    
    return (
        <Grid item xs={columns}>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </Grid>
    )
}