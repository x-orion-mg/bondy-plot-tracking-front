import './ParcelleFilter.scss';
import Select, { OptionProps, SingleValue } from 'react-select';
import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { parcellesType } from '../../models/Parcelles.models';
import { MapboxContext } from '../../providers/mapbox/MapboxProvider';
import { getCleanPath } from '../../utils/getCleanPath';

type TypeOption = {
    value: string;
    label: string;
};

function ParcelleFilter({ parcelles }: { parcelles: parcellesType[] }) {
    const context = useContext(MapboxContext);
    const location = useLocation();

    if (!context) {
        throw new Error('Home must be used within a MapboxProvider');
    }

    const {
        hoverParcelleById,
        unhoverParcelleById
    } = context;


    const typesProject: { value: string; label: string }[] = [
        { value: 'all', label: 'Sélectionnez une parcelle' }, // Première option
        ...parcelles.map(parcelle => ({
            value: parcelle.id.toString(),
            label: parcelle.title,
        })),
    ];

    const [selectedtypesProject, settypesProject] = useState<{ value: string; label: string } | null>(
        typesProject[0]
    );

    const navigate = useNavigate();

    const handleChange = (option: SingleValue<{ value: string; label: string }>) => {
        settypesProject(option);
    };

    const CustomOption = (props: OptionProps<TypeOption, false>) => {
        const { data, innerRef, innerProps, children } = props;

        return (
            <div
                className='react-select__customOption'
                ref={innerRef}
                {...innerProps}
                onMouseEnter={() => {
                    if (data.value && data.value !== 'all') {
                        hoverParcelleById(data.value);
                    }
                }}
                onMouseLeave={() => {
                    if (data.value && data.value !== 'all') {
                        unhoverParcelleById(data.value);
                    }
                }}
                onClick={() => {
                    if (data.value && data.value !== 'all') {
                        unhoverParcelleById(data.value);
                        navigate(`${getCleanPath(location.pathname)}/parcelle/${data.value}`);
                    }
                }}
            >
                {children}
            </div>
        );
    };


    return (
        <div className="parcelle-filter">
            <Select
                value={selectedtypesProject}
                onChange={handleChange}
                options={typesProject}
                className="react-select"
                classNamePrefix="react-select"
                components={{ Option: CustomOption }}
            />
        </div>
    );
}

export default ParcelleFilter;
