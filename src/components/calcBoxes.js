export default function calcBoxes(prods) {
    console.log(prods)

    const MAX_BOX_SIZE = 274;

    function calculateGirth(product) {
        const clonedProduct = { ...product };
        const dimensions = [clonedProduct.length, clonedProduct.width, clonedProduct.height];
        dimensions.sort((a, b) => b - a);
        const longestSide = dimensions[0];
        const girth = (dimensions[1] + dimensions[2]) * 2;
        clonedProduct.girth = girth;
        clonedProduct.totalLengthWithGirth = longestSide + girth;
        return clonedProduct;
    }

    function sortProductsByGirth(products) {
        return products.slice().sort((a, b) => b.girth - a.girth);
    }

    function placeProductsInBoxes(products) {
        const boxes = [];
        let currentBox = {
            length: 0,
            width: 0,
            height: 0,
            products: [],
        };

        for (const product of products) {
            if (product.totalLengthWithGirth >= MAX_BOX_SIZE) {
                console.log("*** TOO MUCH. THIS PRODUCT CANNOT FIT INTO ANY BOX!");
                continue;
            }

            const dimensions = [product.length, product.width, product.height];
            dimensions.sort((a, b) => b - a);

            if (currentBox.products.length === 0) {
                currentBox.length = dimensions[0];
                currentBox.width = dimensions[1];
            }

            currentBox.height += dimensions[2];
            const calculateStackedProdsGirth = calculateGirth(currentBox);
            const boxTotalLengthWithGirth = calculateStackedProdsGirth.totalLengthWithGirth;

            if (boxTotalLengthWithGirth >= MAX_BOX_SIZE) {
                currentBox.height -= dimensions[2]; // - last box height
                boxes.push({ ...currentBox });
                currentBox = {
                    length: dimensions[0],
                    width: dimensions[1],
                    height: dimensions[2],
                    products: [],
                };
            }

            currentBox.products.push(product);
        }

        boxes.push({ ...currentBox });
        return boxes.map(box => ({ ...box, girth: calculateGirth(box).girth, totalLengthWithGirth: calculateGirth(box).totalLengthWithGirth }));
    }

    const prodsWithGirth = prods.map(calculateGirth);
    const sortedProducts = sortProductsByGirth(prodsWithGirth);
    const boxes = placeProductsInBoxes(sortedProducts);

    console.log(boxes)
    return boxes
}