import  {type Piece} from "./Piece.ts";

export class Square {
    private _file : number;
    private _rank : number;
    private _occupant : Piece | null;

    constructor(file: number, rank: number) {
        this._file = file;
        this._rank = rank;
        this._occupant = null;
    }

    isOccupied(): boolean {
        return this._occupant != null;
    }

    get file(): number {
        return this._file;
    }

    get rank(): number {
        return this._rank;
    }

    get occupant(): Piece | null {
        return this._occupant;
    }

    set occupant(piece: Piece | null) {
        this._occupant = piece;
    }

}