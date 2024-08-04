-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "partners" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "sipcard" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3),
    "pendent" TEXT NOT NULL,
    "sexId" TEXT NOT NULL,
    "partnerStateId" TEXT NOT NULL,
    "nationalityId" TEXT NOT NULL,
    "residencyId" TEXT NOT NULL,
    "howDidKnowusId" TEXT NOT NULL,
    "yearDidKnowusId" TEXT NOT NULL,

    CONSTRAINT "partners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resources_sex" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "resources_sex_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resources_partnerstates" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "resources_partnerstates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resources_nationalities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "resources_nationalities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resources_residencies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "resources_residencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resources_howdidknowus" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "resources_howdidknowus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resources_yeardidknowus" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "resources_yeardidknowus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attentions" (
    "id" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "pendent" TEXT NOT NULL,
    "pendentDate" TIMESTAMP(3),
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "partnerId" TEXT NOT NULL,
    "placeAttentionId" TEXT,

    CONSTRAINT "attentions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resources_placeattentions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "resources_placeattentions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resources_typeattentions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "resources_typeattentions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resources_projects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "resources_projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resources_attentionsreasons" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "resources_attentionsreasons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resources_derivedto" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "resources_derivedto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resources_derivedfrom" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "resources_derivedfrom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resources_formation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "resources_formation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resources_volunteer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "resources_volunteer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AttentionToTypeAttentions" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AttentionToProjects" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AttentionToAttentionsReasons" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AttentionToDerivedTo" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AttentionToDerivedFrom" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AttentionToFormation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AttentionToVolunteer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "resources_sex_name_key" ON "resources_sex"("name");

-- CreateIndex
CREATE UNIQUE INDEX "resources_partnerstates_name_key" ON "resources_partnerstates"("name");

-- CreateIndex
CREATE UNIQUE INDEX "resources_nationalities_name_key" ON "resources_nationalities"("name");

-- CreateIndex
CREATE UNIQUE INDEX "resources_residencies_name_key" ON "resources_residencies"("name");

-- CreateIndex
CREATE UNIQUE INDEX "resources_howdidknowus_name_key" ON "resources_howdidknowus"("name");

-- CreateIndex
CREATE UNIQUE INDEX "resources_yeardidknowus_name_key" ON "resources_yeardidknowus"("name");

-- CreateIndex
CREATE UNIQUE INDEX "resources_placeattentions_name_key" ON "resources_placeattentions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "resources_typeattentions_name_key" ON "resources_typeattentions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "resources_projects_name_key" ON "resources_projects"("name");

-- CreateIndex
CREATE UNIQUE INDEX "resources_attentionsreasons_name_key" ON "resources_attentionsreasons"("name");

-- CreateIndex
CREATE UNIQUE INDEX "resources_derivedto_name_key" ON "resources_derivedto"("name");

-- CreateIndex
CREATE UNIQUE INDEX "resources_derivedfrom_name_key" ON "resources_derivedfrom"("name");

-- CreateIndex
CREATE UNIQUE INDEX "resources_formation_name_key" ON "resources_formation"("name");

-- CreateIndex
CREATE UNIQUE INDEX "resources_volunteer_name_key" ON "resources_volunteer"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_AttentionToTypeAttentions_AB_unique" ON "_AttentionToTypeAttentions"("A", "B");

-- CreateIndex
CREATE INDEX "_AttentionToTypeAttentions_B_index" ON "_AttentionToTypeAttentions"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AttentionToProjects_AB_unique" ON "_AttentionToProjects"("A", "B");

-- CreateIndex
CREATE INDEX "_AttentionToProjects_B_index" ON "_AttentionToProjects"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AttentionToAttentionsReasons_AB_unique" ON "_AttentionToAttentionsReasons"("A", "B");

-- CreateIndex
CREATE INDEX "_AttentionToAttentionsReasons_B_index" ON "_AttentionToAttentionsReasons"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AttentionToDerivedTo_AB_unique" ON "_AttentionToDerivedTo"("A", "B");

-- CreateIndex
CREATE INDEX "_AttentionToDerivedTo_B_index" ON "_AttentionToDerivedTo"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AttentionToDerivedFrom_AB_unique" ON "_AttentionToDerivedFrom"("A", "B");

-- CreateIndex
CREATE INDEX "_AttentionToDerivedFrom_B_index" ON "_AttentionToDerivedFrom"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AttentionToFormation_AB_unique" ON "_AttentionToFormation"("A", "B");

-- CreateIndex
CREATE INDEX "_AttentionToFormation_B_index" ON "_AttentionToFormation"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AttentionToVolunteer_AB_unique" ON "_AttentionToVolunteer"("A", "B");

-- CreateIndex
CREATE INDEX "_AttentionToVolunteer_B_index" ON "_AttentionToVolunteer"("B");

-- AddForeignKey
ALTER TABLE "partners" ADD CONSTRAINT "partners_sexId_fkey" FOREIGN KEY ("sexId") REFERENCES "resources_sex"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partners" ADD CONSTRAINT "partners_partnerStateId_fkey" FOREIGN KEY ("partnerStateId") REFERENCES "resources_partnerstates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partners" ADD CONSTRAINT "partners_nationalityId_fkey" FOREIGN KEY ("nationalityId") REFERENCES "resources_nationalities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partners" ADD CONSTRAINT "partners_residencyId_fkey" FOREIGN KEY ("residencyId") REFERENCES "resources_residencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partners" ADD CONSTRAINT "partners_howDidKnowusId_fkey" FOREIGN KEY ("howDidKnowusId") REFERENCES "resources_howdidknowus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partners" ADD CONSTRAINT "partners_yearDidKnowusId_fkey" FOREIGN KEY ("yearDidKnowusId") REFERENCES "resources_yeardidknowus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attentions" ADD CONSTRAINT "attentions_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "partners"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attentions" ADD CONSTRAINT "attentions_placeAttentionId_fkey" FOREIGN KEY ("placeAttentionId") REFERENCES "resources_placeattentions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttentionToTypeAttentions" ADD CONSTRAINT "_AttentionToTypeAttentions_A_fkey" FOREIGN KEY ("A") REFERENCES "attentions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttentionToTypeAttentions" ADD CONSTRAINT "_AttentionToTypeAttentions_B_fkey" FOREIGN KEY ("B") REFERENCES "resources_typeattentions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttentionToProjects" ADD CONSTRAINT "_AttentionToProjects_A_fkey" FOREIGN KEY ("A") REFERENCES "attentions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttentionToProjects" ADD CONSTRAINT "_AttentionToProjects_B_fkey" FOREIGN KEY ("B") REFERENCES "resources_projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttentionToAttentionsReasons" ADD CONSTRAINT "_AttentionToAttentionsReasons_A_fkey" FOREIGN KEY ("A") REFERENCES "attentions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttentionToAttentionsReasons" ADD CONSTRAINT "_AttentionToAttentionsReasons_B_fkey" FOREIGN KEY ("B") REFERENCES "resources_attentionsreasons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttentionToDerivedTo" ADD CONSTRAINT "_AttentionToDerivedTo_A_fkey" FOREIGN KEY ("A") REFERENCES "attentions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttentionToDerivedTo" ADD CONSTRAINT "_AttentionToDerivedTo_B_fkey" FOREIGN KEY ("B") REFERENCES "resources_derivedto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttentionToDerivedFrom" ADD CONSTRAINT "_AttentionToDerivedFrom_A_fkey" FOREIGN KEY ("A") REFERENCES "attentions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttentionToDerivedFrom" ADD CONSTRAINT "_AttentionToDerivedFrom_B_fkey" FOREIGN KEY ("B") REFERENCES "resources_derivedfrom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttentionToFormation" ADD CONSTRAINT "_AttentionToFormation_A_fkey" FOREIGN KEY ("A") REFERENCES "attentions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttentionToFormation" ADD CONSTRAINT "_AttentionToFormation_B_fkey" FOREIGN KEY ("B") REFERENCES "resources_formation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttentionToVolunteer" ADD CONSTRAINT "_AttentionToVolunteer_A_fkey" FOREIGN KEY ("A") REFERENCES "attentions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttentionToVolunteer" ADD CONSTRAINT "_AttentionToVolunteer_B_fkey" FOREIGN KEY ("B") REFERENCES "resources_volunteer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
