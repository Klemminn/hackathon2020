import React from "react";

type TreeCounterProps = {
  totalTreesPlanted: number;
  [rest: string]: any;
};

const TreeCounter = ({ totalTreesPlanted, ...rest }: TreeCounterProps) => {
  var readableString = totalTreesPlanted.toLocaleString("IS-is");

  return (
    <div {...rest}>
      <p>{readableString}</p>
      <p> tré gróðursett</p>
    </div>
  );
};

export default TreeCounter;
