import { keyNumber } from '../../models/Dashboard';
import KeyMetrics from '../KeyMetrics/KeyMetrics';
import './BannerDashboard.scss';
import CountUp from 'react-countup';

function BannerDashboard({ totalTreeCount, keyMetrics }: { totalTreeCount: number, keyMetrics: keyNumber }) {
    return (
        <div className='bannerDashboard_container'>
            <picture className='bannerDashboard_picture'>
                <img src="/images/banner_dashboard.webp" alt="Une personne qui plante un arbre" />
            </picture>

            <div className="tree_number">
                <span className="number_value">
                    <CountUp
                        start={0}
                        end={totalTreeCount}
                        duration={1.5}
                        useEasing={true}
                        useGrouping={true}
                        separator=' '
                        decimal=','
                    />
                </span>
                <span className='number_label'>Arbres plantés</span>
            </div>

            <KeyMetrics keyMetrics={keyMetrics} />
        </div>
    )
}

export default BannerDashboard