import {Square} from "../../models/Square.ts";
import {Piece} from "../../models/Piece.ts";
import {Board} from "../../models/Board.ts";
import type {PieceType} from "../../models/PieceType.ts";
import {PawnMovementController} from "./PawnMovementController.ts";
import {RookMovementController} from "./RookMovementController.ts";

export class PieceMovementController {
    PawnMovementController: PawnMovementController = new PawnMovementController();
    RookMovementController: RookMovementController = new RookMovementController();

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

    possibleSquaresForPieceToCapture(currentBoard: Board, baseSquare: Square, pieceType: PieceType): Square[] | undefined {
        switch (pieceType) {
            case "Pawn":
                return this.PawnMovementController.possibleSquaresForPawn(currentBoard.boardSquares, baseSquare);
            case "Rook":
                return this.RookMovementController.possibleSquaresForRook(currentBoard.boardSquares, baseSquare);
        }
    }

}