import { Box, Grid, Tab, Tabs } from "@mui/material";
import BarGraph from "./Graphs/BarGraph";
import PieGraph from "./Graphs/PieGraph";
import { getDataForChart } from "./utils";
import { useState } from "react";

export default function StatsGraphs({filteredPartners, filteredAttentions}) {
    return (
        <Grid container spacing={2}>
            <GetCharts filteredPartners={filteredPartners} filteredAttentions={filteredAttentions} />
        </Grid>
    )
}

const keyOfSinglePartners = (partners, key) => getDataForChart(
    partners.reduce((acc, partner) => {
    acc[partner[key].name] = (acc[partner[key].name] || 0) + 1
    return acc
}, {})
)

function getMultipleResourceStats (data, key) {
    const stats = {}

    data.forEach(element => {
        element[key].forEach(type => {
            // console.log(type)
            stats[type.name] = (stats[type.name] || 0) + 1
        })
    })

    return stats
}

function GetCharts({filteredPartners, filteredAttentions}) {
    const [value, setValue] = useState(0)
    return [
        <Grid item xs={12} key={'charts'}>
            <Tabs value={value} onChange={(e, v) => setValue(v)}>
                <Tab label="Socios" id="partners" />
                <Tab label="Atenciones" id="attentions" />
            </Tabs>
            {value === 0 && <Grid container>
                <PieGraph key={'sexoschart'} title={'Sexos'} data={keyOfSinglePartners(filteredPartners, 'sex')} />,
                <PieGraph key={'partnerState'} title={'Socio o no'} data={keyOfSinglePartners(filteredPartners, 'partnerState')} />,
                <PieGraph key={'howDidKnowus'} title={'Como nos conoció'} data={keyOfSinglePartners(filteredPartners, 'howDidKnowus')} />,
                <PieGraph key={'yearDidKnowUs'} title={'Año en que nos conoció'} data={keyOfSinglePartners(filteredPartners, 'yearDidKnowUs')} />,
                <BarGraph columns={12} key={'nationality'} title={'Nacionalidad'} data={keyOfSinglePartners(filteredPartners, 'nationality')} />,
                <BarGraph columns={12} key={'residency'} title={'Residencia'} data={keyOfSinglePartners(filteredPartners, 'residency')} />,
            </Grid>}
            {value === 1 && <Grid container>
                <PieGraph columns={6} key={'TypeAttentions'} title={'Tipos de atenciones'} data={getMultipleResourceStats(filteredAttentions, 'TypeAttentions')} />
                <PieGraph columns={6} key={'Derivado a'} title={'Derivado a'} data={getMultipleResourceStats(filteredAttentions, 'DerivedTo')} />
                <PieGraph columns={6} key={'Derivado de'} title={'Derivado de'} data={getMultipleResourceStats(filteredAttentions, 'DerivedFrom')} />
                <PieGraph columns={6} key={'Formación'} title={'Formación'} data={getMultipleResourceStats(filteredAttentions, 'Formation')} />
                <BarGraph columns={12} key={'Razones de atención'} title={'Razones de atención'} data={getMultipleResourceStats(filteredAttentions, 'AttentionsReasons')} />
                <BarGraph columns={12} key={'Voluntariado'} title={'Voluntariado'} data={getMultipleResourceStats(filteredAttentions, 'Volunteer')} />
                <BarGraph columns={12} key={'Lugares de atención'} title={'Lugares de atención'} data={keyOfSinglePartners(filteredAttentions, 'PlaceAttention')} />
                <BarGraph columns={12} key={'Proyectos'} title={'Proyectos'} data={getMultipleResourceStats(filteredAttentions, 'Projects')} />
            </Grid>}
        </Grid>
    ]
}
