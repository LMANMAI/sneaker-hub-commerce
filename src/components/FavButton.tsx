import React from "react";

const FavButton = () => {
  return (
    <>
      {currentUser && toggle ? (
        <Button
          fontSize="2xl"
          fontWeight="bold"
          color="primary.500"
          size="lg"
          onClick={() => {
            if (!currentUser) {
              setShowMessage(true);
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
          color="primary.500"
          size="lg"
          onClick={() => {
            if (!currentUser) {
              setShowMessage(true);
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
  );
};

export default FavButton;
