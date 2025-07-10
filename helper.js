export function removeDuplicates(array) {
    let output = [];
    array.forEach(value => {
        if (!output.includes(value)) output.push(value);
    })
    return output;
}

export function mergeSort(array) {
    if (array.length === 1) return array;
    let left = array;
    let right = left.splice(Math.ceil(array.length / 2), Math.floor(array.length / 2));
    let length = left.length + right.length;    

    left = mergeSort(left);
    right = mergeSort(right);

    let output = [];
    for (let i = 0; i < length - 1; i++) {
        if (left[0] < right[0]) {
            output.push(left.shift());
            if (left.length === 0) {
                output = output.concat(right);
                return output;
            }
        } else {
            output.push(right.shift());
            if (right.length === 0) {
                output = output.concat(left);
                return output;
            }
        }
    }
}

export function printSearchAlgorithms(tree) {
    let levelOrder = []
    tree.levelOrderForEach(value => levelOrder.push(value));
    console.log(`Level order: ${levelOrder}`);

    let preOrder = []
    tree.preOrderForEach(value => preOrder.push(value));
    console.log(`Preorder: ${preOrder}`);

    let inOrder = []
    tree.inOrderForEach(value => inOrder.push(value));
    console.log(`Inorder: ${inOrder}`);

    let postOrder = []
    tree.postOrderForEach(value => postOrder.push(value));
    console.log(`Postorder: ${postOrder}`);
}

export function getRandomNumbers(n, min, max) {
    let output = [];
    for (let i = 0; i < n; i++) {
        output.push(Math.floor(Math.random() * max + min));
    } 
    return output;
}

export function showTree(tree) {
    tree.print();
    console.log(`Is balanced?: ${tree.isBalanced()}`);
}