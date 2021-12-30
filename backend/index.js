const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const PORT = 4000

app.use(cors())
app.use(express.json())

app.use(require('./routes/TodosRoute'))

const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:admin@cluster0.xd5ax.mongodb.net/React-todo?retryWrites=true&w=majority"
    );
    console.log('Сервер подключен к базе данных')
    app.listen(PORT, () => {
      console.log(`Сервер успешно запущен на порте ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

connect()