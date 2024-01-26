import { MyProgressBox } from "@components";
import { Link } from "react-router-dom";
import { ScenarioGraph } from "@components";

export const AboutPage = () => (
  <div>
    <MyProgressBox />
    <ScenarioGraph data={data} />
    <Link to="/">Click here to go back to root page.</Link>
  </div>
);

export default AboutPage;

const data = {
  nodes: [
    {
      id: "opnsense-red",
    },
    {
      id: "kali-alberto",
    },
    {
      id: "kali-jacopo",
    },
    {
      id: "opnsense-corp",
      size: 25,
      label: "Opn",
    },
    {
      id: "public-dhcp-srv",
      size: 20,
    },
    {
      id: "public-gw",
      size: 25,
    },
    {
      id: "nginx",
    },
    {
      id: "win-server-2019",
    },
    {
      id: "win-10",
    },
  ],
  edges: [
    {
      network_ref: "public",
      source: "opnsense-red",
      target: "public-gw",
    },
    {
      network_ref: "red",
      source: "opnsense-red",
      target: "kali-alberto",
    },
    {
      network_ref: "red",
      source: "opnsense-red",
      target: "kali-jacopo",
    },
    {
      network_ref: "public",
      source: "opnsense-corp",
      target: "public-gw",
    },
    {
      network_ref: "dmz",
      source: "opnsense-corp",
      target: "nginx",
    },
    {
      network_ref: "office",
      source: "opnsense-corp",
      target: "win-server-2019",
    },
    {
      network_ref: "office",
      source: "opnsense-corp",
      target: "win-10",
    },
    {
      network_ref: "public",
      source: "public-dhcp-srv",
      target: "public-gw",
    },
  ],
};
