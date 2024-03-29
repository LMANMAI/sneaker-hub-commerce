import { Button } from "@chakra-ui/react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { checkFavs, removeFav } from "../../functions/Products";
import { useEffect, useState } from "react";
import { ISneaker } from "../../interfaces";
import { selectSneakerActive } from "../../features/sneakersSlice";

const FavButton = ({ variant = "primary" }: { variant?: string }) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const currentUser = useSelector(selectUser);
  const sneakerActive = useSelector(selectSneakerActive);

  const handleAddStore = async (user: any, sneaker: ISneaker) => {
    verificated(user, sneaker);
    setToggle(true);
  };
  const deleteFav = async (sneaker: ISneaker) => {
    setToggle(false);
    removeFav(currentUser, sneaker);
  };
  const verificated = async (user: any, sneaker: ISneaker) => {
    const res = await checkFavs(user, sneaker);
    console.log(res);
    if (res === "existe") {
      console.log("existe");
      setToggle(true);
    }
  };

  useEffect(() => {
    if (sneakerActive) {
      verificated(currentUser, sneakerActive);
    }
  }, []);

  return (
    <div>
      {currentUser && (
        <>
          {toggle ? (
            <Button
              fontSize="2xl"
              fontWeight="bold"
              variant={variant}
              size="sm"
              onClick={() => {
                if (!currentUser) {
                  return;
                } else if (sneakerActive) {
                  deleteFav(sneakerActive);
                }
              }}
            >
              <MdFavorite />
            </Button>
          ) : (
            <Button
              fontSize="2xl"
              fontWeight="bold"
              variant={variant}
              size="sm"
              onClick={() => {
                if (!currentUser) {
                  return;
                } else if (sneakerActive) {
                  handleAddStore(currentUser, sneakerActive);
                }
              }}
            >
              <MdFavoriteBorder />
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default FavButton;
