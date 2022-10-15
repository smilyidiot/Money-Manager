// Write your code here
// Write your code here
import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleteTrans} = props
  const {id, title, amount, type} = transactionDetails

  const onDeleteTrans = () => {
    deleteTrans(id)
  }

  return (
    <li className="table-row">
      <p className="trans-text">{title}</p>
      <p className="trans-text">Rs {amount}</p>
      <p className="trans-text">{type}</p>
      <button
        className="delete-button"
        type="button"
        onClick={onDeleteTrans}
        testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="delete-img"
        />
      </button>
    </li>
  )
}

export default TransactionItem
