import {Board} from "../models/Board.ts";
import {Square} from "../models/Square.ts";
import {PieceColor} from "../models/PieceColor.ts";
import {Piece} from "../models/Piece.ts";
import {PieceType} from "../models/PieceType.ts";

export class BoardController {

    constructor() {}

    boardSetup(): Board {
        const board = new Board();
        board.boardSquares = this.squareConfigurationSetup(board);
        return board;
    }

    squareConfigurationSetup(board: Board): Square[][] {
        const squares: Square[][] = board.boardSquares;

        const boardRankIndexesToPlacePieces: number[] = [0, 1, 6, 7];
        const boardFileIndexesToPlacePieces: number[] = [0, 1, 2, 3, 4, 5, 6, 7];

        for (const rankIndex of boardRankIndexesToPlacePieces) {
            const color: PieceColor = rankIndex < 2 ? PieceColor.Black : PieceColor.White;

            for (const fileIndex of boardFileIndexesToPlacePieces) {
                if (rankIndex === 1 || rankIndex === 6) {
                    squares[rankIndex][fileIndex].occupant = new Piece(PieceType.Pawn, color);
                } else {
                    switch (fileIndex) {
                        case 0:
                        case 7:
                            squares[rankIndex][fileIndex].occupant = new Piece(PieceType.Rook, color);
                            break;
                        case 1:
                        case 6:
                            squares[rankIndex][fileIndex].occupant = new Piece(PieceType.Knight, color);
                            break;
                        case 2:
                        case 5:
                            squares[rankIndex][fileIndex].occupant = new Piece(PieceType.Bishop, color);
                            break;
                        case 3:
                            squares[rankIndex][fileIndex].occupant = new Piece(PieceType.Queen, color);
                            break;
                        case 4:
                            squares[rankIndex][fileIndex].occupant = new Piece(PieceType.King, color);
                            break;
                    }
                }
            }
        }

        return squares;
    }

    getUpdatedBoard(previousBoard: Board): Board {
        const newBoard = new Board();
        newBoard.boardSquares = this.updatedSquareConfiguration(previousBoard);
        return newBoard;
    }

    updatedSquareConfiguration(previousBoard: Board): Square[][] {
        const newSquares: Square[][] = previousBoard.boardSquares.map((row) =>
            row.map((square) => {
                const newSquare = new Square(square.file, square.rank);
                newSquare.occupant = square.isOccupied() ? square.occupant : null;
                return newSquare;
            })
        );
        return newSquares;
    }

    handleSquareClick(currentBoard: Board,
                      selectedSquare: Square | null,
                      clickedSquare: Square): Square | null {
        if (selectedSquare) {
            if (this.isSquareTheSame(selectedSquare, clickedSquare)){
                return null; // unselect
            }

            const fromSquare: Square = currentBoard.boardSquares[selectedSquare.rank - 1][selectedSquare.file - 1];
            const pieceToMove: Piece | null = fromSquare.occupant;
            const toSquare: Square = clickedSquare;

            if (this.canPieceOccupySquare(pieceToMove, toSquare)) {
                this.relocatePieceToSquare(fromSquare, pieceToMove, toSquare);
                return null;
            }

            return null;
        }

        if (this.isSquareOccupied(clickedSquare)) {
            return clickedSquare;
        }

        return null;
    }

    isSquareOccupied(squareToCheck: Square | null): boolean {
        return squareToCheck == null ? false : squareToCheck.isOccupied();
    }

    isSquareTheSame(selectedSquare: Square | null, clickedSquare: Square | null): boolean {
        if (selectedSquare === null || clickedSquare === null) {
            return false;
        }
        return selectedSquare.file === clickedSquare.file
            && selectedSquare.rank === clickedSquare.rank;
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

}