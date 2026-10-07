export type TreeDetailsType = {
    parcel: {
        id: number;
        treeAge: number;
        delimitationJson?: GeoJSON.Feature<GeoJSON.Polygon>;
    };
    tree: {
        coordinates: [number, number];
        id: string;
        species: {
            id: number;
            commonName: string;
            scientificName: string;
            trackCode: string;
            banner: string;
            icon: string;
            usageType: {
                id: number;
                label: string;
                icon: string;
            };
        };
    };
    allocatedTree: {
        trackCode: string;
        user: {
            id: number;
            firstName: string;
            lastName: string;
            logo: string;
        };
    } | null;
    partner: {
        id: number;
        firstName: string;
        lastName: string;
        logo: string;
    };
    localisation: {
        country: string;
        region: string;
        city: string;
    }
};
