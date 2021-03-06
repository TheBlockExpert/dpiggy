import './NavBar.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { etherscanUrl, ellipsisCenterOfUsername } from '../util/constants'

class NavBar extends Component {
  constructor(props){
    super(props)
		this.state = {
    }
  }

  render() {
    var username = this.context && this.context.web3 && this.context.web3.selectedAccount
    var validNetwork = this.context && this.context.web3 && this.context.web3.validNetwork
    username = ellipsisCenterOfUsername(username)
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="container">
            <Link className="logo-link clickable" to={`/`}>
              <img src="/logo.png" alt="" />
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                {username &&
                  <li className="nav-item dropdown">                  
                    <div className="dropdown-toggle nav-link clickable" target="_self" id="navbarProfile" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <div className="user-nav-container">
                        <div className="user-nav-wrap">
                          <img src="/images/icon_metamask.png" alt=""></img>
                          <div>
                            <span className="wallet-address">{username}</span>
                            {validNetwork && <span className="connected-label">Connected</span>}
                            {!validNetwork && <span className="invalid-network-label">Incorrect Network</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="dropdown-menu signout" aria-labelledby="navbarProfile">
                      <a className="dropdown-item clickable" rel="noopener noreferrer" href={etherscanUrl + this.context.web3.selectedAccount} target="_blank"><FontAwesomeIcon icon={faExternalLinkAlt}></FontAwesomeIcon>&nbsp;OPEN IN ETHERSCAN</a>
                      <div className="dropdown-divider"></div>
                      <div className="dropdown-item clickable" target="_self" onClick={() => this.props.signOut()}><FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon>&nbsp;SIGN OUT</div>
                    </div>
                  </li>
                }
                {!username && 
                  <li className="nav-item mx-lg-2">
                    <div className="nav-link link-nav underline clickable" onClick={() => this.props.signIn()}>SIGN IN</div>
                  </li>
                }
              </ul>
            </div>
          </div>
        </nav>
      </div>)   
  }
}
NavBar.contextTypes = {
  web3: PropTypes.object
}
export default withRouter(NavBar)
