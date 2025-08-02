import {Square} from "./Square.ts";

export class Board {
    private _boardSquares: Square[][];

    constructor () {
        this._boardSquares = this.createBoardSquares();
    }

    createBoardSquares() : Square[][] {
        const boardSquares: Square[][] = [];
        const boardIndexes : number[] = [1, 2, 3, 4, 5, 6, 7, 8];

        for (let rankIndex : number = 0; rankIndex < boardIndexes.length; rankIndex++) {
            const row: Square[] = [];
            for (let fileIndex = 0; fileIndex < boardIndexes.length; fileIndex++) {
                row.push(new Square(boardIndexes[fileIndex], boardIndexes[rankIndex]));
            }
            boardSquares.push(row);
        }

        return boardSquares;
    }

    accessBoardSquare(file : number, rank : number) : Square {
        return this._boardSquares[file][rank];
    }

    get boardSquares(): Square[][] {
        return this._boardSquares;
    }

    set boardSquares(boardSquares: Square[][]) {
        this._boardSquares = boardSquares;
    }

}