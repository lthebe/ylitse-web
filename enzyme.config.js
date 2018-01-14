import { configure } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import 'whatwg-fetch';

configure({ adapter: new EnzymeAdapter() });
