import { prismaClient } from "@/utils/prismaClient";
import PartnerPage from "./PartnerPage";

export const metadata = {
    title: 'Partner',
    description: 'Vista de socio',
}

export default async function Page({params}) {
  const data = await retrievePartner(params.id);
  const attentions = await prismaClient.attention.findMany({
      where: {
          partnerId: params.id
      },
      orderBy: {
          date: 'desc'
      },
      include: {
          TypeAttentions: true,
          PlaceAttention: true,
          Projects: true,
          AttentionsReasons: true,
          DerivedFrom: true,
          DerivedTo: true,
          Formation: true,
          Volunteer: true,
          partner: true
      }
  })
  console.log('DATAAA', data)
  return <PartnerPage {...{data, attentions}} partnerId={params.id} />
}

async function retrievePartner(id: string) {
  const partner = await prismaClient.partner.findUnique({
      where: {
          id: id
      },
      include: {
          sex: true,
          nationality: true,
          residency: true,
          partnerState: true,
          howDidKnowus: true,
          yearDidKnowUs: true
      }
  })

  return partner
}

export type DBData = ReturnType<typeof retrievePartner>