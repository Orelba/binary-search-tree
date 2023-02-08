const Node = require('./node')

class Tree {
  constructor(array) {
    this.sortedArray = [...new Set(array)].sort((a, b) => a - b)
    this.root = this.buildTree(this.sortedArray)
    console.log(this.sortedArray) // Delete
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

// Test Zone:
function testFn(arg) {
  console.log(arg)
}

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
const tree = new Tree(arr)
// tree.prettyPrint()
// tree.insert(2)
// tree.prettyPrint()
// tree.delete(6345)
tree.prettyPrint()
// console.log(tree.find(67))
console.log("---")
tree.levelOrder(testFn)
console.log(tree.levelOrder())