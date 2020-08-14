import React from "react";
import EmissionData from "types/EmissionData";
import {Co2EmissionService} from "services";
import {ProgressBar} from "components"


type ProgressBarProps = {
    emissionData: Array<EmissionData>,
    totalTreesPlanted: number,
    [rest:string]: any
  }
  

const CurvedProgressBar = ({ emissionData, totalTreesPlanted, ...rest }: ProgressBarProps) => {
    let co2Total  = emissionData.reduce( (a,b) => 
    { 
        return {value: (a.value + b.value), label:"" }
    }).value;
    
    let co2Countered = Co2EmissionService.getCo2TonnesForTreeCount(totalTreesPlanted);
    let progress = co2Countered/co2Total;
    if(progress > 1 )progress = 1;
   
    var fillColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--progress-bar-fill');

    var trailColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--progress-bar-trail');
    console.log(trailColor, fillColor)
    return (
        <ProgressBar.SemiCircle
            progress={progress}
            
            options={{ 
                strokeWidth: 4, 
                color: fillColor,
                trailColor: trailColor,
                duration: 1500,
            }}
            initialAnimate={true}
            {...rest}
        />
     
    );
};

export default CurvedProgressBar;
