import data from './data.json'
import { connectOrCreateResource, connectOrCreateResourceMultiple, connectOrCreateResourceMultipleee } from './server/utils/prismaUtils';
import { prismaClient } from './utils/prismaClient';

const regs = data as any

async function main () {
    try {
        await prismaClient.partner.deleteMany({

        })
        for (let index = 0; index < regs.length; index++) {
            const {partner, attentions} = regs[index];

            console.log('Partner ' + index + ' of ' + regs.length)

            const member = await prismaClient.partner.create({
                data: {
                    name: partner.nombre ?? '',
                    surname: partner.apellidos ?? '',
                    code: partner.codigo ?? '',
                    sipcard: partner.sipcard ?? '',
                    email: partner.correoelectronico ?? '',
                    phone: partner.telefono ?? '',
                    birthdate: partner.fechanacimiento,
                    notes: partner.observaciones ?? '',
                    pendent: partner.cosaspendientes ?? '',
                    nationality: {connectOrCreate: connectOrCreateResource(partner.nacionalidad?.name ?? 'N/A')},
                    residency: {connectOrCreate: connectOrCreateResource(partner.ciudadresidencia?.name ?? 'N/A')},
                    sex: {connectOrCreate: connectOrCreateResource(partner.sexo?.name ?? 'N/A')},
                    partnerState: {connectOrCreate: connectOrCreateResource(partner.socioono?.name ?? 'N/A')},
                    howDidKnowus: {connectOrCreate: connectOrCreateResource(partner.howDidKnowUs?.name ?? 'N/A')},
                    yearDidKnowUs: {connectOrCreate: connectOrCreateResource(partner.yearDidKnowus?.name ?? 'N/A')},
                }
            })
/*
            const member = await caller.partners.create({
                name: partner.nombre ?? '',
                surname: partner.apellidos ?? '',
                code: partner.codigo ?? '',
                sipcard: partner.sipcard ?? '',
                email: partner.correoelectronico ?? '',
                phone: partner.telefono ?? '',
                birthdate: partner.fechanacimiento,
                notes: partner.observaciones ?? '',
                pendent: partner.cosaspendientes ?? '',
                nationality: partner.nacionalidad?.name ?? 'N/A',
                residency: partner.ciudadresidencia?.name ?? 'N/A',
                sex: partner.sexo?.name ?? 'N/A',
                partnerState: partner.socioono?.name ?? 'N/A',
                howDidKnowus: partner.howDidKnowUs?.name ?? 'N/A',
                yearDidKnowUs: partner.yearDidKnowus?.name ?? 'N/A',
            })*/

            const id = member.id
            console.log('member',{id})
            console.log('Metiendo attention ' + attentions.length + ' atenciones')

            
            for (const attention of attentions) {
                await prismaClient.attention.create({
                    data: {
                        date: attention.fechaatencion ?? new Date().toISOString(),
                        note: attention.comentario ?? '',
                        pendent: attention.cosaspendientes ?? '',
                        pendentDate: attention.fechacosaspendientes,
                        PlaceAttention: {connectOrCreate: connectOrCreateResource(attention.lugaratencion?.name ?? 'N/A')},
                        partner: {connect: {id: id}},
                        archived: false,
                        TypeAttentions: !attention.tipoaenciones ? {} : {connectOrCreate: attention.tipoaenciones.map(connectOrCreateResourceMultipleee)},
                        AttentionsReasons: !attention.motivosatencion ? {} : {connectOrCreate: attention.motivosatencion.map(connectOrCreateResourceMultipleee)},
                        DerivedFrom: !attention.derivadoa ? {} : {connectOrCreate: attention.derivadoa.map(connectOrCreateResourceMultipleee)},
                        DerivedTo: !attention.derivadode ? {} : {connectOrCreate: attention.derivadode.map(connectOrCreateResourceMultipleee)},
                        Formation: !attention.formacion ? {} : {connectOrCreate: attention.formacion.map(connectOrCreateResourceMultipleee)},
                        Projects: !attention.Proyectos ? {} : {connectOrCreate: attention.Proyectos.map(connectOrCreateResourceMultipleee)},
                        Volunteer: !attention.voluntariado ? {} : {connectOrCreate: attention.voluntariado.map(connectOrCreateResourceMultipleee)},
                    }
                })
            }
        }
    } catch (error) {
        console.error(error)
    }
}

main()
