import { Request, Response } from "express";
import { CreareClienteUseCase } from "./CreateClientUseCase";


export class CreateClientController{
  async handle(request: Request, response:Response){
    const {username, password} = request.body

    const creareClienteUseCase = new CreareClienteUseCase();

    const result = await creareClienteUseCase.execute({
      username,
      password,
    })

    return response.json(result);
  }
}