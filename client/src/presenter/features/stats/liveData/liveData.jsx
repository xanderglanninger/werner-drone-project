import { Box, Card } from "@mui/material";
import LiveDataCard from "./components/liveDataCard";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const LiveData = () => {
  const [sensorData, setSensorData] = useState("Waiting for data...");

  useEffect(() => {
    const socket = io("http://localhost:8000");

    socket.on("sensorData", (data) => {
      setSensorData(data); 
    });

    return () => socket.disconnect(); 
  }, []);

  return (
    <Box sx={{ minWidth: 250 }}>
      <Card variant="outlined" sx={{ p: 20, mr: 5 }}>
        <LiveDataCard
          title="Live Data:"
          description={`Gas Sensor Value: ${sensorData}`}
        />
      </Card>
    </Box>
  );
};

export default LiveData;
