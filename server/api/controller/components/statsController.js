import UserDrone from "../../../models/userDrone.js";
import Drone from "../../../models/drone.js"
import DroneExpedition from "../../../models/droneExpedition.js";
import Expedition from "../../../models/expedition.js";

export const getDroneStats = async (req, res) => {
  const userId = req.user.id;
  const droneID = req.params.droneID;

  try {
    const accessRecord = await UserDrone.findOne({ userID: userId, droneID: droneID });
    if (!accessRecord) {
      return res.status(403).json({ message: "Access denied: user does not have access to this drone." });
    }

    const droneStats = await Drone.findOne({ _id: droneID });
    if (!droneStats) {
      return res.status(404).json({ message: "Drone stats not found" });
    }

    const droneExpeditions = await DroneExpedition.find({ droneID });
    const expeditionIDs = droneExpeditions.map(de => de.expeditionID);
    const expeditionData = await Expedition.find({ _id: { $in: expeditionIDs } });

    res.status(200).json({ droneStats, expeditionData });
  } catch (error) {
    console.error("Error fetching drone stats:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
