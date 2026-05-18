import Card from "./Card";

type cardData = {
    id: number;
    imagem: string;
    titulo: string;
    texto: string;
    linkUrl: string;
}

type GridProps = {
        cards: cardData[];
}

function Grid({cards}: GridProps) {
    return( 
        <>
        <div className="row row-cols-4 g-3">
            {cards.map((card)=> (
                <div className="col" key={card.id}>
                    <Card imagem={card.imagem}
                    titulo={card.titulo}
                    texto={card.texto}
                    linkUrl={card.linkUrl} />
                </div>
            ))}
        </div>
        </>
    )
}

export default Grid;