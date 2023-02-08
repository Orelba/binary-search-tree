class Node {
  constructor(key, left, right) {
    this.key = key
    this.left = left || null
    this.right = right || null
  }
}

module.exports = Node