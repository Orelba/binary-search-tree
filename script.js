const Tree = require('./binary-tree')

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
const tree = new Tree(arr)

console.log('Is the tree balanced?', tree.isBalanced())

console.log('Tree inorder traversal:', tree.inorder())
console.log('Tree preorder traversal:', tree.preorder())
console.log('Tree postorder traversal:', tree.postorder())

tree.insert(2)
tree.insert(124)
tree.insert(79)
tree.delete(3)

console.log('(after insertion of some nodes): Is the tree balanced?', tree.isBalanced())

tree.rebalance()

console.log('(after rebalance): Is the tree balanced?', tree.isBalanced())

console.log('(after rebalance): Tree inorder traversal:', tree.inorder())
console.log('(after rebalance): Tree preorder traversal:', tree.preorder())
console.log('(after rebalance): Tree postorder traversal:', tree.postorder())

tree.prettyPrint()