import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:4000' });


const create = async (expense) => {
  try {
    console.log(expense);
    const { data } = await instance.post('/api/expenses', { expense });
    console.log(data);
    return data;
  } catch (err) {
    console.log(err)
  }
}

const listByUser = async (params, signal) => {
  try {
    console.log(params);
    const { data } = await instance.get('/api/expenses', { params: params, signal: signal })
    console.log(data);
    return data;
  } catch (err) {
    console.log(err)
  }
}

const currentMonthPreview = async (signal) => {
  try {
    const { data } = await instance.get('/api/expenses/current/preview', { signal });
    console.log(data);
    return data
  } catch (err) {
    console.log(err)
  }
}

const expenseByCategory = async (signal) => {
  try {
    const { data } = await instance.get('/api/expenses/by/category', { signal });
    console.log(data);
    return data
  } catch (err) {
    console.log(err)
  }
}

const averageCategories = async (params, signal) => {
  try {
    const { data } = await instance.get('/api/expenses/category/averages', { params: params, signal: signal })
    console.log(data)
    return data
  } catch (err) {
    console.log(err)
  }
}

const yearlyExpenses = async (params, signal) => {
  try {
    const { data } = await instance.get('/api/expenses/yearly', { params: params, signal: signal })
    console.log(data)
    return data
  } catch (err) {
    console.log(err)
  }
}

const plotExpenses = async (params, signal) => {
  try {
    const { data } = await instance.get('/api/expenses/plot', { params: params, signal: signal })
    console.log(data)
    return data
  } catch (err) {
    console.log(err)
  }
}

const update = async (params, expense) => {
  try {
    // console.log(params)
    // console.log(expense)
    const { data } = await instance.put(`/api/expenses/${params.expenseId}`, { expense })
    console.log(data);
    return data
  } catch (err) {
    console.log(err)
  }
}

const remove = async (params) => {
  try {
    const { data } = await instance.delete(`/api/expenses/${params.expenseId}`)
    console.log(data)
    return data
  } catch (err) {
    console.log(err)
  }
}


// const remove = async (params, credentials) => {
//   try {
//     let response = await fetch('/api/expenses/' + params.expenseId, {
//       method: 'DELETE',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + credentials.t
//       }
//     })
//     return await response.json()
//   } catch (err) {
//     console.log(err)
//   }
// }

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
