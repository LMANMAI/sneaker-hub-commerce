import { Input, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { SelectList } from "./";
const SelectBody = (props: { setObjetc: Function }) => {
  const [prov, setProv] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [direcc, setDirecc] = useState({
    calle: "",
    alt: "",
    piso: "",
    dpto: "",
  });
  // const [adress, setAdress] = useState({
  //   prov: "",
  //   mun: "",
  //   locald: "",
  //   direc: {},
  // });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setDirecc({
      ...direcc,
      [name]: value,
    });
  };

  useEffect(() => {
    props.setObjetc({
      prov,
      mun: municipio,
      locald: localidad,
      direc: direcc,
    });
  }, [prov, municipio, localidad, direcc]);
  return (
    <Stack spacing={3}>
      <SelectList
        url="https://apis.datos.gob.ar/georef/api/provincias"
        tittle="provincias"
        handleFuncion={(e: any) => setProv(e.target.value)}
      />
      {prov && (
        <SelectList
          url={`https://apis.datos.gob.ar/georef/api/municipios?provincia=${prov}&campos=id,nombre&max=300`}
          tittle="municipios"
          handleFuncion={(e: any) => setMunicipio(e.target.value)}
        />
      )}
      {municipio && (
        <SelectList
          url={`https://apis.datos.gob.ar/georef/api/localidades?provincia=${prov}&departamento=${municipio}&max=300`}
          tittle="localidades"
          handleFuncion={(e: any) => setLocalidad(e.target.value)}
        />
      )}
      {localidad && (
        <Stack direction="row">
          <Stack>
            <Text as="label" textTransform="capitalize" htmlFor="calle">
              Direccion
            </Text>
            <Input type="text" name="calle" onChange={(e) => handleChange(e)} />
          </Stack>
          <Stack>
            <Text as="label" textTransform="capitalize" htmlFor="alt">
              Altura
            </Text>
            <Input type="text" name="alt" onChange={(e) => handleChange(e)} />
          </Stack>
          <Stack direction="row" flex="1">
            <Stack>
              <Text as="label" textTransform="capitalize" htmlFor="piso">
                Piso
              </Text>
              <Input
                p={0}
                textAlign="center"
                type="text"
                name="piso"
                onChange={(e) => handleChange(e)}
              />
            </Stack>
            <Stack>
              <Text as="label" textTransform="capitalize" htmlFor="dpto">
                Dpto
              </Text>
              <Input
                p={0}
                textAlign="center"
                type="text"
                name="dpto"
                onChange={(e) => handleChange(e)}
              />
            </Stack>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default SelectBody;
