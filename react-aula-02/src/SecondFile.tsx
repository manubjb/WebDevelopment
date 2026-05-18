type SecondFileProps = {
    nome?: string
}

function SecondFile({nome = "visitante"}: SecondFileProps) {
  return (
    <>
      <p>Bem-vindo, {nome}!</p>
    </>
  )
}

export default SecondFile