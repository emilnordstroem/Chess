import {LogicalMechanicsController} from "../LogicalMechanicsController.ts";
import {Square} from "../../models/Square.ts";
import {Piece} from "../../models/Piece.ts";

export class RookMovementController {
    logicalMechanics: LogicalMechanicsController = new LogicalMechanicsController();

    constructor() {}

    possibleSquaresForRook(currentBoardSqures: Square[][], baseSquare: Square): Square[] {
        const possibleMoves: Square[] = [];

        const piece: Piece | null = baseSquare.occupant;
        if (!piece) {
            return [];
        }

        const directions: number[] = [-1, 1];
        const baseRankIndex: number = baseSquare.rank - 1;
        const fileIndex: number = baseSquare.file - 1;

        for (const direction in directions) {
            possibleMoves.push(...this.possibleRankMoves(currentBoardSqures, piece, directions[direction], baseRankIndex, fileIndex));
            possibleMoves.push(...this.possibleFileMoves(currentBoardSqures, piece, directions[direction], baseRankIndex, fileIndex));
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

        while (currentRankIndex >= 0 && currentRankIndex < boardSquares.length) {
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

        while (currentFileIndex >= 0 && currentFileIndex < boardSquares.length) {
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

}