export interface User {
    username: string;
    password: string;
    nome: string;
    cognome: string;
    mail: string;
    crediti: number;
    partiteFatte: number | undefined;
    bingo: number | undefined;
    cinquine: number | undefined;
    superbingo: number | undefined;
}