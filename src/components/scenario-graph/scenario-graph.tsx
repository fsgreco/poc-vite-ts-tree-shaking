import styled from 'styled-components';
import { useRef } from 'react';
import type { GraphData } from '@antv/g6';
import { useScenarioGraph} from '../../hooks/use-scenario-graph/use-scenario-graph';

/* eslint-disable-next-line */
export interface ScenarioGraphProps {
	data: GraphData,
	withIcons?: boolean,
	sizes?: Array<number | string>
}

const StyledScenarioGraph = styled.div<{sizes: Array<number | string>}>`
	width: ${({sizes}) => sizes[0]};
	height: ${({sizes}) => sizes[1]};
	border: 3px dashed red;
`;


export function ScenarioGraph({ data, withIcons = false, sizes = ['100%', '400px'] }: ScenarioGraphProps) {
	
	const reference = useRef(null)
	const { success } = useScenarioGraph({ data, reference, withIcons })
  return (
	<>
		{ !success && <p>loading</p> }
		<StyledScenarioGraph sizes={sizes} ref={reference} style={{visibility: !success ? 'hidden' : 'visible'}}>
		</StyledScenarioGraph>
	</>

  );
}

export default ScenarioGraph;
