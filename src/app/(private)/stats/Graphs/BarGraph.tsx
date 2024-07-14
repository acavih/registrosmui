import { Grid } from "@mui/material";
import HighchartsReact from "highcharts-react-official";
import Highcharts from 'highcharts'
import GraphWrapper from "../GraphWrapper";

export default function PieGraph({ data, columns = 6, title }) {
    return (
        <Grid item xs={columns}>
            <GraphWrapper>
                <HighchartsReact highcharts={Highcharts} options={{
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: title,
                        align: 'left'
                    },
                    xAxis: {
                        categories: Object.keys(data),
                        crosshair: true,
                        accessibility: {
                            description: 'Countries'
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Cantidad'
                        }
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        }
                    },
                    series: [
                        {
                            name: title,
                            data: Object.values(data)
                        }
                    ]
                }} />
            </GraphWrapper>
        </Grid>
    )
}