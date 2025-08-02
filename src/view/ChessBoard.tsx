import {GameController} from "../domain/controller/GameController.ts";
import type {Board} from "../domain/models/Board.ts";

export const ChessBoard = () => {
    const chessBoardController = new GameController();
    const [board, setBoard]: Board = useState(chessBoardController.chessBoardSetup());
    const [squares, setSquares]: Square[][] = board.boardSquares;

    return (
        <div>

        </div>
    );
}