import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";

const Container = styled.div`
  margin: 0 auto;
  padding: 2rem;
`;

const Load = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Caption = styled.caption`
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: blod;
`;

const Button = styled.button`
  padding: 0 10px;
  margin: 0 5px;
  &[aria-current] {
    background-color: red;
  }
`;

function Home3({}) {
  const [isLoading, setIsLoading] = useState(false);
  const [coins, setCoins] = useState([]);
  const getCoins = async () => {
    const res = await axios.get("https://api.coinpaprika.com/v1/tickers");
    setCoins(res.data);
    setIsLoading(true);
  };
  useEffect(() => {
    getCoins();
  }, []);

  // 현재 페이지
  const [currentPage, setCurrentPage] = useState(1);

  // 현재 보여지는 아이템의 수
  const [perPageItems, setPerPageItems] = useState(35);

  // 한 페이지의 마지막 아이템 인덱스
  const indexOfLastPerPageItem = currentPage * perPageItems;

  // 한 페이지의 첫번째 아이템 인덱스
  const indexOfFirstPerPageItem = indexOfLastPerPageItem - perPageItems;

  // 버튼의 총 갯수
  const totalButtonNumber = Math.ceil(coins.length / perPageItems);

  // 버튼이 한 사이클당 몇개 보여질 건지(실질적으로 계산하기위한 설정)
  const [btnLimit, setButtonLimit] = useState(5);

  // 버튼의 한 사이클에서 가장 높은 수
  const [maxNumberOfBtnLimit, setMaxNumberOfBtnLimit] = useState(5);

  // 버튼의 한 사이클에서 가장 낮은 수
  const [minNumberOfBtnLimit, setMinNumberOfBtnLimit] = useState(0);

  const createHTMLBtns = () => {
    const result = [];
    for (let i = 1; i <= totalButtonNumber; i++) {
      if (i < maxNumberOfBtnLimit + 1 && i > minNumberOfBtnLimit) {
        result.push(
          <Button
            key={i + 1}
            aria-current={currentPage === i ? "page" : null}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </Button>,
        );
      }
    }
    return result;
  };

  const onHandlePrevBtn = () => {
    setCurrentPage(currentPage - 1);
    if (
      currentPage - 1 === minNumberOfBtnLimit &&
      minNumberOfBtnLimit ===
        Math.floor(totalButtonNumber / btnLimit) * btnLimit
    ) {
      setMaxNumberOfBtnLimit(currentPage - 1);
      setMinNumberOfBtnLimit(currentPage - 1 - btnLimit);
      console.log("여기가 스팟이다");
    } else if ((currentPage - 1) % btnLimit === 0) {
      setMaxNumberOfBtnLimit(maxNumberOfBtnLimit - btnLimit);
      setMinNumberOfBtnLimit(minNumberOfBtnLimit - btnLimit);
    }
  };

  const onHandleNextBtn = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxNumberOfBtnLimit) {
      setMaxNumberOfBtnLimit(maxNumberOfBtnLimit + btnLimit);
      setMinNumberOfBtnLimit(minNumberOfBtnLimit + btnLimit);
    }
  };

  return (
    <Container>
      {!isLoading ? (
        <Load>Loading...</Load>
      ) : (
        /* pagination */
        <div>
          <Button onClick={onHandlePrevBtn} disabled={currentPage === 1}>
            Prev
          </Button>
          {currentPage > btnLimit && (
            <>
              <Button
                onClick={() => {
                  setCurrentPage(1);
                  setMaxNumberOfBtnLimit(btnLimit);
                  setMinNumberOfBtnLimit(0);
                }}
              >
                1
              </Button>
              &hellip;
            </>
          )}
          {createHTMLBtns()}
          {currentPage <=
            Math.floor(totalButtonNumber / btnLimit) * btnLimit && (
            <>
              &hellip;
              <Button
                onClick={() => {
                  setCurrentPage(totalButtonNumber);
                  setMaxNumberOfBtnLimit(totalButtonNumber);
                  setMinNumberOfBtnLimit(
                    Math.floor(totalButtonNumber / btnLimit) * btnLimit,
                  );
                }}
              >
                {totalButtonNumber}
              </Button>
            </>
          )}
          <Button
            onClick={onHandleNextBtn}
            disabled={currentPage === totalButtonNumber}
          >
            Next
          </Button>

          {/* table */}
          <table border={"1"}>
            <Caption>Coins</Caption>
            <thead>
              <tr>
                <th>Rank</th>
                <th>ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {coins
                .slice(indexOfFirstPerPageItem, indexOfLastPerPageItem)
                .map((cV) => {
                  return (
                    <tr key={cV.id}>
                      <td>{cV.rank}</td>
                      <td>{cV.id}</td>
                      <td>{cV.name}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </Container>
  );
}

export default Home3;
