import { useState } from "react";
import "./App.css";

import ImcCalc from "./components/ImcCalc";
import ImcTable from "./components/ImcTable";
import { data } from "./data/data.js";

function App() {
  const [imc, setImc] = useState("");
  const [info, setInfo] = useState("");
  const [infoClass, setInfoCLass] = useState("");

  const calcImc = (e, height, weight) => {
    e.preventDefault();

    if (!height || !weight) return;

    const heightFloat = +height.replace(",", ".");
    const weightFloat = +weight.replace(",", ".");

    const imcResult = (weightFloat / (heightFloat * heightFloat)).toFixed(1);

    setImc(imcResult);

    data.forEach((item) => {
      if (imcResult >= item.min && imcResult <= item.max) {
        setInfo(item.info);
        setInfoCLass(item.infoClass);
      }

      if (!info) return;
    });
  };

  const backForm = (e) => {
    e.preventDefault()
    setImc("")
    setInfo("")
    setInfoCLass("")
  }

  return (
    <>
      <div className="container">
        {!imc ? (
          <ImcCalc calcImc={calcImc} />
        ) : (
          <ImcTable data={data} imc={imc} info={info} infoClass={infoClass} backForm={backForm} />
        )}
      </div>
    </>
  );
}

export default App;
