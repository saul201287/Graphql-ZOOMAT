export const typeDefs = `
type User{
    id:ID
    nombre: String
    password: String
    usuario:String
    correo:String
    urlhook:String
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
    user(usuario:String, password:String): User
    users: [User]
    animals: [Animal]
    animal(id:ID): Animal
    animalByEspecie(especie:String):Animal
}
type animalInput {
    nombre:String 
    edad:Int
    peso: Int
    especie:String
    alimentacion:String
    distribucion:String
    categoria:String
}
type userInput {
    nombre: String
    password: String
    usuario: String
    correo: String
}
type animalPutInput{
    id: ID
    categoria: String
}
type animalEdadInput{
    nombre:String
    edad: Int
}


type Mutation{
    createAnimal(animal:animalInput):Animal
    createUser(user: userInput):User
    putAnimalEdad(animal:animalEdadInput):Animal
    putAnimalCategory(animal:animalPutInput):Animal
    deleteAnimal(id:Int):String
}
`;
