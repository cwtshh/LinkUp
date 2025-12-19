import React from "react";
import { useParams } from "react-router";

const Meet = () => {
  const { meet_code } = useParams();
  return <div>{meet_code}</div>;
};

export default Meet;
