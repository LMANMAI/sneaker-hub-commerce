import styled from "@emotion/styled";
export const BrandDetailContainer = styled.div`
  position: relative;
  top: 155px;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  padding: 0 calc(3.5vw + 5px);
  background-color: #edeeef;
  border-radius: 5px;
  .background {
    background-color: #edeeef;
    position: fixed;
    height: 100vh;
    top: 0px;
    transition: opacity 200ms ease 0s;
    width: 100%;
    z-index: -3;
    left: 0;
  }

  .detail__bg {
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0.725;
    right: 0;
    z-index: -1;

    img {
      width: 100vw;
      height: 100vh;
      object-fit: cover;
      @media (max-width: 768px) {
        width: initial;
      }
    }
  }
`;
