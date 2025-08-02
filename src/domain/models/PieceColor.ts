
export const PieceColor = {
    White: "White",
    Black: "Black"
} as const;

export type PieceColor = typeof PieceColor[keyof typeof PieceColor];
