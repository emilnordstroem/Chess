import type {Square} from "../models/Square.ts";
import {Piece} from "../models/Piece.ts";

export class ActionController {

    constructor() {}

    isSquareOccupied(square: Square): boolean {
        return square.isOccupied();
    }

    canOccupySquare(piece: Piece,
                    squareToOccupy: Square): boolean {
        return (squareToOccupy.occupant?.color !== piece.color);
    }

    movePiece(fromSquare: Square,
              piece: Piece,
              toSquare: Square): void {
        fromSquare.occupant = null;
        toSquare.occupant = piece;
    }

}