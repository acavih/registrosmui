import { prismaClient } from "@/utils/prismaClient";
import PartnerPage from "./PartnerPage";

export const metadata = {
    title: 'Partner',
    description: 'Vista de socio',
}

export default async function Page({params}) {
  const data = await retrievePartner(params.id);
  return <PartnerPage {...{data}} />
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