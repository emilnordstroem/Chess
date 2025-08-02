
export const PieceType = {
    Pawn: "Pawn",
    Rook: "Rook",
    Knight: "Knight",
    Bishop: "Bishop",
    Queen: "Queen",
    King: "King"
} as const;

export type PieceType = typeof PieceType[keyof typeof PieceType];