import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Square from "./Square";
import ScoreBoard from "./ScoreBoard";

const GridContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    pointer-events: ${(props) => (props.disable ? "none" : "auto")};
    width: 100vw;

    svg {
        height: 75px;
        width: 75px;
    }

    svg line,
    svg circle {
        stroke: #ffa0a8;
        transition: stroke 100ms ease;
    }

    .pink-background {
        background: #ffa0a8;

        svg line,
        svg circle {
            stroke: #002155;
        }
    }
`;

const Grid = styled.div`
    display: grid;
    grid-template-areas: ". . ." ". . ." ". . .";
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    height: 360px;
    position: relative;
    width: 360px;
`;

const defaultGrid = {
    "0": null,
    "1": null,
    "2": null,
    "3": null,
    "4": null,
    "5": null,
    "6": null,
    "7": null,
    "8": null,
};

const winningCombinations = [
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7", "8"],
    ["0", "3", "6"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["0", "4", "8"],
    ["6", "4", "2"],
];

const TicTacToe = () => {
    const [currentPlayer, setCurrentPlayer] = useState("o");
    const [xMoves, setXMoves] = useState([]);
    const [oMoves, setOMoves] = useState([]);
    const [xScore, setXScore] = useState(0);
    const [oScore, setOScore] = useState(0);
    const [totalMoves, setTotalMoves] = useState(0);
    const [winner, setWinner] = useState(null);
    const [gridSquares, setGridSquares] = useState(defaultGrid);
    const gridSquaresRef = useRef([]);

    const endGame = (timeout) => {
        setTotalMoves(0);
        setCurrentPlayer("o");
        setXMoves([]);
        setOMoves([]);
        setTimeout(() => {
            setGridSquares(defaultGrid);
            setWinner(null);
        }, timeout || 3000);
    };

    useEffect(() => {
        const currentPlayerMoves = currentPlayer === "x" ? xMoves : oMoves;
        const setCurrentPlayerScore = currentPlayer === "x" ? setXScore : setOScore;

        if (currentPlayerMoves.length >= 3) {
            const movesMatchAnyWinningCombination = winningCombinations.map((winningCombination) =>
                winningCombination.every((winningMove) => currentPlayerMoves.includes(winningMove))
            );

            if (movesMatchAnyWinningCombination.includes(true)) {
                /* "setWinner(false)" because setWinner will be set to the current
                 *  winner ONLY AFTER animating the winning squares. */
                setWinner(false);
                endGame();

                let squareBackgroundColorAnimationDelay = 0;

                const indexOfWinningCombination = movesMatchAnyWinningCombination.indexOf(true);

                let winningCombination = winningCombinations[indexOfWinningCombination].sort();

                winningCombination.forEach((winningMove) => {
                    const indexOfWinningSquare = gridSquaresRef.current.findIndex(
                        (gridSquare) => gridSquare.dataset.square === winningMove
                    );

                    setTimeout(() => {
                        gridSquaresRef.current[indexOfWinningSquare].classList.add("pink-background");
                    }, squareBackgroundColorAnimationDelay);

                    squareBackgroundColorAnimationDelay += 50;
                });

                setTimeout(() => {
                    setWinner(currentPlayer);

                    gridSquaresRef.current.forEach((square, squareIndex) => {
                        if (squareIndex === 1) {
                            square.classList.add("pink-background");
                        } else {
                            square.classList.remove("pink-background");
                        }
                    });
                }, 1200);

                setTimeout(() => {
                    gridSquaresRef.current.forEach((square) => {
                        square.classList.remove("pink-background");
                    });

                    winningCombination = [];
                }, 3000);

                setCurrentPlayerScore((previousScore) => previousScore + 1);
                return;
            }

            if (totalMoves === 9) {
                setTimeout(() => {
                    setWinner("nobody");
                }, 600);

                endGame(2500);
                return;
            }
        }

        setCurrentPlayer((previousPlayer) => (previousPlayer === "o" ? "x" : "o"));
    }, [xMoves, oMoves]); //eslint-disable-line

    const handleMove = (e) => {
        const clickedSquare = e.target.dataset.square;

        setTotalMoves(totalMoves + 1);

        setGridSquares({
            ...gridSquares,
            [clickedSquare]: currentPlayer,
        });

        const setCurrentPlayerMoves = currentPlayer === "x" ? setXMoves : setOMoves;

        setCurrentPlayerMoves((previousMoves) => [...previousMoves, clickedSquare]);
    };

    const boardAfterGameEnd =
        winner === "nobody"
            ? ["n", "o", "w", "i", "n", "n", "e", "r", "!"]
            : ["", winner === "x" ? "X" : "O", "", "h", "a", "s", "w", "o", "n"];

    return (
        <>
            <ScoreBoard xScore={xScore} oScore={oScore} setXScore={setXScore} setOScore={setOScore} />

            <GridContainer disable={winner !== null ? true : false}>
                <Grid>
                    {Object.keys(gridSquares).map((squareKey, squareIndex) => (
                        <Square
                            key={squareKey}
                            ref={(square) => (gridSquaresRef.current[squareIndex] = square)}
                            square={squareKey}
                            handleMove={handleMove}
                            currentPlayer={winner ? null : gridSquares[squareKey]}
                            gameEndSquareLetter={winner ? boardAfterGameEnd[squareIndex] : null}
                        />
                    ))}
                </Grid>
            </GridContainer>
        </>
    );
};

export default TicTacToe;
