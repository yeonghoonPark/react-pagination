import styled from "styled-components";
import { useState } from "react";

const Btn = styled.button`
  width: 52px;
  height: 36px;

  margin: 0 6px;
  border-radius: 5px;
  border: 1px solid transparent;
  cursor: pointer;
  user-select: none;

  background-color: #e495e4;
  font-family: "Josefin Sans", sans-serif;

  &.move {
    width: 100px;
  }

  &:hover {
    background-color: #ff33cc;
  }

  &[aria-current] {
    background-color: #ff33cc;
  }

  &[disabled] {
    cursor: default;
    &:hover {
      background-color: #e495e4;
    }
  }
`;

const HiddenBtnContainer = styled.div`
  display: inline-block;
  &.hidden {
    display: none;
  }
`;

function AppPagination3({
  totalLength,
  perPageItems,
  currentPage,
  setCurrentPage,
}) {
  console.log("[AppPagination3]");
  const totalBtnNum = Math.ceil(totalLength / perPageItems);
  const btnLimit = 5;
  const [maxNumOfBtnLimit, setMaxNumOfBtnLimit] = useState(5);
  const [minNumOfBtnLimit, setMinNumOfBtnLimit] = useState(0);
  const firstIndexOfLastPageItem =
    Math.floor(totalBtnNum / btnLimit) * btnLimit;

  const createHTMLBtns = () => {
    const result = [];
    for (let i = 1; i <= totalBtnNum; i++) {
      if (i < maxNumOfBtnLimit + 1 && i > minNumOfBtnLimit) {
        result.push(
          <Btn
            key={i + 1}
            aria-current={currentPage === i ? "page" : null}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </Btn>,
        );
      }
    }
    return result;
  };

  const onHandlePrevBtn = () => {
    setCurrentPage(currentPage - 1);
    if (
      currentPage - 1 === minNumOfBtnLimit &&
      minNumOfBtnLimit === Math.floor(totalBtnNum / btnLimit) * btnLimit
    ) {
      setMaxNumOfBtnLimit(currentPage - 1);
      setMinNumOfBtnLimit(currentPage - 1 - btnLimit);
    } else if ((currentPage - 1) % btnLimit === 0) {
      setMaxNumOfBtnLimit(maxNumOfBtnLimit - btnLimit);
      setMinNumOfBtnLimit(minNumOfBtnLimit - btnLimit);
    }
  };

  const onHandleNextBtn = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxNumOfBtnLimit) {
      setMaxNumOfBtnLimit(maxNumOfBtnLimit + btnLimit);
      setMinNumOfBtnLimit(minNumOfBtnLimit + btnLimit);
    }
  };

  const onHandleHiddenBtn = (
    currentPage,
    maxNumOfBtnLimit,
    minNumOfBtnLimit,
  ) => {
    setCurrentPage(currentPage);
    setMaxNumOfBtnLimit(maxNumOfBtnLimit);
    setMinNumOfBtnLimit(minNumOfBtnLimit);
  };
  return (
    <>
      <Btn
        className='move'
        onClick={onHandlePrevBtn}
        disabled={currentPage === 1}
      >
        &lt; Prev
      </Btn>

      <HiddenBtnContainer
        className={currentPage - 1 < btnLimit ? "hidden" : null}
      >
        <Btn
          onClick={() => {
            onHandleHiddenBtn(1, btnLimit, 0);
          }}
        >
          1
        </Btn>
        &hellip;
      </HiddenBtnContainer>

      {createHTMLBtns()}

      {totalBtnNum * perPageItems === totalLength ? (
        <HiddenBtnContainer
          className={
            maxNumOfBtnLimit === totalBtnNum &&
            minNumOfBtnLimit === totalBtnNum - btnLimit
              ? "hidden"
              : null
          }
        >
          &hellip;
          <Btn
            onClick={() => {
              onHandleHiddenBtn(
                totalBtnNum,
                totalBtnNum,
                totalBtnNum - btnLimit,
              );
            }}
          >
            {totalBtnNum}
          </Btn>
        </HiddenBtnContainer>
      ) : (
        <HiddenBtnContainer
          className={
            minNumOfBtnLimit === firstIndexOfLastPageItem ? "hidden" : null
          }
        >
          &hellip;
          <Btn
            onClick={() => {
              onHandleHiddenBtn(
                totalBtnNum,
                totalBtnNum,
                firstIndexOfLastPageItem,
              );
            }}
          >
            {totalBtnNum}
          </Btn>
        </HiddenBtnContainer>
      )}

      <Btn
        className='move'
        onClick={onHandleNextBtn}
        disabled={currentPage === totalBtnNum}
      >
        Next &gt;
      </Btn>
    </>
  );
}

export default AppPagination3;
