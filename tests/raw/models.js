import { AiApiWrapper } from '../../src/index.js'
const client = new AiApiWrapper();

client.v1.getModels().then(d => console.log(d[0].id));