import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import proj4 from "proj4";
import { useEffect, useState } from "react";
import axios from "axios";


const HighchartsWrapper = () => {

     const [mapDataIE, setMapDataIE] = useState()

     useEffect(() => {
          const loadData = async () => {
               const { data } = await axios.get("https://code.highcharts.com/mapdata/countries/ir/ir-all.topo.json")
               setMapDataIE(data)
          }
          loadData()
     }, [])

     if (typeof window !== "undefined") {
          window.proj4 = window.proj4 || proj4;
     }

     const options = {
          title: {
               text: 'IRAN'
          },
          accessibility: {
               enabled: false
          },
          plotOptions: {

               map: {
                    dataLabels: {
                         events: {
                              click: (event)=> {
                                   console.log("منطقه انتخاب شده:", event.point.keyword);
                              }
                         },
                         enabled: true,
                         format: '{point.name}', // Display the city name
                         style: {
                              color: 'black', // Color of the city names
                              textOutline: 'none', // Remove the outline around the text
                              fontWeight: 'normal' // Font weight of the city names
                         },
                    }
               },
               series: {
                    events: {
                         click: (event) => {
                              console.log("منطقه انتخاب شده:", event.point.keyword);
                         }
                    }
               },
          },
          credits: {
               enabled: false
          },
          mapNavigation: {
               enabled: true
          },
          tooltip: {
               headerFormat: '',
               pointFormat: '<b>{point.freq}</b><br><b>{point.keyword}</b>                      <br>lat: {point.lat}, lon: {point.lon}'
          },
          series: [{
               // Use the gb-all map with no data as a basemap
               name: 'Basemap',
               mapData: mapDataIE,
               borderColor: '#A0A0A0',
               nullColor: '#fff',
               showInLegend: false
          }, {
               // Specify points using lat/lon
               type: 'mapbubble',
               name: 'Cities',
               color: '#4169E1',
               data: [{ z: 10, keyword: "Galway", lat: 53.27, lon: -9.25 },
               { z: 4, keyword: "Dublin", lat: 53.27, lon: -6.25 }],
               cursor: 'pointer',
               point: {
                    events: {
                         click: ()=> {
                              console.log(this.keyword);
                         }
                    }
               }
          }]
     }
     if (typeof Highcharts === 'object') {
          highchartsMap(Highcharts);
     }

     return (
          <div>

               <HighchartsReact
                    constructorType={'mapChart'}
                    highcharts={Highcharts}
                    options={options}
               />
          </div>
     );
}

export default HighchartsWrapper;