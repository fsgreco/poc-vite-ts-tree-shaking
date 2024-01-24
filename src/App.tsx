import './App.css'
import { MyButton, MyProgressBox } from "@components";
// Tree shaking works and do not add MyProgressBox to the bundle

function App() {
  return (
    <>
			<MyButton label='Hello this is a test' />
			{/* <MyProgressBox /> */}
    </>
  )
}

export default App
