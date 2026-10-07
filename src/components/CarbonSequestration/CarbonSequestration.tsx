import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import './CarbonSequestration.scss';
import { tonC02Sequestered } from '../../models/Dashboard';


function CarbonSequestration({ tonCo2 }: { tonCo2: tonC02Sequestered[] }) {

    const sortedData = [...tonCo2].sort((a, b) => a.date - b.date);

    return (
        <div className='carbonSequestration'>
            <h2 className="title-h2">C0<sub>2</sub> séquestré</h2>

            <div className="chart_container">
                <span className='legend x'>Tonnes de CO2</span>
                <span className='legend y'>Nbre d’année</span>
                <div className="chart_wrapper">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart width={300} height={100} data={sortedData}>
                            <XAxis dataKey="date" interval={0} />
                            <YAxis dataKey="value" domain={['dataMin', 'dataMax']} tickCount={sortedData.length} allowDecimals={false} />
                            <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    )
}

export default CarbonSequestration;