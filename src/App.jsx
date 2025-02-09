import React from "react";
import ExpenseView from "./Components/ExpenseView";
import HistoryTransaction from "./Components/HistoryTransaction";
const App = () => {
  return (
    <div
      className="app"
      style={{ backgroundColor: "black", color: "whitesmoke" }}
    >
      <h1 style={{ textAlign: "center" }}>Expense Tracker</h1>
      <ExpenseView></ExpenseView>
      <HistoryTransaction></HistoryTransaction>
    </div>
  );
};

export default App;
