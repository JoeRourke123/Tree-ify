# Tree-ify
A problem set to me by one of my lecturers...

## The problem
Given a deck of (virtual) cards, using quick sort to sort them will generate a binary tree. Can you draw that tree without any of the nodes and lines overlapping one another?

## My solution
Using a in-order tree traversal to count the number of nodes under the current node, and subtracting it from the no. of nodes under its parent in order to push the node left or right far enough to prevent overlapping.
