import {Board} from "../models/Board.ts";
import {PieceColor} from "../models/PieceColor.ts";
import {Square} from "../models/Square.ts";
import {Piece} from "../models/Piece.ts";
import {LogicalMechanicsController} from "./LogicalMechanicsController.ts";
import {PieceMovementController} from "./PieceMovementControllers/PieceMovementController.ts";

export class InteractionMechanicsController {
    logicalMechanics: LogicalMechanicsController = new LogicalMechanicsController();
    pieceMovement: PieceMovementController = new PieceMovementController();

    constructor() {}

    handleSquareClick(currentBoard: Board,
                      currentTurn: PieceColor,
                      selectedSquare: Square | null,
                      clickedSquare: Square): {newSelectedSquare: Square | null, moveExecuted: boolean} {
        if (selectedSquare == null) {
            return {
                newSelectedSquare: this.logicalMechanics.isSquareOccupied(clickedSquare) ? clickedSquare : null,
                moveExecuted: false
            }; // new selected
        } else if (this.logicalMechanics.isSquareTheSame(selectedSquare, clickedSquare)) {
            return {
                newSelectedSquare: null,
                moveExecuted: false
            }; // unselected
        } else if (!this.logicalMechanics.isSquareValidToSelect(currentTurn, selectedSquare)) {
            return {
                newSelectedSquare: null,
                moveExecuted: false
            }; // invalid
        }

        const fromSquare: Square = currentBoard.boardSquares[selectedSquare.rank - 1][selectedSquare.file - 1];
        const pieceToMove: Piece | null = fromSquare.occupant;
        const toSquare: Square = clickedSquare;

        if (this.logicalMechanics.canPieceOccupySquare(pieceToMove, toSquare)) {
            this.pieceMovement.relocatePieceToSquare(fromSquare, pieceToMove, toSquare);
            return {
                newSelectedSquare: null,
                moveExecuted: true
            }; // reset selected because move was made
        }

        return {
            newSelectedSquare: null,
            moveExecuted: false
        }; // default
    }

    shiftTurn(currentTurn: PieceColor): PieceColor {
        return currentTurn == PieceColor.White ? PieceColor.Black : PieceColor.White
    }

}