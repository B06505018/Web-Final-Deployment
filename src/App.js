import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './core/Home.js'
import Menu from './core/Menu.js'
import NewExpense from './expense/NewExpense.js'
import Expenses from './expense/Expenses.js'
import Reports from './report/Reports.js'


const App = () => {
  return (
    <div>
      <Menu />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/expenses/all" component={Expenses} />
        <Route path="/expenses/new" component={NewExpense} />
        <Route path="/expenses/reports" component={Reports} />
      </Switch>
    </div>
  )
}

export default App;
