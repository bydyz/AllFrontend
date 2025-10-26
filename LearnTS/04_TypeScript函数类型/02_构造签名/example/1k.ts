interface Product {
    use(): void;
}

class ConcreteProductA implements Product {
    use() {
        console.log("Using Product A");
    }
}

class ConcreteProductB implements Product {
    use() {
        console.log("Using Product B");
    }
}

interface ProductFactory {
    new (): Product;
}

function createProduct(factory: ProductFactory): Product {
    return new factory();
}

const productA = createProduct(ConcreteProductA as ProductFactory);
productA.use(); // 输出 "Using Product A"

const productB = createProduct(ConcreteProductB as ProductFactory);
productB.use(); // 输出 "Using Product B"