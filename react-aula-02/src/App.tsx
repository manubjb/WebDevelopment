import SecondFile from "./SecondFile";
import Grid from "./Grid";

const cards = [

];

function App() {
  return (
    <>
      <h1>Olá, React!</h1>
      <hr />
      <SecondFile nome="Manu" />
      <hr />
      <Grid cards={cards} />
    </>
  )
}

export default App
