import {LogicalMechanicsController} from "../LogicalMechanicsController.ts";
import {Square} from "../../models/Square.ts";
import {Piece} from "../../models/Piece.ts";

export class BishopMovementController {

    logicalMechanics: LogicalMechanicsController = new LogicalMechanicsController();

    constructor() {}

    possibleSquaresForBishop(currentBoardSqures: Square[][], baseSquare: Square): Square[] {
        const possibleMoves: Square[] = [];

        const piece: Piece | null = baseSquare.occupant;
        if (!piece) {
            return [];
        }

        const diagonalDirections: number[][] = [
            [-1, -1], [-1, 1],
            [1, 1], [1, -1],
        ];

        const baseRankIndex: number = baseSquare.rank - 1;
        const baseFileIndex: number = baseSquare.file - 1;

        for (const [diagonalRankDirection, diagonalFileDirection] of diagonalDirections) {
            possibleMoves.push(...this.possibleDiagonalMoves(
                currentBoardSqures,
                piece,
                diagonalRankDirection,
                diagonalFileDirection,
                baseRankIndex,
                baseFileIndex
                )
            );
        }

        return possibleMoves;
    }

    private possibleDiagonalMoves(boardSquares: Square[][],
                              piece: Piece,
                              diagonalRankDirection: number,
                              diagonalFileDirection: number,
                              baseRankIndex: number,
                              baseFileIndex: number): Square[] {
        const possibleMoves: Square[] = [];

        let currentRankIndex: number = baseRankIndex + diagonalRankDirection;
        let currentFileIndex: number = baseFileIndex + diagonalFileDirection;

        while (this.inBounds(currentRankIndex, currentFileIndex)) {
            const targetSquare: Square = boardSquares[currentRankIndex][currentFileIndex];

            if (!this.logicalMechanics.isSquareOccupied(targetSquare)) {
                possibleMoves.push(targetSquare);
            } else if (this.logicalMechanics.canPieceOccupySquare(piece, targetSquare)) {
                possibleMoves.push(targetSquare);
                break;
            } else {
                break;
            }

            currentRankIndex += diagonalRankDirection;
            currentFileIndex += diagonalFileDirection;
        }

        return possibleMoves;
    }

    private inBounds(rankIndex: number, fileIndex: number): boolean {
        return rankIndex >= 0 && rankIndex < 8 && fileIndex >= 0 && fileIndex < 8;
    }

}