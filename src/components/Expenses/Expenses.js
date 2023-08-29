import React from 'react'
import { Link } from 'react-router-dom'
import AddExpense from './AddExpense'


export default function Expenses() {
  return (
    <div>
      <nav>
        <span className='px-4'>Welcome To Expense Tracker</span>
      <span className='float-end px-4'> Your Profile is incomplete . <Link to='/profile'>Complete Now!</Link></span>
      <br />
     
      </nav>
      <hr />
      <AddExpense/>

    </div>
  )
}
