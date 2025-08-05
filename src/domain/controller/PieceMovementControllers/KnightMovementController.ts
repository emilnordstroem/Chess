import {LogicalMechanicsController} from "../LogicalMechanicsController.ts";
import {Square} from "../../models/Square.ts";
import {Piece} from "../../models/Piece.ts";

export class KnightMovementController {
    logicalMechanics: LogicalMechanicsController = new LogicalMechanicsController();

    constructor() {}

    possibleSquaresForKnight(currentBoardSqures: Square[][], baseSquare: Square): Square[] {
        const possibleMoves: Square[] = [];

        const piece: Piece | null = baseSquare.occupant;
        if (!piece) {
            return [];
        }

        const directions: number[][] = [
            [2, -1], [2, 1],
            [1, -2], [1, 2],
            [-2, -1], [-2, 1],
            [-1, -2], [-1, 2]
        ];

        const baseRankIndex: number = baseSquare.rank - 1;
        const baseFileIndex: number = baseSquare.file - 1;

        for (const [rankDirection, fileDirection] of directions) {
            possibleMoves.push(...this.possibleLMoves(currentBoardSqures,
                piece,
                rankDirection,
                fileDirection,
                baseRankIndex,
                baseFileIndex)
            );
        }

        return possibleMoves;
    }

    private possibleLMoves(boardSquares: Square[][],
                              piece: Piece,
                              rankDirection: number,
                              fileDirection: number,
                              rankIndex: number,
                              fileIndex: number): Square[] {
        const possibleMoves: Square[] = [];
        const currentRankIndex: number = rankIndex + rankDirection;
        const currentFileIndex: number = fileIndex + fileDirection;

        if (this.inBounds(currentRankIndex, currentFileIndex)) {
            const targetSquare: Square = boardSquares[currentRankIndex][currentFileIndex];
            if (!this.logicalMechanics.isSquareOccupied(targetSquare)) {
                possibleMoves.push(targetSquare);
            } else if (this.logicalMechanics.canPieceOccupySquare(piece, targetSquare)) {
                possibleMoves.push(targetSquare);
            }
        }

        return possibleMoves;
    }

    private inBounds(rankIndex: number, fileIndex: number): boolean {
        return rankIndex >= 0 && rankIndex < 8 && fileIndex >= 0 && fileIndex < 8;
    }

}