import React, { useContext, useState } from "react";
import { ContextProvider } from "./TransactionProvider";
import { v4 as uuid } from "uuid";
const ExpenseView = () => {
  const {
    currentTransaction,
    AllTransactionHistory,
    setCurrenTransaction,
    setAllTransactionHistory,
    TotalBudget,
    totalExpence,
    balanceAmount,
  } = useContext(ContextProvider);
  const [collapse, setcollapse] = useState(false);

  // handleSubmit function to add current transaction to array
  const handleSubmit = (e) => {
    e.preventDefault();
    setAllTransactionHistory([...AllTransactionHistory, currentTransaction]);
    // clear input field
    setCurrenTransaction({
      amount: "",
      details: "",
      transactionType: "",
      id: uuid(),
    });
  };
  return (
    <div>
      <div className="expenseView border p-3 my-4">
        <div className="balance d-flex gap-3 m-4 justify-content-between">
          <h2 className="text-xs-md">
            Balance :
            <span className="text-success">
              {balanceAmount < 0 ? "0" : balanceAmount.toLocaleString()}$
            </span>
          </h2>
          <button
            className="btn btn-info btn-xl"
            onClick={() => setcollapse(!collapse)}
          >
            {collapse ? "Cancel" : "Add Transaction"}
          </button>
        </div>

        {/* if collapse is true input fields will show or else expense history will show */}

        {collapse ? (
          <>
            <form onSubmit={handleSubmit}>
              <div className="form-group px-4 my-3">
                <label htmlFor="amount">Amount</label>
                <input
                  type="number"
                  required
                  value={currentTransaction.amount}
                  onChange={(e) =>
                    setCurrenTransaction({
                      ...currentTransaction,
                      amount: parseInt(e.target.value),
                    })
                  }
                  placeholder="Enter amount"
                  className="form-control"
                />
              </div>
              <div className="form-group px-4 my-3">
                <label htmlFor="details">Detail</label>
                <input
                  type="text"
                  required
                  value={currentTransaction.details}
                  onChange={(e) =>
                    setCurrenTransaction({
                      ...currentTransaction,
                      details: e.target.value,
                    })
                  }
                  placeholder="Enter detail"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <select
                  name="transactionType"
                  className=" mb-3 mx-4 p-2 bg-white"
                  value={currentTransaction.transactionType}
                  onChange={(e) =>
                    setCurrenTransaction({
                      ...currentTransaction,
                      transactionType: e.target.value,
                    })
                  }
                  id=""
                >
                  <option value="">Select Type</option>
                  <option value="budget">Budget</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              <button
                type="submit"
                className="btn btn-warning mx-auto d-block my-2"
              >
                Add Transaction
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="expense-info d-flex justify-content-between ">
              <div className="expense-container">
                <p>Expense</p>
                <p>${totalExpence.toLocaleString()}</p>
              </div>
              <div className="budget-container">
                <p>Total Budget</p>
                <p>${TotalBudget.toLocaleString()}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ExpenseView;
