import { prisma } from "../../../../database/prismaClient"; 
import {hash} from "bcrypt"

interface ICreateCliente{
  username:string;
  password:string
}
export class CreareClienteUseCase {
  async execute({username,password}:ICreateCliente){

    //validar client

    const clientExist = await prisma.clients.findFirst({
      where:{
        username:{
          mode:'insensitive'
        }
      }
    })

    if(clientExist){
      throw new Error('Client already exists')
    }
    //criptografar a senha 
    const  hashPassword = await hash(password,10);

    // salvar o cliente 
    const client = await prisma.clients.create({
      data:{
        username,
        password:hashPassword
      }
    })
    return client
  }
}