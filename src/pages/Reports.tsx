import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { selectSneakers } from "../features/sneakersSlice";
import { ISneaker } from "../interfaces";
import styled from "@emotion/styled";
import { Stack } from "@chakra-ui/react";

interface IProps {
  height?: number | string;
}
interface IPorcentaje {
  menper?: number;
  womper?: number;
}

const ContBoard = styled.div`
  height: 80%;
  display: flex;
  justify-content: center;
`;
const Board = styled.div`
  width: 100%;
  height: 450px;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
`;
const SubBarra = styled.div<IProps>`
  width: 100%;
  transition: 550ms all ease-in;
  height: ${(props) => (props.height ? `${props.height}%` : "0%")};
  background: ${(props) => (props.color ? `${props.color}` : "#E50914")};
  border-radius: 3px 3px 0 0;
`;
const Graf = styled.div`
  width: fit-content;
  height: 100%;
  float: right;
  margin-top: 0px;
  border-left: 2px solid #999999;
  border-bottom: 2px solid #999999;
  box-sizing: border-box;
  display: flex;
`;
const ContainerTorta = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
`;
const GraficoTorta = styled.div<IPorcentaje>`
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
const ConteinerLeyd = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
`;
const LeydAll = styled.span`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
const ColorBox = styled.span`
  width: 15px;
  height: 15px;
  background-color: ${(props) => props.color};
  margin-right: 8px;
`;
const NameLeyd = styled.p``;

const Reports = () => {
  //const sneakers = useSelector(selectSneakers);
  const sneakers = useSelector(selectSneakers);

  const [menporcentaje, setMenPorcentaje] = useState<number>(0);
  const [womporcentaje, setWomPorcentaje] = useState<number>(0);

  const sneakersmen = useMemo(() => {
    return sneakers.filter((items) => items.genre === "MEN" && items);
  }, [sneakers]);

  const sneakerswoman = useMemo(() => {
    return sneakers.filter((items) => items.genre === "WOMAN" && items);
  }, [sneakers]);

  useEffect(() => {
    if (
      sneakersmen !== undefined &&
      sneakerswoman !== undefined &&
      sneakers !== undefined
    ) {
      if (menporcentaje !== undefined && womporcentaje !== undefined) {
        setMenPorcentaje((sneakersmen?.length * 100) / sneakers.length);
        setWomPorcentaje((sneakerswoman?.length * 100) / sneakers.length);
      }
    }
  }, [sneakersmen, sneakerswoman]);
  if (
    sneakersmen === undefined &&
    sneakerswoman === undefined &&
    sneakers === undefined &&
    menporcentaje !== undefined &&
    womporcentaje !== undefined
  )
    return <p>cargando...</p>;
  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      justifyContent="center"
      p="10px"
    >
      <Stack
        alignItems="center"
        marginY={2}
        w={{ base: "100%", md: "33%" }}
        flex={1}
      >
        <h3>Grafico de cantidad</h3>
        <Board>
          <div className="sep_board"></div>
          <ContBoard>
            <div className="tag_board">
              <div className="sub_tag_board">
                <div>100%</div>
                <div>90%</div>
                <div>80%</div>
                <div>70%</div>
                <div>60%</div>
                <div>50%</div>
                <div>40%</div>
                <div>30%</div>
                <div>20%</div>
                <div>10%</div>
              </div>
            </div>
            {menporcentaje | womporcentaje ? (
              <>
                <Graf className="graf_board">
                  <div className="barra">
                    <SubBarra height={100}>
                      <div className="tag_g">{100} %</div>
                      <div className="tag_leyenda">Sneaker Totales</div>
                    </SubBarra>
                  </div>
                  <div className="barra">
                    <SubBarra height={menporcentaje} color="hsl(26, 100%, 55%)">
                      <div className="tag_g">{menporcentaje.toFixed(2)} %</div>
                      <div className="tag_leyenda">Men sneakers</div>
                    </SubBarra>
                  </div>
                  <div className="barra">
                    <SubBarra height={womporcentaje} color="#ffe600">
                      <div className="tag_g">{womporcentaje.toFixed(2)} %</div>
                      <div className="tag_leyenda">Woman Sneakers</div>
                    </SubBarra>
                  </div>
                </Graf>
              </>
            ) : null}
          </ContBoard>
          <div className="sep_board"></div>
        </Board>
      </Stack>

      <Stack
        alignItems="center"
        marginY={2}
        w={{ base: "100%", md: "33%" }}
        flex={1}
      >
        <h3>Grafico de torta</h3>

        <ContainerTorta>
          <GraficoTorta
            menper={menporcentaje}
            womper={womporcentaje}
          ></GraficoTorta>
          <ConteinerLeyd>
            <LeydAll>
              <ColorBox color="hsl(26, 100%, 55%)"></ColorBox>
              <NameLeyd>Men {menporcentaje.toFixed(2)}%</NameLeyd>
            </LeydAll>
            <LeydAll>
              <ColorBox color="#ffe600"></ColorBox>
              <NameLeyd>Women {womporcentaje.toFixed(2)}%</NameLeyd>
            </LeydAll>
          </ConteinerLeyd>
        </ContainerTorta>
      </Stack>
    </Stack>
  );
};

export default Reports;
