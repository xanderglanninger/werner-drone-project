import { useState } from "react";
import useFetchDroneData from "../../../hooks/useDroneData";
import DroneInfo from "./components/droneInfo";
import ExpeditionData from "./components/expeditionData";
import PieChartSection from "./components/pieChartBlock";
import TimeLine from "./components/timeLine";
// import GoogleMap from "./components/maps";


const StatsBlock = () => {
  const [droneID, setDroneID] = useState("");
  const { droneData, expeditionData } = useFetchDroneData(droneID);

//   const mapUrl =
//     expeditionData.length > 0 && expeditionData[0].location
//       ? generateEmbeddedGoogleMapsLink(
//           expeditionData[0].location.latitude,
//           expeditionData[0].location.longitude
//         )
//       : "";
  return (
    <div id="statsContent">
      <div id="statsInnerLeft">
        <DroneInfo
          droneID={droneID}
          setDroneID={setDroneID}
          droneData={droneData}
        />
        <ExpeditionData expeditionData={expeditionData} />
        <PieChartSection expedition={expeditionData}/>
      </div>
      <div id="statsInnerRight">
        <TimeLine />
        {/* <GoogleMap mapUrl={mapUrl}/> */}
      </div>
    </div>
  );
};

export default StatsBlock;
