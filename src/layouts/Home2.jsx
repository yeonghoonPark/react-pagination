import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

// import AppPagination2 from "../components/AppPagination2";

const Button = styled.button`
  padding: 10px;
  border: 1px solid white;

  &[aria-current] {
    background: red;
  }
`;

const renderData = (data) => {
  return (
    <>
      {data.map((cV) => {
        return (
          <tr key={cV?.id}>
            <td>{cV?.rank}</td>
            <td>{cV?.id}</td>
            <td>{cV?.name}</td>
            <td>{cV?.symbol}</td>
            <td>{cV?.beta_value}</td>
          </tr>
        );
      })}
    </>
  );
};

function Home({}) {
  console.log("[Home]");

  // 데이터
  const [data, setData] = useState([]);

  // 현재페이지
  const [currentPage, setCurrentPage] = useState(1);

  // 보이는 아이템 수
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // 한 사이클당 보이는 버튼의 갯수
  const [pageNumberLimit, setPageNumberLimit] = useState(5);

  // 한 사이클에서 보이는 버튼의 가장 높은 수
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);

  // 한 사이클에서 보이는 버튼의 가장 낮은 수
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const handleClick = (e) => {
    setCurrentPage(Number(e.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <>
          <Button
            key={number}
            id={number}
            onClick={handleClick}
            aria-current={currentPage === number ? "page" : null}
          >
            {number}
          </Button>
        </>
      );
    } else {
      return null;
    }
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const getCoins = async () => {
    console.log("[getData]");
    const url = "https://api.coinpaprika.com/v1/tickers";
    const res = await axios.get(url);
    console.log(res.data);
    setData(res.data);
  };

  useEffect(() => {
    getCoins();
  }, []);

  const handleNextButton = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevButton = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementButton = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementButton = <Button onClick={handleNextButton}>&hellip;</Button>;
  }

  let pageDecrementButton = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementButton = <Button onClick={handlePrevButton}>&hellip;</Button>;
  }

  return (
    <>
      <h1>Home2</h1>
      <Button onClick={handlePrevButton} disabled={currentPage === pages[0]}>
        Prev
      </Button>

      {pageDecrementButton}
      {renderPageNumbers}
      {pageIncrementButton}

      <Button
        onClick={handleNextButton}
        disabled={currentPage === pages[pages.length - 1]}
      >
        Next
      </Button>
      <table border={"1"}>
        <caption>Coins</caption>
        <thead>
          <tr>
            <th>Rank</th>
            <th>ID</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Beta Value</th>
          </tr>
        </thead>
        <tbody>{renderData(currentItems)}</tbody>
      </table>
    </>
  );
}

export default Home;
