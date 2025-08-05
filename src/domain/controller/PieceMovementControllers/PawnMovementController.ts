import {Square} from "../../models/Square.ts";
import {Piece} from "../../models/Piece.ts";
import {LogicalMechanicsController} from "../LogicalMechanicsController.ts";
import {PieceColor} from "../../models/PieceColor.ts";

export class PawnMovementController {
    logicalMechanics: LogicalMechanicsController = new LogicalMechanicsController();

    constructor() {}

    possibleSquaresForPawn(currentBoardSqures: Square[][], baseSquare: Square): Square[] {
        const possibleMoves: Square[] = [];

        const piece: Piece | null = baseSquare.occupant;
        if (!piece) {
            return [];
        }

        const directionMoveLimit: number = piece.color === PieceColor.White ? -1 : 1;
        const startRankIndex: number = piece.color === PieceColor.White ? 6 : 1;

        const rankIndex: number = baseSquare.rank - 1;
        const fileIndex: number = baseSquare.file - 1;

        const nextRankMovement: number = rankIndex + directionMoveLimit;
        const doubleRankMovement: number = rankIndex + directionMoveLimit * 2;

        if (this.inBounds(nextRankMovement, fileIndex)
            && !currentBoardSqures[nextRankMovement][fileIndex].isOccupied()) {

            possibleMoves.push(currentBoardSqures[nextRankMovement][fileIndex]);

            if (rankIndex === startRankIndex &&
                this.inBounds(doubleRankMovement, fileIndex) &&
                !currentBoardSqures[doubleRankMovement][fileIndex].isOccupied()) {
                possibleMoves.push(currentBoardSqures[doubleRankMovement][fileIndex]);
            }
        }

        const diagonalFiles: number[] = [fileIndex - 1, fileIndex + 1];
        for (const diagonalFile of diagonalFiles) {
            if (this.inBounds(nextRankMovement, diagonalFile)) {
                const target: Square = currentBoardSqures[nextRankMovement][diagonalFile];
                if (target.isOccupied() && this.logicalMechanics.canPieceOccupySquare(piece, target)) {
                    possibleMoves.push(target);
                }
            }
        }

        return possibleMoves;
    }

    private inBounds(rankIndex: number, fileIndex: number): boolean {
        return rankIndex >= 0 && rankIndex < 8 && fileIndex >= 0 && fileIndex < 8;
    }

}