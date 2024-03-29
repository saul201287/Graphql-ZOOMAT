import { gql } from "apollo-server-express";
export const typeDefs = gql `
type User{
    id:ID
    nombre: String
    password: String
    usuario:String
    correo:String
}
type Login{
    user:User
    token:String
}
type Animal{
    id:ID
    nombre:String
    edad:Int
    peso: Int
    especie: String
    alimentacion:String
    distribucion:String
    categoria:String
}
type Query{
    user(usuario:String, password:String):Login
    users: [User]
    animals: [Animal]
    animal(id:ID): Animal
    animalByEspecie(especie:String):Animal
}
input animalInput {
    nombre:String 
    edad:Int
    peso: Int
    especie:String
    alimentacion:String
    distribucion:String
    categoria:String
}
input userInput {
    nombre: String
    password: String
    usuario: String
    correo: String
}
input animalPutInput{
    id: ID
    categoria: String
}
input animalEdadInput{
    nombre:String
    edad: Int
}


type Mutation{
    createAnimal(animal:animalInput):Animal
    createUser(user: userInput):User
    createWebhook(url:String, events:[String]):String
    putAnimalEdad(animal:animalEdadInput):String
    putAnimalCategory(animal:animalPutInput):String
    deleteAnimal(id:Int):String
}
`;
