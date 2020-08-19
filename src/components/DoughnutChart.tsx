import React from "react";
import 'chartjs-plugin-labels';
import { Doughnut } from "react-chartjs-2";

type DoughtnutChartProps = {
  emissionData: any[];
  [rest: string]: any;
};

const DoughnutChart = ({ emissionData, ...rest }: DoughtnutChartProps) => {

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

  const chartSubLabelColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--chart-sublabel-color");

 // var sumTotal = emissionData.map(x => x.co2).reduce((x, y) => x + y);


  var tempArr: any[] = [];
  emissionData.map(x => (tempArr = tempArr.concat(x.subtypes)));
  emissionData = tempArr;
  emissionData = emissionData.sort((x, y) => {
    return y.co2 - x.co2;
  });
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
    plugins: {
      labels: {
        // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
        render:  function (args: any) {
          // args will be something like:
          // { label: 'Label', value: 123, percentage: 50, index: 0, dataset: {...} }
          return args.percentage + '% - ' + args.label;
      
          // return object if it is image
          // return { src: 'image.png', width: 16, height: 16 };
        },

        overlap: false,
        arc: true,
        textShadow: true,
        // text shadow intensity, default is 6
        shadowBlur: 10,
        fontSize: 14,
        // text shadow X offset, default is 3
        shadowOffsetX: -5,
        fontColor: '#000',
        // text shadow Y offset, default is 3
        shadowOffsetY: 5,
      }
    },
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
    scales: {
      xAxes: [
        {
          gridLines: {
            drawBorder: false,
            display:false
          },
          scaleLabel: {
            labelString: "Tonn af CO2 losuð, stærstu undirflokkar (Heimild: Hagstofa Íslands)",
            fontSize: 14,
            fontColor: chartSubLabelColor,
            padding: 6,
            display: true
          },
          ticks: {
            callback: function (value: number) {
              return "";
            }
          }
        }
      ]
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
