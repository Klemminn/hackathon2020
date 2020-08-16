import React from "react";

import { HorizontalBar } from "react-chartjs-2";

type ChartProps = {
  emissionData: any[];
  [rest: string]: any;
};

const Chart = ({ emissionData, ...rest }: ChartProps) => {
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
  var colorsBuffer = colors.map(x=> x);
  const charTitle = "Losun CO2 í tonnum";
  const chartTooltipBackground = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--chart-tooltip-background");

  const chartTooltipColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--chart-tooltip-color");

  emissionData = emissionData.sort((x, y) => {
    return y.co2 - x.co2;
  });
 
  var sumTotal = emissionData.map(x => x.co2).reduce((x, y) => x + y);
  emissionData.length = 6;

  let chartData = {
    datasets: emissionData.map(x => {
      return {
        data: [x.co2],
        label:x.name,
        subgroups : x.subtypes.sort((z:any, y:any) => y.co2 - z.co2),
        backgroundColor: colorsBuffer.length > 0 ? colorsBuffer.pop() : (colorsBuffer = colors.map(x=> x)).pop(),
        hoverBorderColor: chartTooltipBackground,
        hoverBorderWidth: 1.5
      };
    }),
    label: charTitle
  };

  let options = {
    animation: {
      duation: 0
    },
    legend: {
      display: false
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            drawBorder: false
          },
          scaleLabel: {
            labelString: "Tonn af CO2 losuð",
            fontSize: 16,
            fontColor: "#ccc",
            padding: 6,
            display: true
          },
          ticks: {
            callback: function(value: number) {
              return value.toLocaleString("IS-is");
            }
          }
        }
      ],
      yAxes: [
        {
       
  
          type:"category",
          gridLines: {
            zeroLineWidth: 0,
            drawOnChartArea: false,
            drawBorder: false
          }
        }
      ]
    },
    responsive: true,
    responsiveAnimationDuration: 0,
    hover: {
      mode: "nearest"
    },
    tooltips: {
      mode: "nearest",
      axis: 'y',
      intersect:false,
      backgroundColor: chartTooltipBackground,
      bodyFontColor: chartTooltipColor,
      titleFontColor: chartTooltipColor,
      titleFontSize:20,
      bodyFontSize:14,
      bodySpacing:3,
      titleAlign:"center",
      callbacks: {
        title: function(tooltipItem: any, data: any) {
          console.log(tooltipItem, data)
          tooltipItem = tooltipItem[0];
          return data.datasets[tooltipItem.datasetIndex].label;;
        },
        label: function(tooltipItem: any, data: any) {
          var label = data.datasets[tooltipItem.datasetIndex].subgroups
              .map( (x: any) => {
                var percentage = Math.round(
                  (x.co2 / sumTotal) *
                    1000
                ) / 10;
                  return x.name + ": " + percentage + "%"
              });

         
          return label;
        }
      }
    }
  };
  console.log(chartData.datasets);
  return (
    <div className="chart_container">
        <h2 className = "header_style">Hvar losum við mest?</h2>
      <HorizontalBar data={chartData} options={options} />
    </div>
  );
};

export default Chart;
