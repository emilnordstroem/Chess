import {Square} from "../models/Square.ts";
import {PieceColor} from "../models/PieceColor.ts";
import {Piece} from "../models/Piece.ts";

export class LogicalMechanicsController {

    constructor() {}

    isSquareTheSame(selectedSquare: Square | null, clickedSquare: Square | null): boolean {
        if (selectedSquare === null || clickedSquare === null) {
            return false;
        }
        return selectedSquare.file === clickedSquare.file
            && selectedSquare.rank === clickedSquare.rank;
    }

    isSquareValidToSelect(currentTurn: PieceColor, sqaure: Square | null): boolean {
        return !!(sqaure
            && sqaure.isOccupied()
            && sqaure.occupant?.color === currentTurn);
    }

    canPieceOccupySquare(piece: Piece | null,
                         squareToOccupy: Square | null): boolean {
        if (piece === null || squareToOccupy === null) {
            return false;
        }
        return squareToOccupy.occupant?.color !== piece.color;
    }

    relocatePieceToSquare(moveFromSquare: Square | null,
                          pieceToMove: Piece | null,
                          moveToSquare: Square | null): void {
        if (moveFromSquare == null || moveToSquare == null) {
            return;
        }
        moveFromSquare.occupant = null;
        moveToSquare.occupant = pieceToMove;
    }

    isSquareOccupied(squareToCheck: Square | null): boolean {
        return squareToCheck == null ? false : squareToCheck.isOccupied();
    }

}