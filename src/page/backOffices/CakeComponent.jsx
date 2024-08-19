import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import { GetHistoryByHours } from '../../services/BackOffice';


const CakeComponent = () => {

  const[data, set_data] = useState([])
  const [array_name, set_array_name] = useState([]);


  const FetchData = async () => {
    const datas = await GetHistoryByHours();
    set_data(datas);
    const formattedData = data.map(name => ({
      value: name.totalHours,
      name: name.companieName,
    }));
    set_array_name(formattedData);
  }
    
    useEffect(() => {
      FetchData();
      const chartDom = document.getElementById('main');
      const myChart = echarts.init(chartDom);

    const option = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: '5%',
        left: 'center',
      },
      series: [
        {
          name: 'Horas',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: array_name,
          itemStyle: {
            borderRadius: 10,
          },
        },
      ],
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, []);

  return <div id="main" style={{ width: '100%', height: '400px' }} />;
};


export default CakeComponent;