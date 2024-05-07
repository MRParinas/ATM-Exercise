const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
    const choice = ['Deposit', 'Cash Back'];
    console.log(`ATM isDeposit: ${isDeposit}`);
    return (
      <label className="label huge">
        <h3> {choice[Number(!isDeposit)]}</h3>
        <input id="number-input" type="number" onChange={onChange} min="0"></input>
        <input type="submit" value="Submit" id="submit-input" disabled={!isValid}></input>
      </label>
    );
  };
  
  const Account = () => {
    const [deposit, setDeposit] = React.useState(0);
    const [totalState, setTotalState] = React.useState(0);
    const [atmMode, setAtmMode] = React.useState(""); // Handling mode with a string
    const [isValidTransaction, setValidTransaction] = React.useState(false);
    let status = `Account Balance $ ${totalState} `;
    console.log(`Account Rendered with atmMode: ${atmMode}`);
  
   const handleChange = (event) => {
      console.log(`handleChange ${event.target.value}`);
      const inputAmount = Number(event.target.value);
      setDeposit(inputAmount);
      setValidTransaction((atmMode === "Cash Back" && totalState < inputAmount) ? false : true);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValidTransaction) {
      setTotalState(atmMode === "Deposit" ? totalState + deposit : totalState - deposit);
    }
  };
  
  const handleModeSelect = (event) => {
    const mode = event.target.value;
    setAtmMode(mode);
    setValidTransaction(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 id="total">Account Balance $ {totalState}</h2>
      <label>Please Select Action to Continue</label>
      <select onChange={handleModeSelect} name="mode" id="mode-select">
        <option id="no-selection" value=""></option>
        <option id="deposit-selection" value="Deposit">Deposit</option>
        <option id="cashback-selection" value="Cash Back">Cash Back</option>
      </select>
      {atmMode && (
        <ATMDeposit onChange={handleChange} isDeposit={atmMode === "Deposit"} isValid={isValidTransaction} />
      )}
    </form>
  );
};

ReactDOM.render(<Account />, document.getElementById('root'));
