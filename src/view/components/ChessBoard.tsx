import {GameController} from "../../domain/controller/GameController.ts";
import {Board} from "../../domain/models/Board.ts";
import {useState} from "react";
import {Square} from "../../domain/models/Square.ts";

const gameMechanics: GameController = new GameController();

export const ChessBoard = () => {
    const [currentChessBoard, setCurrentChessBoard] = useState<Board>(gameMechanics.boardSetup());
    const [selectedSquare, setSelectedSquare] = useState<{file: number, rank: number} | null>(null);

    function handleSquareClick(clickedSquare: Square): void {
        const newSelectedSquare = gameMechanics.handleSquareClick(currentChessBoard, selectedSquare, clickedSquare);
        setSelectedSquare(newSelectedSquare);

        const updatedBoard: Board = gameMechanics.getUpdatedBoard(currentChessBoard);
        setCurrentChessBoard(updatedBoard);
    }

    return (
        <div className="chessboard" style={{ display: 'flex', flexDirection: 'column' }}>
            {currentChessBoard.boardSquares.map((rowOfSquares, rankIndex) => (
                <div key={rankIndex} style={{ display: 'flex' }}>
                    {rowOfSquares.map((clickedSquare: Square, fileIndex) => {
                        const isDark = (fileIndex + rankIndex) % 2 === 1;
                        const backgroundColor = isDark ? '#769656' : '#eeeed2';

                        const isSelected = selectedSquare &&
                            selectedSquare.file === clickedSquare.file &&
                            selectedSquare.rank === clickedSquare.rank;

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
                                    border: isSelected ? '2px solid red' : '1px solid black',
                                }}
                            >
                                {gameMechanics.isSquareOccupied(clickedSquare)
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