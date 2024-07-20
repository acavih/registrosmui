"use client";
import ResourceInput from "@/components/ResourceInput";
import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { filterAttentions } from './filterAttentions';
import ResourceInputMultiple from "@/components/ResourceInputMultiple";

export function StatsFilter({attentions, setAttentions, setPartners}) {
    const [sex, setSex] = useState<string[]>([]);
    const [nationality, setNationality] = useState<string[]>([]);
    const [residency, setResidency] = useState<string[]>([]);
    const [partnerState, setPartnerState] = useState<string[]>([]);
    const [howDidKnowus, setHowDidKnowus] = useState<string[]>([]);
    const [yearDidKnowUs, setYearDidKnowUs] = useState<string[]>([]);
    const [placeAttention, setPlaceAttention] = useState<string[]>([]);
    const [attentionsTypes, setAttentionsTypes] = useState<string[]>([]);
    const [derivadoA, setDerivadoA] = useState<string[]>([]);
    const [derivadoDe, setDerivadoDe] = useState<string[]>([]);
    const [formation, setFormation] = useState<string[]>([]);
    const [attentionsReasons, setAttentionsReasons] = useState<string[]>([]);
    const [volunteer, setVolunteer] = useState<string[]>([]);
    const [projects, setProjects] = useState<string[]>([]);

    useEffect(() => {
        const {filteredAttentions, filteredPartners} = filterAttentions(attentions, {
            sex, nationality, residency, partnerState, howDidKnowus, yearDidKnowUs,
            placeAttention, attentionsTypes, derivadoA, derivadoDe, formation,
            attentionsReasons, volunteer, projects
        })
        setAttentions(filteredAttentions)
        setPartners(filteredPartners)
    }, [
        sex, nationality, residency, partnerState, howDidKnowus, yearDidKnowUs,
        attentionsTypes, derivadoA, derivadoDe, formation, volunteer, attentionsReasons, projects,
        placeAttention
    ])

    return (
        <Stack spacing={2}>
            <Typography variant="h5" color="initial">Filtros</Typography>
            <ResourceInputMultiple label="Sexo" multiple={true} resourceName="sex" onChange={(value) => setSex(value)} />
            <ResourceInputMultiple label="Nacionalidad" multiple={true} resourceName="nationalities" onChange={(value) => setNationality(value)} />
            <ResourceInputMultiple label="Residencia" multiple={true} resourceName="residencies" onChange={(value) => setResidency(value)} />
            <ResourceInputMultiple label="Estado del socio" multiple={true} resourceName="partnerstates" onChange={(value) => setPartnerState(value)} />
            <ResourceInputMultiple label="¿Como nos conociste?" multiple={true} resourceName="howdidknowus" onChange={(value) => setHowDidKnowus(value)} />
            <ResourceInputMultiple label="¿En que año nos conociste?" multiple={true} resourceName="yeardidknowus" onChange={(value) => setYearDidKnowUs(value)} />
            <ResourceInputMultiple label="Tipos de atención" multiple={true} resourceName="typeattentions" onChange={(value) => setAttentionsTypes(value)} />
            <ResourceInputMultiple label="Derivado a" multiple={true} resourceName="derivedto" onChange={(value) => setDerivadoA(value)} />
            <ResourceInputMultiple label="Derivado de" multiple={true} resourceName="derivedfrom" onChange={(value) => setDerivadoDe(value)} />
            <ResourceInputMultiple label="Formación" multiple={true} resourceName="formation" onChange={(value) => setFormation(value)} />
            <ResourceInputMultiple label="Razón de la atención" multiple={true} resourceName="attentionsreasons" onChange={(value) => setAttentionsReasons(value)} />
            <ResourceInputMultiple label="Voluntario" multiple={true} resourceName="volunteer" onChange={(value) => setVolunteer(value)} />
            <ResourceInputMultiple label="Proyectos" multiple={true} resourceName="projects" onChange={(value) => setProjects(value)} />
            <ResourceInputMultiple label="Lugar de atención" multiple={true} resourceName="placeattentions" onChange={(value) => setPlaceAttention(value)} />
        </Stack>
    )
}
