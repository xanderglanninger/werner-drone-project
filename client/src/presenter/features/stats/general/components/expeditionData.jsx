import { useState, useEffect } from "react";
import PieChartSection from "./pieChartBlock";

const ExpeditionData = ({ expeditionData }) => {
  const [selectedExpeditionId, setSelectedExpeditionId] = useState("");
  const [selectedExpedition, setSelectedExpedition] = useState(null);

  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    setSelectedExpeditionId(selectedId);

    const expedition = expeditionData.find(
      (expedition) => expedition._id === selectedId
    );
    setSelectedExpedition(expedition);
  };

  const displayedExpeditions =
    selectedExpeditionId === ""
      ? []
      : expeditionData.filter(
          (expedition) => expedition._id === selectedExpeditionId
        );

  useEffect(() => {
  }, [expeditionData]);

  return (
    <section className="expeditionInfoBlock">
      <h1>
        <u>Expedition data:</u>
      </h1>

      <select onChange={handleSelectChange} value={selectedExpeditionId}>
        <option value="">Choose an expedition</option>
        {expeditionData.map((expedition) => (
          <option key={expedition._id} value={expedition._id}>
            Expedition {expedition.startTime || expedition._id}
          </option>
        ))}
      </select>

      <div className="expeditionScrollContainer">
        {selectedExpeditionId === "" ? (
          <div className="expeditionCard">
            <p>Choose an expedition to view its data.</p>
          </div>
        ) : displayedExpeditions.length > 0 ? (
          displayedExpeditions.map((expedition) => (
            <div key={expedition._id} className="expeditionCard">
              <table>
                <tbody>
                  <tr>
                    <td>Latitude:</td>
                    <td>{expedition.location?.latitude || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>Longitude:</td>
                    <td>{expedition.location?.longitude || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>Carbon Monoxide:</td>
                    <td>{Math.round(expedition.gasStats?.carbonMonoxide) + " ppm" || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>Methane:</td>
                    <td>{Math.round(expedition.gasStats?.methane) + " ppm"  || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>Butane:</td>
                    <td>{Math.round(expedition.gasStats?.butane) + " ppm"  || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>Liquefied Petroleum Gas:</td>
                    <td>{Math.round(expedition.gasStats?.liquefiedPetroleumGas) + " ppm"  || "N/A"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))
        ) : (
          <p>No expedition data available.</p>
        )}
        {selectedExpedition && selectedExpedition.gasStats && (
          <PieChartSection expedition={selectedExpedition} />
        )}
      </div>
    </section>
  );
};

export default ExpeditionData;
