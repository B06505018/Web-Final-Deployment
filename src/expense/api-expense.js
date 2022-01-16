import axios from 'axios'

const instance = axios.create({
  baseURL: (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging')
    ? "/api" : "http://localhost:5000/api"
});


const create = async (expense) => {
  try {
    console.log(expense);
    const { data } = await instance.post('/expenses', { expense });
    console.log(data);
    return data;
  } catch (err) {
    console.log(err)
  }
}

const listByUser = async (params, signal) => {
  try {
    console.log(params);
    const { data } = await instance.get('/expenses', { params: params, signal: signal })
    console.log(data);
    return data;
  } catch (err) {
    console.log(err)
  }
}

const currentMonthPreview = async (signal) => {
  try {
    const { data } = await instance.get('/expenses/current/preview', { signal });
    console.log(data);
    return data
  } catch (err) {
    console.log(err)
  }
}

const expenseByCategory = async (signal) => {
  try {
    const { data } = await instance.get('/expenses/by/category', { signal });
    console.log(data);
    return data
  } catch (err) {
    console.log(err)
  }
}

const averageCategories = async (params, signal) => {
  try {
    const { data } = await instance.get('/expenses/category/averages', { params: params, signal: signal })
    console.log(data)
    return data
  } catch (err) {
    console.log(err)
  }
}

const yearlyExpenses = async (params, signal) => {
  try {
    const { data } = await instance.get('/expenses/yearly', { params: params, signal: signal })
    console.log(data)
    return data
  } catch (err) {
    console.log(err)
  }
}

const plotExpenses = async (params, signal) => {
  try {
    const { data } = await instance.get('/expenses/plot', { params: params, signal: signal })
    console.log(data)
    return data
  } catch (err) {
    console.log(err)
  }
}

const update = async (params, expense) => {
  try {
    const { data } = await instance.put(`/expenses/${params.expenseId}`, { expense })
    console.log(data);
    return data
  } catch (err) {
    console.log(err)
  }
}

const remove = async (params) => {
  try {
    const { data } = await instance.delete(`/expenses/${params.expenseId}`)
    console.log(data)
    return data
  } catch (err) {
    console.log(err)
  }
}

export {
  create,
  listByUser,
  currentMonthPreview,
  expenseByCategory,
  averageCategories,
  yearlyExpenses,
  plotExpenses,
  update,
  remove
}
