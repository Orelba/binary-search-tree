const Node = require('./node')

class Tree {
  constructor(array) {
    this.sortedArray = [...new Set(array)].sort((a, b) => a - b)
    this.root = this.buildTree(this.sortedArray)
  }

  buildTree(sortedArray) {
    if (sortedArray.length === 0) return null

    const mid = Math.floor(sortedArray.length / 2)
    const rootNode = new Node(sortedArray[mid])
    rootNode.left = this.buildTree(sortedArray.slice(0, mid))
    rootNode.right = this.buildTree(sortedArray.slice(mid + 1))

    return rootNode
  }

  insert(key, root = this.root) {
    // If the tree is empty, insert a new node
    if (root === null) {
      root = new Node(key)
      return root
    }

    // If the tree has nodes, recur down the tree
    if (key < root.key) root.left = this.insert(key, root.left)
    else if (key > root.key) root.right = this.insert(key, root.right)

    return root
  }

  #minValue(root) {
    let minValue = root.key
    while (root.left !== null) {
      minValue = root.left.key
      root = root.left
    }

    return minValue
  }

  delete(key, root = this.root) {
    if (root === null) return root

    // Go down the tree recursively
    if (key < root.key) root.left = this.delete(key, root.left)
    else if (key > root.key) root.right = this.delete(key, root.right)
    else {
      if (root.left === null) return root.right
      else if (root.right === null) return root.left

      root.key = this.#minValue(root.right)

      root.right = this.delete(root.key, root.right)
    }

    return root
  }

  find(key, root = this.root) {
    if (root === null || root.key === key) return root

    if (root.key < key) return this.find(key, root.right)
    else if (root.key > key) return this.find(key, root.left)
  }

  // Breadth-first traversal (Level-order)
  levelOrder(callbackFn, root = this.root) {
    if (root === null) return root

    let queue = []
    let currentNode = root
    let levelOrderList = []

    queue.push(root)

    while (queue.length !== 0) {
      currentNode = queue.shift()

      callbackFn ? callbackFn(currentNode.key) : levelOrderList.push(currentNode.key)

      if (currentNode.left) queue.push(currentNode.left)
      if (currentNode.right) queue.push(currentNode.right)
    }

    if (!callbackFn) return levelOrderList
  }

  // Depth-first traversal (Inorder, Preorder, Postorder)
  inorder(callbackFn, root = this.root, list = []) {
    if (root === null) return root

    this.inorder(callbackFn, root.left, list)
    callbackFn ? callbackFn(root) : list.push(root.key)
    this.inorder(callbackFn, root.right, list)

    if (!callbackFn) return list
  }

  preorder(callbackFn, root = this.root, list = []) {
    if (root === null) return root

    callbackFn ? callbackFn(root) : list.push(root.key)
    this.preorder(callbackFn, root.left, list)
    this.preorder(callbackFn, root.right, list)

    if (!callbackFn) return list
  }

  postorder(callbackFn, root = this.root, list = []) {
    if (root === null) return root

    this.postorder(callbackFn, root.left, list)
    this.postorder(callbackFn, root.right, list)
    callbackFn ? callbackFn(root) : list.push(root.key)

    if (!callbackFn) return list
  }

  height(node = this.root) {
    if (node === null) return 0

    const leftHeight = this.height(node.left)
    const rightHeight = this.height(node.right)

    return Math.max(leftHeight, rightHeight) + 1
  }

  depth(node, root = this.root, pathEdgeCount = 0) {
    if (root === null) return root
    if (root.key === node.key) return pathEdgeCount

    if (root.key < node.key) return this.depth(node, root.right, pathEdgeCount + 1)
    return this.depth(node, root.left, pathEdgeCount + 1)
  }

  #checkBalance(root = this.root) {
    if (root === null) return 0

    let leftHeight = this.#checkBalance(root.left)
    let rightHeight = this.#checkBalance(root.right)

    if (leftHeight === -1 || rightHeight === -1) return -1

    if (Math.abs(leftHeight - rightHeight) > 1) return -1
    return Math.max(leftHeight, rightHeight) + 1
  }

  isBalanced() {
    return this.#checkBalance() !== -1
  }

  rebalance() {
    this.root = this.buildTree(this.inorder())
  }

  prettyPrint(node = this.root, prefix = '', isLeft = true) {
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.key}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
}

module.exports = Tree