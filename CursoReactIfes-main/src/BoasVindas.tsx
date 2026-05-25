type BoasVindasProps = {
  nome?: string;
}

function BoasVindas({ nome = "Visitante" }: BoasVindasProps) {
  return (
    <>
      <p>Bem-vinda, {nome}!</p>
    </>
  )
}

export default BoasVindas;
