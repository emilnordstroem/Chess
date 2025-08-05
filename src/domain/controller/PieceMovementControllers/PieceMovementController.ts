import {Square} from "../../models/Square.ts";
import {Piece} from "../../models/Piece.ts";
import {Board} from "../../models/Board.ts";
import type {PieceType} from "../../models/PieceType.ts";
import {PawnMovementController} from "./PawnMovementController.ts";
import {RookMovementController} from "./RookMovementController.ts";
import {KingMovementController} from "./KingMovementController.ts";

export class PieceMovementController {
    pawnMovementController: PawnMovementController = new PawnMovementController();
    rookMovementController: RookMovementController = new RookMovementController();
    kingMovementController: KingMovementController = new KingMovementController();

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
                return this.pawnMovementController.possibleSquaresForPawn(currentBoard.boardSquares, baseSquare);
            case "Rook":
                return this.rookMovementController.possibleSquaresForRook(currentBoard.boardSquares, baseSquare);
            case "King":
                return this.kingMovementController.possibleSquaresForKing(currentBoard.boardSquares, baseSquare);
        }
    }

}