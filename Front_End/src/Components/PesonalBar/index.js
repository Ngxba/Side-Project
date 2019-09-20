import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class PesonalBar extends React.Component {


  render() {
    return (
      <ButtonDropdown isOpen={this.props.visible} toggle={this.props.onToggle}>
        <DropdownToggle  outline caret>
          {this.props.userInfo.userName}
        </DropdownToggle>
        <DropdownMenu className="">
          <DropdownItem header>{this.props.userInfo.userEmail}</DropdownItem>
          <DropdownItem disabled>Disabled Action</DropdownItem>
          <DropdownItem>Another Action</DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={this.props.logOut}>Log out</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}

export default PesonalBar