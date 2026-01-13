import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
// import { Game } from './frontend/ui/ticTacToe/Game'
// import { SelectableGrid } from './frontend/ui/selectableGrid/SelectableGrid'
// import { GridLight } from "./frontend/ui/gridLight/GirdLight";
// import { InfiniteScroll } from "./frontend/ui/InfiniteScroll/InfiniteScroll";
// import { DropDown } from "./frontend/ui/DropDown/DropDown";
// import { CountDown } from "./frontend/ui/CountDown/CountDown";
// import { AutoComplete } from "./frontend/ui/AutoComplete/AutoComplete";
// import { NestedComments } from "./frontend/ui/NestedComments/NestedComments";
// import { Pagination } from "./frontend/ui/Pagination/Pagination";
import { MemoryGame } from "./frontend/ui/MemoryGame/MemoryGame";

function App() {
  const [count, setCount] = useState(0);

  const dummyList = [...Array(100).keys()].map((item) => ({
    id: item + 1,
    value: `Item ${item + 1}`,
    label: `Item ${item + 1}`,
  }));

  return (
    <>
      {/* <Game/> */}
      {/* <SelectableGrid/> */}
      {/* <GridLight/> */}
      {/* <InfiniteScroll/> */}
      {/* <DropDown
        onSelect={(data) => console.log(data)}
        list={dummyList}
        placeholder="Select Data"
        defaultValue={{ id: 7, value: `Item 7`, label: `Item 7` }}
      /> */}
      {/* <CountDown/> */}

      {/* <AutoComplete/> */}
      {/* <NestedComments/> */}
      {/* <Pagination/> */}

      <MemoryGame/>
    </>
  );
}

export default App;
