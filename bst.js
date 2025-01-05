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
        this.root = this.buildTree(array);
        this.prettyPrint(this.root);
    }

    prettyPrint(node, prefix = "", isLeft = true) {
        if (node === null) {

          return;
        }
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
      };
     
}

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

