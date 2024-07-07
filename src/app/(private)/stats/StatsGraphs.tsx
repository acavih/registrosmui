import { Grid } from "@mui/material";
import BarGraph from "./Graphs/BarGraph";
import PieGraph from "./Graphs/PieGraph";
import { getDataForChart } from "./utils";

export default function StatsGraphs({filteredPartners}) {
    return (
        <Grid container spacing={2}>
            {getCharts(filteredPartners)}
        </Grid>
    )
}

const keyOfSinglePartners = (partners, key) => getDataForChart(
    partners.reduce((acc, partner) => {
    acc[partner[key].name] = (acc[partner[key].name] || 0) + 1
    return acc
}, {})
)

function getCharts(partners) {
    return [
        <PieGraph key={'sexoschart'} title={'Sexos'} data={keyOfSinglePartners(partners, 'sex')} />,
        <PieGraph key={'partnerState'} title={'Socio o no'} data={keyOfSinglePartners(partners, 'partnerState')} />,
        <PieGraph key={'howDidKnowus'} title={'Como nos conoció'} data={keyOfSinglePartners(partners, 'howDidKnowus')} />,
        <PieGraph key={'yearDidKnowUs'} title={'Año en que nos conoció'} data={keyOfSinglePartners(partners, 'yearDidKnowUs')} />,
        <BarGraph columns={12} key={'nationality'} title={'Nacionalidad'} data={keyOfSinglePartners(partners, 'nationality')} />,
        <BarGraph columns={12} key={'residency'} title={'Residencia'} data={keyOfSinglePartners(partners, 'residency')} />,
    ]
}
