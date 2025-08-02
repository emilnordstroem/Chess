import type {PieceType} from "./PieceType.ts";
import type {PieceColor} from "./PieceColor.ts";

export class Piece {
    private _type : PieceType;
    private _color : PieceColor;

    constructor(type: PieceType, color: PieceColor) {
        this._type = type;
        this._color = color;
    }

    get type(): PieceType {
        return this._type;
    }

    get color(): PieceColor {
        return this._color;
    }
}