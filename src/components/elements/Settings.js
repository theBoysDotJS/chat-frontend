import React from 'react';
import LanguageForm from '../assets/LanguageForm.js';

class Settings extends React.Component {
	render() {
		return(
			<section id="settings" className={!!this.props.open ? "show" : "hide"} >
				<ul>
					<li className="settings--language">
						<p>Change Language</p>
						<LanguageForm />
					</li>
					<li className="settings--notifications">
						<div>
							<p>Notifications</p>
						</div>
					</li>
					<li className="settings--sounds">
						<div>
							<p>Sounds</p>
						</div>
					</li>
				</ul>
				<p onClick={this.props.close}>Close Settings</p>
			</section>
		);
	}
}

export default Settings;
