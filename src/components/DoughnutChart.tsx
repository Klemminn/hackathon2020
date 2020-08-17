import React from "react";

import { Doughnut } from "react-chartjs-2";

type DoughtnutChartProps = {
  emissionData: any[];
  [rest: string]: any;
};

const DoughnutChart = ({ emissionData, ...rest }: DoughtnutChartProps) => {
  console.log("Creating chart");
  const colors = [
    "#F0DEC2",
    "#FACAD0",
    "#CBC3E3",
    "#CAF7FA",
    "#A4F088",
    "#FA8E62",
    "#CBC3E3",
    "#CAFADF",
    "#F0D784",
    "#FA8FEA",
    "#CBC3E3",
    "#CAE5FA",
    "#84F0C5"
  ];

  const chartTooltipBackground = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--chart-tooltip-background");

  const chartTooltipColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--chart-tooltip-color");

  emissionData = emissionData.sort((x, y) => {
    return y.co2 - x.co2;
  });
 // var sumTotal = emissionData.map(x => x.co2).reduce((x, y) => x + y);

  emissionData.length = 6;
  var tempArr: any[] = [];
  emissionData.map(x => (tempArr = tempArr.concat(x.subtypes)));
  emissionData = tempArr;
  emissionData.length = colors.length;

  let chartData = {
    datasets: [
      {
        data: emissionData.map(x => x.co2),
        backgroundColor: colors,
        hoverBorderColor: "rgba(0,0,0,0.5",
        hoverBorderWidth: 1,
        borderAlign: "inner"
      }
    ],
    labels: emissionData.map(x => x.name)
  };

  let options = {
    animation: {
      duation: 0
    },
    legend: {
      fullWidth: false,
      display:false,  //kemur skelfilega út á síma ef þetta er, finna eh skítmix
      position:'left',
      labels:{
        padding:15
      }
    },
    responsive: true,
    responsiveAnimationDuration: 500,
    hover: {
      mode: "index"
    },
    tooltips: {
      mode: "index",

      intersect: true,
      backgroundColor: chartTooltipBackground,
      bodyFontColor: chartTooltipColor,
      titleFontColor: chartTooltipColor,
      titleFontSize: 20,
      bodyFontSize: 14,
      bodySpacing: 3,
      titleAlign: "center",
      callbacks: {
        title: function(tooltipItem: any, data: any) {
          console.log(tooltipItem, data);
          tooltipItem = tooltipItem[0];
          return data.datasets[tooltipItem.datasetIndex].label;
        },
        label: function(tooltipItem: any, data: any) {
          var dataEntry = data.datasets[tooltipItem.datasetIndex];
          var value = dataEntry.data[tooltipItem.index];
          var label = data.labels[tooltipItem.index];
          return label + ": " + value.toLocaleString("IS-is") + " tonn af CO2";
        }
      }
    }
  };

  return (
    <div className="chart_container">
      <Doughnut data={chartData} options={options}/>
    </div>
  );
};

export default DoughnutChart;
