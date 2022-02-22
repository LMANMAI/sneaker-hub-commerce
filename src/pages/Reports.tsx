import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { selectSneakers } from "../features/sneakersSlice";
import { Stack } from "@chakra-ui/react";
import { NotFound } from ".";
import {
  Board,
  ContBoard,
  Graf,
  SubBarra,
  ContainerTorta,
  GraficoTorta,
  ConteinerLeyd,
  LeydAll,
  ColorBox,
  NameLeyd,
} from "./auxiliars";

const Reports = () => {
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
    setMenPorcentaje((sneakersmen?.length * 100) / sneakers.length);
    setWomPorcentaje((sneakerswoman?.length * 100) / sneakers.length);
  }, [sneakersmen, sneakerswoman]);
  if (
    sneakersmen === undefined &&
    sneakerswoman === undefined &&
    sneakers === undefined &&
    menporcentaje !== undefined &&
    womporcentaje !== undefined
  )
    return <NotFound />;

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
