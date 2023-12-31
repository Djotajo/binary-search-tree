import testScript from "./test.js";

//   Node factory
function createNode (nodeData) {
    const data = nodeData;
    let left = null;
    let right = null;
    return { data, left, right };
  }

// Tree class

export class Tree {
    constructor(treeArray) {
      this.treeArray = treeArray;
      this.root = this.buildTree(treeArray);
    }

    buildTree(input, start = 0, end = input.length-1) {
        if (start > end) {
            return null;
        }

        let fixedArray = this.arrayHelper(input);
    
        let middleIndex = Math.floor((start + end) / 2);
        let middle = fixedArray[Math.floor((start + end) / 2)];
    
        let root = createNode(middle);
        root.left = this.buildTree(fixedArray.slice(start, middleIndex));
        root.right = this.buildTree(fixedArray.slice(middleIndex+1, end+1));
    
        return root;
    }

    arrayHelper(input){
        return [...new Set(input)].sort((a,b) => a-b);
    }

    insert(value, tree = this.root) {
        if (value < tree.data && tree.left === null) {
            tree.left = createNode(value);
            return;
        } else if (value > tree.data && tree.right === null) {
            tree.right = createNode(value);
            return;
        } 
        if (value < tree.data){
            this.insert(value, tree.left);
        } else {
            this.insert(value, tree.right)
        }
    }

    delete(value, node = this.root) {
        if (node === null) {
            return node;
        }
        if (value < node.data){
            node.left = this.delete(value, node.left);
        } else if (value > node.data){
            node.right = this.delete(value, node.right);
        } else {
            if (node.left === null) {
                return node.right;
            }
            if (node.right === null) {
                return node.left;
            }
            node.data = this.findNext(node.right);
            node.right = this.delete(node.data, node.right);
        }
        return node;
    }

    find(value, tree = this.root) {
        if (value === tree.data) {
            console.log(tree);
            return tree;
        } 
        else if (value < tree.data && tree.left != null){
            return this.find(value, tree.left);
        } else if (value > tree.data && tree.right != null){
            return this.find(value, tree.right);
        } else {
            return "not found";
        }
    }

    levelOrder(callback, tree = this.root) {
        if (tree === null) {
            return;
        }
        let queue = [];
        queue.push(tree);
        if (callback) {
            while (queue.length != 0){
                let current = queue[0];
                callback(current);
                if (current.left != null) {
                    queue.push(current.left)
                } 
                if (current.right != null) {
                    queue.push(current.right)
                }
                queue.shift();
            }   
        } else {
            let retQueue = [];
            while (queue.length != 0){
                let current = queue[0];
                retQueue.push(current.data);
                if (current.left != null) {
                    queue.push(current.left)
                } 
                if (current.right != null) {
                    queue.push(current.right)
                }
                queue.shift();
        }   
            return retQueue;
        }
    }

    inOrder(callback, node = this.root, result =[]) {
        if (node === null){
            return;
        }
        this.inOrder(callback, node.left, result);
        if (callback) {
            callback(node);
        } else {
            result.push(node.data);
        }
        this.inOrder(callback, node.right, result);
        return result;
    }

    preOrder(callback, node = this.root, result =[]) {
        if (node === null){
            return;
        }
        if (callback) {
            callback(node);
            } else {
                result.push(node.data);
            }
        this.preOrder(callback, node.left, result);
        this.preOrder(callback, node.right, result);
        return result;
    }
        
    postOrder(callback, node = this.root, result =[]) {
        if (node === null){
            return;
        }
        this.postOrder(callback, node.left, result);
        this.postOrder(callback, node.right, result);
        if (callback) {
            callback(node);
            } else {
                result.push(node.data);
            }
        return result;
    }

    height(node){
        if (node === null) {
            return 0;
        }
        else {
            let left = this.height(node.left);
            let right = this.height(node.right);
            return Math.max(left, right) + 1;
        }
    }

    depth(node, tree = this.root){
        if (tree === null) {
            return 1;
        }
        if (tree.data === node.data) {
            return 0;
        }
        else {
            let left = this.depth(node, tree.left);
            let right = this.depth(node, tree.right);
            return Math.abs(Math.max(left, right) - 1);
        }
    }

    isBalanced(tree = this.root){
        if (tree === null) {
            return 0;
        }
        else {
            let left = this.height(tree.left);
            let right = this.height(tree.right);
            return Math.abs(left - right) > 1 ? false : true;
        }
    }

    rebalance(){
        let newArray = this.levelOrder(); 
        this.treeArray = newArray;
        this.root = this.buildTree(newArray);
    }

    findNext(value) {
        if (value.left != null) {
            return this.findNext(value.left);
        };
        return value.data;
    }
}

testScript();