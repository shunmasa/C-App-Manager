import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

//semantic ui loadder React.FC<{each type inverted:boolean}>?optional
const LoadingComponent: React.FC<{ inverted?: boolean; content?: string }> = ({
  inverted = true,
  content
}) => {
  return (
    <Dimmer active inverted={inverted}>
      <Loader content={content} />
    </Dimmer>
  );
};
//inverted= true background color will be white , if just default ,black
export default LoadingComponent;
