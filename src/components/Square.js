import React, { forwardRef } from "react";
import styled from "styled-components";
import XSvg from "./XSvg";
import OSvg from "./OSvg";

const SquareContainer = styled.div`
    align-items: center;
    background: none;
    color: #fff;
    display: flex;
    font-size: 60px;
    justify-content: center;
    transition: background 100ms ease;
    animation: fadeIn 100ms ease-out;

    svg,
    span {
        animation: fadeIn 100ms ease-out;
    }

    &:nth-child(2),
    &:nth-child(8) {
        border-left: 1.5px solid #fff;
        border-right: 1.5px solid #fff;
    }

    &:nth-child(4),
    &:nth-child(6) {
        border-bottom: 1.5px solid #fff;
        border-top: 1.5px solid #fff;
    }

    &:nth-child(5) {
        border: 1.5px solid #fff;
    }

    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
`;

const Square = ({ square, handleMove, currentPlayer, gameEndSquareLetter }, ref) => {
    return (
        <SquareContainer
            ref={ref}
            className="square"
            data-square={square}
            onMouseDown={(e) => {
                if (!currentPlayer) {
                    handleMove(e);
                }
            }}
        >
            {currentPlayer ? (
                currentPlayer === "x" ? (
                    <XSvg />
                ) : (
                    <OSvg />
                )
            ) : gameEndSquareLetter === "X" ? (
                <XSvg />
            ) : gameEndSquareLetter === "O" ? (
                <OSvg />
            ) : (
                <span>{gameEndSquareLetter}</span>
            )}
        </SquareContainer>
    );
};

export default forwardRef(Square);
