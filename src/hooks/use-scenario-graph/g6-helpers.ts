// import G6 from '@antv/g6';
import type { EdgeConfig, IG6GraphEvent, NodeConfig , GraphData } from '@antv/g6'
import type { ScenarioArgs } from './use-scenario-graph';


const iconsMap = new Map([
	['kali', '/favicon.ico' ],
	['opnsense', '/favicon.ico'],
	['win', '/favicon.ico'],
	['public', '/favicon.ico' ],
	['nginx', '/favicon.ico' ]
])


export function prepareDataGraph(data: GraphData, withIcons: boolean) {
	return {
		nodes: data?.nodes?.map( (n: NodeConfig) => {
			let nodeObj = { 
				label: n.id.split('-')[0], 
				labelCfg: {position: 'top', offset:5},
				...n, 
			}
			if (withIcons) nodeObj.img = iconsMap.get(n.id.split('-')[0])
			return nodeObj 
		}),
		edges: data?.edges?.map( (e: EdgeConfig, i: number) => ({...e, id: 'edge' + i})),
	}
}

export async function createGraph( {reference, data, withIcons} : ScenarioArgs ) {

	const G6 = await import('@antv/g6')

	const tooltip = new G6.Tooltip({
		offsetX: 10,
		offsetY: -10,
		// the types of items that allow the tooltip show up
		itemTypes: ['node'],
		// custom the tooltip's content
		getContent: (e: IG6GraphEvent | undefined) => {
			const outDiv = document.createElement('div');
			outDiv.style.width = 'fit-content';
			outDiv.style.fontSize = '12px'
			outDiv.style.padding = '0px 8px';
			outDiv.innerHTML = `
				<ul style="list-style:none; line-height:1.7; padding:0;margin:0;">
					<li>Name: <strong> ${e?.item?.getModel().id} </strong> </li>
					<li>Type: ${e?.item?.getType()}</li>
				</ul>`;
			return outDiv;
		},
	});
	
	const graph = new G6.Graph({
		container: reference.current, 
		fitView: true, 
		fitViewPadding: 30,
		/*  fitCenter: true, */ 
		width: reference.current?.offsetWidth,
		height: reference.current?.offsetHeight,
		modes: { default: ['drag-canvas', 'activate-relations']}, // 'zoom-canvas'
		plugins: [tooltip],
		layout: {
			type: 'force',
			preventOverlap: true,
			linkDistance: (d:any) => {
				if (d.source.id === 'opnsense-corp') {
					return 90;
				}
				return 50;
			},
			nodeStrength: (d:any) => {
				if (d.isLeaf) {
					return -50;
				}
				return -10;
			},
			edgeStrength: (d:any) => {
				if (d.source.id.split('-')[0] === 'opnsense' || 'public' ) {
					return 0.2;
				}
				return 0.1;
			},
			/* onLayoutEnd: () => {} */
		},
		defaultNode: {
			type: withIcons ? 'image' : 'circle',
			size: [25],
			style: {
        lineWidth: 1,
				color: 'black'
      },
			
		},
		defaultEdge: {
			type: 'line',
			style: {
				radius: 15,
				offset: 30,
				endArrow: false,
				lineWidth: 1.5,
				lineDash: [4, 2, 1, 2] , 
				stroke: '#F6BD16',
			},
		}
	})
	graph.data(prepareDataGraph(data, withIcons))
	console.log('CREO NEW GRAPH: ', new Date());
	graph.render()
	graph.on('node:dragstart', (e: IG6GraphEvent) => {
	graph.layout();
		refreshDragedNodePosition(e);
	});
	graph.on('node:drag', (e: IG6GraphEvent) => {
		refreshDragedNodePosition(e);
	});
	graph.on('node:dragend', (e: IG6GraphEvent | undefined) => {
		e!.item!.get('model').fx = null;
		e!.item!.get('model').fy = null;
	});
	function refreshDragedNodePosition(e: IG6GraphEvent) {
		const model = e?.item?.get('model');
		model.fx = e.x;
		model.fy = e.y;
	}

	return graph
}