import Card from "./Card";

function Grid() {
    return( 
        <>
        <div className="row row-cols-4">
            <div className="col">
                <Card imagem="https://dummyimage.com/300"
                titulo="Produto 1"
                texto="Descrição do produto 1"
                linkUrl="" />
            </div>
        </div>
        </>
    )
}

export default Grid;