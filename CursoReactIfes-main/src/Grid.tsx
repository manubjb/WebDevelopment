type GridProps = {
  cols?: number;
  children?: React.ReactNode;
}

function Grid({cols = 4, children}: GridProps) {
  return (
    <>
      <div className={`row row-cols-${cols} g-3 align-items-stretch`}>
        {children}
      </div>
    </>
  )
}

export default Grid;
