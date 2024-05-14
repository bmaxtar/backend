import cors from "cors"
import express, { Request, Response } from "express"
import { AppDataSource } from "./DataSource"
import { Todo } from "./Todo"

const app = express()
app.use(express.json())
app.use(cors())

AppDataSource.initialize()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server connected: Port 3000")
      const todoStudentRepo = AppDataSource.getRepository(Todo)
      app.get("/students", async (req: Request, res: Response) => {
        const allTodos = await todoStudentRepo.find()
        return res.json({
          status: "OK",
          data: allTodos,
        })
      })

      app.patch("/students/:id", async (req: Request, res: Response) => {
        const isStudentEdit = req.body.edit
        const id = parseInt(req.params.id)
        const foundStudent = await todoStudentRepo.findOneBy({ id })
        let result
        if (foundStudent) {
          foundStudent.edit = isStudentEdit
          result = await todoStudentRepo.save(foundStudent)
        }
        return res.json({
          status: "Ok",
          data: result,
        })
      })

      app.delete("/students/:id", async (req: Request, res: Response) => {
        const id = parseInt(req.params.id)
        const result = await todoStudentRepo.delete({ id })
        return res.json({
          status: "OK",
          data: result,
        })
      })

      app.post("/students", async (req: Request, res: Response) => {
        const data: {
          newFullName: string
          newClass: string
          newBirth: string
        } = req.body
        const newStudent = {
          ...data,
          edit: false,
        }
        console.log(newStudent)
        const result = await todoStudentRepo.save(newStudent)
        return res.json({
          status: "OK",
          data: result,
        })
      })
    })
  })
  .catch((err) => {
    console.log("Error", err)
  })
