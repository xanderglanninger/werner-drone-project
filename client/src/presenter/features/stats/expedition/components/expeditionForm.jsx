import { CustomButton } from "../../../../layout/button";

const ExpeditionForm = () => {
  return (
    <div>
      <form action="" id="expiForm">
        <div className="expiFormContent">
          <select name="Expedition" id="expeditionSelect">
            Expedition
          </select>
          <input type="text" placeholder="Enter droneID" name="droneID" />
          <input type="date" placeholder="Enter start time" name="startTime" />
          <input type="date" placeholder="Enter end time" name="endTime" />
          <input type="text" placeholder="Enter latitude" name="latitude" />
          <input type="text" placeholder="Enter longitude" name="longitude" />
          <input
            type="text"
            placeholder="Enter carbon monoxide level"
            name="carbonMonoxide"
          />
          <input type="text" placeholder="Enter methane" name="methane" />
          <input type="text" placeholder="Enter butane" name="butane" />
          <input
            type="text"
            placeholder="Enter liquefied petroleum gas"
            name="liquefiedPetroleumGas"
          />
        </div>
        <div className="expiFormContent">
          <textarea
            name="feedback"
            rows="25"
            cols="50"
            placeholder="Give us some feedback?"
          ></textarea>
          <div id="expiButtons">
            <CustomButton>Add</CustomButton>
            <CustomButton>Update</CustomButton>
            <CustomButton>Delete</CustomButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ExpeditionForm;
