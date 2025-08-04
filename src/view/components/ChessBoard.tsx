import {BoardController} from "../../domain/controller/BoardController.ts";
import {Board} from "../../domain/models/Board.ts";
import {useState} from "react";
import {Square} from "../../domain/models/Square.ts";
import {PieceColor} from "../../domain/models/PieceColor.ts";
import {InteractionMechanicsController} from "../../domain/controller/InteractionMechanicsController.ts";
import {LogicalMechanicsController} from "../../domain/controller/LogicalMechanicsController.ts";

const interactionMechanics: InteractionMechanicsController = new InteractionMechanicsController();
const logicalMechanics: LogicalMechanicsController = new LogicalMechanicsController();
const boardStructure: BoardController = new BoardController();

export const ChessBoard = () => {
    const [currentChessBoard, setCurrentChessBoard] = useState<Board>(boardStructure.boardSetup());
    const [currentTurn, setCurrentTurn] = useState<PieceColor>(PieceColor.White);
    const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);

    function squareBorderColor(clickedSquare: Square): string {
        if(logicalMechanics.isSquareSelected(selectedSquare, clickedSquare)){
            if (!logicalMechanics.isSquareOccupied(clickedSquare)) {
                return '1px solid black';
            } else if (!logicalMechanics.isSquareValidToSelect(currentTurn, clickedSquare)) {
                return '2px solid red';
            } else {
                return '2px solid green';
            }
        }
        return "";
    }

    function handleSquareClick(clickedSquare: Square): void {
        const {newSelectedSquare, moveExecuted} = interactionMechanics.handleSquareClick(currentChessBoard, currentTurn, selectedSquare, clickedSquare);
        setSelectedSquare(newSelectedSquare);

        if (moveExecuted) {
            setCurrentTurn(interactionMechanics.shiftTurn(currentTurn));
        }

        const updatedChessBoard: Board = boardStructure.getUpdatedBoard(currentChessBoard);
        setCurrentChessBoard(updatedChessBoard);
    }

    return (
        <div className="chessboard" style={{ display: 'flex', flexDirection: 'column' }}>
            {currentChessBoard.boardSquares.map((rowOfSquares, rankIndex) => (
                <div key={rankIndex} style={{ display: 'flex' }}>
                    {rowOfSquares.map((clickedSquare: Square, fileIndex) => {
                        const isDark = (fileIndex + rankIndex) % 2 === 1; // even numbers are dark
                        const backgroundColor = isDark ? '#769656' : '#eeeed2';

                        return (
                            <div
                                key={fileIndex}
                                onClick={() => handleSquareClick(clickedSquare)}
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    backgroundColor,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: squareBorderColor(clickedSquare)
                                }}
                            >
                                {logicalMechanics.isSquareOccupied(clickedSquare)
                                    ? clickedSquare.occupant?.type
                                    : ""}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};