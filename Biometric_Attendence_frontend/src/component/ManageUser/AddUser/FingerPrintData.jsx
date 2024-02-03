import Lottie from "lottie-react";
import fingerPrint from "../../../assets/fingerprint.json";

const FingerPrintData = ({updateFingerData}) => {

    const AddFingerPrintBtn = () => {
        // fetch the fingerPrintID data
        updateFingerData("1")     
    }
  return (
    <div className="flex flex-col-reverse mb-20 items-center justify-center">
      <button className="btn btn-outline btn-wide btn-accent font-bold text-lg"
      onClick={AddFingerPrintBtn}
      >
        Add FingerPrint
      </button>
      <Lottie
        animationData={fingerPrint}
        loop={true}
        style={{ width: "300px", height: "auto" }}
      />
    </div>
  );
};

export default FingerPrintData;
