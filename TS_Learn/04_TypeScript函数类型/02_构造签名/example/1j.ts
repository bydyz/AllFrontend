interface Constructor<T> {
    new (...args: any[]): T;
}

class Animal {
    constructor(public name: string) {}
}

class Dog extends Animal {
    constructor(name: string, public breed: string) {
        super(name);
    }
}

function createInstance<T>(ctor: Constructor<T>, ...args: any[]): T {
    return new ctor(...args);
}



const dog = createInstance<Dog>(Dog, "Buddy", "Golden Retriever");
console.log(dog.name);   // 输出 "Buddy"
console.log(dog.breed);  // 输出 "Golden Retriever"



const animal = createInstance<Animal>(Animal, "Generic Animal");
console.log(animal.name); // 输出 "Generic Animal"


export {}