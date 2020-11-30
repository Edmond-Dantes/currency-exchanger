import { useEffect, useMemo, useState } from "react";
import {
  ConfirmationModal,
  CurrencySelector,
  ExchangeRateChart,
  Layout,
  LayoutColumnWrapper,
  LayoutColumn,
  Loading,
  PaymentSelector,
  StepIndicator,
} from "components";
import axios from "axios";
import usdImage from "images/USD.png";
import jpyImage from "images/JPY.png";
import edyImage from "images/edy.png";
import ecoPayzImage from "images/ecoPayz.png";
import suicaImage from "images/suica.png";

const paymentOptions = {
  JPY: [
    {
      key: "cash_jpy",
      name: "Cash",
      img: jpyImage,
      max: 5000,
      currency: "JPY",
    },
    {
      key: "suica",
      name: "Suica",
      img: suicaImage,
      max: 10000,
      currency: "JPY",
    },
    {
      key: "edy",
      name: "Edy",
      img: edyImage,
      max: 25000,
      currency: "JPY",
    },
  ],
  USD: [
    {
      key: "cash_usd",
      name: "Cash",
      img: usdImage,
      max: 50,
      currency: "USD",
    },
    {
      key: "eco_payz",
      name: "ecoPayz",
      img: ecoPayzImage,
      max: 300,
      currency: "USD",
    },
  ],
};

// const steps = ["choose", "insert", "confirm"];

function App() {
  const currencyList = useMemo(() => {
    return Object.keys(paymentOptions);
  }, []);
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState(currencyList[0]);
  const [rates, setRates] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [payment, setPayment] = useState(null);
  const [currentStep, setCurrentStep] = useState("choose");

  useEffect(() => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const { data } = await axios.get(
          "https://api.exchangeratesapi.io/latest",
          {
            params: {
              base: currency,
              symbols: currencyList.join(),
            },
          }
        );
        setRates(data.rates);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }, 2 * 1000);
    return () => {};
  }, [currency, currencyList]);

  switch (currentStep) {
    case "choose":
      const chooseSteps = [
        {
          step: "choose",
          highlighted: true,
          clickable: false,
        },
        {
          step: "insert",
          highlighted: false,
          clickable: false,
        },
        {
          step: "confirm",
          highlighted: false,
          clickable: false,
        },
      ];
      return (
        <>
          {loading && <Loading />}
          <StepIndicator steps={chooseSteps} />
          <Layout>
            <LayoutColumnWrapper>
              <LayoutColumn oneThird>
                <CurrencySelector
                  defaultCurrency={currency}
                  items={currencyList}
                  onSelect={(item) => setCurrency(item)}
                />
              </LayoutColumn>
              <LayoutColumn>
                <PaymentSelector
                  options={paymentOptions[currency]}
                  onSelect={(item) => {
                    setPayment(item);
                    setShowModal(true);
                  }}
                />
              </LayoutColumn>
            </LayoutColumnWrapper>
            <ExchangeRateChart rates={rates || []} />
          </Layout>
          <ConfirmationModal
            show={showModal}
            onClose={() => {
              setShowModal(false);
            }}
            onAction={() => {
              setShowModal(false);
              setCurrentStep("insert");
            }}
            payment={payment}
          />
        </>
      );
    case "insert":
      const insertSteps = [
        {
          step: "choose",
          highlighted: false,
          clickable: true,
        },
        {
          step: "insert",
          highlighted: true,
          clickable: false,
        },
        {
          step: "confirm",
          highlighted: false,
          clickable: false,
        },
      ];
      return (
        <>
          {loading && <Loading />}
          <StepIndicator
            steps={insertSteps}
            onStepClick={(step) => {
              if (step === "choose") setCurrentStep(step);
            }}
          />
          <p>under construction</p>
        </>
      );
    case "confirm":
      const confirmSteps = [
        {
          step: "choose",
          highlighted: false,
          clickable: true,
        },
        {
          step: "insert",
          highlighted: false,
          clickable: true,
        },
        {
          step: "confirm",
          highlighted: true,
          clickable: false,
        },
      ];
      return (
        <>
          {loading && <Loading />}
          <StepIndicator
            steps={confirmSteps}
            onStepClick={(step) => {
              if (step === "choose" || step === "insert") setCurrentStep(step);
            }}
          />
          <p>under construction</p>
        </>
      );
    default:
      throw new Error("Something went wrong");
    // return null;
  }
}

export default App;
