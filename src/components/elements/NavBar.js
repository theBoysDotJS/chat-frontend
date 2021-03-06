import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router'
import Avatar from '../assets/Avatar.js';
import Settings from "./Settings.js"
import CreateConvo from "./CreateConvo.js"
import AddUser from "./addUser.js"
import Api from '../../api.js';
import Auth from '../../auth.js';
import Anime from '../../animate.js'

class NavBar extends Component {
	constructor() {
		super();
		this.state = {
			inConvo: false,
			settingsOpen: false,
			createOpen: false,
			avatarReload: localStorage.token
		}
	}

	_getUser = () => {

		console.log(this.props.params, "look here at the params!!")
		Api.getMe(localStorage.token).then(res => res.body[0]).then(user => {
			console.log(user, 'user obj in getMe')
			this.setState({username: user.username, user_id: user.id, avatar: user.avatarUrl, userObj: user})

		})

	}


  _toggleSettings = (e) => {
	  e.preventDefault();
	//   console.log(this.state.settingsOpen)
	  this.setState({
		  settingsOpen: !this.state.settingsOpen
	  })
  }

	_toggleCreate = (e) => {
		e.preventDefault();
		// console.log(this.state.createOpen)
		this.setState({
			createOpen: !this.state.createOpen
		})
	}

	_logout = (e) => {
		e.preventDefault();

		Auth.logout().then(res => {
			if (res === true) {
				browserHistory.push('/login')
			}
		})

		this._toggleSettings(e);
		this._getUser();
		browserHistory.push('/login');
	}

	componentDidMount() {
		this._getUser();
		if(this.props.params.id){
			this.setState({
				inConvo: true
			})
		} else{
			this.setState({
				inConvo: false
			})
		}

		if(this.state.inConvo){
			this.setState({
				convoname: "chat"
			})

	}
}

	componentWillReceiveProps(nextProps) {
			if(!!nextProps.params.id){
				this.setState({
					inConvo: true,
					convoname: 'chat'
				})
			} else if(nextProps.params.id === {}){
				this.setState({
					inConvo: false,
					convoname: false
				})
			}

		}

componentDidUpdate(prevProps, prevState){
	if(localStorage.user !== prevProps.user){
		console.log(this.props.user, 'look here fucko')
		this._getUser();
	}

}

	render() {
		return (
						<nav className="nav-bar">
				<div className="nav-bar--flex">

		  		<Link to={'/'}>
	        	<img className="nav-bar--logo" src="/jerome.png" alt="some kind of thing"/>
					</Link>
				</div>

				<div className="nav-bar--flex nav-bar--center">
				{!!Auth.isLoggedIn() ?
        	<h1 className="nav-title">{this.state.convoname ? this.state.convoname : 'Home'}</h1>
				: null}
				</div>



				<div className="nav-bar--flex nav-bar--user-card">
				{!!Auth.isLoggedIn() ?
					<div>
					<div onClick={e => this._toggleSettings(e)} className="nav-bar-user-flex">
		      	<Avatar image={this.state.avatar}/>
						<p>{this.state.username}</p>
					</div>
          <i id="nav-bar--icon" className="fa fa-comments fa-3x" onClick={e => this._toggleCreate(e)}></i>

						{<Settings userObj={this.state.userObj} id={this.state.user_id} close={this._toggleSettings} isOpen={this.state.settingsOpen} logout={this._logout}/>}
						{this.state.convoname ? <AddUser id={this.props.params} close={this._toggleCreate} isOpen={this.state.createOpen} /> :
							<CreateConvo close={this._toggleCreate} isOpen={this.state.createOpen}/>}
						</div>
				: null}
			</div>


			</nav>

		);
	}
}

export default NavBar;
