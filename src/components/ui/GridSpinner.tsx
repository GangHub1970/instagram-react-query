import dynamic from "next/dynamic";
import React from "react";

const GridLoader = dynamic(
  () => import("react-spinners").then((lib) => lib.GridLoader),
  { ssr: false }
);

type Props = {
  color?: string;
};

export default function GridSpinner({ color = "red" }: Props) {
  // <GridLoader/> 컴포넌트를 바로 사용하면 prerendering 할 때의
  // UI와 hydration되고 난 뒤의 UI가 달라서 warning이 발생한다.
  // 그래서 dynamic import를 사용해줘야 한다.
  return <GridLoader size={12} color={color} />;
}
