import { useRef } from "react"
import "./App.css"

import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react"

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}


class BinarySearchTree {
  root = null
  constructor() {
    makeAutoObservable(this)
  }
  insert(data) {
    let newNode = {
      data: data,
      left: null,
      right: null
    };
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }
  insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }
}

const my_bst = new BinarySearchTree();

window.document.addEventListener('keyup', (e) => {
  if (e.key === " ") my_bst.insert(getRandomInt(-100, 100));
});



const BinaryThreeView = observer(({ bst }) => {
  return (
    <div>
      {(function recurce(node) {
        if (node) {
          return <div className="border">
            <div className="bug-number">{node.data}</div>
            <div className="d-flex">
              <div >
                {node.left && recurce(node.left)}
              </div>
              <div >
                {node.right && recurce(node.right)}
              </div>
            </div>
          </div>
        } else {
          return <><h3>нажмите пробел</h3></>
        }

      })(bst.root)}
    </div>
  )
})


function App() {
  const appRef = useRef(null);
  return (
    <div className="App"
      ref={appRef}
    >
      <BinaryThreeView bst={my_bst} />
    </div>
  );
}

export default App;
