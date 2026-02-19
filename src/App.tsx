import './App.css'
import BoxAttach from './component/BoxAttach'
import InfoBox from './component/InfoBox'

function App() {

  return (
    <div className='box'>
    <BoxAttach/>
    <InfoBox casename='hey' link='hey2' votes='vote' attendance='Yolo'></InfoBox>
    </div>
  )
}

export default App
