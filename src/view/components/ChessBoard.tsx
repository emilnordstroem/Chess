import {BoardController} from "../../domain/controller/BoardController.ts";
import {Board} from "../../domain/models/Board.ts";
import {useState} from "react";
import {Square} from "../../domain/models/Square.ts";
import {PieceColor} from "../../domain/models/PieceColor.ts";

const boardController: BoardController = new BoardController();

export const ChessBoard = () => {
    const [currentChessBoard, setCurrentChessBoard] = useState<Board>(boardController.boardSetup());
    const [currentTurn, setCurrentTurn] = useState<PieceColor>(PieceColor.White);
    const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);

    function isSquareSelected(clickedSquare: Square): boolean | null {
        return selectedSquare
            && selectedSquare.file === clickedSquare.file
            && selectedSquare.rank === clickedSquare.rank;
    }

    function handleSquareClick(clickedSquare: Square): void {
        const newSelectedSquare: Square | null = boardController.handleSquareClick(currentChessBoard, currentTurn, selectedSquare, clickedSquare);
        setSelectedSquare(newSelectedSquare);

        // setCurrentTurn(boardController.shiftTurn(currentTurn));

        const updatedChessBoard: Board = boardController.getUpdatedBoard(currentChessBoard);
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
                                    border: isSquareSelected(clickedSquare) ? '2px solid red' : '1px solid black',
                                }}
                            >
                                {boardController.isSquareOccupied(clickedSquare)
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