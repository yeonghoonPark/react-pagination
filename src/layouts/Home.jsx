import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import AppPagination from "../components/AppPagination";

const Container = styled.div`
  margin: 0 auto;
  padding: 2rem;
`;

const LoadingTag = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Table = styled.table`
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  border: 3px solid purple;
  background-color: #ff33cc;

  & caption {
    padding: 20px;
    font-style: italic;
    font-size: 1rem;
    caption-side: bottom;
    color: #666;
    text-align: right;
    letter-spacing: 18px;
  }

  & thead {
    color: white;
    text-shadow: 1px 1px 1px black;
    th {
      padding: 12px;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.1),
        rgba(0, 0, 0, 0.5)
      );
      border: 3px solid purple;
      font-family: "Permanent Marker", cursive;
      font-style: italic;
      font-size: 1.2rem;
    }
    th:nth-child(1) {
      width: 10%;
    }
    th:nth-child(2) {
      width: 15%;
    }
    th:nth-child(3) {
      width: 30%;
    }
    th:nth-child(4) {
      width: 35%;
    }
  }

  & tbody {
    tr:nth-child(odd) {
      background-color: #ff33cc;
    }
    tr:nth-child(even) {
      background-color: #e495e4;
    }
    td {
      padding: 18px;
      text-align: center;
      font-family: "Josefin Sans", sans-serif;
    }
  }
`;

const PaginationConatiner = styled.div`
  text-align: center;
`;

function Home3({}) {
  console.log("[Home3]");
  const [isLoading, setIsLoading] = useState(false);
  const [coins, setCoins] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const perPageItems = 12;
  const indexOfLastPerPageItem = currentPage * perPageItems;
  const indexOfFirstPerPageItem = indexOfLastPerPageItem - perPageItems;

  const getCoins = async () => {
    const res = await axios.get("https://api.coinpaprika.com/v1/tickers");
    setCoins(res.data);
    console.log(res.data);
    setIsLoading(true);
  };
  useEffect(() => {
    getCoins();
  }, []);

  return (
    <Container>
      {!isLoading ? (
        <LoadingTag>Loading...</LoadingTag>
      ) : (
        <>
          {/* table */}
          <Table>
            <caption>Coins</caption>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Symbol</th>
                <th>Name</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody>
              {coins
                .slice(indexOfFirstPerPageItem, indexOfLastPerPageItem)
                .map((cV) => {
                  return (
                    <tr key={cV.id}>
                      <td>{cV.rank}</td>
                      <td>{cV.symbol}</td>
                      <td>{cV.name}</td>
                      <td>{cV.id}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>

          <PaginationConatiner>
            {/* pagination */}
            <AppPagination
              currentPage={currentPage}
              totalLength={coins.length}
              perPageItems={perPageItems}
              setCurrentPage={setCurrentPage}
            />
          </PaginationConatiner>
        </>
      )}
    </Container>
  );
}

export default Home3;
