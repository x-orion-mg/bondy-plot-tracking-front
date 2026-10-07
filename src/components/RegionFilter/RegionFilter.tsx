import './RegionFilter.scss';
import Select, {SingleValue} from 'react-select';
import {ProjectFilterType} from '../../models/Project.model.ts';
import React from 'react';

type RegionFilterProps = {
  filters: ProjectFilterType[];
  setFilter:  React.Dispatch<React.SetStateAction<string | undefined>>
}

function RegionFilter({filters, setFilter}: RegionFilterProps) {

  const typesProject = [{value: '', label: 'Tout'}, ...filters?.map((filter) => {
    return {value: filter.id, label: filter.name} as unknown as SingleValue<{ value: string; label: string }>;
  }) as SingleValue<{ value: string; label: string }>[]];

  return (
    <div className="region-filter">
      <div className="region-filter-label">Choisir type projet&nbsp;:</div>
      <Select
        defaultValue={typesProject[0]}
        onChange={(newValue) => {
          setFilter(newValue?.value)
        }}
        // @ts-expect-error TS2322
        options={typesProject}
        className='react-select'
        classNamePrefix='react-select'
      />
    </div>
  )
}

export default RegionFilter;