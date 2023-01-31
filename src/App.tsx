import ReactFlow, {
  Controls,
  Background,
  Node,
  ConnectionMode,
  useEdgesState,
  addEdge,
  Connection,
  useNodesState,
} from "reactflow";
import * as Toolbar from '@radix-ui/react-toolbar';
import { zinc } from "tailwindcss/colors";
// 👇 you need to import the reactflow styles
import "reactflow/dist/style.css";

import { Square } from "./components/nodes/Square";
import { useCallback } from "react";
import DefaultEdge from "./components/edges/DefaultEdge";

//nodes, edegs

const NODE_TYPES = {
  square: Square,
};
const EDGE_TYPES = {
  default: DefaultEdge,
}

const INITIAL_NODES = [
  {
    id: crypto.randomUUID(),
    type: "square",
    position: {
      x: 200,
      y: 400,
    },
    data: {}, //enviar informação do app para dentro do node usa o data.
  },
  {
    id: crypto.randomUUID(),
    type: "square",
    position: {
      x: 1000,
      y: 400,
    },
    data: {}, //enviar informação do app para dentro do node usa o data.
  },
] satisfies Node[];

function App() {
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES)

  const onConnect = useCallback((connection: Connection) => {
    return setEdges((edges) => addEdge(connection, edges));
  }, []);

  function addSquareNode() {
    setNodes(nodes => [ // pega todos os nodes
      ...nodes, //copia todos os nodes que ja tem
      {         // cria um novo node
        id: crypto.randomUUID(),
        type: "square",
        position: {
          x: 750,
          y: 350,
        },
        data: {}, //enviar informação do app para dentro do node usa o data.
      },
    ])
  }
  return (
    <div className="w-screen h-screen">
      <ReactFlow
        nodeTypes={NODE_TYPES}
        nodes={nodes}
        edgeTypes={EDGE_TYPES}
        connectionMode={ConnectionMode.Loose}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect ={onConnect}
        defaultEdgeOptions ={{type : 'default'
        }}
        // connectionMode = {ConnectionMode.Loose}
      >
        <Background gap={12} size={2} color={zinc[200]} />
        <Controls />
      </ReactFlow>
      
      <Toolbar.Root className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg border-zinc-300 px-8 h-20 w-96 overflow-hidden          ">
        <Toolbar.Button 
        onClick={addSquareNode}//quando clicar chama a função para adicionar uma nova square
        className=" w-32 h-32 bg-violet-500 mt-6 rounded transition-transform hover:-translate-y-2">

        </Toolbar.Button>
      </Toolbar.Root>
    </div>
  );
}

export default App;
