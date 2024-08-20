import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { GetHistoryByHours } from '../../services/BackOffice';

const ChartComponent = () => {
    const chartRef = useRef(null);
    const [current_data, set_data_current] = useState([]);
    const [array_name, set_array_name] = useState([]);
    const [data, setData] = useState([]);
    const chartInstance = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await GetHistoryByHours();
                set_data_current(data);

                const uniqueCompanies = [...new Set(data.map(item => item.companieName))];
                const hoursData = uniqueCompanies.map(company => {
                    const totalHours = data
                        .filter(item => item.companieName === company)
                        .reduce((acc, item) => acc + item.totalHours, 0);
                    return totalHours;
                });

                set_array_name(uniqueCompanies);
                setData(hoursData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); 
    }, []);

    useEffect(() => {
        if (array_name.length > 0 && data.length > 0 && chartRef.current) {
            if (!chartInstance.current) {
                chartInstance.current = echarts.init(chartRef.current);
            }

            const myChart = chartInstance.current;

            const option = {
                xAxis: {
                    type: 'value',
                    name: '',
                    max: 'dataMax'
                },
                yAxis: {
                    type: 'category',
                    data: array_name,
                    inverse: true,
                    name: 'Companies',
                    animationDuration: 300,
                    animationDurationUpdate: 300
                },
                series: [
                    {
                        name: 'Ranking de Horas por Compañía',
                        type: 'bar',
                        data: data,
                        label: {
                            show: true,
                            position: 'right',
                            valueAnimation: true
                        },
                        animationDuration: 2000, 
                        animationEasing: 'cubicOut'
                    }
                ],
                legend: {
                    show: true
                },
                animationDuration: 0,
                animationDurationUpdate: 3000,
                animationEasing: 'linear',
                animationEasingUpdate: 'linear'
            };

            myChart.setOption(option);

            return () => {
                myChart.dispose();
            };
        }
    }, [array_name, data]);

    return (
        <div
            ref={chartRef}
            style={{ width: '100%', height: '500px' }}
        ></div>
    );
};

export default ChartComponent;
