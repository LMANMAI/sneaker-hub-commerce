import { Select, Text } from "@chakra-ui/react";
import { useRequest } from "../hooks/useRequest";
import SpinKit from "./SpinKit";
const SelectList = (props: {
  tittle: string;
  url: string;
  handleFuncion: any;
}) => {
  const { data, loading } = useRequest(props.url);
  if (!data) return null;
  let id = `select-${props.tittle}`;

  return (
    <>
      <Text as="label" textTransform="capitalize" htmlFor={id}>
        {props.tittle}
      </Text>
      {loading ? (
        <SpinKit />
      ) : (
        <Select name={id} id={id} onChange={props.handleFuncion}>
          <option value="">Elige un {props.tittle}</option>
          {data[props.tittle]
            .sort(function (a: any, b: any) {
              if (a.nombre > b.nombre) {
                return 1;
              }
              if (a.nombre < b.nombre) {
                return -1;
              }
              return 0;
            })
            .map((item: any) => (
              <option key={item.id} value={item.name}>
                {item.nombre}
              </option>
            ))}
        </Select>
      )}
    </>
  );
};

export default SelectList;
