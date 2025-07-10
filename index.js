import { Tree } from './bst.js';
import { printSearchAlgorithms } from './helper.js';

let tree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

tree.insert(11);
tree.delete(5);
console.log(tree.find(11));
tree.print();

printSearchAlgorithms(tree);
console.log(`Height of 8: ${tree.height(8)}`);
console.log(`Depth of 11: ${tree.depth(11)}`);
console.log(`Is balanced?: ${tree.isBalanced()}`);

tree.rebalance();
tree.print();
console.log(`Is balanced?: ${tree.isBalanced()}`);

