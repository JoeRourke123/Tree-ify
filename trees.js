class TreeNode {
  constructor(parent = null) {
    this.stack = [];
    this.parent = parent;
  }

  sortStack() {
    this.left = new TreeNode(this);
    this.right = new TreeNode(this);

    if (!this.isEmpty()) {
      for (let i = 1; i < this.getStack().length; i++) {
        if (this.getCard().getValue() <= this.getCard(i).getValue()) {
          this.right.addCard(this.getCard(i));
        } else {
          this.left.addCard(this.getCard(i));
        }
      }

      this.right.sortStack();
      this.left.sortStack();
    }
  }

  isEmpty() {
    return this.getStack().length === 0;
  }

  addCard(card) {
    this.stack.push(card);
  }

  getCard(i = 0) {
    return this.getStack()[i];
  }

  getNode() {
    return this.node;
  }

  getStack() {
    return this.stack;
  }

  getLeft() {
    return this.left;
  }

  getRight() {
    return this.right;
  }
}

class CardTree {
  constructor(sorted = false, noOfCards = 8) {
    let cards = ["CA", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "CJ", "CQ", "CK", "DA", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10", "DJ", "DQ", "DK", "SA", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "S10", "SJ", "SQ", "SK",  "HA", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10", "HJ", "HQ", "HK"];
    if(!sorted) {
      cards = cards
          .map((a) => ({sort: Math.random(), value: a}))
          .sort((a, b) => a.sort - b.sort)
          .map((a) => a.value);
    }

    this.noOfCards = noOfCards;
    this.head = new TreeNode();

    for(let i = 0; i < noOfCards; i++) {
      this.head.addCard(
        new Card(cards[i])
      );
    }

    this.head.sortStack();
    this.drawTree();
  }

  drawTree() {
    let canvas = new fabric.Canvas("sorter"), stack = [];
    canvas.setWidth(window.innerWidth * 2);
    canvas.setHeight(window.innerHeight * 2);

    stack.push(this.head);
    stack[0].node = new fabric.Group([
      new fabric.Rect({
        fill: "white",width: 20,height: 30,originX: 'center',originY: 'center', stroke: "black", strokeWidth: 1
      }),
      new fabric.Text(stack[0].getCard().toString(), {
        fontFamily: "Arial", fontSize: 11,originX: 'center',originY: 'center',textAlign: 'center',fill: 'black'
      })], {
        top: 20,left: ((window.innerWidth * 2) / 2) - 5
      }
    );
    canvas.add(stack[0].getNode());

    while(stack.length > 0) {
      let node = stack[0];
      stack.shift();

      try {
        let isRight = node.parent.getRight() == node;

        node.node = new fabric.Group([new fabric.Rect({
          fill: "white",width: 20,height: 30,originX: 'center',originY: 'center', stroke: "black", strokeWidth: 1
        }),
        new fabric.Text(node.getCard().toString(), {
          fontFamily: 'Arial', fontSize: 11,originX: 'center',originY: 'center',textAlign: 'center',fill: 'red'
        })], {
          top: node.parent.getNode().top + 50,
          left: (isRight) ?
                  node.parent.getNode().left + ((this.childCount(node.parent) - this.childCount(node)) * 15) :
                  node.parent.getNode().left - ((this.childCount(node.parent) - this.childCount(node)) * 15)
        });

        canvas.add(node.getNode());
        let line = new fabric.Line([node.getNode().getCenterPoint().x, node.getNode().getCenterPoint().y,
                                    node.parent.getNode().getCenterPoint().x, node.parent.getNode().getCenterPoint().y], {
          fill: "black",
          stroke: "black",
          strokeWidth: 1
        });
        canvas.add(line);
        canvas.moveTo(node.getNode(), 100);
        canvas.moveTo(line, 0);
      } catch(e) { console.log(e) }

      if(!node.getLeft().isEmpty()) {
        stack.push(node.getLeft());
      }
      if(!node.getRight().isEmpty()) {
        stack.push(node.getRight());
      }
    }
  }

  childCount(node) {
    let count = 1;

    if(!node.getLeft().isEmpty()) {
      count += this.childCount(node.getLeft());
    }
    if(!node.getRight().isEmpty()) {
      count += this.childCount(node.getRight());
    }

    return count;
  }
}

class Card {
  constructor(card) {
    this.card = card;
  }

  getValue() {
    if(!isNaN(this.card.substring(1))) {
      return parseInt(this.card.substring(1));
    }

    return (this.card.substring(1) == "A") ? 1 : 10;
  }

  toString() {
    return this.card;
  }
}
