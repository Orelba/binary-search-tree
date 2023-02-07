const Node = require('./node')

class Tree {
  constructor(array) {
    const sortedArray = [...new Set(array)].sort((a, b) => a - b)
    this.root = this.buildTree(sortedArray)
    console.log(sortedArray) // Delete
  }

  buildTree(sortedArray) {
    if (sortedArray.length === 0) return null

    const mid = Math.floor(sortedArray.length / 2)
    const rootNode = new Node(sortedArray[mid])
    rootNode.left = this.buildTree(sortedArray.slice(0, mid))
    rootNode.right = this.buildTree(sortedArray.slice(mid + 1))
    return rootNode
  }

  prettyPrint(node = this.root, prefix = '', isLeft = true) {
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
}

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
const tree = new Tree(arr)
console.log(tree.prettyPrint())