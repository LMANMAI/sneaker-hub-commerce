import styled from "@emotion/styled";

import { IProps, IPorcentaje } from "../../interfaces";

export const ContBoard = styled.div`
  height: 80%;
  display: flex;
  justify-content: center;
`;
export const Board = styled.div`
  width: 100%;
  height: 450px;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
`;
export const SubBarra = styled.div<IProps>`
  width: 100%;
  transition: 550ms all ease-in;
  height: ${(props) => (props.height ? `${props.height}%` : "0%")};
  background: ${(props) => (props.color ? `${props.color}` : "#E50914")};
  border-radius: 3px 3px 0 0;
`;
export const Graf = styled.div`
  width: fit-content;
  height: 100%;
  float: right;
  margin-top: 0px;
  border-left: 2px solid #999999;
  border-bottom: 2px solid #999999;
  box-sizing: border-box;
  display: flex;
`;
export const ContainerTorta = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
`;
export const GraficoTorta = styled.div<IPorcentaje>`
  width: 300px;
  height: 300px;
  border-radius: 100%;
  transition: all 250ms ease;
  align-self: center;
  background-image: ${(props) =>
    props.menper && props.womper
      ? `conic-gradient(hsl(26, 100%, 55%) ${props.menper}%, #ffe600 ${props.womper}%)`
      : `conic-gradient(orange ${0}%, red ${0}%)`};
`;
export const ConteinerLeyd = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
`;
export const LeydAll = styled.span`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
export const ColorBox = styled.span`
  width: 15px;
  height: 15px;
  background-color: ${(props) => props.color};
  margin-right: 8px;
`;
export const NameLeyd = styled.p``;
