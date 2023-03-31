import styled from "styled-components";
import { useEffect, useState } from "react";

const Button = styled.button`
  &[aria-current] {
    background: red;
  }
`;

function AppPagination({ page, setPage, pageLimit, totalLenght, buttonLimit }) {
  const [currentPage, setCurrentPage] = useState(page);

  const totalPageNum = Math.ceil(totalLenght / pageLimit);
  // let firstPageNum = currentPage - (currentPage % 10) + 1;
  // let lastPageNum = currentPage - (currentPage % 10) + 10;

  // 버튼의 총 갯수를 구해야한다
  // 만약 총길이가 2500이다,
  // 한페이지의 보여지는 갯수는 20이다
  // 총 필요한 버튼은 = 10개다

  const offset = (currentPage - 1) * buttonLimit;

  return (
    <>
      {/* pagination */}
      <button
        onClick={() => {
          setPage(page - 1);
          // setCurrentPage(page - 2);
          console.log(page, "페이지");
        }}
        disabled={page === 1}
      >
        &lt;
      </button>

      {/* <Button
        onClick={() => setPage(firstPageNum)}
        aria-current={page === firstPageNum ? "page" : null}
      >
        {firstPageNum}
      </Button>
      {Array(9)
        .fill()
        .map((_cV, i) => {
          if (i <= 7) {
            return (
              <Button
                key={firstPageNum + i + 1}
                onClick={() => {
                  setPage(firstPageNum + i + 1);
                }}
                aria-current={page === firstPageNum + i + 1 ? "page" : null}
              >
                퍼{firstPageNum + i + 1}
              </Button>
            );
          } else if (i >= 8) {
            return (
              <Button
                key={lastPageNum + i + 1}
                onClick={() => setPage(lastPageNum)}
                aria-current={page === lastPageNum ? "page" : null}
              >
                라{lastPageNum}
              </Button>
            );
          }
        })} */}

      {Array(totalPageNum)
        .fill()
        .map((_cV, i) => {
          return (
            <Button
              key={i + 1}
              onClick={() => {
                setPage(i + 1);
                console.log(page, "페이지");
              }}
              aria-current={page === i + 1 ? "page" : null}
            >
              퍼{i + 1}
            </Button>
          );
        })}
      <button
        onClick={() => {
          setPage(page + 1);
          // setCurrentPage(page);
          console.log(page, "페이지");
        }}
        disabled={page === totalPageNum}
      >
        &gt;
      </button>
    </>
  );
}

export default AppPagination;
