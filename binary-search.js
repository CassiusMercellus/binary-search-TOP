class Node {
    constructor(data, left = null, right = null) {
      this.data = data;
      this.left = left;
      this.right = right;
    }
  }
  
  class Tree {
    constructor(array) {
      array = [...new Set(array)].sort((a, b) => a - b); // Sort and remove duplicates
      this.root = this.buildTree(array);
    }
  
    buildTree(array) {
      if (array.length === 0) return null;
  
      const mid = Math.floor(array.length / 2);
      const root = new Node(array[mid]);
  
      root.left = this.buildTree(array.slice(0, mid));
      root.right = this.buildTree(array.slice(mid + 1));
  
      return root;
    }
  
    insert(value, node = this.root) {
      if (node === null) return new Node(value);
  
      if (value < node.data) {
        node.left = this.insert(value, node.left);
      } else if (value > node.data) {
        node.right = this.insert(value, node.right);
      }
      return node;
    }
  
    deleteItem(value, node = this.root) {
      if (node === null) return null;
  
      if (value < node.data) {
        node.left = this.deleteItem(value, node.left);
      } else if (value > node.data) {
        node.right = this.deleteItem(value, node.right);
      } else {
        if (node.left === null) return node.right;
        if (node.right === null) return node.left;
  
        node.data = this.findMin(node.right).data;
        node.right = this.deleteItem(node.data, node.right);
      }
      return node;
    }
  
    findMin(node) {
      while (node.left !== null) node = node.left;
      return node;
    }
  
    find(value, node = this.root) {
      if (node === null || node.data === value) return node;
  
      if (value < node.data) return this.find(value, node.left);
      return this.find(value, node.right);
    }
  
    levelOrder(callback) {
      if (this.root === null) return [];
  
      const queue = [this.root];
      const result = [];
  
      while (queue.length > 0) {
        const node = queue.shift();
        if (callback) callback(node);
        else result.push(node.data);
  
        if (node.left !== null) queue.push(node.left);
        if (node.right !== null) queue.push(node.right);
      }
      if (!callback) return result;
    }
  
    inOrder(callback, node = this.root, result = []) {
      if (node !== null) {
        this.inOrder(callback, node.left, result);
        if (callback) callback(node);
        else result.push(node.data);
        this.inOrder(callback, node.right, result);
      }
      if (!callback) return result;
    }
  
    preOrder(callback, node = this.root, result = []) {
      if (node !== null) {
        if (callback) callback(node);
        else result.push(node.data);
        this.preOrder(callback, node.left, result);
        this.preOrder(callback, node.right, result);
      }
      if (!callback) return result;
    }
  
    postOrder(callback, node = this.root, result = []) {
      if (node !== null) {
        this.postOrder(callback, node.left, result);
        this.postOrder(callback, node.right, result);
        if (callback) callback(node);
        else result.push(node.data);
      }
      if (!callback) return result;
    }
  
    height(node = this.root) {
      if (node === null) return -1;
  
      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);
  
      return Math.max(leftHeight, rightHeight) + 1;
    }
  
    depth(node, currentNode = this.root, depth = 0) {
      if (currentNode === null) return -1;
  
      if (node.data === currentNode.data) return depth;
  
      if (node.data < currentNode.data) return this.depth(node, currentNode.left, depth + 1);
      return this.depth(node, currentNode.right, depth + 1);
    }
  
    isBalanced(node = this.root) {
      if (node === null) return true;
  
      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);
  
      if (Math.abs(leftHeight - rightHeight) > 1) return false;
  
      return this.isBalanced(node.left) && this.isBalanced(node.right);
    }
  
    rebalance() {
      const nodes = this.inOrder();
      this.root = this.buildTree(nodes);
    }
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
  
  function randomArray(size, max = 100) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * max));
  }
  
  // Driver script
  let array = randomArray(15);
  let tree = new Tree(array);
  
  console.log("Initial tree:");
  prettyPrint(tree.root);
  
  // Confirm that the tree is balanced by calling isBalanced
  console.log("Is the tree balanced?", tree.isBalanced());
  
  // Print out all elements in level, pre, post, and in order
  console.log("Level Order:", tree.levelOrder());
  console.log("In Order:", tree.inOrder());
  console.log("Pre Order:", tree.preOrder());
  console.log("Post Order:", tree.postOrder());
  
  // Unbalance the tree by adding several numbers > 100
  tree.insert(101);
  tree.insert(102);
  tree.insert(103);
  tree.insert(104);
  tree.insert(105);
  
  console.log("Tree after adding elements > 100:");
  prettyPrint(tree.root);
  
  // Confirm that the tree is unbalanced by calling isBalanced
  console.log("Is the tree balanced?", tree.isBalanced());
  
  // Balance the tree by calling rebalance
  tree.rebalance();
  
  console.log("Tree after rebalancing:");
  prettyPrint(tree.root);
  
  // Confirm that the tree is balanced by calling isBalanced
  console.log("Is the tree balanced?", tree.isBalanced());
  
  // Print out all elements in level, pre, post, and in order
  console.log("Level Order:", tree.levelOrder());
  console.log("In Order:", tree.inOrder());
  console.log("Pre Order:", tree.preOrder());
  console.log("Post Order:", tree.postOrder());
  