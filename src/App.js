import './App.css';

import Header from './Components/Header';

import { NavLink, Outlet } from "react-router-dom";

function App() {
	return (
		<div className='app'>
			<div>
				<Header />
				<hr></hr>
				<Outlet />
				<div className='paginationContainer'>
					<div className='pagination'>
						<NavLink to='/personal_details'><div>1</div></NavLink>
						<NavLink to='/parent_details'><div>2</div></NavLink>
						<NavLink to='/address_details'><div>3</div></NavLink>
						<NavLink to='/contact_details'><div>4</div></NavLink>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
