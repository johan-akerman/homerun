import React, { useState, useEffect } from 'react';
import { Doughnut } from "react-chartjs-2";  

const options = {
    maintainAspectRatio: false,
    legend: {
        display: false
    },
   
}

const BrokerMarketShare = props => {
    const [allFilteredApartments, setAllFilteredApartments] = useState([]);
    const [brokerMap, setBrokerMap] = useState([]);

    //Gets data via props from App component. Sets it to allFilteredApartments.
    useEffect(() => {
        setAllFilteredApartments(props.data);
    }, [props.data]);

    useEffect(() => {
        let dict = {}
        allFilteredApartments.map((item) => { //for all filtered apartments
            item.map((current) => { //go into each filter
                    if (dict[current.broker]) { //if current broker key already exists in dictionary
                        dict[current.broker] = dict[current.broker] + 1;
                    } else { //if current broker key does not  exist in dictionary
                        dict[current.broker] = 1;
                    }
            });
        });

        setBrokerMap(dict)
    }, [allFilteredApartments])

    const data = {
        labels: Object.keys(brokerMap),
        datasets: [
          {
            data: Object.values(brokerMap),
            backgroundColor: [
                '#B8F3D2',
                '#D8DBFF',
                '#FFE3CC',
                '#FFD2E2',
                '#BAF1FF',
            ],
            borderWidth: 0,
          },
        ],
      }

      return <Doughnut data={data} options={options}/>
}
  
export default BrokerMarketShare;
