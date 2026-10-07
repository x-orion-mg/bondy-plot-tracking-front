type UsageType = {
    id: number;
    label: string;
    icon: string;
};

export type Species = {
    id: number;
    commonName: string;
    scientificName: string;
    trackCode: string;
    banner: string;
    icon: string;
    usageType: UsageType;
};

type Tree = {
    coordinates: [number, number]; // Tableau avec exactement 2 nombres (lat, lon)
    id: number;
    species: Species;
};

type Parcel = {
    id: number;
    treesJson: Tree[];
};

export type TreesSpeciesList = {
    parcel: Parcel;
};
