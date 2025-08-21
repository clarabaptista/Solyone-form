<!-- - En dessous de la liste déroulante
- Un tableau a plusieurs colonnes
    -> Nom du logiciel
    -> Version du logiciel
    -> URL de téléchargement (cliquable et modifiable)
        -> attention : toujours activé côté administrateur pour la modification. (POSER QUESTION COMMENT ON REPÈRE UN ADMIN)
        - Modifiable
            - Si c'est modifiable alors le champ est un bouton qui, au click ouvrira un dialog
                - Il y aura 2 champs
                    -> Old URL
                    -> New url (modifiable (input))
                - Il faudra appuyer sur un bouton valider pour confirmer
                    -> Il y aura une vérification a l'aide de l'ia sur le nouveau lien (CALL API)
                        -> Si le nouveau lien est le même que l'ancien et qu'un lien dans le catalogue alors on ne fait pas la vérification (dur)
    -> Recommandation logiciel
        -> Au click du logiciel ça propose de l'ajouter au formulaire avec une modal
            -> "Voulez vous ajouter X ?"
    -> vCPU Recommandé
    -> RAM Recommandé
    -> Espace disque Recommandé
    -> ID de l'outil / Null si l'outil vient de l'ia
    -> Où installer (select)
       -> Par défaut : Machine Formateur & Stagiaire
       -> Machine Formateur
       -> Machine Stagiaire -->

<template>
  <v-data-table :headers="headers ":items="toolsOptions" item_key="name" hide-default-footer></v-data-table>
</template>

<script setup>

const headers = [
  { title: "Nom du logiciel", value: "name" },
  { title: "Version du logiciel", value: "version" },
  { title: "Lien de téléchargement", value: "downloadUrl" },
  { title: "Recommandation logiciel", value: "softwareRecommendation" },
  { title: "vCPU recommandé", value: "vcpuRecommendation" },
  { title: "RAM recommandé", value: "ramRecommendation" },
  { title: "Espace disque recommandé", value: "diskRecommendation" },
  { title: "ID de l'outil", value: "toolId" },
];

const items = [
  {
    name: "PostgreSQL",
    version: "15.4",
    downloadUrl: "https://postgresql.org/download/",
    softwareRecommendation: "pgAdmin, DBeaver, VS Code",
    vcpuRecommendation: "2-4 cores",
    ramRecommendation: "4-16 GB",
    diskRecommendation: "5 GB",
    toolId: "postgresql-001",
  },
  {
    name: "React",
    version: "18.2.0",
    downloadUrl: "https://reactjs.org/docs/getting-started.html",
    softwareRecommendation: "Node.js, VS Code, npm/yarn",
    vcpuRecommendation: "2-4 cores",
    ramRecommendation: "4-8 GB",
    diskRecommendation: "1 GB",
    toolId: "react-002",
  },
  {
    name: "Docker Desktop",
    version: "24.0.5",
    downloadUrl: "https://docker.com/products/docker-desktop/",
    softwareRecommendation: "VS Code Docker Extension, Portainer",
    vcpuRecommendation: "4 cores",
    ramRecommendation: "8 GB",
    diskRecommendation: "10 GB",
    toolId: "docker-003",
  },
  {
    name: "Visual Studio Code",
    version: "1.82.0",
    downloadUrl: "https://code.visualstudio.com/download",
    softwareRecommendation: "Git, Node.js, Extensions Pack",
    vcpuRecommendation: "2 cores",
    ramRecommendation: "4 GB",
    diskRecommendation: "1 GB",
    toolId: "vscode-004",
  },
  {
    name: "Python",
    version: "3.11.5",
    downloadUrl: "https://python.org/downloads/",
    softwareRecommendation: "PyCharm, VS Code, Jupyter Notebook",
    vcpuRecommendation: "2 cores",
    ramRecommendation: "4 GB",
    diskRecommendation: "1 GB",
    toolId: "python-005",
  },
  {
    name: "Node.js",
    version: "18.17.1",
    downloadUrl: "https://nodejs.org/en/download/",
    softwareRecommendation: "VS Code, npm, Postman",
    vcpuRecommendation: "2 cores",
    ramRecommendation: "2-4 GB",
    diskRecommendation: "500 MB",
    toolId: "nodejs-006",
  },
  {
    name: "MySQL",
    version: "8.0.34",
    downloadUrl: "https://dev.mysql.com/downloads/mysql/",
    softwareRecommendation: "MySQL Workbench, phpMyAdmin",
    vcpuRecommendation: "2-4 cores",
    ramRecommendation: "4-8 GB",
    diskRecommendation: "2 GB",
    toolId: "mysql-007",
  },
  {
    name: "MongoDB",
    version: "7.0.0",
    downloadUrl: "https://mongodb.com/try/download/community",
    softwareRecommendation: "MongoDB Compass, Studio 3T",
    vcpuRecommendation: "2-4 cores",
    ramRecommendation: "4-8 GB",
    diskRecommendation: "3 GB",
    toolId: "mongodb-008",
  },
  {
    name: "Git",
    version: "2.42.0",
    downloadUrl: "https://git-scm.com/downloads",
    softwareRecommendation: "VS Code, GitKraken, GitHub Desktop",
    vcpuRecommendation: "1 core",
    ramRecommendation: "1 GB",
    diskRecommendation: "100 MB",
    toolId: "git-009",
  },
  {
    name: "Adobe Photoshop",
    version: "2024 (25.0)",
    downloadUrl: "https://adobe.com/products/photoshop",
    softwareRecommendation: "Creative Cloud, Lightroom, Illustrator",
    vcpuRecommendation: "4-8 cores",
    ramRecommendation: "16-32 GB",
    diskRecommendation: "10 GB",
    toolId: "photoshop-010",
  },
  {
    name: "Figma Desktop",
    version: "116.13.4",
    downloadUrl: "https://figma.com/downloads/",
    softwareRecommendation: "Web browser, Sketch, Adobe XD",
    vcpuRecommendation: "2-4 cores",
    ramRecommendation: "4-8 GB",
    diskRecommendation: "500 MB",
    toolId: "figma-011",
  },
  {
    name: "Angular CLI",
    version: "16.2.0",
    downloadUrl: "https://angular.io/cli",
    softwareRecommendation: "Node.js, VS Code, TypeScript",
    vcpuRecommendation: "4 cores",
    ramRecommendation: "8 GB",
    diskRecommendation: "2 GB",
    toolId: "angular-012",
  },
  {
    name: "Vue.js",
    version: "3.3.4",
    downloadUrl: "https://vuejs.org/guide/quick-start.html",
    softwareRecommendation: "Node.js, Vite, VS Code",
    vcpuRecommendation: "2 cores",
    ramRecommendation: "4 GB",
    diskRecommendation: "500 MB",
    toolId: "vuejs-013",
  },
  {
    name: "IntelliJ IDEA",
    version: "2023.2",
    downloadUrl: "https://jetbrains.com/idea/download/",
    softwareRecommendation: "Java JDK, Maven, Gradle",
    vcpuRecommendation: "4 cores",
    ramRecommendation: "8-16 GB",
    diskRecommendation: "3 GB",
    toolId: "intellij-014",
  },
  {
    name: "Postman",
    version: "10.17.0",
    downloadUrl: "https://postman.com/downloads/",
    softwareRecommendation: "Node.js, Insomnia, Thunder Client",
    vcpuRecommendation: "2 cores",
    ramRecommendation: "4 GB",
    diskRecommendation: "500 MB",
    toolId: "postman-015",
  },
  {
    name: "Slack",
    version: "4.34.119",
    downloadUrl: "https://slack.com/downloads/",
    softwareRecommendation: "Microsoft Teams, Discord",
    vcpuRecommendation: "2 cores",
    ramRecommendation: "4 GB",
    diskRecommendation: "500 MB",
    toolId: "slack-016",
  },
  {
    name: "Zoom",
    version: "5.15.12",
    downloadUrl: "https://zoom.us/download",
    softwareRecommendation: "Microsoft Teams, Google Meet",
    vcpuRecommendation: "2-4 cores",
    ramRecommendation: "4-8 GB",
    diskRecommendation: "1 GB",
    toolId: "zoom-017",
  },
  {
    name: "LibreOffice",
    version: "7.6.0",
    downloadUrl: "https://libreoffice.org/download/download/",
    softwareRecommendation: "Microsoft Office, OnlyOffice",
    vcpuRecommendation: "2 cores",
    ramRecommendation: "2-4 GB",
    diskRecommendation: "2 GB",
    toolId: "libreoffice-018",
  },
  {
    name: "GIMP",
    version: "2.10.34",
    downloadUrl: "https://gimp.org/downloads/",
    softwareRecommendation: "Photoshop, Krita, Paint.NET",
    vcpuRecommendation: "2-4 cores",
    ramRecommendation: "4-8 GB",
    diskRecommendation: "1 GB",
    toolId: "gimp-019",
  },
  {
    name: "Tableau Desktop",
    version: "2023.2",
    downloadUrl: "https://tableau.com/products/desktop/download",
    softwareRecommendation: "Power BI, Excel, R/Python",
    vcpuRecommendation: "4-8 cores",
    ramRecommendation: "8-16 GB",
    diskRecommendation: "5 GB",
    toolId: "tableau-020",
  }
];
</script>
