function algo(MAX_COST, nodes, costMatrix){


//var nodes = locations


//var costMatrix = matrix



// console.log(costMatrix);
// console.log(nodes)
// console.log(nodes.length)

//array representing which nodes are already in a cycle; filled with false




class CycleNode{
    constructor(element){
        this.element = element;
        this.next = null;
    }
}

//Data strcutre to store the cycle - implemented as linked list
class Cycle{
    constructor(){
        this.head = null;
        this.tail = null;
        this.length = 0;
        this.totalCost = 0;

    }

    //only use this for starting node
    add(element){
        var node = new CycleNode(element);

        if (this.head == null){
            this.head = node;
            this.tail = node;
        } else{
            this.tail.next = node;
            this.tail = node;
        }
        this.length++;

        //note: cost should be 0 
    }

    //inserts node containing element after node containing target
    insert(target, element){
        var traverse = this.head;
        while(traverse.element != target){
            
            if (traverse.next == null){
                console.log("**heck** bad insert - target not found");
                return;
            }

            traverse = traverse.next;
        }

        var tmp = traverse.next;
        var newNode = new CycleNode(element);
        traverse.next = newNode;
        newNode.next = tmp;

        this.length++;
        this.totalCost += cost(traverse.element, newNode.element) + cost(newNode.element, tmp.element) - cost(traverse.element, tmp.element);


    }

    getCost(){
        return this.totalCost;
    }

    getLength(){
        return this.length;
    }

    toArray(){
        var array = Array(this.length);
        var tmp = this.head;
        for (var i = 0; i < this.length; i++){
            array[i] = tmp.element;
            tmp = tmp.next;
        }
        return array;
    }

    logCycle(){
        
        console.log("Cycle: " + this.toArray());
        //console.log(this.totalCost);
    }
}




console.log("hello there 2");

//const MAX_COST = 50000;
    
//console log stuff or not
const LOG = false;

var visited = Array(nodes.length).fill(false);

var unvisited = nodes.length;

//find the cost between two nodes
function cost(node1I, node2I){
    return costMatrix[node1I][node2I];
}

//marks the node at nodeI as visited 
function markVisited(nodeI){
    visited[nodeI] = true;
    unvisited--;
}

//fuction to find a maximal cycle containing node at startNodeI
/**
     * ALGORITHM - 
     * let rc be the running cost of the cycle
     * let c(X,Y) be the cost between two neighbor nodes X, Y
     * 
     * Note that nodes are indices. these indicies correspond to the costMatrix
     * 
     * start at node A
     * let the cycle be a list of nodes. The first and last element are A
     * find A's closest neighbor B
     * add B to the cycle (between A and A) and rc = 2*c(A,B)    (cost there and back)
     * mark B as visited
     * create a list Lcosts. this list will hold the minimum cost of adding the node corresponding to the index into the cycle. initialize to all Infinity
     * create a list Linsert. each index (corresponding to a node) holds the pair of nodes in the cycle where the new node would be inserted. Initialize to all [A,B]
     * 
     * consider every node X besides A and B
     * - calculate cost = c(A,X) + c(X, B) - c(A,B)
     * - lcosts[X] = cost
     * - linsert[X] = [A,B]
     * - keep track of the X associated with the smallest cost. call this Xmin
     * 
     * if rc + lcosts[Xmin] <= MAX_COST
     * - insert linsert[Xmin] into the cycle between A and B
     * - rc = rc + lcost[Xmin]
     * - set linsert[Xmin] to null 
     * - mark Xmin as visited
     * 
     * else terminate: return cycle
     * 
     * Function(A, B):
     * take each node Y  (if linsert[Y] is not null)
     * - calculate cost1 = c(A,Y) + c(Y,X) - c(A,X), associate this cost with Y inserted between A and X
     * - calculate cost2 = c(X,Y) + c(Y,B) - c(X,B), associate this cost with Y inserted between X and B
     * - lcosts[Y] = min(lcosts[Y], cost1, cost2)
     * - if cost1 <= cost2 && cost1 <= lcost[Y]
     * - - lcost[Y] = cost1
     * - - linsert[Y] = [A,X]
     * - else if cost2 < cost1 && cost2 <= lcost[Y]
     * - - lcost[Y] = cost2
     * - - linsert[Y] = [X,B]
     * - keep track of the Y associated with the smallest cost. Call this Ymin
     * 
     * if rc + lcosts[Ymin] <= MAX_COST
     * - insert linsert[Ymin] into the cycle between A and B
     * - rc = rc + lcost[Ymin]
     * - set linsert[Ymin] to null 
     * - mark Ymin as visited
     * 
     * else terminate: return cycle
     * 
     * Note that when Y is inserted, there are two new links to consider in the cycle
     * 
     * repeat Function with (A,B) = linsert[Ymin]
     *
     */
function findCycle(startNodeI){

    //cycle being made
    var cycle = new Cycle();
    
    markVisited(startNodeI);
    cycle.add(startNodeI);
    cycle.add(startNodeI);

    LOG && console.log("break2");
    var Lcosts = Array(costMatrix[0].length).fill(Infinity);
    var Linsert = Array(costMatrix[0].length).fill([startNodeI, startNodeI]);

    var newNodeI = cycleExtendCandidates(Lcosts, Linsert, startNodeI, startNodeI, startNodeI);

    LOG && console.log("jello");

    //maximize nodes in the cycle
    while(cycle.getCost() + Lcosts[newNodeI] <= MAX_COST && unvisited > 0){
        LOG && cycle.logCycle();
        cycle.insert(Linsert[newNodeI][0], newNodeI);
        markVisited(newNodeI);
        newNodeI = cycleExtendCandidates(Lcosts, Linsert, Linsert[newNodeI][0], newNodeI, Linsert[newNodeI][1]);
        LOG && console.log("max: " + MAX_COST + "  cur: " + cycle.getCost());
    }

    LOG && cycle.logCycle();

    return cycle;

}

//helper for find cycle
function cycleExtendCandidates(Lcosts, Linsert, AI, BI, CI){
    //cycle goes A-B-C

    var minI = 0;
    var minCost = Infinity;
    var costAXB;
    var costBXC;

    for (var XI = 0; XI < costMatrix[0].length; XI++){
        if (!visited[XI]){
            
            //Lcosts[XI] = current minimum cost to add node X. 
            //X would be added between Linsert[XI]
            //costAXB = net cost of adding X between A and B
            //costBXC = net cost of adding X between B and C
             
            costAXB = cost(AI, XI) + cost(XI, BI) - cost(AI, BI);
            costBXC = cost(BI, XI) + cost(XI, CI) - cost(BI, CI);


            //Lcosts[XI] = Math.min(Lcosts[XI], costAXB, costBXC);


            console.log()

            if (costAXB <= Lcosts[XI] && costAXB <= costBXC){
                // if adding X between A and B would incurr a lower net cost than adding X between some other nodes
                // then we update Lcosts with that cost and Linsert with A and B
                Lcosts[XI] = costAXB;
                Linsert[XI] = [AI, BI];
            } else if(costBXC <= Lcosts[XI] && costBXC <= costAXB) {
                Lcosts[XI] = costBXC;
                Linsert[XI] = [BI, CI];
            }  

            if (Lcosts[XI] <= minCost){
                minI = XI;
                minCost = Lcosts[XI];
            }

        }
    }

    return minI;

}

function indexSort(array){
    var len = array.length;
    var indices = new Array(array);
    for (var i = 0; i < len; i++) indices[i] = i;
    indices.sort(function (a, b) { return array[a] > array[b] ? -1 : array[a] < array[b] ? 1 : 0; });
    //console.log(indices);
    return indices;
  }

//findCycle(0);

function totalCosts(){
    var costSums = Array(costMatrix.length);

    for (var i = 0; i < costMatrix.length; i++){
        costSums[i] = costMatrix[i].reduce((partialSum, a) => partialSum + a, 0);
    }
    return costSums;
}

function createCycles(){
    var cycles = []
    var totalCost = 0;
    var newCycle;

    //produce an array of indices corresponding to decending order of row sums of the costMatrix
    var indices = indexSort(totalCosts());
    for (var nodeI = 0; nodeI < nodes.length; nodeI++){
        if (!visited[indices[nodeI]]){
            newCycle = findCycle(indices[nodeI]);
            cycles.push(newCycle);
            totalCost += newCycle.getCost();
            newCycle.logCycle();
        }
    }

    console.log("total cost: " + totalCost);
    return cycles
}

return createCycles()



}

//createCycles();