import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectSneakers } from "../features/sneakersSlice";
import { ISneaker } from "../interfaces";
import styled from "@emotion/styled";
import { Stack } from "@chakra-ui/react";

interface IProps {
  height?: number | string;
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
  background: linear-gradient(45deg, hsl(26, 100%, 55%), hsl(25, 100%, 94%));
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
const GraficoTorta = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 100%;
  background-image: conic-gradient(blue 60%, red 40%);
`;
const ConteinerLeyd = styled.div`
  display: flex;
  justify-content: space-around;
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
  background-color: red;
  margin-right: 8px;
`;
const NameLeyd = styled.p``;

const Reports = () => {
  const sneakers = useSelector(selectSneakers);

  const [mencount, setMenCount] = useState<ISneaker[]>();
  const [womcount, setWomCount] = useState<ISneaker[]>();

  const [menporcentaje, setMenPorcentaje] = useState<number>(0);
  const [womporcentaje, setWomPorcentaje] = useState<number>(0);

  useEffect(() => {
    setMenCount(sneakers.filter((items) => items.genre === "MEN" && items));
    setWomCount(sneakers.filter((items) => items.genre === "WOMAN" && items));
  }, [sneakers]);

  useEffect(() => {
    if (mencount !== undefined && womcount !== undefined) {
      if (menporcentaje !== undefined && womporcentaje !== undefined) {
        setMenPorcentaje((mencount?.length * 100) / sneakers.length);
        setWomPorcentaje((womcount?.length * 100) / sneakers.length);
      }
    }
  }, [mencount, womcount]);

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
            <Graf className="graf_board">
              <div className="barra">
                <SubBarra height={100}>
                  <div className="tag_g">{sneakers.length}</div>
                  <div className="tag_leyenda">Sneaker Totales</div>
                </SubBarra>
              </div>
              {menporcentaje | womporcentaje ? (
                <>
                  <div className="barra">
                    <SubBarra height={menporcentaje}>
                      <div className="tag_g">{mencount?.length}</div>
                      <div className="tag_leyenda">Men sneakers</div>
                    </SubBarra>
                  </div>
                  <div className="barra">
                    <SubBarra height={womporcentaje}>
                      <div className="tag_g">{womcount?.length}</div>
                      <div className="tag_leyenda">Woman Sneakers</div>
                    </SubBarra>
                  </div>
                </>
              ) : null}
            </Graf>
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
          <GraficoTorta></GraficoTorta>
          <ConteinerLeyd>
            <LeydAll>
              <ColorBox></ColorBox>
              <NameLeyd>Men</NameLeyd>
            </LeydAll>
            <LeydAll>
              <ColorBox></ColorBox>
              <NameLeyd>Women</NameLeyd>
            </LeydAll>
          </ConteinerLeyd>
        </ContainerTorta>
      </Stack>

      {/* <Stack
        alignItems="center"
        marginY={2}
        w={{ base: "100%", md: "33%" }}
        flex={1}
      >
        <h3>Grafico de precios</h3>
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
            <Graf className="graf_board">
              <div className="barra">
                <SubBarra height={menporcentaje}>
                  <div className="tag_g">{mencount?.length}</div>
                  <div className="tag_leyenda">Men sneakers</div>
                </SubBarra>
              </div>
              <div className="barra">
                <SubBarra height={womporcentaje}>
                  <div className="tag_g">{womcount?.length}</div>
                  <div className="tag_leyenda">Woman Sneakers</div>
                </SubBarra>
              </div>
            </Graf>
          </ContBoard>
          <div className="sep_board"></div>
        </Board>
      </Stack> */}
    </Stack>
  );
};

export default Reports;
