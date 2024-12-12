"use client"

import React, { useEffect, useState } from "react";
import { AgCharts } from "ag-charts-react";
import { useDispatch, useSelector } from 'react-redux';
import { setIp, selectIp } from '../store/features/ipSlice';

const ChartExample = ({ appName,width,height }) => {
  console.log(appName);
  const dispatch = useDispatch();
  const currentIp = useSelector(selectIp);

  const [timestamps, setTimestamps] = useState(["01 Jan 2020 13:25:00 GMT", "02 Jan 2020 13:25:00 GMT", "02 Jan 2020 13:26:00 GMT", "02 Jan 2020 13:27:00 GMT", "03 Jan 2020 13:25:00 GMT"]);

  const getData = async ()=>{
    let url;
    if(appName!=""){
      //call the api for this app to get data for this app
      url = "https://"+currentIp.ip + ":5000/data/graph"+appName;
    }
    else{
      //otherwise get for all apps
      url = "https://"+currentIp.ip+":5000/data/graph";
    }
    const res = await fetch(url);
    setTimestamps(res.data)
  }


  // useEffect(()=>{
  //   getData()
  // },[appName])


  function getOfficeData() {
    let cumsum = 0;
    const res = timestamps.map(t => {
      cumsum++;
      return{
      time:Date.parse(t),
      sensor:cumsum
      }
    })

    return res;
  }
  const Options = {
    title: { text: `${appName} Activity` },
    series: [
      {
        type: 'line',
        xKey: 'time',
        yKey: 'activity',
        yName: 'Activity Level',
        stroke: 'var(--primary)',
        marker: { 
          fill: 'var(--primary)',
          stroke: 'var(--primary)' 
        }
      },
      {
        type: 'line',
        xKey: 'time',
        yKey: 'connections',
        yName: 'Connections',
        stroke: 'var(--destructive)',
        marker: { 
          fill: 'var(--destructive)',
          stroke: 'var(--destructive)' 
        }
      }
    ],
    axes: [
      {
        type: 'time',
        position: 'bottom',
        title: { text: 'Time' }
      },
      {
        type: 'number',
        position: 'left',
        title: { text: 'Metrics' }
      }
    ]
  };

  return (
    <>
      {/* <div className="h-[800px] w-[1000px]"> */}
      <AgCharts
        className="chart"
        style={{ width: "full", height: "500px",border:"solid 10px white",borderRadius:"8px" }}
        options={Options}
      />
      {/* <div id="chartContainer" style={{height: 370,width:"100%" }} /> */}
      {/* </div> */}
    </>
  );
};

export default ChartExample;
