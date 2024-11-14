// import { Expedition } from "../../domain/models/expiditions";

// export async function addExpedition(formData) {
//   try {
//     const expi = new Expedition(
//       formData.droneID,
//       formData.startTime,
//       formData.endTime,
//       formData.latitude,
//       formData.longitude,
//       formData.carbonMonoxide,
//       formData.methane,
//       formData.butane,
//       formData.liquefiedPetroleumGas,
//       formData.feedback
//     );

//     if (!expi.isValid()) {
//         throw new Error('Invalid expedition data');
//       }

//     const response = await fetch("", {
//         method: "POST",
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify(expi.formatData())
//     });

//     if(!response.ok) {
//         throw new Error("Failed to add");
//     }

//     return await response.json();
//   } catch (error) {
//     console.log(`${error}`);
//     throw error;
//   }
// }
