import {Square} from "../../models/Square.ts";
import {Piece} from "../../models/Piece.ts";
import {LogicalMechanicsController} from "../LogicalMechanicsController.ts";

export class KingMovementController {
    logicalMechanics: LogicalMechanicsController = new LogicalMechanicsController();

    constructor() {}

    possibleSquaresForKing(currentBoardSqures: Square[][], baseSquare: Square): Square[] {
        const possibleMoves: Square[] = [];

        const piece: Piece | null = baseSquare.occupant;
        if (!piece) {
            return [];
        }

        const directions: number[][] = [
            [-1, -1],[-1, 0],[-1, 1],
            [0, -1],         [0, 1],
            [1, -1],[1, 0],[1, 1],
        ];

        const baseRankIndex: number = baseSquare.rank - 1;
        const baseFileIndex: number = baseSquare.file - 1;

        for (const [directionRank, directionFile] of directions) {
            possibleMoves.push(...this.possibleMoves(
                currentBoardSqures,
                piece,
                baseRankIndex,
                baseFileIndex,
                directionRank,
                directionFile
            ));
        }

        return possibleMoves;
    }

    private possibleMoves(currentBoardSqures: Square[][],
                          piece: Piece,
                          baseRankIndex: number,
                          baseFileIndex: number,
                          directionRank: number,
                          directionFile: number): Square[] {
        const possibleMoves: Square[] = [];

        const currentRankIndex: number = baseRankIndex + directionRank;
        const currentFileIndex: number = baseFileIndex + directionFile;

        if (this.inBounds(currentRankIndex, currentFileIndex)) {
            const targetSquare: Square = currentBoardSqures[currentRankIndex][currentFileIndex];
            if (!this.logicalMechanics.isSquareOccupied(targetSquare)
                || this.logicalMechanics.canPieceOccupySquare(piece, targetSquare)) {
                possibleMoves.push(targetSquare);
            }
        }

        return possibleMoves;
    }

    private inBounds(rankIndex: number, fileIndex: number): boolean {
        return rankIndex >= 0 && rankIndex < 8 && fileIndex >= 0 && fileIndex < 8;
    }

}