import './App.css';

import Header from './Components/Header';

import { NavLink, Outlet } from "react-router-dom";

function App() {
	return (
		<div className='app'>
			<Header />
			<hr></hr>
			<Outlet />
			<div className='paginationContainer'>
				<div className='pagination'>
					<NavLink to='/personal_details'><div>1</div></NavLink>
					<NavLink to='/parent_details'><div>2</div></NavLink>
					<NavLink to='/form'><div>3</div></NavLink>
				</div>
			</div>
		</div>
	);
}

export default App;
