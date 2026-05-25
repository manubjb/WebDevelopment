import Grid from "./Grid";
import Card from "./Card";

type CardData = {
  id: number;
  imagem: string;
  titulo: string;
 texto: string;
 linkUrl: string;
}

type GridcardsProps = {
    cols?: number;
    cards: CardData[];
}

function GridCards({ cards, cols = 4 }: GridcardsProps) {
    return (
        <Grid cols={cols}>
            {cards.map((card) => (
                <Card imagem={card.imagem}
                    titulo={card.titulo}
                    texto={card.texto}
                    linkUrl={card.linkUrl}
                    key={card.id} />
            ))}
        </Grid>
    )
}
export default GridCards;
