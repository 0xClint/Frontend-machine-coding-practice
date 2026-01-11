import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import { Game } from './frontend/ui/ticTacToe/Game'
// import { SelectableGrid } from './frontend/ui/selectableGrid/SelectableGrid'
import { GridLight } from './frontend/ui/gridLight/GirdLight'
import { InfiniteScroll } from './frontend/ui/InfiniteScroll/InfiniteScroll'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      {/* <Game/> */}
      {/* <SelectableGrid/> */}
      {/* <GridLight/> */}
      <InfiniteScroll/>
    </>
  )
}

export default App
