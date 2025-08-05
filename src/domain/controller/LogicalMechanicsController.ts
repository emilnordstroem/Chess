import {Square} from "../models/Square.ts";
import {PieceColor} from "../models/PieceColor.ts";
import {Piece} from "../models/Piece.ts";

export class LogicalMechanicsController {

    constructor() {}

    isSquareSelected(selectedSquare: Square | null, clickedSquare: Square): boolean {
        return (
            selectedSquare !== null &&
            selectedSquare.file === clickedSquare.file &&
            selectedSquare.rank === clickedSquare.rank
        );
    }

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

    isSquareOccupied(squareToCheck: Square | null): boolean {
        return squareToCheck == null ? false : squareToCheck.isOccupied();
    }

}