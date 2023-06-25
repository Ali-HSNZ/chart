import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import proj4 from "proj4";
import { useEffect, useState } from "react";

const Map = () => {
  const [mapDataIE, setMapDataIE] = useState();
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [clickedRegion, setClickedRegion] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const { data } = await axios.get(
        "https://code.highcharts.com/mapdata/countries/ir/ir-all.topo.json"
      );
      setMapDataIE(data);
    };
    loadData();
  }, []);

  if (typeof window !== "undefined") {
    window.proj4 = window.proj4 || proj4;
  }

  const options = {
    chart: {
      map: 'countries/ie/ie-all'
    },
    title: {
      text: 'Map Demo'
    },
    credits: {
      enabled: false
    },
    mapNavigation: {
      enabled: true
    },
    tooltip: {
      headerFormat: '',
      pointFormat:
        '<b>{point.freq}</b><br><b>{point.keyword}</b><br>lat: {point.lat}, lon: {point.lon}'
    },
    plotOptions: {
      map: {
        dataLabels: {
          enabled: true,
          format: '{point.name}', // Display the city name
          style: {
            color: 'black', // Color of the city names
            textOutline: 'none', // Remove the outline around the text
            fontWeight: 'bold' // Font weight of the city names
          }
        },
        events: {
          click: function (event) {
           console.log("data : ",event);
          }
        }
      }
    },
    series: [
      {
        name: 'Basemap',
        mapData: mapDataIE,
        borderColor: '#A0A0A0',
        nullColor: 'rgba(200, 200, 200, 0.3)',
        showInLegend: false
      },
      {
        type: 'mapbubble',
        name: 'Cities',
        color: '#4169E1',
        data: [
          { z: 10, keyword: 'Galway', lat: 53.27, lon: -9.25 },
          { z: 4, keyword: 'Dublin', lat: 53.27, lon: -6.25 }
        ],
        cursor: 'pointer',
        point: {
          events: {
            click: function () {
              console.log(this.keyword);
            }
          }
        }
      }
    ]
  };

  if (typeof Highcharts === 'object') {
    highchartsMap(Highcharts);
  }

  return (
    <HighchartsReact
      constructorType={'mapChart'}
      highcharts={Highcharts}
      options={options}
    />
  );
};

export default Map;
