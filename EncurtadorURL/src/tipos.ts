export interface UrlEncurtada {
    id: number;
    codigo: string; // ex.: "aB3xK9"
    urlOriginal: string; // URL completa
    acessos: number;
    criadoEm: string; // ISO datetime
    expiraEm?: string; // ISO datetime, opcional
}
export interface RespostaErro {
    erro: string;
}