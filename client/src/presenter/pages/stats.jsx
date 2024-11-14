import { Routes, Route } from "react-router-dom";
import Header from "../layout/Header";
import StatsNavMenu from "../layout/statsNavMenu";
import StatsBlock from "../features/stats/general/statsBlock";
import LiveData from "../features/stats/liveData/liveData";
import DroneBlock from "../features/stats/drone/droneBlock";
import ExpeditionBlock from "../features/stats/expedition/expeditonBlock";

const Stats = () => {
  return (
    <div id="stats">
      <Header />
      <section id="statsContent">
        <StatsNavMenu />
        <div id="statsContentRight">
          <Routes>
            <Route path="" element={<StatsBlock />} />
            <Route path="livedata" element={<LiveData />} />
            <Route path="expedition" element={<ExpeditionBlock/>} />
            <Route path="drone" element={<DroneBlock/>} />
          </Routes>
        </div>
      </section>
    </div>
  );
};

export default Stats;
