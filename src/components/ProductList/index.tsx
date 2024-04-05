import { Grid, Skeleton } from "@chakra-ui/react";
import { ISneaker } from "../../interfaces";
import { CardComponent } from "../../components";

const ProductList = ({
  products,
  loadingMore,
  skeletonCount = 5,
  margin = "50px 0px",
}: {
  products: ISneaker[];
  loadingMore: boolean;
  skeletonCount?: number;
  margin?: string;
}) => {
  return (
    <Grid
      templateColumns={{
        base: "repeat(auto-fit, minmax(150px, 1fr))",
        md: "repeat(auto-fit, minmax(210px, 1fr))",
      }}
      gap={4}
      margin={margin}
    >
      {products &&
        products?.map((sneaker: ISneaker) => (
          <CardComponent sneaker={sneaker} />
        ))}
      {loadingMore &&
        Array.from({ length: skeletonCount }, (_, index) => (
          <Skeleton key={index} height={330} />
        ))}
    </Grid>
  );
};

export default ProductList;
