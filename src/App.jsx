import React from "react";
import { Reveal, SplitHeading, Stagger, ParallaxImage, CountUp } from "./motion/primitives";
import { CODNESTX_COMPANY, CODNESTX_KPIS } from "./data/codnestxData";

export default function App() {
  return (
    <div className="cx-react-primitives-provider" data-company={CODNESTX_COMPANY.name}>
      <Reveal>
        <SplitHeading lines={["Build Business Systems That", "Scale Without Operational Mess."]} />
      </Reveal>
      <Stagger>
        {CODNESTX_KPIS.filter((k) => typeof k.value === "number").map((k) => (
          <CountUp key={k.id} end={k.value} suffix={k.suffix} decimals={k.id === "sla" ? 1 : 0} />
        ))}
      </Stagger>
    </div>
  );
}
