export class Tree {
    constructor() {
        this.root;
    }

    buildTree(array, start = 0, end = array.length - 1) {
        if (start > end) return null;

        let mid = Math.floor((start + end) / 2);
        let root = new Node(array[mid]);

        root.left =this.buildTree(array, start, mid - 1);
        root.right = this.buildTree(array, mid + 1, end);

        return root;
    }

    create(array) {
        this.root = this.buildTree(array);
    }
}

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

