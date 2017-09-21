const Node = require('./node');

class LinkedList {
    constructor() {
        this.length = 0;
        this._tail = null;
        this._head = null;
    }

    append(data) {
        var node = new Node(data);
        
            if (this.length) {
                this._tail.next = node;
                node.prev = this._tail;
                this._tail = node;
            } else {
                this._head = node;
                this._tail = node;
            }
        
            this.length++;
        
            return this;
    }

    head() {
        if (this._head === null) {
            return null;
        }
        return this._head.data;
    }

    tail() {
        if (this._tail === null) {
            return null;
        }
        return this._tail.data;
    }

    _nodeAt(index) {
        var currentNode = this._head,
        length = this.length,
        count = 0;

    // 1-ый случай: неверная позиция 
    if (index < 0 || index > length) {
        return null;
    }

    // 2-ой случай: верная позиция 
    while (count < index) {
        currentNode = currentNode.next;
        count++;
    }
    return currentNode;
    }

    at(index) {
    var currentNode = this._nodeAt(index);

    return currentNode.data;
    }

    insertAt(index, data) {
        if (this.length === 0) {
            this.append(data);
            return this;
        }
        if (index === 0 && this.length !== 0){
            var elementAtIndex = this._nodeAt(index);
            var prevForCurrent = null;
            var newNode = new Node(data, prevForCurrent, elementAtIndex);
            
            elementAtIndex.prev = newNode;
            this._head = newNode;
            this.length++;

        }
        if (this.length === index){ 
            this.append(data);
        }
         
        if(index < 0 || index > this.length + 1){

        } else {
            var elementAtIndex = this._nodeAt(index);
            var prevForCurrent = elementAtIndex.prev;
            var newNode = new Node(data, prevForCurrent, elementAtIndex);
            
            elementAtIndex.prev = newNode;
            prevForCurrent.next = newNode;
            this.length++;
        }
        return this;
    }

    isEmpty() {
        return this.length === 0;
    }

    clear() {
        this.length = 0;
        this._tail = null;
        this._head = null;

        return this;
    }

    deleteAt(index) {
       var nodeAtIndex = this._nodeAt(index);
       if (index === 0 && this.length === 1){
        this._head = null;
        this._tail = null;

        this.length = this.length - 1;
        
        return this;
       }
       if (index === 0){
           nodeAtIndex.next.prev = null;
       }
       if (index === this.length-1){
        nodeAtIndex.prev.next = null;
       }
       else{
       nodeAtIndex.prev.next = nodeAtIndex.next;
       nodeAtIndex.next.prev = nodeAtIndex.prev;
       }
       nodeAtIndex.next = null;
       nodeAtIndex.prev = null;
       
       this.length = this.length - 1;

       return this;
    }

    reverse() {
        var newList = new LinkedList();
        for(var i = this.length-1; i > -1; i--) {
            newList.append(this.at(i));
        }
        this._head = newList._head;
        this._tail = newList._tail;

        return this;
    }

    indexOf(data) {
     for ( var i = 0; i < this.length; i++) {
         var dataAtIndex = this.at(i);
         if(data === dataAtIndex){
             return i;
         }
     }   
     return -1;
    }
}

module.exports = LinkedList;