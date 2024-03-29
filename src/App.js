import { useEffect, useState } from 'react';
import './App.css';
import { tenureData } from './utils/constants';
import { numberWithCommas } from './utils/config';
import TextInput from './components/TextInput';
import SliderInput from './components/SliderInput';

function App() {
  const [cost, setCost] = useState(0);
  const [interest, setInterest] = useState(0);
  const [fee, setFee] = useState(1);
  const [downPayment, setDownPayment] = useState(0);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState(0);

  const calculateEmi = (dp) => {
    //     EMI amount = [P x R x (1+R)^N]/[(1+R)^N-1] where P, R, and N are the variables.
    //     This also means that the EMI value will change every time you change any of the three variables.
    //     ‘P’ stands for the Principal Amount. It is the original loan amount given to you by the bank on which the interest will be calculated.
    //     ‘R’ stands for the Rate of Interest set by the bank.
    //     ‘N’ is the Number of Years given to you for loan repayment.

    if (!cost) return;

    const loanAmount = cost - dp;
    const rateOfInterest = interest / 100;
    const numOfYears = tenure / 12;

    const EMIAmount =
      (loanAmount * rateOfInterest * (1 + rateOfInterest) ** numOfYears) /
      ((1 + rateOfInterest) ** numOfYears - 1);

    return Number(EMIAmount / 12).toFixed(0);
  };

  useEffect(() => {
    if (!(cost > 0)) {
      setDownPayment(0);
      setEmi(0);
    }

    const Emi = calculateEmi(downPayment);
    setEmi(Emi);
  }, [tenure, cost]);

  const updateEmi = (e) => {
    if (!cost) return;

    const dp = Number(e.target.value);
    setDownPayment(dp.toFixed(0));

    const Emi = calculateEmi(dp);
    setEmi(Emi);
  };

  const calculateDownPayment = (Emi) => {
    if (!cost) return;

    const downPaymentPercent = 100 - (emi / calculateEmi(0)) * 100;

    return Number((downPaymentPercent / 100) * cost).toFixed(0);
  };

  const updateDownPayment = (e) => {
    if (!cost) return;

    const selectedEmi = e.target.value;
    setEmi(selectedEmi);

    const dp = calculateDownPayment(emi);
    setDownPayment(dp);
  };

  const totalDownPayment = () => {
    return numberWithCommas(
      (
        Number(downPayment) +
        (Number(cost) - Number(downPayment)) * Number(fee / 100)
      ).toFixed(0)
    );
  };

  const totalEmi = () => {
    return numberWithCommas((Number(emi) * tenure).toFixed(0));
  };

  return (
    <div className='App'>
      <span className='title' style={{ fontSize: 30, marginTop: 10 }}>
        EMI Calculator
      </span>
      <TextInput title='Total Cost of Assets' state={cost} setState={setCost} />
      <TextInput
        title='Interest Rate (in %)'
        state={interest}
        setState={setInterest}
      />
      <TextInput title='Processing Fee (in %)' state={fee} setState={setFee} />

      <SliderInput
        title='Down payment'
        subTitle={`Total Down payment - ${totalDownPayment()}`}
        minValue={0}
        maxValue={cost}
        state={downPayment}
        minlabel={'0%'}
        maxLabel={'100%'}
        onSliderChange={updateEmi}
      />

      <SliderInput
        title='Loan per month'
        subTitle={`Total Loan Amount - ${totalEmi()}`}
        minValue={calculateEmi(cost)}
        maxValue={calculateEmi(0)}
        state={emi}
        minlabel={numberWithCommas(calculateEmi(cost))}
        maxLabel={numberWithCommas(calculateEmi(0))}
        onSliderChange={updateDownPayment}
      />

      <span className='title'> Tenure (in months)</span>
      <div className='tenureContainer'>
        {tenureData.map((period) => {
          return (
            <button
              key={`tenure-${period}`}
              className={`tenure ${period === tenure ? 'selected' : ''}`}
              onClick={() => setTenure(period)}
            >
              {period}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
