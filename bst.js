import { mergeSort as sort, removeDuplicates } from './helper.js';

export class Tree {
    constructor() {
        this.root;
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
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };

    print() {
        this.prettyPrint(this.root);
    }
     
    insert(data, root = this.root) {
        if (!root) return new Node(data);
        if (root.data === data) return root;

        if (root.data < data) {
            root.right = this.insert(data, root.right);
        } else {
            root.left = this.insert(data, root.left);
        }
        
        return root;
    }

    delete(data, root = this.root) {
        if (!root) return root;
        if (root.data === data) {
            if (!root.left) {
                return root.right;
            } else if (!root.right) {
                return root.left;
            } else {
                let replacement = this.getReplacement(root);
                root.data = replacement.data;
                root.right = this.delete(replacement.data, root.right);
                return root;
            }
        }
      
        if (root.data < data) {
            root.right = this.delete(data, root.right);
        } else {
            root.left = this.delete(data, root.left);
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

    find(data) {
        let tmp = this.root;
        while (tmp && tmp.data !== data) {
            if (tmp.data < data) {
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
            callback(node.data);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }

    preOrderForEach(callback, root = this.root) {
        this.checkCallback(callback);
        if (root) {
            callback(root.data);
            this.preOrderForEach(callback, root.left);
            this.preOrderForEach(callback, root.right);
        }
    }
    
    inOrderForEach(callback, root = this.root) {
        this.checkCallback(callback);
        if (root) {
            this.inOrderForEach(callback, root.left);
            callback(root.data);
            this.inOrderForEach(callback, root.right);
        }
    }

    postOrderForEach(callback, root = this.root) {
        this.checkCallback(callback);
        if (root) {
            this.postOrderForEach(callback, root.left);
            this.postOrderForEach(callback, root.right);
            callback(root.data);
        }
    }

    checkCallback(callback) {
        if (!callback) throw new Error('Callback is required.');
    }
}

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

