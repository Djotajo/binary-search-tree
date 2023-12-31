import { Tree } from "./binaryTree.js";

export default function testScript(){
    let tree = new Tree(randomNumbers());
    console.log(tree.isBalanced());
    console.log("levelOrder");
    console.log(tree.levelOrder());
    console.log("inOrder");
    console.log(tree.inOrder());
    console.log("preOrder");
    console.log(tree.preOrder());
    console.log("postOrder");
    console.log(tree.postOrder());
    tree.insert(101);
    tree.insert(102);
    tree.insert(103);
    tree.insert(104);
    tree.insert(105);
    console.log(tree.isBalanced());
    tree.rebalance();
    console.log(tree.isBalanced());
    console.log("levelOrder");
    console.log(tree.levelOrder());
    console.log("preOrder");
    console.log(tree.preOrder());
    console.log("postOrder");
    console.log(tree.postOrder());
    console.log("inOrder");
    console.log(tree.inOrder());
    prettyPrint(tree.root);
}

function randomNumbers() {
    let randomArray = [];
    for (let n = 15; n > 0; n--){
        randomArray.push(Math.floor(Math.random() * 101));
    }
    return randomArray;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };