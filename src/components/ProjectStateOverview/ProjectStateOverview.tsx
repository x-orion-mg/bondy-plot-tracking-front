import './ProjectStateOverview.scss';
import Select from 'react-select';
import { getTrackBackground, Range } from "react-range";
import { useEffect, useState } from 'react';
import { ProjectStatus } from '../../models/Dashboard';


function ProjectStateOverview({ projectStatus }: { projectStatus: ProjectStatus[] }) {

    const [selecProject, setselectProject] = useState<{ value: number; label: string }>({
        value: projectStatus[0].projectStepPercentage,
        label: projectStatus[0].projectChildName
    });

    const [values, setValues] = useState([0]);

    useEffect(() => {
        const duration = 1000;
        const targetValue = selecProject.value;  // Utilisation de la valeur sélectionnée ici
        const startTime = performance.now();

        function animate(timestamp: number) {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            setValues([Math.round(targetValue * progress)]);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }

        requestAnimationFrame(animate);
    }, [selecProject.value]);

    // Définir les options pour le Select
    const selectValue = projectStatus.map((status) => ({
        value: status.projectStepPercentage,
        label: status.projectChildName
    }));

    // Gestion du changement de sélection
    const handleChange = (newValue: { value: number; label: string } | null) => {
        if (newValue) {
            setselectProject(newValue);
        }
    };

    return (
        <div className='projectStateOverview'>
            <div className="project_select">
                <div className="select_label">Etat du projet :</div>
                <Select
                    value={selecProject}
                    options={selectValue}
                    onChange={handleChange}
                    className='react-select__project'
                    classNamePrefix='react-select__project'
                />
            </div>

            <div className="range_container">
                <div className="range_label_top">
                    <span>0%</span>
                    <span>100%</span>
                </div>
                <Range
                    label="Select your value"
                    step={1}
                    min={0}
                    max={100}
                    values={values}
                    onChange={(values) => setValues(values)}
                    disabled
                    renderTrack={
                        ({ props, children }) => (
                            <div
                                {...props}
                                style={{
                                    ...props.style,
                                    height: "12px",
                                    width: "100%",
                                    borderRadius: "10px",
                                    background: getTrackBackground({
                                        values: values,
                                        colors: ["#13CE66", "#E7E7E9"],
                                        min: 0,
                                        max: 100,
                                    }),
                                }}
                            >
                                {children}
                            </div>
                        )
                    }
                    renderThumb={({ props }) => (
                        <div
                            {...props}
                            key={props.key}
                            className='thumb_triangle'
                            style={{
                                ...props.style,
                                top: "-20px",
                            }}
                        >
                            <span className='thumb_value'>{values[0] + '%'}</span> {/* Correction ici */}
                        </div>
                    )}
                />

                <div className="range_label_bottom">
                    <div>
                        <span>1</span>
                        <span>Lancement du projet</span>
                    </div>
                    <div>
                        <span>2</span>
                        <span>Exécution du projet</span>
                    </div>
                    <div>
                        <span>3</span>
                        <span>Suivi & monitoring du projet</span>
                    </div>
                    <div>
                        <span>4</span>
                        <span>Fin du projet</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectStateOverview;