import React, { useState, useEffect } from 'react';
// import * as firebase from 'firebase/app';
import { db } from '../Firebase.js';

// const percentPromise = () => {
//   return new Promise((resolve, reject) => {
//     resolve(
//       fetch(
//         `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=aapl&types=chart&range=5d&token=Tpk_7190efa09280470180ab8bb6635da780&filter=date,changePercent`
//       )
//     );
//     reject(new Error('There is an error.'));
//   });
// };

const ExploreList = props => {
  const { sector } = props;

  // state for previous price
  const [price, setPrice] = useState('');
  useEffect(() => {
    if (sector) {
      const sectorCollection = db.collection('sectors').doc(sector);
      sectorCollection
        .get()
        .then(doc => doc.data().companies)
        .then(data =>
          // get previous price
          fetch(
            `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${data}&types=previous&token=Tpk_7190efa09280470180ab8bb6635da780&filter=date,close`
          )
        )
        .then(response => response.json())
        .then(data => {
          const info = [];
          const companies = Object.keys(data);
          for (let i = 0; i < companies.length; i++) {
            const company = companies[i];
            const row = {};
            row.ticker = companies[i];
            row.date = data[company].previous.date;
            row.close = data[company].previous.close;
            info.push(row);
          }
          setPrice(info);
        })
        .catch(error => console.log(error));
    }
  }, [sector]);

  // state for change percentage
  const [previous, setPrevious] = useState('');
  useEffect(() => {
    if (price) {
      const sectorCollection = db.collection('sectors').doc(sector);
      sectorCollection
        .get()
        .then(doc => doc.data().companies)
        .then(data =>
          fetch(
            `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${data}&types=chart&range=5d&token=Tpk_7190efa09280470180ab8bb6635da780&filter=date,changePercent`
          )
        )
        .then(response => response.json())
        .then(data => {
          const info = price;
          for (let i = 0; i < info.length; i++) {
            const ticker = Object.keys(data)[i];
            const percent = data[ticker].chart[4].changePercent;
            info[i].changePercent = percent;
          }
          setPrevious(info);
        })
        .catch(error => console.log(error));
    }
  }, [price]);

  return (
    <>
      <h3>LIST OF COMPANIES IN {sector.toUpperCase()}</h3>
    </>
  );
};

export default ExploreList;
