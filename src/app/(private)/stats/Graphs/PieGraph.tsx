import { Grid } from "@mui/material";
import HighchartsReact from "highcharts-react-official";
import Highcharts from 'highcharts'
import GraphWrapper from "../GraphWrapper";

function getData (data) {
    const arr: any[] = []

    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            const element = data[key];
            arr.push({ name: key, y: element })
        }
    }

    return arr
}

export default function PieGraph({ data, columns = 6, title }) {
    return (
        <Grid item xs={columns}>
            <GraphWrapper>
                <HighchartsReact highcharts={Highcharts} options={{
                    chart: {
                        type: 'pie'
                    },
                    title: {
                        text: title
                    },
                    tooltip: {
                        valueSuffix: ''
                    },
                    plotOptions: {
                        series: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: [{
                                enabled: true,
                                distance: 20
                            }, {
                                enabled: true,
                                distance: -40,
                                format: '{point.percentage:.1f}%',
                                style: {
                                    fontSize: '1.2em',
                                    textOutline: 'none',
                                    opacity: 0.7
                                },
                                filter: {
                                    operator: '>',
                                    property: 'percentage',
                                    value: 10
                                }
                            }]
                        }
                    },
                    series: [
                        {
                            name: '',
                            colorByPoint: true,
                            data: getData(data)
                        }
                    ]
                }} />
            </GraphWrapper>
        </Grid>
    )
}