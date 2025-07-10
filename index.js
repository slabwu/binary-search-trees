import { Tree } from './bst.js';

let tree = new Tree();

tree.create([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.insert(11);
tree.delete(5);
console.log(tree.find(11));
tree.print();

let levelOrder = []
tree.levelOrderForEach(value => levelOrder.push(value));
console.log(`Level order: ${levelOrder}`);
