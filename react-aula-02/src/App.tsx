import SecondFile from "./SecondFile";
import Grid from "./Grid";

const cards = Array.from({ length: 12}, (_, i) => ({
  id: i,
}));

function App() {
  return (
    <>
      <h1>Olá, React!</h1>
      <hr />
      <SecondFile nome="Manu" />
      <hr />
      <Grid />
    </>
  )
}

export default App
