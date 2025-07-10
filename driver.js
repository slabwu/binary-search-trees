import { Tree } from './bst.js';
import { printSearchAlgorithms, getRandomNumbers, showTree } from './helper.js';

let test = new Tree(getRandomNumbers(20, 1, 99));

showTree(test);
printSearchAlgorithms(test);

getRandomNumbers(20, 100, 200).forEach(number => test.insert(number));
showTree(test);

test.rebalance();
showTree(test);