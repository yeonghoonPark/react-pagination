import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Button = styled.button`
  &[aria-current] {
    background: red;
  }
`;

function Home({}) {
  console.log("[Home]");

  const [coins, setCoins] = useState([]);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const getCoins = async () => {
    console.log("[getData]");
    const url = "https://api.coinpaprika.com/v1/tickers";
    const res = await axios.get(url);
    // console.log(res.data);
    setCoins(res.data);
  };

  const arr = [1, 2, 3, 4, 5];
  arr.fill();

  useEffect(() => {
    getCoins();
  }, []);

  // pagination algorithm

  // 1. 게시물을 나눠서 표시할 때 총 몇개의 페이지가 필요한가?
  // - 총 게시물수를 페이지당 표시 할 게시물 수로 나눈 후 올림한다.
  // ex, 총 37개의 게시물이 있고 페이지당 표시 할 게시물이 10이라면 37/10 = 3.7, 3.7올림 = 4

  // 2. 현재 페이지 번호를 기준으로 표시해줘야 할 게시물들의 범위(offset), 즉 해당 페이지의 첫 게시물의 index를 구해야한다.
  // - 페이지 번호에서 1을 뺀 후 페이지당 표시 할 게시물의 수를 곱하면 페이지당 첫 게시물의 index를 구할 수 있다.
  // ex, 총 37개의 게시물이 있고 페이지당 표시 할 게시물이 10이라면
  // (1 - 1) * 10 = 0
  // (2 - 1) * 10 = 10
  // (3 - 1) * 10 = 20

  return (
    <>
      <table border={"1"}>
        <caption>Coins</caption>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Beta Value</th>
          </tr>
        </thead>
        <tbody>
          {coins.slice(offset, offset + limit).map((cV) => {
            return (
              <tr key={cV?.id}>
                <td>{cV?.id}</td>
                <td>{cV?.name}</td>
                <td>{cV?.symbol}</td>
                <td>{cV?.beta_value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button>감소</button>
      {Array(Math.ceil(coins.length / limit))
        .fill()
        .map((_, i) => {
          return (
            <Button key={i + 1} aria-current={page === i + 1 ? "page" : null}>
              {i + 1}
            </Button>
          );
        })}
      <button>증가</button>
    </>
  );
}

export default Home;