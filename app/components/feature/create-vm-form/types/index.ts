export type VMTemplate = {
    name: string;
    description: string;
    os: string;
    version: string;
    ram: string;
    cpu: string;
    disk: string;
}

export type Tool = {
    name: string;
    version: string;
    downloadUrl: string;
    softwareRecommendation: string;
    hardwareRequirements: {
        vcpu: string;
        ram: string;
        disk: string;
    }
}