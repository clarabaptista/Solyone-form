export type VMTemplate = {
  name?: string;
  description?: string;
  os?: string;
  version?: string;
  ram?: string;
  cpu?: string;
  disk?: string;
};
export type VMTemplateStrict = {
  name?: string;
  description?: string;
  os: string;
  version?: string;
  ram: string;
  cpu: string;
  disk: string;
};

export type Tool = {
  id: string;
  name: string;
  version: string;
  downloadUrl?: string;
  softwareRecommendation: string;
  hardwareRequirements: {
    vcpu: string;
    ram: string;
    disk: string;
  };
  installation?: {
    formateur: boolean;
    stagiaire: boolean;
  };
};
