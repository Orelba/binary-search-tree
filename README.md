# Data Structures: Binary Search Tree
An implementation of a balanced binary search tree (BST) in Javascript.

## To run the script:
Run `script.js`.

There is already a demonstration of some of the methods in the file,  
You can use all the methods available below.

## Includes the following methods:
* `insert(key)` - inserts a new node with the given key into the tree
* `delete(key)` - deletes the node holding the given key from the tree
* `find(key)` - returns the node holding the given key in the tree
* `levelOrder(callbackFn)` **&ast;** - traverses each node of the tree in level order.
* `inorder(callbackFn)` **&ast;** - traverses each node of the tree inorder
* `preorder(callbackFn)` **&ast;** - traverses each node of the tree preorder
* `postorder(callbackFn)` **&ast;** - traverses each node of the tree postorder
* `height(node)` - returns the height of a node -- defined as the longest path between the node and a leaf node
* `depth(node)` - returns the depth of a node -- defined as the distance between the node and the root
* `isBalanced()` - returns true/false based on whether or not the tree is balanced
* `rebalance()` - rebalances the tree
* `prettyPrint()` - prints the tree in the console in a human reader friendly format

### Additional note for methods that have an asterisk(*): 

**&ast;** **If a callback function is provided, each node of the binary tree will be provided as the argument to the provided function, otherwise an array of node keys will be returned.**