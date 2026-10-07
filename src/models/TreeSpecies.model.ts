export type TreeSpecies = {
    id: number;
    commonName: string;
    scientificName: string;
    trackCode: string;
    banner: string;
    icon: string;
    usageType?: {
        id: number;
        label: string;
        icon: string;
    };
    treeCount?: number;
    storyTelling: {
        description: string;
    }
};

// Réutilisation du type dans d'autres endroits
export type TreeSpeciesList = TreeSpecies[];