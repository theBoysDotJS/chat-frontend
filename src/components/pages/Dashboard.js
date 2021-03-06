import React, {Component} from 'react';
import ConvoCard from "../elements/ConvoCard.js";
import Api from "../../api.js"
import auth from "../../auth.js"
import { browserHistory } from 'react-router'



class Dashboard extends Component {
	constructor() {
		super();
		this.state = {
			cardInfo: []
		};
	}

	componentDidMount() {
		this._fetchConvos();
	}

	_fetchConvos = () => {
		Api.getAllConvos(localStorage.token) //may need to be document.cookie
			.then(res => res.body).then(cardData => {
				// console.log(cardData, 'this is card data')
				this.setState({
					cardInfo: cardData
				})
		})
	}

	render() {
		console.log(this.state.cardInfo)
		return (
			<div className="dashboard">
				{this.state.cardInfo.map(c => {
					console.log(c, 'this is c');
						return (
							<ConvoCard className="convoCard" convoId={c.id} users={c.users} avatar={c.users.avatarUrl} name={c.name} message={c.messages}/>
						);
					})
				}
			</div>
		);
	}

}


// INFINITE WRAPPER FOR DASHBOARD PAGE

// <Infinite useWindowAsScrollContainer containerHeight={500} elementHeight={400} displayBottomUpwards className="dashboard--cards">
// 	{this.state.cardInfo.map(c => {
// 		console.log(c, 'this is c');
// 		return (<ConvoCard users={c.users} avatar={c.users.avatarUrl} name={c.name} message={c.messages[0]} handle={c.handle}/>);
// 	})}
// </Infinite>

export default Dashboard;
