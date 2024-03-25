import styled from "@emotion/styled";

export const DetailContainer = styled.div`
  .detail__bg {
    background-color: red;
    width: 100dvw;
    height: 200px;
    position: fixed;
    top: 60px;
    left: 0px;
    z-index: 0;
  }
  .detail__content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 0.5rem;
    min-height: 70dvh;
    background: #f9fafc;
    margin: 20px auto;
    width: 100%;
    border: 1px solid #c9c7c7;
    border-radius: 5px;
    position: relative;
    margin-top: 80px;
    flex-wrap: wrap;
  }
  .size_grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(90px, 0.33fr));

    li {
      width: 100%;
      text-align: center;
      padding: 5px 10px;
      border: 1px solid #ccc;
      cursor: pointer;
      font-size: 12px;
    }
  }
  @media (min-width: 768px) {
    .detail__content {
      flex-direction: row;
      margin-top: 165px;
      max-width: 80dvw;
      padding: 10px;
    }
  }
`;
