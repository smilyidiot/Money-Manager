import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'

import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    transactionsList: [],
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  onAddTransaction = event => {
    event.preventDefault()

    const {titleInput, amountInput, optionId} = this.state

    const typeOption = transactionTypeOptions.find(
      eachTrans => eachTrans.optionId === optionId,
    )
    const {displayText} = typeOption

    const newTransaction = {
      id: uuidv4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeOptions = event => {
    this.setState({optionId: event.target.value})
  }

  getBalance = () => {
    const {transactionsList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })

    balanceAmount = incomeAmount - expensesAmount

    return balanceAmount
  }

  getIncome = () => {
    const {transactionsList} = this.state
    let incomeAmount = 0

    transactionsList.forEach(eachTrans => {
      if (eachTrans.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTrans.amount
      }
    })
    return incomeAmount
  }

  getExpenses = () => {
    const {transactionsList} = this.state
    let expensesAmount = 0

    transactionsList.forEach(eachTrans => {
      if (eachTrans.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTrans.amount
      }
    })
    return expensesAmount
  }

  deleteTrans = id => {
    const {transactionsList} = this.state

    const updatedTransList = transactionsList.filter(
      eachTrans => eachTrans.id !== id,
    )

    this.setState({
      transactionsList: updatedTransList,
    })
  }

  render() {
    const {transactionsList, titleInput, amountInput, optionId} = this.state
    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expensesAmount = this.getExpenses()

    console.log('expensesAmount', expensesAmount)
    console.log('balanceAmount', balanceAmount)
    console.log('incomeAmount', incomeAmount)

    return (
      <div className="main-container">
        <div className="responsive-container">
          <div className="name-container">
            <h1 className="name">Hi, Richard</h1>
            <p className="welcome-msg">
              Welcome back to your <span>Money Manager</span>
            </p>
          </div>
          <div>
            <MoneyDetails
              balanceAmount={balanceAmount}
              incomeAmount={incomeAmount}
              expensesAmount={expensesAmount}
            />
          </div>
          <div className="transaction-details">
            <form className="form-container" onSubmit={this.onAddTransaction}>
              <h1 className="header">Add Transaction</h1>
              <label htmlFor="title">TITLE</label>
              <input
                id="title"
                type="text"
                onChange={this.onChangeTitle}
                placeholder="Title"
                value={titleInput}
                className="input"
              />
              <label htmlFor="amount">AMOUNT</label>
              <input
                id="amount"
                type="text"
                onChange={this.onChangeAmount}
                placeholder="Amount"
                value={amountInput}
                className="input"
              />
              <label htmlFor="type">TYPE</label>
              <select
                id="type"
                onChange={this.onChangeOptions}
                value={optionId}
                className="input"
              >
                {transactionTypeOptions.map(eachOption => (
                  <option key={eachOption.optionId} value={eachOption.optionId}>
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
              <button type="submit" className="button">
                Add
              </button>
            </form>
            <div className="trans-history">
              <h1 className="history">History</h1>
              <div className="trans-table-container">
                <ul className="trans-table">
                  <li className="table-header">
                    <p className="trans-col-header">Title</p>
                    <p className="trans-col-header">Amount</p>
                    <p className="trans-col-header">Type</p>
                  </li>
                  {transactionsList.map(eachTrans => (
                    <TransactionItem
                      key={eachTrans.id}
                      transactionDetails={eachTrans}
                      deleteTrans={this.deleteTrans}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
