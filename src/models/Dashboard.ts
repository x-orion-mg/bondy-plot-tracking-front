interface User {
    id: number;
    firstName: string | null;
    lastName: string;
    logo: string;
}

export interface ProjectStatus {
    projectChildName: string;
    projectStepPercentage: number;
}

export interface TreeSpecies {
    id: number;
    commonName: string;
    scientificName: string;
    treeCount: number;
    color: string;
}

export interface tonC02Sequestered {
    date: number;
    value: number
}

export interface keyNumber {
    totalProjectChild: number;
    totalRestoredHectares: number;
    totalIndirectBeneficiaries: number;
    totalSeasonalJobsAndSustainableEmployment: number;
}

export interface DashboardType {
    user: User;
    projectStatus: ProjectStatus[];
    treeSpecies: TreeSpecies[];
    TCO2Sequestered: tonC02Sequestered[];
    totalTreeCount: number;
    keyNumber: keyNumber;
    isCertificate: boolean;
    isRapport: boolean;
}
