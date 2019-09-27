// formats number to k/M/B/T units
const formatNumber = a => {
  if (a >= 10000) {
    const units = ['k', 'M', 'B', 'T'];

    const order = Math.floor(Math.log(a) / Math.log(1000));

    const unitname = units[order - 1];
    const num = (a / 1000 ** order).toFixed(2);

    // output number remainder + unitname
    return num + unitname;
  }

  if (a <= -10000) {
    a = Math.abs(a);
    const units = ['k', 'M', 'B', 'T'];

    const order = Math.floor(Math.log(a) / Math.log(1000));

    const unitname = units[order - 1];
    const num = (a / 1000 ** order).toFixed(2);

    // output number remainder + unitname
    return `-${num}${unitname}`;
  }
  // return formatted original number
  return a.toLocaleString();
};

export default formatNumber;
