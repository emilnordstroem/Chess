import {LogicalMechanicsController} from "../LogicalMechanicsController.ts";
import {Square} from "../../models/Square.ts";
import {Piece} from "../../models/Piece.ts";

export class QueenMovementController {
    logicalMechanics: LogicalMechanicsController = new LogicalMechanicsController();

    constructor() {}

    possibleSquaresForQueen(currentBoardSqures: Square[][], baseSquare: Square): Square[] {
        const possibleMoves: Square[] = [];

        const piece: Piece | null = baseSquare.occupant;
        if (!piece) {
            return [];
        }

        const directions: number[] = [-1, 1];

        const baseRankIndex: number = baseSquare.rank - 1;
        const baseFileIndex: number = baseSquare.file - 1;

        for (const direction in directions) {
            possibleMoves.push(...this.possibleRankMoves(currentBoardSqures,
                piece,
                directions[direction],
                baseRankIndex,
                baseFileIndex)
            );
            possibleMoves.push(...this.possibleFileMoves(currentBoardSqures,
                piece,
                directions[direction],
                baseRankIndex,
                baseFileIndex)
            );
        }

        const diagonalDirections: number[][] = [
            [-1, -1], [-1, 1],
            [1, 1], [1, -1],
        ];

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

    private possibleRankMoves(boardSquares: Square[][],
                              piece: Piece,
                              direction: number,
                              startRankIndex: number,
                              fileIndex: number): Square[] {
        const possibleMoves: Square[] = [];
        let currentRankIndex: number = startRankIndex + direction;

        while (this.inBounds(currentRankIndex, fileIndex)) {
            const targetSquare: Square = boardSquares[currentRankIndex][fileIndex];
            if (!this.logicalMechanics.isSquareOccupied(targetSquare)) {
                possibleMoves.push(targetSquare);
            } else if (this.logicalMechanics.canPieceOccupySquare(piece, targetSquare)) {
                possibleMoves.push(targetSquare);
                break;
            } else {
                break;
            }
            currentRankIndex += direction;
        }

        return possibleMoves;
    }

    private possibleFileMoves(boardSquares: Square[][],
                              piece: Piece,
                              direction: number,
                              rankIndex: number,
                              startFileIndex: number): Square[] {
        const possibleMoves: Square[] = [];
        let currentFileIndex: number = startFileIndex + direction;

        while (this.inBounds(rankIndex, currentFileIndex)) {
            const targetSquare: Square = boardSquares[rankIndex][currentFileIndex];
            if (!this.logicalMechanics.isSquareOccupied(targetSquare)) {
                possibleMoves.push(targetSquare);
            } else if (this.logicalMechanics.canPieceOccupySquare(piece, targetSquare)) {
                possibleMoves.push(targetSquare);
                break;
            } else {
                break;
            }
            currentFileIndex += direction;
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