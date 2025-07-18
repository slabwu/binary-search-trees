import { mergeSort as sort, removeDuplicates } from './helper.js';

export class Tree {
    constructor(array) {
        this.root;
        if (array) this.create(array);
    }

    buildTree(array, start = 0, end = array.length - 1) {
        if (start > end) return null;

        let mid = Math.floor((start + end) / 2);
        let root = new Node(array[mid]);

        root.left = this.buildTree(array, start, mid - 1);
        root.right = this.buildTree(array, mid + 1, end);

        return root;
    }

    create(array) {
        let processedArray = sort(removeDuplicates(array));
        this.root = this.buildTree(processedArray);
        // console.log(this);
        // this.prettyPrint(this.root);
    }

    prettyPrint(node, prefix = "", isLeft = true) {
        if (node === null) return;
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };

    print() {
        this.prettyPrint(this.root);
    }
     
    insert(value, root = this.root) {
        if (!root) return new Node(value);
        if (root.value === value) return root;

        if (root.value < value) {
            root.right = this.insert(value, root.right);
        } else {
            root.left = this.insert(value, root.left);
        }
        
        return root;
    }

    delete(value, root = this.root) {
        if (!root) return root;
        if (root.value === value) {
            if (!root.left) {
                return root.right;
            } else if (!root.right) {
                return root.left;
            } else {
                let replacement = this.getReplacement(root);
                root.value = replacement.value;
                root.right = this.delete(replacement.value, root.right);
                return root;
            }
        }
      
        if (root.value < value) {
            root.right = this.delete(value, root.right);
        } else {
            root.left = this.delete(value, root.left);
        }
        
        return root;
    }

    getReplacement(root) {
        let tmp = root.right;
        while (tmp.left) {
            tmp = tmp.left;
        }
        return tmp;
    }

    find(value) {
        let tmp = this.root;
        while (tmp && tmp.value !== value) {
            if (tmp.value < value) {
                tmp = tmp.right;
            } else {
                tmp = tmp.left;
            }
        }
        return (tmp)? tmp : false;
    }

    levelOrderForEach(callback) {
        this.checkCallback(callback);
        let queue = [this.root];
        while (queue.length !== 0) {
            let node = queue.shift();
            callback(node.value);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }

    preOrderForEach(callback, root = this.root) {
        this.checkCallback(callback);
        if (root) {
            callback(root.value);
            this.preOrderForEach(callback, root.left);
            this.preOrderForEach(callback, root.right);
        }
    }
    
    inOrderForEach(callback, root = this.root) {
        this.checkCallback(callback);
        if (root) {
            this.inOrderForEach(callback, root.left);
            callback(root.value);
            this.inOrderForEach(callback, root.right);
        }
    }

    postOrderForEach(callback, root = this.root) {
        this.checkCallback(callback);
        if (root) {
            this.postOrderForEach(callback, root.left);
            this.postOrderForEach(callback, root.right);
            callback(root.value);
        }
    }

    checkCallback(callback) {
        if (!callback) throw new Error('Callback is required.');
    }

    height(value) {
        let node = this.find(value);
        return this.getHeight(node);
    }
    
    getHeight(root) {
        if (!root) return -1;
        let left = this.getHeight(root.left);
        let right = this.getHeight(root.right);
        return Math.max(left, right) + 1;
    }
    
    depth(value) {
        let tmp = this.root;
        let depth = 0;
        while (tmp && tmp.value !== value) {
            if (tmp.value < value) {
                tmp = tmp.right;
            } else {
                tmp = tmp.left;
            }
            depth++;
        }
        return (tmp)? depth : null;
    }

    isBalanced(root = this.root) {
        if (!root) return true;
        let left = this.getHeight(root.left);
        let right = this.getHeight(root.right);
        if (Math.abs(left - right) > 1) {
            return false;
        } else {
            let leftBalanced = this.isBalanced(root.left);
            let rightBalanced = this.isBalanced(root.right);
            return leftBalanced && rightBalanced;
        }
    }

    rebalance() {
        let array = []
        this.inOrderForEach(value => array.push(value));
        this.create(array);
    }
}

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

