import { useEffect, useState } from 'react';
import Icon from '../Icomoon/Icomoon';
import './KeyMetrics.scss';
import CountUp from 'react-countup';
import { Swiper, SwiperSlide } from 'swiper/react';
import { keyNumber } from '../../models/Dashboard';

function KeyMetrics({ keyMetrics }: { keyMetrics: keyNumber }) {
    const [isSwiperActive, setIsSwiperActive] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSwiperActive(window.innerWidth < 910);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        isSwiperActive ? (
            <Swiper
                className='swapperMetrics'
                spaceBetween={20}
                slidesPerView={2}
            >
                <SwiperSlide className="key_data">
                    <div className="key_data_icon">
                        <Icon
                            icon="leaf"
                            size={25}
                            color='#1B5A2E'
                        />
                    </div>

                    <div className="key_data_value">
                        <span className='key_data_number'>
                            <CountUp
                                start={0}
                                end={keyMetrics.totalRestoredHectares || 0}
                                duration={1.5}
                                decimals={1}
                                useEasing={true}
                                useGrouping={true}
                                separator=' '
                                decimal=','
                            />
                        </span>
                        <span className='key_data_label'>Hectare(s) restauré(s)</span>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="key_data">
                    <div className="key_data_icon">
                        <Icon
                            icon="chart"
                            size={25}
                            color='#1B5A2E'
                        />
                    </div>

                    <div className="key_data_value">
                        <span className='key_data_number'>
                            <CountUp
                                start={0}
                                end={keyMetrics.totalSeasonalJobsAndSustainableEmployment || 0}
                                duration={1.5}
                                useEasing={true}
                                useGrouping={true}
                                separator=' '
                                decimal=','
                            />
                        </span>
                        <span className='key_data_label'>Emplois soutenus</span>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="key_data">
                    <div className="key_data_icon">
                        <Icon
                            icon="chart"
                            size={25}
                            color='#1B5A2E'
                        />
                    </div>

                    <div className="key_data_value">
                        <span className='key_data_number'>
                            <CountUp
                                start={0}
                                end={keyMetrics.totalIndirectBeneficiaries || 0}
                                duration={1.5}
                                useEasing={true}
                                useGrouping={true}
                                separator=' '
                                decimal=','
                            />
                        </span>
                        <span className='key_data_label'>Bénéficiaire indirect</span>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="key_data">
                    <div className="key_data_icon">
                        <Icon
                            icon="multi_tree"
                            size={25}
                            color='#1B5A2E'
                        />
                    </div>

                    <div className="key_data_value">
                        <span className='key_data_number'>
                            <CountUp
                                start={0}
                                end={keyMetrics.totalProjectChild || 0}
                                duration={1.5}
                                useEasing={true}
                                useGrouping={true}
                                separator=' '
                                decimal=','
                            />
                        </span>
                        <span className='key_data_label'>Projets</span>
                    </div>
                </SwiperSlide>

            </Swiper>

        ) : (
            <div className='keyMetrics' >

                <div className="key_data">
                    <div className="key_data_icon">
                        <Icon
                            icon="leaf"
                            size={25}
                            color='#1B5A2E'
                        />
                    </div>

                    <div className="key_data_value">
                        <span className='key_data_number'>
                            <CountUp
                                start={0}
                                end={keyMetrics.totalRestoredHectares || 0}
                                duration={1.5}
                                decimals={1}
                                useEasing={true}
                                useGrouping={true}
                                separator=' '
                                decimal=','
                            />
                        </span>
                        <span className='key_data_label'>Hectare(s) restauré(s)</span>
                    </div>
                </div>

                <div className="key_data">
                    <div className="key_data_icon">
                        <Icon
                            icon="chart"
                            size={25}
                            color='#1B5A2E'
                        />
                    </div>

                    <div className="key_data_value">
                        <span className='key_data_number'>
                            <CountUp
                                start={0}
                                end={keyMetrics.totalSeasonalJobsAndSustainableEmployment || 0}
                                duration={1.5}
                                useEasing={true}
                                useGrouping={true}
                                separator=' '
                                decimal=','
                            />
                        </span>
                        <span className='key_data_label'>Emplois soutenus</span>
                    </div>
                </div>


                <div className="key_data">
                    <div className="key_data_icon">
                        <Icon
                            icon="chart"
                            size={25}
                            color='#1B5A2E'
                        />
                    </div>

                    <div className="key_data_value">
                        <span className='key_data_number'>
                            <CountUp
                                start={0}
                                end={keyMetrics.totalIndirectBeneficiaries || 0}
                                duration={1.5}
                                useEasing={true}
                                useGrouping={true}
                                separator=' '
                                decimal=','
                            />
                        </span>
                        <span className='key_data_label'>Bénéficiaire indirect</span>
                    </div>
                </div>


                <div className="key_data">
                    <div className="key_data_icon">
                        <Icon
                            icon="multi_tree"
                            size={25}
                            color='#1B5A2E'
                        />
                    </div>

                    <div className="key_data_value">
                        <span className='key_data_number'>
                            <CountUp
                                start={0}
                                end={keyMetrics.totalProjectChild || 0}
                                duration={1.5}
                                useEasing={true}
                                useGrouping={true}
                                separator=' '
                                decimal=','
                            />
                        </span>
                        <span className='key_data_label'>Projets</span>
                    </div>
                </div>
            </div>
        )
    )
}

export default KeyMetrics