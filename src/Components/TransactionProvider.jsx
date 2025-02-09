import React, { createContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
export const ContextProvider = createContext();
const TransactionProvider = ({ children }) => {
  const [AllTransactionHistory, setAllTransactionHistory] = useState(
    JSON.parse(localStorage.getItem("histories")) || [
      {
        amount: 1000,
        transactionType: "budget",
        id: uuid(),
        details: "Budget",
      },
      {
        amount: 200,
        transactionType: "expense",
        id: uuid(),
        details: "Shopping",
      },
    ]
  );
  const CopyAlltransactionhistory = JSON.parse(
    JSON.stringify(AllTransactionHistory)
  );
  const [currentTransaction, setCurrenTransaction] = useState({
    amount: "",
    details: "",
    transactionType: "budget",
    id: uuid(),
  });
  const [TotalBudget, setTotalBudget] = useState(0);
  const [totalExpence, setTotalExpense] = useState(0);
  const [amtInput, setAmtinput] = useState(0);
  const [detailInput, setdetailInput] = useState(0);
  const [transactionType, setTransactionType] = useState("");
  let [balanceAmount, setBalanceAmount] = useState(0);

  useEffect(() => {
    let totalBudget = 0;
    let totalExpense = 0;

    AllTransactionHistory.forEach((transaction) => {
      if (transaction.transactionType === "budget") {
        totalBudget += parseInt(transaction.amount);
      } else if (transaction.transactionType === "expense") {
        totalExpense += parseInt(transaction.amount);
      }
    });

    setTotalBudget(totalBudget);
    setTotalExpense(totalExpense);
    setBalanceAmount(TotalBudget - totalExpence);

    // store transaction history in localstorage
    localStorage.setItem("histories", JSON.stringify(AllTransactionHistory));
  }, [AllTransactionHistory, totalExpence, TotalBudget]);

  return (
    <ContextProvider.Provider
      value={{
        AllTransactionHistory,
        currentTransaction,
        setAllTransactionHistory,
        CopyAlltransactionhistory,

        setCurrenTransaction,
        TotalBudget,
        setTotalBudget,
        balanceAmount,
        totalExpence,
        setTotalExpense,
        detailInput,
        setdetailInput,
        transactionType,
        setTransactionType,
        amtInput,
        setAmtinput,
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
};

export default TransactionProvider;
