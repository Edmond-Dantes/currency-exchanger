import { useMemo } from "react";
import styles from "./ExchangeRateChart.module.css";

export function ExchangeRateChart({ rates }) {
  const rateList = useMemo(() => {
    return Object.keys(rates).reduce((acc, key) => {
      acc.push({ currency: key, rate: rates[key] });
      return acc;
    }, []);
  }, [rates]);

  return (
    <div className={styles.wrapper}>
      {rateList.map(({ currency, rate }) => (
        <div key={currency} className={styles.rateWrapper}>
          <div className={styles.rateTitle}>{currency}</div>
          <div className={styles.rateNumber}>{parseFloat(rate).toFixed(5)}</div>
        </div>
      ))}
    </div>
  );
}
