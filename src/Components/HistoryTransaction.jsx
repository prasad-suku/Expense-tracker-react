import React, { useContext, useEffect, useState } from "react";
import { ContextProvider } from "./TransactionProvider";

const HistoryTransaction = () => {
  const {
    AllTransactionHistory,

    setAllTransactionHistory,
  } = useContext(ContextProvider);

  // handleDelete transaction
  const handleRemoveTransaction = (currentTransaction) => {
    setAllTransactionHistory(
      AllTransactionHistory.filter((item, i) => item.id !== currentTransaction)
    );
  };

  return (
    <div className="p-3">
      <h2>Transaction History</h2>

      <div className="histories-container my-3">
        {AllTransactionHistory.map((trans, i) => {
          return (
            <>
              <div
                key={trans.id}
                className={`history ${
                  trans.transactionType === "expense" ? "history-expense" : ""
                } d-flex justify-content-between px-5 py-1`}
              >
                <p>{trans.details}</p>
                <p>${trans.amount.toLocaleString()}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemoveTransaction(trans.id)}
                >
                  Remove
                </button>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryTransaction;
