import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBell,
  faChartSimple,
  faCircleUser,
  faClapperboard,
  faFileInvoice,
  faGear,
  faPhone,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";

class Header extends Component {
  render() {
    return (
      <div className="headerMain">
          <div className="header">
            <div className="left">
            <li>
                <a href="#">
                <FontAwesomeIcon icon={faClapperboard} /> Dashboard
                </a>
            </li>
            <li>
                <a href="#">
                <FontAwesomeIcon icon={faFileInvoice} /> Invoice
                </a>
            </li>
            <li>
                <a href="#">
                <FontAwesomeIcon icon={faWallet} /> Wallet
                </a>
            </li>
            <li>
                <a href="#">
                <FontAwesomeIcon icon={faChartSimple} /> Activity
                </a>
            </li>
            <li>
                <a href="#">
                <FontAwesomeIcon icon={faPhone} />
                Help
                </a>
            </li>
            </div>
            <div className="right">
                <FontAwesomeIcon className="option" icon={faBell} />
                <FontAwesomeIcon className="option" icon={faGear} />
                <FontAwesomeIcon className="option user" icon={faCircleUser} />
            </div>
        </div>
      </div>
    );
  }
}

export default Header;
