import {Square} from "../models/Square.ts";
import {Piece} from "../models/Piece.ts";

export class PieceMovementController {

    constructor() {}

    relocatePieceToSquare(moveFromSquare: Square | null,
                          pieceToMove: Piece | null,
                          moveToSquare: Square | null): void {
        if (moveFromSquare == null || moveToSquare == null) {
            return;
        }
        moveFromSquare.occupant = null;
        moveToSquare.occupant = pieceToMove;
    }

}