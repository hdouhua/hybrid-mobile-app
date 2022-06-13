import App from '../../c12/App';
import {withProfiler} from '@shared/utils/monitoring';

export default withProfiler(App, {name: 'Profiler-test'});
