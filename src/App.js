import { Route, Switch } from 'react-router-dom';

import './scss/style.scss';
//common
import Header from './components/common/Header';
import Footer from './components/common/Footer';
//main
import Content from './components/main/Content';
import Visual from './components/main/Visual';
//sub
import Community from './components/sub/Community';
import Contact from './components/sub/Contact';
import Gallery from './components/sub/Gallery';
import Join from './components/sub/Join';
import New from './components/sub/New';
import Youtube from './components/sub/Youtube';

const path = process.env.PUBLIC_URL;

function App() {
	return (
		<>
			<Switch>
				<Route exact path='/'>
					<Header type={'main'} logoSrc={`${path}/img/henge_logo.png`} />
					<Visual />
					<Content />
				</Route>

				<Route path='/'>
					<Header type={'sub'} logoSrc={`${path}/img/henge_logo.png`} />
				</Route>
			</Switch>

			<Route path='/gallery' component={Gallery} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/contact' component={Contact} />
			<Route path='/new' component={New} />
			<Route path='/community' component={Community} />
			<Route path='/join' component={Join} />

			<Switch>
				<Route exact path='/'>
					<Footer type={'main'} />
				</Route>

				<Route path='/'>
					<Footer type={'sub'} />
				</Route>
			</Switch>
		</>
	);
}

export default App;
