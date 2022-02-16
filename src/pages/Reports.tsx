import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectSneakers } from "../features/sneakersSlice";
import { ISneaker } from "../interfaces";
import styled from "@emotion/styled";
import { Stack } from "@chakra-ui/react";
interface IProps {
  height?: number;
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
  height: ${(props) => (props.height ? `${props.height}%` : "100%")};
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
const Reports = () => {
  const sneakers = useSelector(selectSneakers);
  const [mencount, setMenCount] = useState<ISneaker[]>();
  const [womcount, setWomCount] = useState<ISneaker[]>();

  const [menporcentaje, setMenPorcentaje] = useState<number>();
  const [womporcentaje, setWomPorcentaje] = useState<number>();

  const [menpamountprice, setMenPrice] = useState<number>();
  const [wompamountprice, setWomPrice] = useState<number>();

  useEffect(() => {
    //guardo los items por genero
    setMenCount(sneakers.filter((items) => items.genre === "MEN"));
    setWomCount(sneakers.filter((items) => items.genre === "WOMAN"));

    //saco los porcentajes
    if (mencount !== undefined && womcount !== undefined) {
      setMenPorcentaje((mencount?.length * 100) / sneakers.length);
      setWomPorcentaje((womcount?.length * 100) / sneakers.length);
    }
  }, [sneakers, mencount, womporcentaje]);

  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      justifyContent="center"
      p="10px"
    >
      <Stack alignItems="center" p="10px" marginY={2}>
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
                <SubBarra>
                  <div className="tag_g">{sneakers.length}</div>
                  <div className="tag_leyenda">Sneaker Totales</div>
                </SubBarra>
              </div>
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
      </Stack>
      <Stack alignItems="center" p="10px" marginY={2}>
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
      </Stack>
    </Stack>
  );
};

export default Reports;
