import { TreeSpecies } from '../../models/Dashboard';
import { formatNumberWithSpaces } from '../../utils/formatNumberWithSpaces';
import './PlantedTreeTypes.scss';
import { PieChart, Pie, Cell, Label, LabelProps } from 'recharts';



interface CustomLabelProps {
    number: string;
    text: string;
}

function CustomLabel({ viewBox, number, text }: LabelProps & CustomLabelProps) {
    if (!viewBox) return null;

    const { cx, cy } = viewBox as { cx: number; cy: number };

    return (
        <>
            <text x={cx} y={cy - 10} className='custom-label-number' textAnchor="middle" dominantBaseline="central" fontSize="16" fontWeight="bold" fill="#333">
                {number}
            </text>
            <text x={cx} y={cy + 10} className='custom-label-text' textAnchor="middle" dominantBaseline="central" fontSize="16" fontWeight="bold" fill="#333">
                {text}
            </text>
        </>
    );
}

function PlantedTreeTypes({ treeSpecies, totalTreeCount }: { treeSpecies: TreeSpecies[] | null, totalTreeCount: number }) {
    if (!treeSpecies?.length || treeSpecies === null) {
        return (
            <div className='plantedTreeTypes'>
                <h2 className="title-h2">Espèces d’arbres plantés</h2>

                <div className='no-data'>Il n'y a pas encore de données</div>

            </div>
        )
    }

    return (
        <div className='plantedTreeTypes'>
            <h2 className="title-h2">Espèces d’arbres plantés</h2>

            <div className="chart_container">
                <div className="chart_image">
                    <PieChart width={198} height={198}>
                        <Pie
                            data={treeSpecies}
                            innerRadius={80}
                            outerRadius={100}
                            dataKey="treeCount"
                        >
                            {treeSpecies.map((item, index) => {
                                return <Cell key={`cell-${index}`} fill={item.color} />
                            })}

                            <Label content={<CustomLabel number={formatNumberWithSpaces(totalTreeCount)} text='arbres' />} />
                        </Pie>
                    </PieChart>
                </div>

                <div className="chart_legende">
                    {treeSpecies.map((entry, index) => (
                        <div key={index} className="legende">
                            <div className="legende_left">
                                <div className="legende_color" style={{ backgroundColor: entry.color }} />
                                <span className='legende_text'>{`${entry.commonName} (${entry.scientificName})`}</span>
                            </div>
                            <span className="legende_right">{formatNumberWithSpaces(entry.treeCount)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PlantedTreeTypes;