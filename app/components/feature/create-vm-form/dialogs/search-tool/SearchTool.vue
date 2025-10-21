<!--  SearchTool.vue -->

<template>
  <v-card>
    <v-card-item>
      <v-card-title> Rechercher un logiciel </v-card-title>
      <v-col v-for="tool in tools" :key="tool.name">
        <ResultCard v-bind="tool" />
      </v-col>
    </v-card-item>
  </v-card>
</template>

<script setup lang="ts">
import ResultCard from "./ResultCard.vue";

const tools = ref([
  {
    id: "test1",
    name: "React",
    version: "18.2.0",
    downloadUrl: "https://reactjs.org/",
    softwareRecommendation: "Node.js, VS Code, npm/yarn",
    hardwareRequirements: {
      vcpu: "2-4 cores",
      ram: "4-8 GB",
      disk: "1 GB",
    },
  },
  {
    id: "test2",
    name: "Vue.js",
    version: "3.3.4",
    downloadUrl: "https://vuejs.org/",
    softwareRecommendation: "Node.js, VS Code, Vite",
    hardwareRequirements: {
      vcpu: "2 cores",
      ram: "4 GB",
      disk: "500 MB",
    },
  },
  {
    id: "test",
    name: "Angular",
    version: "16.2.0",
    downloadUrl: "https://angular.io/",
    softwareRecommendation: "Node.js, Angular CLI, VS Code",
    hardwareRequirements: {
      vcpu: "4 cores",
      ram: "8 GB",
      disk: "2 GB",
    },
  },
  // {
  //   name: "Docker",
  //   version: "24.0.5",
  //   downloadUrl: "https://docker.com/",
  //   softwareRecommendation: "VS Code, Docker Desktop",
  //   hardwareRequirements: {
  //     vcpu: "4 cores",
  //     ram: "8 GB",
  //     disk: "10 GB",
  //   },
  // },
  // {
  //   name: "PostgreSQL",
  //   version: "15.4",
  //   downloadUrl: "https://postgresql.org/",
  //   softwareRecommendation: "pgAdmin, DBeaver, VS Code",
  //   hardwareRequirements: {
  //     vcpu: "2-4 cores",
  //     ram: "4-16 GB",
  //     disk: "5 GB",
  //   },
  // },
  // {
  //   name: "MongoDB",
  //   version: "7.0",
  //   downloadUrl: "https://mongodb.com/",
  //   softwareRecommendation: "MongoDB Compass, Studio 3T",
  //   hardwareRequirements: {
  //     vcpu: "2-4 cores",
  //     ram: "4-8 GB",
  //     disk: "3 GB",
  //   },
  // },
  // {
  //   name: "Python",
  //   version: "3.11.5",
  //   downloadUrl: "https://python.org/",
  //   softwareRecommendation: "PyCharm, VS Code, Jupyter",
  //   hardwareRequirements: {
  //     vcpu: "2 cores",
  //     ram: "4 GB",
  //     disk: "1 GB",
  //   },
  // },
  // {
  //   name: "Node.js",
  //   version: "18.17.1",
  //   downloadUrl: "https://nodejs.org/",
  //   softwareRecommendation: "VS Code, npm, Postman",
  //   hardwareRequirements: {
  //     vcpu: "2 cores",
  //     ram: "2-4 GB",
  //     disk: "500 MB",
  //   },
  // },
  // {
  //   name: "Git",
  //   version: "2.42.0",
  //   downloadUrl: "https://git-scm.com/",
  //   softwareRecommendation: "VS Code, GitKraken, Sourcetree",
  //   hardwareRequirements: {
  //     vcpu: "1 core",
  //     ram: "1 GB",
  //     disk: "100 MB",
  //   },
  // },
  // {
  //   name: "MySQL",
  //   version: "8.0.34",
  //   downloadUrl: "https://mysql.com/",
  //   softwareRecommendation: "MySQL Workbench, phpMyAdmin",
  //   hardwareRequirements: {
  //     vcpu: "2-4 cores",
  //     ram: "4-8 GB",
  //     disk: "2 GB",
  //   },
  // },
  // {
  //   name: "Visual Studio Code",
  //   version: "1.82.0",
  //   downloadUrl: "https://code.visualstudio.com/",
  //   softwareRecommendation: "Extensions pack, Git",
  //   hardwareRequirements: {
  //     vcpu: "2 cores",
  //     ram: "4 GB",
  //     disk: "1 GB",
  //   },
  // },
  // {
  //   name: "Figma",
  //   version: "Desktop 116.13.4",
  //   downloadUrl: "https://figma.com/",
  //   softwareRecommendation: "Web browser, design plugins",
  //   hardwareRequirements: {
  //     vcpu: "2-4 cores",
  //     ram: "4-8 GB",
  //     disk: "500 MB",
  //   },
  // },
  // {
  //   name: "Adobe Photoshop",
  //   version: "2024 (25.0)",
  //   downloadUrl: "https://adobe.com/products/photoshop",
  //   softwareRecommendation: "Creative Cloud, Lightroom",
  //   hardwareRequirements: {
  //     vcpu: "4-8 cores",
  //     ram: "16-32 GB",
  //     disk: "10 GB",
  //   },
  // },
  // {
  //   name: "Slack",
  //   version: "4.34.119",
  //   downloadUrl: "https://slack.com/",
  //   softwareRecommendation: "Integrated applications",
  //   hardwareRequirements: {
  //     vcpu: "2 cores",
  //     ram: "4 GB",
  //     disk: "500 MB",
  //   },
  // },
  // {
  //   name: "Zoom",
  //   version: "5.15.12",
  //   downloadUrl: "https://zoom.us/",
  //   softwareRecommendation: "Quality camera, microphone",
  //   hardwareRequirements: {
  //     vcpu: "2-4 cores",
  //     ram: "4-8 GB",
  //     disk: "1 GB",
  //   },
  // },
]);
</script>
