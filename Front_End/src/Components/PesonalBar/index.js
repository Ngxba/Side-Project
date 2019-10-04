import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class PesonalBar extends React.Component {


  render() {
    return (
      <ButtonDropdown isOpen={this.props.visible} toggle={this.props.onToggle}>
        <DropdownToggle  outline caret>
        <i className="fas fa-user-cog"></i>
        </DropdownToggle>
        <DropdownMenu className="">
          <DropdownItem header>{this.props.userInfo.userEmail}</DropdownItem>
          <DropdownItem disabled>{this.props.userInfo.userName}</DropdownItem>
          <DropdownItem onClick={this.props.seeOwnedClass}>See my class</DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={this.props.logOut}>Log out</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}

export default PesonalBar