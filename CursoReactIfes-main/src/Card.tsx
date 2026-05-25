type CardProps = {
    imagem: string;
    titulo: string;
    texto: string;
    linkUrl: string;
}

function Card({ imagem, titulo, texto, linkUrl }: CardProps) {
    return (
        <div className="col">
            <div className="card h-100">
                <img src={imagem} className="card-img-top" />
                <div className="card-body text-center">
                    <h5 className="card-title">{titulo}</h5>
                    <p className="card-text">{texto}</p>
                </div>
                <div className="card-footer text-center p-3 bg-light">
                    <a href={linkUrl} className="btn btn-danger">
                        Adicionar ao Carrinho
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Card;