import { useState, useEffect } from "react";
import "./App.css";
import Button from "./Button";
import prankAudio from "./assets/aa.wav";

const audio = new Audio(prankAudio);

function App() {
  const buttons = [
    {
      cls: "btn-ac",
      label: "AC",
    },
    {
      cls: "btn-c",
      label: "C",
    },
    {
      cls: "btn-per",
      label: "%",
    },
    {
      cls: "btn-divide",
      label: "/",
    },
    {
      cls: "btn-0",
      label: "0",
    },
    {
      cls: "btn-1",
      label: "1",
    },
    {
      cls: "btn-2",
      label: "2",
    },
    {
      cls: "btn-3",
      label: "3",
    },
    {
      cls: "btn-4",
      label: "4",
    },
    {
      cls: "btn-5",
      label: "5",
    },
    {
      cls: "btn-6",
      label: "6",
    },
    {
      cls: "btn-7",
      label: "7",
    },
    {
      cls: "btn-8",
      label: "8",
    },
    {
      cls: "btn-9",
      label: "9",
    },
    {
      cls: "btn-x",
      label: "*",
    },
    {
      cls: "btn-minus",
      label: "-",
    },
    {
      cls: "btn-plus",
      label: "+",
    },
    {
      cls: "btn-dot",
      label: ".",
    },
    {
      cls: "btn-equal",
      label: "=",
    },
  ];

  const [strToDisplay, setStrToDisplay] = useState("");
  const [lastOperator, setLastOperator] = useState("");
  const [isMouseDown, setIsMouseDown] = useState();
  const [isPrank, setIsPrank] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const { key } = e;

      // Allow numbers, operators, Enter, Backspace, and decimal
      if (
        !isNaN(key) ||
        ["+", "-", "*", "/", "%", ".", "Enter", "Backspace"].includes(key)
      ) {
        if (key === "Enter") {
          buttonAction("=");
        } else if (key === "Backspace") {
          buttonAction("C");
        } else {
          buttonAction(key);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [buttonAction]);

  const operators = ["%", "/", "*", "-", "+"];

  const displayTotal = () => {
    const extraValue = randomValue();
    try {
      if (extraValue) {
        setIsPrank(true);
        audio.play();
      }
      const total = eval(strToDisplay) + extraValue;
      setStrToDisplay(total.toString());
    } catch (e) {
      console.log(e);
      setStrToDisplay("error");
    }
  };

  const randomValue = () => {
    const num = Math.round(Math.random() * 10); // 0 - 10
    return num < 4 ? num : 0;
  };

  function buttonAction(value) {
    isPrank && setIsPrank(false);

    if (value === "AC") {
      setStrToDisplay("");
      return;
    }

    if (value === "C") {
      setStrToDisplay((prev) => prev.slice(0, -1));
      return;
    }

    if (value === "=" || value === "Enter") {
      setLastOperator("");
      //get the last char
      const lastChar = strToDisplay.slice(-1);

      // check if it is one of the operators
      if (operators.includes(lastChar)) {
        setStrToDisplay((prev) => prev.slice(0, -1));
      }

      return displayTotal();
    }

    // show only last clicked operator
    if (operators.includes(value)) {
      setLastOperator(value);
      //get the last char
      const lastChar = strToDisplay.slice(-1);

      if (operators.includes(lastChar)) {
        setStrToDisplay((prev) => prev.slice(0, -1));
      }
    }

    //handle the dot click

    if (value === ".") {
      const lastOperatorIndex = strToDisplay.lastIndexOf(lastOperator);
      const lastNumberSet = strToDisplay.slice(lastOperatorIndex);

      if (
        lastNumberSet.includes(".") ||
        (!lastOperator && strToDisplay.includes("."))
      ) {
        return;
      }
    }

    setStrToDisplay((prev) => prev + value);
  }

  function handleOnButtonClick(value) {
    setIsMouseDown();
    buttonAction(value);
  }

  function handleOnMouseDown(value) {
    setIsMouseDown(value);
  }
  console.log(isMouseDown);

  return (
    <div className="wrapper flex-center">
      <div className="calculator">
        <div
          className={
            isPrank
              ? "display arbutus-regular prank"
              : "display arbutus-regular "
          }
        >
          {strToDisplay || "0.00"}
        </div>
        {buttons.map((btn, index) => (
          <Button
            key={index}
            {...btn}
            handleOnButtonClick={handleOnButtonClick}
            handleOnMouseDown={handleOnMouseDown}
            isMouseDown={isMouseDown}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
