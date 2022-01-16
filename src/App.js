import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './core/Home'
import Menu from './core/Menu'
import NewExpense from './expense/NewExpense'
import Expenses from './expense/Expenses'
import Reports from './report/Reports'


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
