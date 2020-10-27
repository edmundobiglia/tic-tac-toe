import React from "react";
import styled from "styled-components";
import XSvg from "./XSvg";
import OSvg from "./OSvg";

const ScoreBoardStyle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    position: absolute;
    top: 30px;
    left: 30px;

    &::after {
        @media (min-width: 760px) {
            opacity: 0;
        }
        transition: opacity 100ms ease, transform 100ms ease;
        content: "click to reset";
        font-size: 12px;
        position: absolute;
        top: 100%;
        left: 0;
        transform: translateY(-10%);
        padding: 3px;
        color: rgba(255, 255, 255, 0.8);
        width: 120px;
    }

    @media (min-width: 760px) {
        &:hover {
            &::after {
                opacity: 1;
                transform: translateY(0%);
            }
        }
    }
`;

const Column = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 45px;

    &:first-child {
        border-right: 1px solid rgba(255, 255, 255, 0.9);
    }
`;

const Row = styled.div`
    padding: 10px 15px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 300;

    &:first-child {
        border-bottom: 1px solid rgba(255, 255, 255, 0.9);
        color: #ffa0a8;
    }

    svg {
        width: 10px;
        height: 10px;
        margin: 5px 0;
    }

    svg line,
    svg circle {
        stroke: #ffa0a8;
        stroke-width: 10px;
    }
`;

const ScoreBoard = ({ xScore, oScore, setXScore, setOScore }) => {
    return (
        <ScoreBoardStyle
            onMouseDown={() => {
                setXScore(0);
                setOScore(0);
            }}
        >
            <Column>
                <Row>
                    <XSvg />
                </Row>
                <Row>{xScore}</Row>
            </Column>
            <Column>
                <Row>
                    <OSvg />
                </Row>
                <Row>{oScore}</Row>
            </Column>
        </ScoreBoardStyle>
    );
};

export default ScoreBoard;
